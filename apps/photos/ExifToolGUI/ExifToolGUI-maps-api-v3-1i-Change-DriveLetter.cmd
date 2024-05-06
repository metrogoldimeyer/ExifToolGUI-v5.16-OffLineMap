@echo off & setlocal & color 1F
::
:: File: ExifToolGUI-Change-DriveLetter.cmd
::
set _FilePath=%~f0
echo _FilePath: %_FilePath%
set program=%~n0
title %program% - 20430118 (c) mgm
::------------------------------------------------------------------------------

::--- constants, global vars ---------------------------------------------------
::
goto :init
if "%~1"=="" (
   color 1B& echo %program% 2043 ^(c^) mgm.
   echo.& echo Arrastrar ExifToolGUI-any-chars.exe o ExifToolGUI-any-chars.html sobre este fichero.& echo.
   ping 127.0.0.1 > NUL 2>&1
   exit /B 1
)

rem set /a "_Debug=1"
set "_in=%~1"

if exist "%~1\" (echo Dir_in: pushd %~1 & pushd %~1 & set "_CurrentDir=%~1") else (echo File_in: pushd %~dp1 & pushd %~dp1 & set "_CurrentDir=%~dp1")
if "%_CurrentDir:~-1%"=="\" set "_CurrentDir=%_CurrentDir:~0,-1%"
echo.

:init
echo ****************************************************************************************
set separador=^========================================================================================
echo.

set /a "_Debug=1"

set _CurrentDirCmd=%~dp0
if "%_CurrentDirCmd:~-1%"=="\" set "_CurrentDirCmd=%_CurrentDirCmd:~0,-1%"
rem pushd %~dp0

if %_Debug%==1 (
   echo      _FilePath: %_FilePath%
   echo.
   echo _CurrentDirCmd: %_CurrentDirCmd%
   rem echo    _CurrentDir: %_CurrentDir%
   echo             CD: %CD%
   echo            dp0: %~dp0
   rem echo            _in: %_in%
   echo.
)

::--- includes -----------------------------------------------------------------
::

rem call :getDriveLetter ":\apps\unix\msys64\usr\bin\hexdump.exe" hexdump
rem call :getDriveLetter ":\apps\unix\msys64\usr\bin\dd.exe" dd

call :getDriveLetter ":\apps\unix\bin\xxd.exe" xxd
call :getDriveLetter ":\apps\unix\bin\dd.exe" dd

echo ****************************************************************************************

::--- main ---------------------------------------------------------------------
::

set /a "needChange=0" & rem NO necesita cambiar html NI 2º DriveLetter exe

rem remove : of (D:)
rem set _DRV=%~d1
set _DRV=%~d0
set _DRV=%_DRV::=%

set _file_in=%~n0
set _file_in=%_file_in:-Change-DriveLetter=%

set _file_exe=%_file_in%.exe
set _file_html=%_file_in%.html
echo   _file_exe: %_file_exe%

if not exist "%_file_exe%" ( echo.&echo ERROR: File: %_file_exe% not found.&echo.& goto :quit )
if not exist "%_file_html%" ( echo.&echo ERROR: File: %_file_html% not found.&echo.& goto :quit )

if %_Debug%==1 (
   echo Install DRV: %_DRV%
   echo    _file_in: %_file_in%
   echo   _file_exe: %_file_exe%
   rem echo  _file_html: %_file_html%
   echo.
)

call :ExifToolGUIChangeDriveLetterInhtml %_file_html% %_DRV%

call :ExifToolGUIChangeDriveLetterInExe %_file_exe% %_DRV%

echo.
echo Complete!
:quit
echo Press any key to exit...
pause >nul
exit

::--- info ---------------------------------------------------------------------
::
#!/bin/bash

# param 1: file
# param 2: offset
# param 3: value
function replaceByte() {
    printf "$(printf '\\x%02X' $3)" | dd of="$1" bs=1 seek=$2 count=1 conv=notrunc &> /dev/null
}

