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
// CORS
// ======================================================

const string CorsPolicy = "AllowFrontend";

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",

                // Vercel antigo
                "https://sistema-pontos-escolar.vercel.app",

                // Frontend do Render
                "https://sistema-pontos-escolar-frontend.onrender.com",

                // Domínio oficial
                "https://zinhameira.com",
                "https://www.zinhameira.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


// ======================================================
// BANCO DE DADOS MYSQL
// ======================================================

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new Exception(
        "A ConnectionStrings__DefaultConnection não foi configurada."
    );
}

// Aiven MySQL 8.4
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

var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new Exception(
        "A variável Jwt__Key não foi configurada."
    );
}

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;

        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
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
                    ),

                ClockSkew = TimeSpan.Zero
            };
    });


// ======================================================
// AUTORIZAÇÃO
// ======================================================

builder.Services.AddAuthorization();


// ======================================================
// SERVIÇOS
// ======================================================

builder.Services.AddScoped<TokenService>();


// ======================================================
// CRIAR APLICAÇÃO
// ======================================================

var app = builder.Build();


// ======================================================
// TESTAR CONEXÃO COM MYSQL
// ======================================================

try
{
    Console.WriteLine("Tentando conectar ao banco MySQL...");

    using var scope = app.Services.CreateScope();

    var db =
        scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

    if (db.Database.CanConnect())
    {
        Console.WriteLine(
            "Conexão com MySQL realizada com sucesso."
        );
    }
    else
    {
        Console.WriteLine(
            "Não foi possível conectar ao MySQL."
        );
    }
}
catch (Exception ex)
{
    Console.WriteLine(
        "Erro ao conectar ao MySQL:"
    );

    Console.WriteLine(ex.Message);
}


// ======================================================
// PIPELINE
// ======================================================

app.UseRouting();

// IMPORTANTE:
// CORS deve ficar antes da autenticação/autorização.
app.UseCors(CorsPolicy);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();


// ======================================================
// ROTA PARA TESTAR SE O BACKEND ESTÁ ONLINE
// ======================================================

app.MapGet("/", () =>
{
    return Results.Ok(new
    {
        status = "online",
        sistema = "Sistema de Pontos Escolar",
        escola = "E.E. Zinha Meira"
    });
});


// ======================================================
// INICIAR
// ======================================================

app.Run();