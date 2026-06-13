@echo off
setlocal enabledelayedexpansion

set "ROOT=%~dp0"
set "BACKEND_DIR=%ROOT%backend"
set "FRONTEND_DIR=%ROOT%frontend"

echo ==================================================
echo  ARQUIVINI - BACK-END + FRONT-END INTEGRADOS
echo ==================================================
echo.

echo [1/4] Iniciando PostgreSQL pelo Docker...
cd /d "%BACKEND_DIR%"
docker compose up -d
if errorlevel 1 (
  echo.
  echo ERRO: nao foi possivel iniciar o Docker Compose.
  echo Verifique se o Docker Desktop esta aberto.
  pause
  exit /b 1
)

echo.
echo [2/4] Aguardando o banco aceitar conexoes...
timeout /t 10 /nobreak >nul

echo.
echo [3/4] Criando/atualizando tabelas e assuntos iniciais...
type init.sql | docker compose exec -T db psql -U usuario_admin -d arquivini_db
if errorlevel 1 (
  echo.
  echo ATENCAO: falha ao aplicar init.sql.
  echo Se aparecer erro de senha, provavelmente existe um volume antigo do Postgres.
  echo Para zerar o banco de desenvolvimento, rode: cd backend ^&^& docker compose down -v
  pause
  exit /b 1
)

type assuntos.sql | docker compose exec -T db psql -U usuario_admin -d arquivini_db
if errorlevel 1 (
  echo.
  echo ATENCAO: falha ao inserir os assuntos iniciais.
  pause
  exit /b 1
)

echo.
echo [4/4] Abrindo back-end e front-end em janelas separadas...
start "Back-end Arquivini" cmd /k "cd /d ""%BACKEND_DIR%"" && mvn spring-boot:run"
start "Front-end Vini Arquitetura" cmd /k "cd /d ""%FRONTEND_DIR%"" && if not exist node_modules npm install && npm run dev"

echo.
echo Projeto iniciado.
echo Front-end: http://localhost:3000/contato
echo Back-end POST: http://localhost:8080/api/contato
echo Back-end assuntos: http://localhost:8080/api/contato/assuntos
echo.
echo Depois que as duas janelas terminarem de carregar, abra a pagina de contato e envie uma mensagem de teste.
pause