# Usage:
# replaceByte 'thefile' $offset 95
::

::--- subrutinas basicas -------------------------------------------------------
::

::--- ExifToolGUI.html Change DriveLetter --------------------------------------
::
:: ExifToolGUI-maps-api-v3-1b-OK.html
::
::    file:///D: 1er DriveLetter offset: 0x9A = 154 - file:///D:/apps/photos/ExifToolGUI/
::    file:///D: 2º  DriveLetter offset: 0xCC = 204 - file:///D:/apps/photos/ExifToolGUI/maps-api-v3/js.js
::
:: dd skip|seek offset
::
:ExifToolGUIChangeDriveLetterInhtml <file_html_in> <DRV_out>
echo %separador%&echo --- %~0 -------------------&echo.
set file_html_in=%~1
set DRV_out=%~2

if %_Debug%==1 (
   echo file_html_in: %file_html_in%
   echo  Install DRV: %DRV_out%
   echo.
)

:: %hexdump% -n 1 -C -s 0x9A %file_html_in%
:: 00252d6c  44                                                |D|


:: 1er DriveLetter offset: 0x9A = 154 - file:///D:/apps/photos/ExifToolGUI/
::
rem for /f "tokens=3" %%a in ('"%hexdump% -n 1 -C -s 0x9A %file_html_in%"') do ( set "DriveLetter_file_in=%%a" )
for /f "tokens=3" %%a in ('"%xxd% -g 1 -a -c 16 -l 1 -seek 0x9A %file_html_in%"') do ( set "DriveLetter_file_in=%%a" )
rem set DriveLetter_file_in=%DriveLetter_file_in:~1,1%
echo File: %file_html_in% con 1er DriveLetter: %DriveLetter_file_in%
call :isDriveLetter %DriveLetter_file_in% "1er DriveLetter"
if "%DRV_out%"=="%DriveLetter_file_in%" (
	echo file: %file_html_in% ya esta cambiado 1er DriveLetter: %DriveLetter_file_in% & echo.
)

if %needChange%==1 (
	:: 2º DriveLetter offset: 0xCC = 204 - file:///D:/apps/photos/ExifToolGUI/maps-api-v3/js.js
	::
	rem for /f "tokens=3" %%a in ('"%hexdump% -n 1 -C -s 0xCC %file_html_in%"') do ( set "DriveLetter_file_in=%%a" )
	for /f "tokens=3" %%a in ('"%xxd% -g 1 -a -c 16 -l 1 -seek 0xCC %file_html_in%"') do ( set "DriveLetter_file_in=%%a" )
	rem set DriveLetter_file_in=%DriveLetter_file_in:~1,1%
	echo File: %file_html_in% con 2o  DriveLetter: %DriveLetter_file_in%
	call :isDriveLetter %DriveLetter_file_in% "2o DriveLetter"
	if "%DRV_out%"=="%DriveLetter_file_in%" (
		echo file: %file_html_in% ya esta cambiado 2o DriveLetter: %DriveLetter_file_in% & echo.
	)
)

