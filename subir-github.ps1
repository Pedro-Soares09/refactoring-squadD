# Script PowerShell para subir o Squad D para o GitHub
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "    Subindo Projeto Squad D para o GitHub" -ForegroundColor Cyan
Write-Host "    Destino: https://github.com/Pedro-Soares09/refactoring-squadD" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# 1. Localiza Git
$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    $paths = @(
        "C:\Program Files\Git\cmd\git.exe",
        "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe",
        "C:\Program Files (x86)\Git\cmd\git.exe"
    )
    foreach ($p in $paths) {
        if (Test-Path $p) {
            $gitCmd = $p
            break
        }
    }
}

if (-not $gitCmd) {
    Write-Host "`n[ERRO] Git nao encontrado! Instale em https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

Write-Host "`n[Info] Git localizado: $gitCmd" -ForegroundColor Green

# 2. Inicializacao e Configuracao
if (-not (Test-Path ".git")) {
    & $gitCmd init
}
& $gitCmd branch -M main

$userName = & $gitCmd config user.name
if (-not $userName) { & $gitCmd config user.name "Pedro-Soares09" }
$userEmail = & $gitCmd config user.email
if (-not $userEmail) { & $gitCmd config user.email "pedro.soares@exemplo.com" }

# 3. Commits Logicos
Write-Host "`n[1/5] Commit de bugs criticos..." -ForegroundColor Yellow
& $gitCmd add styles/servicos.css styles/contato.css styles/sobre.css styles/home.css
& $gitCmd commit -m "fix: corrige erros criticos de sintaxe html e css que quebravam layout"

Write-Host "[2/5] Commit de Design System e navegacao..." -ForegroundColor Yellow
& $gitCmd add styles/global.css sobre.html case-de-sucesso.html styles/case-de-sucesso.css depoimentos.html styles/depoimentos.css
& $gitCmd commit -m "refactor: unifica navegacao, caminhos relativos e cria design system compartilhado"

Write-Host "[3/5] Commit de semantica e acessibilidade..." -ForegroundColor Yellow
& $gitCmd add habilidades.html styles/habilidades.css projetos.html styles/projetos.css servicos.html contato.html
& $gitCmd commit -m "refactor: aprimora semantica, acessibilidade e responsividade das telas"

Write-Host "[4/5] Commit de Backend e Google Gemini API..." -ForegroundColor Yellow
& $gitCmd add package.json .env.example .gitignore server.js metadata.json
& $gitCmd commit -m "feat: implementa servidor backend com endpoint integrado a api do google gemini"

Write-Host "[5/5] Commit de Interface de Chat com IA..." -ForegroundColor Yellow
& $gitCmd add chat.html styles/chat.css js/chat.js home.html
& $gitCmd commit -m "feat: adiciona interface interativa de chat com ia para o squad d"

& $gitCmd add .
& $gitCmd commit -m "chore: adiciona scripts de automacao e documentacao do projeto"

# 4. Remote Origin
Write-Host "`n[Info] Vinculando repositorio remoto..." -ForegroundColor Yellow
& $gitCmd remote remove origin 2>$null
& $gitCmd remote add origin https://github.com/Pedro-Soares09/refactoring-squadD.git

# 5. Push
Write-Host "`nEnviando para o GitHub (git push -u origin main)..." -ForegroundColor Cyan
& $gitCmd push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n====================================================" -ForegroundColor Green
    Write-Host "   SUCESSO! O projeto foi enviado para o GitHub!" -ForegroundColor Green
    Write-Host "   https://github.com/Pedro-Soares09/refactoring-squadD" -ForegroundColor Green
    Write-Host "====================================================" -ForegroundColor Green
} else {
    Write-Host "`n[Aviso] Se houver erro de autenticacao, faca o login na janela do navegador que o Git abrir." -ForegroundColor Yellow
}
