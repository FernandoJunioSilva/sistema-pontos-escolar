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
public class PontuacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public PontuacoesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize(Roles = "admin,professor")]
    public async Task<ActionResult> GetAll()
    {
        var lista = await _context.Pontuacoes
            .Include(p => p.Aluno)
                .ThenInclude(a => a.Turma)
            .Include(p => p.Professor)
            .OrderByDescending(p => p.DataLancamento)
            .ToListAsync();

        return Ok(lista);
    }

    [HttpPost]
    [Authorize(Roles = "professor")]
    public async Task<ActionResult> LancarPontos(PontuacaoCreateDto dto)
    {
        var claimProfessorId = User.Claims.FirstOrDefault(c => c.Type == "professorId")?.Value;

        if (claimProfessorId == null)
            return Unauthorized("Professor não identificado no token.");

        var professorIdToken = int.Parse(claimProfessorId);

        if (dto.ProfessorId != professorIdToken)
            return Forbid();

        var aluno = await _context.Alunos.FindAsync(dto.AlunoId);
        if (aluno == null)
            return NotFound("Aluno não encontrado.");

        var pontuacao = new Pontuacao
        {
            AlunoId = dto.AlunoId,
            ProfessorId = dto.ProfessorId,
            Pontos = dto.Pontos,
            Motivo = dto.Motivo,
            Semana = dto.Semana,
            DataLancamento = DateTime.Now
        };

        aluno.Pontos += dto.Pontos;
        _context.Pontuacoes.Add(pontuacao);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Pontuação lançada com sucesso." });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin,professor")]
    public async Task<ActionResult> EditarPontuacao(int id, PontuacaoCreateDto dto)
    {
        var pontuacao = await _context.Pontuacoes.FindAsync(id);

        if (pontuacao == null)
            return NotFound("Pontuação não encontrada.");

        var aluno = await _context.Alunos.FindAsync(pontuacao.AlunoId);
        if (aluno == null)
            return NotFound("Aluno não encontrado.");

        aluno.Pontos -= pontuacao.Pontos;

        pontuacao.Pontos = dto.Pontos;
        pontuacao.Motivo = dto.Motivo;
        pontuacao.Semana = dto.Semana;

        aluno.Pontos += dto.Pontos;

        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Pontuação alterada com sucesso." });
    }
}