namespace SistemaPontosEscolar.DTOs;

public class AlunoCreateDto
{
    public string Nome { get; set; } = string.Empty;
    public string Matricula { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public int TurmaId { get; set; }
    public int CasaId { get; set; }
}
