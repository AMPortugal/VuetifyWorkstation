$includePaths = @(
    "src\assets",
    "src\backend",
    "src\components",
    "src\config",
    "src\layouts",
    "src\modules",
    "src\pages",
    "src\stores",
    "src\styles",
    "src\themes",
    "src\utils",
    "src\App.vue",
    "src\main.js",
    "backup\",
    "cypress\",
    ".browserslistrc",
    ".editorconfig",
    ".env",
    ".eslintrc.json",
    ".eslintrc-auto-import.json",
    ".gitignore",
    ".prettierrc",
    "babel.config.json",
    "cypress.config.mjs",
    "index.html",
    "jsconfig.json",
    "package.json",
    "package-lock.json",
    "postcss.config.cjs",
    "tailwind.config.cjs",
    "vite.config.mjs"
)

function Get-Tree
{
    param (
        [string]$Path = (Get-Location),
        [string[]]$IncludePaths
    )

    function Write-Tree
    {
        param (
            [string]$CurrentPath,
            [int]$IndentLevel
        )

        Get-ChildItem -Path $CurrentPath | ForEach-Object {
            $indent = "  " * $IndentLevel
            Write-Output "$indent$( $_.Name )"

            if ($_.PSIsContainer)
            {
                Write-Tree -CurrentPath $_.FullName -IndentLevel ($IndentLevel + 1)
            }
        }
    }

    $IncludePaths | ForEach-Object {
        $fullPath = Join-Path -Path $Path -ChildPath $_
        if (Test-Path $fullPath)
        {
            Write-Output $_
            if ((Get-Item $fullPath).PSIsContainer)
            {
                Write-Tree -CurrentPath $fullPath -IndentLevel 1
            }
        }
    }
}

Get-Tree -IncludePaths $includePaths
