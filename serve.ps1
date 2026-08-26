$root = $PSScriptRoot
if (-not $root) { $root = "C:\Users\krisz\OneDrive\Desktop\T2S" }
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port"

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.webp' = 'image/webp'
    '.svg'  = 'image/svg+xml'
    '.json' = 'application/json'
    '.txt'  = 'text/plain; charset=utf-8'
    '.ico'  = 'image/x-icon'
}

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.LocalPath
    if ($path -eq '/') { $path = '/START_GAME.html' }
    $filePath = Join-Path $root ($path -replace '/', '\')

    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mime = $mimeTypes[$ext]
        if (-not $mime) { $mime = 'application/octet-stream' }
        $ctx.Response.ContentType = $mime
        $ctx.Response.StatusCode = 200
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ctx.Response.ContentLength64 = $bytes.Length
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $ctx.Response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found: $path")
        $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.Close()
    Write-Host "$($ctx.Response.StatusCode) $path"
}
