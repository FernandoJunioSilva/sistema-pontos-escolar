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
public class AlunosController : ControllerBase
{
    private readonly AppDbContext _context;

    public AlunosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Aluno>>> GetAll()
    {
        var alunos = await _context.Alunos
            .Include(a => a.Turma)
            .Include(a => a.Casa)
            .OrderBy(a => a.Nome)
            .ToListAsync();

        return Ok(alunos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Aluno>> GetById(int id)
    {
        var aluno = await _context.Alunos
            .Include(a => a.Turma)
            .Include(a => a.Casa)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (aluno == null)
            return NotFound("Aluno não encontrado.");

        return Ok(aluno);
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Create(AlunoCreateDto dto)
    {
        var aluno = new Aluno
        {
            Nome = dto.Nome,
            Matricula = dto.Matricula,
            DataNascimento = dto.DataNascimento,
            TurmaId = dto.TurmaId,
            CasaId = dto.CasaId,
            Pontos = 0
        };

        _context.Alunos.Add(aluno);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = aluno.Id }, aluno);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Update(int id, Aluno alunoAtualizado)
    {
        var aluno = await _context.Alunos.FindAsync(id);
        if (aluno == null) return NotFound("Aluno não encontrado.");

        aluno.Nome = alunoAtualizado.Nome;
        aluno.Matricula = alunoAtualizado.Matricula;
        aluno.DataNascimento = alunoAtualizado.DataNascimento;
        aluno.TurmaId = alunoAtualizado.TurmaId;
        aluno.CasaId = alunoAtualizado.CasaId;

        await _context.SaveChangesAsync();
        return Ok(aluno);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Delete(int id)
    {
        var aluno = await _context.Alunos.FindAsync(id);
        if (aluno == null) return NotFound("Aluno não encontrado.");

        _context.Alunos.Remove(aluno);
        await _context.SaveChangesAsync();
        return Ok(new { mensagem = "Aluno excluído com sucesso." });
    }
}