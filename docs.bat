@echo off
call release.bat
echo Building documentation
set version=0.8
rd /S /Q ..\docs\%version%\extjs
rd /S /Q ..\docs\%version%\member-icons
rd /S /Q ..\docs\%version%\output
rd /S /Q ..\docs\%version%\resources
rd /S /Q ..\docs\%version%\source
del /Q ..\docs\%version%\*
md ..\docs-temp
jsduck-5.2.0 public/jw* --output ../docs-temp --external=C,K,P,T,TC,U,UC,V --title "jWidget %version% API documentation" --guides guides.json
xcopy /I /Y /E /Q ..\docs-temp\* ..\docs\%version%
rd /S /Q ..\docs-temp