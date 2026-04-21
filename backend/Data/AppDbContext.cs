using Microsoft.EntityFrameworkCore;
using SistemaPontosEscolar.Models;

namespace SistemaPontosEscolar.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Professor> Professores => Set<Professor>();
    public DbSet<Aluno> Alunos => Set<Aluno>();
    public DbSet<Turma> Turmas => Set<Turma>();
    public DbSet<Casa> Casas => Set<Casa>();
    public DbSet<Pontuacao> Pontuacoes => Set<Pontuacao>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>().ToTable("usuarios");
        modelBuilder.Entity<Professor>().ToTable("professores");
        modelBuilder.Entity<Aluno>().ToTable("alunos");
        modelBuilder.Entity<Turma>().ToTable("turmas");
        modelBuilder.Entity<Casa>().ToTable("casas");
        modelBuilder.Entity<Pontuacao>().ToTable("pontuacoes");

        modelBuilder.Entity<Usuario>().HasIndex(x => x.Email).IsUnique();
        modelBuilder.Entity<Aluno>().HasIndex(x => x.Matricula).IsUnique();

        modelBuilder.Entity<Professor>()
            .HasOne(p => p.Usuario)
            .WithMany()
            .HasForeignKey(p => p.UsuarioId);

        modelBuilder.Entity<Aluno>()
            .HasOne(a => a.Turma)
            .WithMany(t => t.Alunos)
            .HasForeignKey(a => a.TurmaId);

        modelBuilder.Entity<Aluno>()
            .HasOne(a => a.Casa)
            .WithMany(c => c.Alunos)
            .HasForeignKey(a => a.CasaId);

        modelBuilder.Entity<Aluno>()
            .Property(a => a.Pontos)
            .HasDefaultValue(0);

        modelBuilder.Entity<Pontuacao>()
            .HasOne(p => p.Aluno)
            .WithMany(a => a.Pontuacoes)
            .HasForeignKey(p => p.AlunoId);

        modelBuilder.Entity<Pontuacao>()
            .HasOne(p => p.Professor)
            .WithMany(pr => pr.Pontuacoes)
            .HasForeignKey(p => p.ProfessorId);
    }
}