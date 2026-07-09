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

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var alunos = await _context.Alunos
            .AsNoTracking()
            .OrderBy(a => a.Nome)
            .Select(a => new
            {
                id = a.Id,
                nome = a.Nome,
                matricula = a.Matricula,
                dataNascimento = a.DataNascimento,
                turmaId = a.TurmaId,
                casaId = a.CasaId,
                pontos = a.Pontos,
                turma = new
                {
                    id = a.Turma.Id,
                    nome = a.Turma.Nome,
                    turno = a.Turma.Turno
                },
                casa = a.Casa == null ? null : new
                {
                    id = a.Casa.Id,
                    nome = a.Casa.Nome
                }
            })
            .ToListAsync();

        return Ok(alunos);
    }

    [AllowAnonymous]
    [HttpGet("turma/{turmaId}")]
    public async Task<ActionResult> GetPorTurma(int turmaId)
    {
        var alunos = await _context.Alunos
            .AsNoTracking()
            .Where(a => a.TurmaId == turmaId)
            .OrderBy(a => a.Nome)
            .Select(a => new
            {
                id = a.Id,
                nome = a.Nome,
                matricula = a.Matricula,
                dataNascimento = a.DataNascimento,
                turmaId = a.TurmaId,
                casaId = a.CasaId,
                pontos = a.Pontos,
                turma = new
                {
                    id = a.Turma.Id,
                    nome = a.Turma.Nome,
                    turno = a.Turma.Turno
                },
                casa = a.Casa == null ? null : new
                {
                    id = a.Casa.Id,
                    nome = a.Casa.Nome
                }
            })
            .ToListAsync();

        return Ok(alunos);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(int id)
    {
        var aluno = await _context.Alunos
            .AsNoTracking()
            .Where(a => a.Id == id)
            .Select(a => new
            {
                id = a.Id,
                nome = a.Nome,
                matricula = a.Matricula,
                dataNascimento = a.DataNascimento,
                turmaId = a.TurmaId,
                casaId = a.CasaId,
                pontos = a.Pontos,
                turma = new
                {
                    id = a.Turma.Id,
                    nome = a.Turma.Nome,
                    turno = a.Turma.Turno
                },
                casa = a.Casa == null ? null : new
                {
                    id = a.Casa.Id,
                    nome = a.Casa.Nome
                }
            })
            .FirstOrDefaultAsync();

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

        if (aluno == null)
            return NotFound("Aluno não encontrado.");

        aluno.Nome = alunoAtualizado.Nome;
        aluno.Matricula = alunoAtualizado.Matricula;
        aluno.DataNascimento = alunoAtualizado.DataNascimento;
        aluno.TurmaId = alunoAtualizado.TurmaId;
        aluno.CasaId = alunoAtualizado.CasaId;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            mensagem = "Aluno atualizado com sucesso.",
            aluno = new
            {
                id = aluno.Id,
                nome = aluno.Nome,
                matricula = aluno.Matricula,
                turmaId = aluno.TurmaId,
                casaId = aluno.CasaId,
                pontos = aluno.Pontos
            }
        });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> Delete(int id)
    {
        var aluno = await _context.Alunos.FindAsync(id);

        if (aluno == null)
            return NotFound("Aluno não encontrado.");

        _context.Alunos.Remove(aluno);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Aluno excluído com sucesso." });
    }
}