# Script PowerShell para execucao dos 5 commits logicos do Squad D
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "   Executando Commits Logicos do Squad D" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
    Write-Host "[Info] Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[Info] Repositorio Git ja inicializado." -ForegroundColor Green
}

# Configura autor padrao se nao houver globalmente
$userName = git config user.name
if (-not $userName) { git config user.name "Squad D Developer" }
$userEmail = git config user.email
if (-not $userEmail) { git config user.email "dev@squadd.local" }

Write-Host "`n[1/5] Executando Commit 1: Correcao de bugs de sintaxe..." -ForegroundColor Yellow
git add styles/servicos.css styles/contato.css styles/sobre.css styles/home.css
git commit -m "fix: corrige erros criticos de sintaxe html e css que quebravam layout"

Write-Host "`n[2/5] Executando Commit 2: Design System compartilhado e navegacao..." -ForegroundColor Yellow
git add styles/global.css sobre.html case-de-sucesso.html styles/case-de-sucesso.css depoimentos.html styles/depoimentos.css
git commit -m "refactor: unifica navegacao, caminhos relativos e cria design system compartilhado"

Write-Host "`n[3/5] Executando Commit 3: Semantica, acessibilidade e responsividade..." -ForegroundColor Yellow
git add habilidades.html styles/habilidades.css projetos.html styles/projetos.css servicos.html contato.html
git commit -m "refactor: aprimora semantica, acessibilidade e responsividade das telas"

Write-Host "`n[4/5] Executando Commit 4: Servidor Backend e Google Gemini API..." -ForegroundColor Yellow
git add package.json .env.example .gitignore server.js metadata.json
git commit -m "feat: implementa servidor backend com endpoint integrado a api do google gemini"

Write-Host "`n[5/5] Executando Commit 5: Interface Interativa de Chat com IA..." -ForegroundColor Yellow
git add chat.html styles/chat.css js/chat.js home.html
git commit -m "feat: adiciona interface interativa de chat com ia para o squad d"

Write-Host "`n====================================================" -ForegroundColor Green
Write-Host "   Todos os 5 commits foram criados com sucesso!" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green
git log --oneline -n 5
