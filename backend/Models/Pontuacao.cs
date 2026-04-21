namespace SistemaPontosEscolar.Models;

public class Pontuacao
{
    public int Id { get; set; }
    public int AlunoId { get; set; }
    public int ProfessorId { get; set; }
    public int Pontos { get; set; }
    public string Motivo { get; set; } = string.Empty;
    public string? Semana { get; set; }
    public DateTime DataLancamento { get; set; }

    public Aluno Aluno { get; set; } = null!;
    public Professor Professor { get; set; } = null!;
}