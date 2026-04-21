using Microsoft.AspNetCore.Http;

namespace SistemaPontosEscolar.DTOs;

public class TurmaCreateDto
{
    public string Nome { get; set; } = string.Empty;
    public string? Turno { get; set; }
    public IFormFile? Icone { get; set; }
}