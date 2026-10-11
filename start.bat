@echo off
REM Test Quest launcher - calls PowerShell script (avoids Chinese encoding issues in cmd)
title Test Quest Launcher
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start.ps1"
