namespace SistemaPontosEscolar.Models;

public class Professor
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public string? Disciplina { get; set; }
    public Usuario Usuario { get; set; } = null!;
    public ICollection<Pontuacao> Pontuacoes { get; set; } = new List<Pontuacao>();
}