if not "%DRV_out%"=="%DriveLetter_file_in%" (
	if %_Debug%==1 (
	   echo.
	   echo --- Change-DriveLetter in: %file_html_in%
	   echo.
	)

	echo copy %file_html_in% %file_html_in%.bak
	copy %file_html_in% %file_html_in%.bak 1> NUL
	echo.

	echo --- 1er DriveLetter offset: 0x9A = 154 - file:///%DriveLetter_file_in%:/apps/photos/ExifToolGUI/ & echo.
	::
	rem %hexdump% -n 27 -C -s 0x9A %file_html_in%
	%xxd% -l 27 -a -seek 0x9A %file_html_in%
	echo.
	rem dd [bs=SIZE] [count=BLOCKS] [if=FILE] [of=FILE] [seek=BLOCKS] [skip=BLOCKS] [--size] [--list] [--progress]
	rem echo %DRV_out%| %dd% of="%file_html_in%" bs=1 seek=154 count=1 conv=notrunc
	echo %DRV_out%| %dd% of="%file_html_in%" bs=1 seek=154 count=1 2> NUL
	echo.
	rem %hexdump% -n 27 -C -s 0x9A %file_html_in%
	%xxd% -l 27 -a -seek 0x9A %file_html_in%
	echo.&echo.

	if %needChange%==1 (
		echo --- 2o  DriveLetter offset: 0xCC = 204 - file:///%DriveLetter_file_in%:/apps/photos/ExifToolGUI/maps-api-v3/js.js & echo.
		::
		rem %hexdump% -n 44 -C -s 0xCC %file_html_in%
		%xxd% -l 44 -a -s 0xCC %file_html_in%
		echo.
		rem echo %DRV_out%| %dd% of="%file_html_in%" bs=1 seek=204 count=1 conv=notrunc
		echo %DRV_out%| %dd% of="%file_html_in%" bs=1 seek=204 count=1 2> NUL
		echo.
		rem %hexdump% -n 44 -C -s 0xCC %file_html_in%
		%xxd% -l 44 -a -s 0xCC %file_html_in%
	)

)
rem else ( echo file: %file_html_in% ya esta cambiado 1er DriveLetter: %DriveLetter_file_in% & echo. )

exit /b

::--- ExifToolGUI.exe Change DriveLetter ---------------------------------------
::
:: ExifToolGUI-maps-api-v3-1b-OK.exe
::
::    file:///D: 1er DriveLetter offset: 0x252D24 = 2436388 - file:///D:/apps/photos/ExifToolGUI/
::    file:///D: 2º  DriveLetter offset: 0x252D56 = 2436438 - file:///D:/apps/photos/ExifToolGUI/maps-api-v3/js.js
::
:: dd skip|seek offset
::
:ExifToolGUIChangeDriveLetterInExe <file_exe_in> <DRV_out>
echo %separador%&echo --- %~0 -------------------&echo.
set file_exe_in=%~1
set DRV_out=%~2

if %_Debug%==1 (
   echo file_exe_in: %file_exe_in%
   echo Install DRV: %DRV_out%
   echo.
)

:: %hexdump% -n 1 -C -s 0x252D24 %file_exe_in%
:: 00252d6c  44                                                |D|

:: 1er DriveLetter  offset: 0x252D24 = 2436388 - file:///D:/apps/photos/ExifToolGUI/
::
rem for /f "tokens=3" %%a in ('"%hexdump% -n 1 -C -s 0x252D24 %file_exe_in%"') do ( set "DriveLetter_file_in=%%a" )
rem %xxd% -g 1 -a -c 16 -l 28 -seek 0x252D24 %file_exe_in%
for /f "tokens=3" %%a in ('"%xxd% -g 1 -a -c 16 -l 1 -seek 0x252D24 %file_exe_in%"') do ( set "DriveLetter_file_in=%%a" )
rem set DriveLetter_file_in=%DriveLetter_file_in:~1,1%
echo File: %file_exe_in% con 1er DriveLetter: %DriveLetter_file_in%
call :isDriveLetter %DriveLetter_file_in% "1er DriveLetter"
if "%DRV_out%"=="%DriveLetter_file_in%" (
	echo file: %file_exe_in% ya esta cambiado 1er DriveLetter: %DriveLetter_file_in% & echo.
)

if %needChange%==1 (
	:: 2º  DriveLetter offset: 0x252D56 = 2436438 - file:///D:/apps/photos/ExifToolGUI/maps-api-v3/js.js
	::
	rem for /f "tokens=3" %%a in ('"%hexdump% -n 1 -C -s 0x252D56 %file_exe_in%"') do ( set "DriveLetter_file_in=%%a" )
	for /f "tokens=3" %%a in ('"%xxd% -g 1 -a -c 16 -l 1 -s 0x252D56 %file_exe_in%"') do ( set "DriveLetter_file_in=%%a" )
	rem set DriveLetter_file_in=%DriveLetter_file_in:~1,1%
	echo File: %file_exe_in% con 2o  DriveLetter: %DriveLetter_file_in%
	call :isDriveLetter %DriveLetter_file_in% "2o DriveLetter"
	if "%DRV_out%"=="%DriveLetter_file_in%" (
		echo file: %file_exe_in% ya esta cambiado 2o DriveLetter: %DriveLetter_file_in% & echo.
	)
)

