using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaPontosEscolar.Data;
using SistemaPontosEscolar.DTOs;

namespace SistemaPontosEscolar.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RankingController : ControllerBase
{
    private readonly AppDbContext _context;

    public RankingController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("alunos")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<RankingDto>>> RankingAlunos()
    {
        var ranking = await _context.Alunos
            .Include(a => a.Turma)
            .OrderByDescending(a => a.Pontos)
            .Select(a => new
            {
                a.Id,
                a.Nome,
                a.Pontos,
                Turma = a.Turma.Nome
            })
            .ToListAsync();

        return Ok(ranking);
    }

    [HttpGet("casas")]
    [AllowAnonymous]
    public async Task<ActionResult> RankingCasas()
    {
        var ranking = await _context.Casas
            .Select(c => new
            {
                c.Id,
                c.Nome,
                Pontos = c.Alunos.Sum(a => a.Pontos)
            })
            .OrderByDescending(c => c.Pontos)
            .ToListAsync();

        return Ok(ranking);
    }
}