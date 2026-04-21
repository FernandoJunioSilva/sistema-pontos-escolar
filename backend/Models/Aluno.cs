namespace SistemaPontosEscolar.Models;

public class Aluno
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Matricula { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public int TurmaId { get; set; }
    public int CasaId { get; set; }
    public int? UsuarioId { get; set; }
    public int Pontos { get; set; }
    public Turma Turma { get; set; } = null!;
    public Casa Casa { get; set; } = null!;
    public Usuario? Usuario { get; set; }
    public ICollection<Pontuacao> Pontuacoes { get; set; } = new List<Pontuacao>();
}
