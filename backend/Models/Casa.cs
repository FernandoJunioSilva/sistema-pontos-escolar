namespace SistemaPontosEscolar.Models;

public class Casa
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Cor { get; set; } = string.Empty;
    public string? Simbolo { get; set; }
    public ICollection<Aluno> Alunos { get; set; } = new List<Aluno>();
}
