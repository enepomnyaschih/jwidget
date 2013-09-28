php %JWSDK_HOME%\build.php release jwsdk-config
del /Q guides\download\jwidget.zip
md jwidget-files
xcopy /I /Y /E /Q jwsdk-config\temp\merge\jwlib.js jwidget-files
xcopy /I /Y /E /Q jwsdk-config\temp\merge\jwui.js jwidget-files
xcopy /I /Y /E /Q public\build\packages\jwlib.min.js jwidget-files
xcopy /I /Y /E /Q public\build\packages\jwui.min.js jwidget-files
7za a guides\download\jwidget.zip jwidget-files
rd /S /Q jwidget-files
