using SistemaPontosEscolar.Models;

namespace SistemaPontosEscolar.Data;

public static class DbInitializer
{
    public static void Seed(AppDbContext context)
    {
        if (!context.Casas.Any())
        {
            context.Casas.AddRange(
                new Casa { Nome = "Águias", Cor = "Azul", Simbolo = "aguia" },
                new Casa { Nome = "Leões", Cor = "Vermelho", Simbolo = "leao" },
                new Casa { Nome = "Tigres", Cor = "Amarelo", Simbolo = "tigre" },
                new Casa { Nome = "Lobos", Cor = "Preto", Simbolo = "lobo" }
            );
        }

        if (!context.Turmas.Any())
        {
            context.Turmas.AddRange(
                new Turma { Nome = "7º A", Turno = "Manhã", IconeUrl = null },
                new Turma { Nome = "8º B", Turno = "Tarde", IconeUrl = null },
                new Turma { Nome = "9º A", Turno = "Manhã", IconeUrl = null }
            );
        }

        context.SaveChanges();

        if (!context.Usuarios.Any())
        {
            var admin = new Usuario
            {
                Nome = "Administrador",
                Email = "admin@escola.com",
                SenhaHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                Tipo = "admin"
            };

            var usuarioProfessor = new Usuario
            {
                Nome = "Prof. Helena",
                Email = "prof@escola.com",
                SenhaHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                Tipo = "professor"
            };

            var usuarioAluno = new Usuario
            {
                Nome = "Maria Souza",
                Email = "aluno@escola.com",
                SenhaHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                Tipo = "aluno"
            };

            context.Usuarios.AddRange(admin, usuarioProfessor, usuarioAluno);
            context.SaveChanges();

            var professor = new Professor
            {
                UsuarioId = usuarioProfessor.Id,
                Disciplina = "Matemática"
            };

            context.Professores.Add(professor);
            context.SaveChanges();

            var turma = context.Turmas.First();
            var casa = context.Casas.First();

            var aluno = new Aluno
            {
                Nome = "Maria Souza",
                Matricula = "2026001",
                DataNascimento = new DateTime(2012, 4, 10),
                TurmaId = turma.Id,
                CasaId = casa.Id,
                UsuarioId = usuarioAluno.Id,
                Pontos = 30
            };

            context.Alunos.Add(aluno);
            context.SaveChanges();
        }
    }
}