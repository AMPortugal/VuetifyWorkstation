# Define the script parameters
param (
    [string]$Action = "latest",
    [string]$Timestamp = ""
)

# Set the execution policy to RemoteSigned for this session
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned -Force

# Define the paths
$nodePath = "C:\Program Files\nodejs\node.exe"
$scriptPath = "C:\xampp\htdocs\vuetify3\scripts\migrations"

# Switch statement to handle different actions
switch ($Action) {
    "all" {
        & $nodePath "$scriptPath\runAllMigrations.mjs"
    }
    "latest" {
        & $nodePath "$scriptPath\runLatestMigration.mjs"
    }
    "clear" {
        & $nodePath "$scriptPath\migrateClear.mjs"
    }
    "drop" {
        & $nodePath "$scriptPath\migrateDrop.mjs"
    }
    "timestamp" {
        if ($Timestamp -ne "") {
            & $nodePath "$scriptPath\runSpecificMigration.mjs" -Timestamp $Timestamp
        } else {
            Write-Host "Timestamp is required for the 'timestamp' action."
        }
    }
    default {
        Write-Host "Invalid action specified. Use 'all', 'latest', 'clear', 'drop', or 'timestamp'."
    }
}
