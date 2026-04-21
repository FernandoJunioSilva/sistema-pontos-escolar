namespace SistemaPontosEscolar.DTOs;

public class PontuacaoCreateDto
{
    public int AlunoId { get; set; }
    public int ProfessorId { get; set; }
    public int Pontos { get; set; }
    public string Motivo { get; set; } = string.Empty;
    public string? Semana { get; set; }
}