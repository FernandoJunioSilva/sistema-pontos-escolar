using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaPontosEscolar.Data;
using SistemaPontosEscolar.DTOs;
using SistemaPontosEscolar.Models;

namespace SistemaPontosEscolar.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TurmasController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public TurmasController(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult> GetAll()
    {
        var turmas = await _context.Turmas
            .Select(t => new
            {
                t.Id,
                t.Nome,
                t.Turno,
                t.IconeUrl,
                QuantidadeAlunos = t.Alunos.Count,
                Pontuacao = t.Alunos.Sum(a => a.Pontos)
            })
            .OrderBy(t => t.Nome)
            .ToListAsync();

        return Ok(turmas);
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult> Create([FromForm] TurmaCreateDto dto)
    {
        string? iconeUrl = null;

        if (dto.Icone != null && dto.Icone.Length > 0)
        {
            var extensao = Path.GetExtension(dto.Icone.FileName).ToLowerInvariant();
            var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png", ".webp" };

            if (!extensoesPermitidas.Contains(extensao))
                return BadRequest("Formato de imagem inválido. Use jpg, jpeg, png ou webp.");

            var pastaUploads = Path.Combine(_environment.WebRootPath, "uploads", "turmas");

            if (!Directory.Exists(pastaUploads))
                Directory.CreateDirectory(pastaUploads);

            var nomeArquivo = $"{Guid.NewGuid()}{extensao}";
            var caminhoArquivo = Path.Combine(pastaUploads, nomeArquivo);

            using (var stream = new FileStream(caminhoArquivo, FileMode.Create))
            {
                await dto.Icone.CopyToAsync(stream);
            }

            iconeUrl = $"{Request.Scheme}://{Request.Host}/uploads/turmas/{nomeArquivo}";
        }

        var turma = new Turma
        {
            Nome = dto.Nome,
            Turno = dto.Turno,
            IconeUrl = iconeUrl
        };

        _context.Turmas.Add(turma);
        await _context.SaveChangesAsync();

        return Ok(turma);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Update(int id, Turma turmaAtualizada)
    {
        var turma = await _context.Turmas.FindAsync(id);
        if (turma == null) return NotFound("Turma não encontrada.");

        turma.Nome = turmaAtualizada.Nome;
        turma.Turno = turmaAtualizada.Turno;
        turma.IconeUrl = turmaAtualizada.IconeUrl;

        await _context.SaveChangesAsync();
        return Ok(turma);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Delete(int id)
    {
        var turma = await _context.Turmas.FindAsync(id);
        if (turma == null) return NotFound("Turma não encontrada.");

        _context.Turmas.Remove(turma);
        await _context.SaveChangesAsync();
        return Ok(new { mensagem = "Turma excluída com sucesso." });
    }
}