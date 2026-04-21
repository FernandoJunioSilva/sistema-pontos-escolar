using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaPontosEscolar.Data;
using SistemaPontosEscolar.Models;

namespace SistemaPontosEscolar.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CasasController : ControllerBase
{
    private readonly AppDbContext _context;

    public CasasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Casa>>> GetAll()
    {
        return Ok(await _context.Casas.OrderBy(c => c.Nome).ToListAsync());
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Create(Casa casa)
    {
        _context.Casas.Add(casa);
        await _context.SaveChangesAsync();
        return Ok(casa);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Update(int id, Casa casaAtualizada)
    {
        var casa = await _context.Casas.FindAsync(id);
        if (casa == null) return NotFound("Casa não encontrada.");

        casa.Nome = casaAtualizada.Nome;
        casa.Cor = casaAtualizada.Cor;
        casa.Simbolo = casaAtualizada.Simbolo;

        await _context.SaveChangesAsync();
        return Ok(casa);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Delete(int id)
    {
        var casa = await _context.Casas.FindAsync(id);
        if (casa == null) return NotFound("Casa não encontrada.");

        _context.Casas.Remove(casa);
        await _context.SaveChangesAsync();
        return Ok(new { mensagem = "Casa excluída com sucesso." });
    }
}                                                                                                                                                   