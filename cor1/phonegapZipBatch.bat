ECHO OFF
REM Instructions to use the script
REM 1. Download 7zip
REM 2. After installing go to My Computer -> Properties -> Advanced System Settings -> Advanced -> Environment Variables -> System variables table
REM 3. Select 'path', add the directory of 7zip folder at the end of it, press ok.
REM 4. Run script

REM addendum: initial 2 codes came from the following website. explanation for their inclusion is given there https://superuser.com/questions/689333/how-to-add-installed-program-to-command-prompt-in-windows#689336

@setlocal enableextensions
@cd /d "%~dp0"
del archive.zip
7z a archive.zip www config.xml 
