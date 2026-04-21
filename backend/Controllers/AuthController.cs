using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaPontosEscolar.Data;
using SistemaPontosEscolar.DTOs;
using SistemaPontosEscolar.Services;

namespace SistemaPontosEscolar.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    public AuthController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto dto)
    {
        var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.SenhaHash))
            return Unauthorized("Usuário ou senha inválidos.");

        int? professorId = null;
        int? alunoId = null;

        if (usuario.Tipo == "professor")
            professorId = await _context.Professores.Where(p => p.UsuarioId == usuario.Id).Select(p => (int?)p.Id).FirstOrDefaultAsync();

        if (usuario.Tipo == "aluno")
            alunoId = await _context.Alunos.Where(a => a.UsuarioId == usuario.Id).Select(a => (int?)a.Id).FirstOrDefaultAsync();

        var token = _tokenService.GenerateToken(usuario, professorId, alunoId);

        return Ok(new
        {
            token,
            usuario = new { usuario.Id, usuario.Nome, usuario.Email, usuario.Tipo, professorId, alunoId }
        });
    }
}
