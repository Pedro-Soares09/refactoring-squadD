@echo off
chcp 65001 >nul
echo ====================================================
echo    Executando Commits Logicos do Squad D
echo ====================================================

REM 1. Verifica se o repositorio Git ja esta inicializado
if not exist ".git" (
    echo [Info] Inicializando repositorio Git...
    git init
) else (
    echo [Info] Repositorio Git detectado.
)

REM Garante autor configurado localmente se nao houver global
git config user.name >nul 2>&1 || git config user.name "Squad D Developer"
git config user.email >nul 2>&1 || git config user.email "dev@squadd.local"

echo.
echo [1/5] Executando Commit 1: Correcao de bugs de sintaxe...
git add styles/servicos.css styles/contato.css styles/sobre.css styles/home.css
git commit -m "fix: corrige erros criticos de sintaxe html e css que quebravam layout"

echo.
echo [2/5] Executando Commit 2: Design System compartilhado e navegacao...
git add styles/global.css sobre.html case-de-sucesso.html styles/case-de-sucesso.css depoimentos.html styles/depoimentos.css
git commit -m "refactor: unifica navegacao, caminhos relativos e cria design system compartilhado"

echo.
echo [3/5] Executando Commit 3: Semantica, acessibilidade e responsividade...
git add habilidades.html styles/habilidades.css projetos.html styles/projetos.css servicos.html contato.html
git commit -m "refactor: aprimora semantica, acessibilidade e responsividade das telas"

echo.
echo [4/5] Executando Commit 4: Servidor Backend e Google Gemini API...
git add package.json .env.example .gitignore server.js metadata.json
git commit -m "feat: implementa servidor backend com endpoint integrado a api do google gemini"

echo.
echo [5/5] Executando Commit 5: Interface Interativa de Chat com IA...
git add chat.html styles/chat.css js/chat.js home.html
git commit -m "feat: adiciona interface interativa de chat com ia para o squad d"

echo.
echo ====================================================
echo    Todos os 5 commits foram criados com sucesso!
echo ====================================================
echo Historico recente:
echo.
git log --oneline -n 5
echo.

