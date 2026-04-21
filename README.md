# Sistema de Pontos Escolar - E.E. Zinha Meira

## Estrutura
- `backend/` ASP.NET Core Web API + MySQL + JWT
- `frontend/` React + Vite

## Requisitos
- .NET 8 SDK
- Node.js
- MySQL

## Banco
Crie o banco:
```sql
CREATE DATABASE sistema_pontos_escolar;
```

Ajuste a senha do MySQL em `backend/appsettings.json`.

## Rodar o back-end
```bash
cd backend
dotnet restore
dotnet run
```

A API abre em:
```text
http://localhost:5000
```

## Rodar o front-end
```bash
cd frontend
npm install
npm run dev
```

O front abre em:
```text
http://localhost:5173
```

## Usuários de teste
- Admin: `admin@escola.com` / `123456`
- Professor: `prof@escola.com` / `123456`
- Aluno: `aluno@escola.com` / `123456`

## Observações
- O upload do ícone da turma é salvo em `backend/wwwroot/uploads/turmas`
- O back-end usa `EnsureCreated()` e seed inicial automático
- Se a tabela `turmas` já existir, ela precisa ter a coluna `icone_url`
