using System.Text;
using System.Text.Json.Serialization;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using SistemaPontosEscolar.Data;
using SistemaPontosEscolar.Services;

var builder = WebApplication.CreateBuilder(args);


// ======================================================
// CONTROLLERS
// ======================================================

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });


// ======================================================
// SWAGGER
// ======================================================

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// ======================================================
// SERVIÇOS
// ======================================================

builder.Services.AddScoped<TokenService>();


// ======================================================
// BANCO DE DADOS
// ======================================================

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new Exception(
        "A ConnectionStrings__DefaultConnection não foi configurada."
    );
}


// O Aiven está usando MySQL 8.4.8.
// Informamos diretamente a versão para NÃO usar AutoDetect.

var serverVersion =
    new MySqlServerVersion(
        new Version(8, 4, 8)
    );


builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(
        connectionString,
        serverVersion
    );
});


// ======================================================
// JWT
// ======================================================

var jwtKey =
    builder.Configuration["Jwt:Key"];

var jwtIssuer =
    builder.Configuration["Jwt:Issuer"];

var jwtAudience =
    builder.Configuration["Jwt:Audience"];


if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new Exception(
        "Jwt__Key não foi configurada."
    );
}

if (string.IsNullOrWhiteSpace(jwtIssuer))
{
    throw new Exception(
        "Jwt__Issuer não foi configurada."
    );
}

if (string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new Exception(
        "Jwt__Audience não foi configurada."
    );
}


builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme
    )
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,

                ValidateAudience = true,

                ValidateLifetime = true,

                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtIssuer,

                ValidAudience = jwtAudience,

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtKey)
                    )
            };
    });


builder.Services.AddAuthorization();


// ======================================================
// CORS
// ======================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "frontend",
        policy =>
        {
            policy
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
        }
    );
});


// ======================================================
// APP
// ======================================================

var app = builder.Build();


// ======================================================
// SWAGGER
// ======================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// ======================================================
// MIDDLEWARE
// ======================================================

app.UseStaticFiles();

app.UseCors("frontend");

app.UseAuthentication();

app.UseAuthorization();


// ======================================================
// ROTA DE TESTE
// ======================================================

app.MapGet("/", () =>
{
    return "Backend online - Aiven MySQL";
});


// ======================================================
// CONTROLLERS
// ======================================================

app.MapControllers();


// ======================================================
// CRIAR BANCO / TABELAS
// ======================================================

using (var scope = app.Services.CreateScope())
{
    try
    {
        Console.WriteLine(
            "Tentando conectar ao banco MySQL..."
        );

        var db =
            scope.ServiceProvider
                .GetRequiredService<AppDbContext>();


        var conseguiuConectar =
            db.Database.CanConnect();


        if (conseguiuConectar)
        {
            Console.WriteLine(
                "Conexão com MySQL realizada com sucesso."
            );


            var criado =
                db.Database.EnsureCreated();


            if (criado)
            {
                Console.WriteLine(
                    "Banco/tabelas criados com sucesso."
                );
            }
            else
            {
                Console.WriteLine(
                    "Banco já existe. Estrutura verificada."
                );
            }
        }
        else
        {
            Console.WriteLine(
                "Não foi possível conectar ao MySQL."
            );
        }


        // NÃO executar por enquanto.
        // Queremos o banco novo sem dados antigos.

        // DbInitializer.Seed(db);
    }
    catch (Exception ex)
    {
        Console.WriteLine(
            "=================================="
        );

        Console.WriteLine(
            "ERRO AO INICIALIZAR O BANCO:"
        );

        Console.WriteLine(
            ex.ToString()
        );

        Console.WriteLine(
            "=================================="
        );
    }
}


// ======================================================
// INICIAR
// ======================================================

app.Run();