if not "%DRV_out%"=="%DriveLetter_file_in%" (
	if %_Debug%==1 (
	   echo.
	   echo --- Change-DriveLetter in: %file_exe_in%
	   echo.
	)

	echo copy %file_exe_in% %file_exe_in%.bak
	copy %file_exe_in% %file_exe_in%.bak

	echo --- 1er DriveLetter  offset: 0x252D24 = 2436388 - file:///%DriveLetter_file_in%:/apps/photos/ExifToolGUI/ & echo.
	::
	rem %hexdump% -n 27 -C -s 0x252D24 %file_exe_in%
	%xxd% -l 27 -a -s 0x252D24 %file_exe_in%
	echo.
	rem echo %DRV_out%| %dd% of="%file_exe_in%" bs=1 seek=2436388 count=1 conv=notrunc
	rem echo %DRV_out%| %dd% of="%file_exe_in%" bs=1 seek=2436388 count=1 2> NUL
	echo %DRV_out%| %dd% of="%file_exe_in%" bs=1 seek=0x252D24 count=1 2> NUL
	echo.
	rem %hexdump% -n 27 -C -s 0x252D24 %file_exe_in%
	%xxd% -l 27 -a -s 0x252D24 %file_exe_in%

	echo.&echo.

	if %needChange%==1 (
		echo --- 2o  DriveLetter offset: 0x252D56 = 2436438 - file:///%DriveLetter_file_in%:/apps/photos/ExifToolGUI/maps-api-v3/js.js & echo.
		::
		rem %hexdump% -n 44 -C -s 0x252D56 %file_exe_in%
		%xxd% -l 44 -a -s 0x252D56 %file_exe_in%
		echo.
		rem echo %DRV_out%| %dd% of="%file_exe_in%" bs=1 seek=2436438 count=1 conv=notrunc
		echo %DRV_out%| %dd% of="%file_exe_in%" bs=1 seek=0x252D56 count=1  2> NUL
		echo.
		rem %hexdump% -n 44 -C -s 0x252D56 %file_exe_in%
		%xxd% -l 44 -a -s 0x252D56 %file_exe_in%
	)
)
rem else ( echo file: %file_exe_in% ya esta cambiado 1er DriveLetter: %DriveLetter_file_in% & echo. )

exit /b

::--- Is Drive Letter ----------------------------------------------------------
::
:isDriveLetter <drv> <str> [var_drv]
set DRV=%~1
set str=%~2
for %%i in (C D E F G H I J K L N M O P Q R S T U V W X Y Z) do (
   rem echo It EXISTS vol: %%i - %DRV%
	if "%%i"=="%DRV%" (
        if not "%~3"=="" (set "%~3=%%i" & echo %~3: %%i)
        exit /b
	)
)
color 3F & echo ERROR: offset %str% = %DRV% detected incorrectly. & pause & exit

::--- Get Drive Letter ---------------------------------------------------------
::
:getDriveLetter <dir_exe> [var_drv]
set PGM=%~1
for %%i in (C D E F G H I J K L N M O P Q R S T U V W X Y Z) do (
   vol %%i: >nul 2>nul
   if errorlevel 1 (
      rem echo It does NOT EXIST vol: %%i
   ) else (
     rem echo It EXISTS vol: %%i
     if exist "%%i%PGM%" (
        set "%~2=%%i%PGM%" & echo %~2: %%i%PGM%
        if not "%~3"=="" (set "%~3=%%i" & echo %~3: %%i)
        exit /b
     )
   )
)
color 3F & echo ERROR PGM: %PGM% no found. & pause & exit