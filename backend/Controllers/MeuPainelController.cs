using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaPontosEscolar.Data;

namespace SistemaPontosEscolar.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "aluno")]
public class MeuPainelController : ControllerBase
{
    private readonly AppDbContext _context;

    public MeuPainelController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetMeuPainel()
    {
        var claimAlunoId = User.Claims.FirstOrDefault(c => c.Type == "alunoId")?.Value;

        if (claimAlunoId == null)
            return Unauthorized("Aluno não identificado no token.");

        var alunoId = int.Parse(claimAlunoId);

        var aluno = await _context.Alunos
            .Where(a => a.Id == alunoId)
            .Select(a => new
            {
                a.Id,
                a.Nome,
                a.Pontos,
                Turma = new
                {
                    a.Turma.Id,
                    a.Turma.Nome
                },
                Casa = new
                {
                    a.Casa.Id,
                    a.Casa.Nome,
                    a.Casa.Cor
                },
                Pontuacoes = a.Pontuacoes
                    .OrderByDescending(p => p.DataLancamento)
                    .Select(p => new
                    {
                        p.Id,
                        p.Pontos,
                        p.Motivo,
                        p.Semana,
                        p.DataLancamento
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (aluno == null)
            return NotFound("Aluno não encontrado.");

        return Ok(aluno);
    }
}