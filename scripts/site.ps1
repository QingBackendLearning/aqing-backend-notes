[CmdletBinding()]
param([ValidateSet('check', 'build', 'preview')][string]$Command = 'build')

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$nodeExecutable = $null
$systemNode = Get-Command node -ErrorAction SilentlyContinue
if ($systemNode) {
    $nodeVersion = (& $systemNode.Source --version).Trim().TrimStart('v')
    if ($LASTEXITCODE -eq 0 -and [version]$nodeVersion -ge [version]'20.0.0') {
        $nodeExecutable = $systemNode.Source
    }
}
if (-not $nodeExecutable) {
    $bundledNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
    if (Test-Path -LiteralPath $bundledNode) { $nodeExecutable = $bundledNode }
}
if (-not $nodeExecutable) { throw 'Node.js 20+ is required. Install a current LTS version, then retry.' }

Push-Location $siteRoot
try {
    & $nodeExecutable 'scripts/check.mjs'
    if ($LASTEXITCODE -ne 0) { throw 'Content check failed.' }
    if ($Command -eq 'build') {
        & $nodeExecutable 'scripts/build.mjs'
        if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
    } elseif ($Command -eq 'preview') {
        & $nodeExecutable 'scripts/serve.mjs'
        if ($LASTEXITCODE -ne 0) { throw 'Preview server failed.' }
    }
} finally {
    Pop-Location
}
