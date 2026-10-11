# 测试闯关 - 一键启动脚本（PowerShell 版，中文无乱码）
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  测试闯关 - 一键启动" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 Node.js
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Host "[错误] 未检测到 Node.js！" -ForegroundColor Red
  Write-Host "请先安装 Node.js LTS 版：https://nodejs.org/" -ForegroundColor Yellow
  Write-Host "安装一路点下一步，装完重新双击 start.bat"
  Read-Host "按回车键退出"
  exit 1
}
$ver = (node -v)
Write-Host "[OK] Node.js 版本 $ver" -ForegroundColor Green
Write-Host ""

# 2. 释放 3000 端口（防止上次没关干净）
Write-Host "[0/4] 检查端口 3000..." -ForegroundColor Cyan
$conns = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
foreach ($c in $conns) {
  Write-Host "  端口 3000 被进程 $($c.OwningProcess) 占用，尝试关闭..." -ForegroundColor Yellow
  Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
  Start-Sleep -Milliseconds 800
}
Write-Host ""

# 3. 后端依赖
Write-Host "[1/4] 检查后端依赖..." -ForegroundColor Cyan
Push-Location "$root\backend"
if (-not (Test-Path "node_modules")) {
  Write-Host "  安装中，请稍候..."
  npm install --registry=https://registry.npmmirror.com
  if ($LASTEXITCODE -ne 0) { Write-Host "[错误] 后端依赖安装失败" -ForegroundColor Red; Read-Host "回车退出"; exit 1 }
} else {
  Write-Host "  已安装，跳过"
}
Pop-Location
Write-Host ""

# 4. 前端依赖
Write-Host "[2/4] 检查前端依赖..." -ForegroundColor Cyan
Push-Location "$root\frontend"
if (-not (Test-Path "node_modules")) {
  Write-Host "  安装中，请稍候..."
  npm install --registry=https://registry.npmmirror.com
  if ($LASTEXITCODE -ne 0) { Write-Host "[错误] 前端依赖安装失败" -ForegroundColor Red; Read-Host "回车退出"; exit 1 }
} else {
  Write-Host "  已安装，跳过"
}
Pop-Location
Write-Host ""

# 5. 构建前端
Write-Host "[3/4] 构建前端页面..." -ForegroundColor Cyan
Push-Location "$root\frontend"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "[错误] 前端构建失败" -ForegroundColor Red; Read-Host "回车退出"; exit 1 }
Pop-Location
Write-Host ""

# 6. 启动服务
Write-Host "[4/4] 启动服务..." -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  启动成功！请用浏览器打开：" -ForegroundColor Green
Write-Host "  http://localhost:3000" -ForegroundColor Green
Write-Host "  （停止服务：在本窗口按 Ctrl+C）" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Push-Location "$root\backend"
npm start
Pop-Location
Write-Host ""
Write-Host "服务已停止。"
Read-Host "按回车键关闭窗口"
