# 测试闯关 - 一键停止脚本
$ErrorActionPreference = "SilentlyContinue"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  测试闯关 - 停止服务" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$killed = @()

# 1. 结束占用 3000 端口的进程
$conns = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
foreach ($c in $conns) {
  $proc = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
  Write-Host "  结束占用 3000 端口的进程: PID $($c.OwningProcess) $($proc.ProcessName)" -ForegroundColor Yellow
  Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
  $killed += $c.OwningProcess
}

# 2. 兜底：结束路径在本项目下的 node 进程（避免残留）
$procs = Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue
foreach ($p in $procs) {
  if ($p.CommandLine -like "*test-quest*" -and $killed -notcontains $p.ProcessId) {
    Write-Host "  结束残留 node 进程: PID $($p.ProcessId)" -ForegroundColor Yellow
    Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
    $killed += $p.ProcessId
  }
}

Start-Sleep -Milliseconds 500
Write-Host ""

# 3. 验证端口已释放
$still = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($still) {
  Write-Host "[警告] 端口 3000 仍被占用，可能需要重启电脑。" -ForegroundColor Red
} else {
  Write-Host "[完成] 端口 3000 已释放，服务已停止。" -ForegroundColor Green
}
Write-Host ""
Read-Host "按回车键关闭窗口"
