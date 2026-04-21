namespace SistemaPontosEscolar.Models;

public class Turma
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string? Turno { get; set; }
    public string? IconeUrl { get; set; }

    public ICollection<Aluno> Alunos { get; set; } = new List<Aluno>();
}