@echo off

:Build project
call jwsdk release jwsdk-config

:Copy distributive files into a temporary folder
md jwidget-files
md jwidget-files\plugins
xcopy /I /Y /Q jwsdk-config\temp\merge\jwlib.js jwidget-files
xcopy /I /Y /Q jwsdk-config\temp\merge\jwui.js jwidget-files
xcopy /I /Y /Q jwsdk-config\temp\merge\plugins\* jwidget-files\plugins
xcopy /I /Y /Q public\build\packages\jwlib.min.js jwidget-files
xcopy /I /Y /Q public\build\packages\jwui.min.js jwidget-files
xcopy /I /Y /Q public\build\packages\plugins\* jwidget-files\plugins
del /Q jwidget-files\plugins\*-tests.*

:Compress an archive for downloading
del /Q guides\endownload\jwidget.zip
7za a guides\endownload\jwidget.zip jwidget-files

:Copy distributive files for absolute URL attachment
xcopy /I /Y /E /Q jwidget-files\* guides\endownload

:Copy distributive files into version folder
xcopy /I /Y /E /Q jwidget-files\* ..\version

:Delete temporary folder
rd /S /Q jwidget-files

:Build documentation
echo Building documentation
set version=1.4.2
rd /S /Q ..\docs\%version%\extjs
rd /S /Q ..\docs\%version%\member-icons
rd /S /Q ..\docs\%version%\output
rd /S /Q ..\docs\%version%\resources
rd /S /Q ..\docs\%version%\source
del /Q ..\docs\%version%\*
md ..\docs-temp
jsduck-5.2.0 public/jw* public/plugins --output ../docs-temp --external=C,K,P,T,TC,U,UC,V,DOMElement --title "jWidget %version% API documentation" --guides guides.json
xcopy /I /Y /E /Q ..\docs-temp\* ..\docs\%version%
rd /S /Q ..\docs-temp