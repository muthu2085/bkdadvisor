@echo off
echo Copying assets to dist/assets...
xcopy "assets\*" "dist\assets\" /E /I /H /Y
echo Done!
pause
