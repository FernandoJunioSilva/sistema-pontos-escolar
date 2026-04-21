using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaPontosEscolar.Data;

namespace SistemaPontosEscolar.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConquistasController : ControllerBase
{
    private readonly AppDbContext _context;

    public ConquistasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("recentes")]
    [AllowAnonymous]
    public async Task<ActionResult> GetRecentes()
    {
        var turmas = await _context.Turmas
            .Select(t => new
            {
                t.Id,
                t.Nome,
                Pontuacao = t.Alunos.Sum(a => a.Pontos),
                QuantidadeAlunos = t.Alunos.Count
            })
            .OrderByDescending(t => t.Pontuacao)
            .ToListAsync();

        var conquistas = turmas.Select((t, index) => new
        {
            t.Id,
            t.Nome,
            t.Pontuacao,
            Conquista = index == 0
                ? "🏆 Turma da semana"
                : t.Pontuacao >= 800
                ? "📈 Mais pontos ganhos"
                : t.Pontuacao >= 600
                ? "🧠 Melhor desempenho acadêmico"
                : t.Pontuacao >= 400
                ? "🤝 Turma mais colaborativa"
                : t.Pontuacao >= 200
                ? "📢 Mais participativa"
                : "🚀 Em evolução"
        });

        return Ok(conquistas);
    }
}