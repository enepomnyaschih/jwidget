@echo off
rd /S /Q ..\docs\extjs
rd /S /Q ..\docs\member-icons
rd /S /Q ..\docs\output
rd /S /Q ..\docs\resources
rd /S /Q ..\docs\source
del /Q ..\docs\*
md ..\docs-temp
jsduck-5.2.0 public/jw* --output ../docs-temp
xcopy /I /Y /E /Q ..\docs-temp\* ..\docs
rd /S /Q ..\docs-temp