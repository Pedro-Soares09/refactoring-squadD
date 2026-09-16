@echo off
chcp 65001 >nul
echo ====================================================
echo     Subindo Projeto Squad D para o GitHub
echo     Destino: https://github.com/Pedro-Soares09/refactoring-squadD
echo ====================================================
echo.

REM 1. Localizacao do executavel do Git
where git >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "GIT_CMD=git"
    goto :git_found
)

if exist "C:\Program Files\Git\cmd\git.exe" (
    set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"
    goto :git_found
)

if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
    set "GIT_CMD=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
    goto :git_found
)

if exist "C:\Program Files (x86)\Git\cmd\git.exe" (
    set "GIT_CMD=C:\Program Files (x86)\Git\cmd\git.exe"
    goto :git_found
)

echo [ERRO] O Git nao foi encontrado no seu computador!
echo.
echo Por favor, instale o Git para Windows baixando em:
echo https://git-scm.com/download/win
echo (Basta clicar em Next ate o final e reabrir este arquivo).
echo.
pause
exit /b 1

:git_found
echo [Info] Git localizado: %GIT_CMD%
echo.

REM 2. Inicializacao do Repositorio
if not exist ".git" (
    echo [Info] Inicializando repositorio Git local...
    "%GIT_CMD%" init
) else (
    echo [Info] Repositorio Git local ja existente.
)

"%GIT_CMD%" branch -M main

REM Configura autor padrao se nao houver
"%GIT_CMD%" config user.name >nul 2>&1 || "%GIT_CMD%" config user.name "Pedro-Soares09"
"%GIT_CMD%" config user.email >nul 2>&1 || "%GIT_CMD%" config user.email "pedro.soares@exemplo.com"

REM 3. Execucao dos 5 Commits Logicos
echo.
echo [1/5] Commit: fix: corrige erros criticos de sintaxe html e css que quebravam layout...
"%GIT_CMD%" add styles/servicos.css styles/contato.css styles/sobre.css styles/home.css
"%GIT_CMD%" commit -m "fix: corrige erros criticos de sintaxe html e css que quebravam layout" >nul 2>&1

echo [2/5] Commit: refactor: unifica navegacao, caminhos relativos e cria design system compartilhado...
"%GIT_CMD%" add styles/global.css sobre.html case-de-sucesso.html styles/case-de-sucesso.css depoimentos.html styles/depoimentos.css
"%GIT_CMD%" commit -m "refactor: unifica navegacao, caminhos relativos e cria design system compartilhado" >nul 2>&1

echo [3/5] Commit: refactor: aprimora semantica, acessibilidade e responsividade das telas...
"%GIT_CMD%" add habilidades.html styles/habilidades.css projetos.html styles/projetos.css servicos.html contato.html
"%GIT_CMD%" commit -m "refactor: aprimora semantica, acessibilidade e responsividade das telas" >nul 2>&1

echo [4/5] Commit: feat: implementa servidor backend com endpoint integrado a api do google gemini...
"%GIT_CMD%" add package.json .env.example .gitignore server.js metadata.json
"%GIT_CMD%" commit -m "feat: implementa servidor backend com endpoint integrado a api do google gemini" >nul 2>&1

echo [5/5] Commit: feat: adiciona interface interativa de chat com ia para o squad d...
"%GIT_CMD%" add chat.html styles/chat.css js/chat.js home.html
"%GIT_CMD%" commit -m "feat: adiciona interface interativa de chat com ia para o squad d" >nul 2>&1

REM Garante quaisquer outros arquivos pendentes (como scripts auxiliares)
"%GIT_CMD%" add .
"%GIT_CMD%" commit -m "chore: adiciona scripts de automacao e documentacao do projeto" >nul 2>&1

REM 4. Configuracao do Repositorio Remoto
echo.
echo [Info] Vinculando repositorio remoto...
"%GIT_CMD%" remote remove origin >nul 2>&1
"%GIT_CMD%" remote add origin https://github.com/Pedro-Soares09/refactoring-squadD.git

REM 5. Envio (Push) para o GitHub
echo.
echo ====================================================
echo   Enviando para o GitHub (git push -u origin main)...
echo   (Se solicitado pelo Git, faca login no navegador)
echo ====================================================
echo.
"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================================
    echo   SUCESSO! O projeto foi enviado para o GitHub:
    echo   https://github.com/Pedro-Soares09/refactoring-squadD
    echo ====================================================
) else (
    echo.
    echo [Aviso] Se o push falhar por permissao, certifique-se de que:
    echo 1. O repositorio existe na sua conta Pedro-Soares09
    echo 2. Voce fez login na janela pop-up do GitHub
)

echo.
pause
