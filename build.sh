# Build project
echo Building project
jwsdk release

# Copy distributive files into a temporary folder
mkdir jwidget-files
mkdir jwidget-files/plugins
cp jwsdk-config/temp/dist/jwlib.* jwidget-files
cp jwsdk-config/temp/dist/jwui.* jwidget-files
cp jwsdk-config/temp/dist/plugins/locale.* jwidget-files/plugins
cp jwsdk-config/temp/dist/plugins/router.* jwidget-files/plugins

# Compress an archive for downloading
rm guides/endownload/jwidget.zip
7za a guides/endownload/jwidget.zip jwidget-files

# Copy distributive files for absolute URL attachment
cp -r jwidget-files/* guides/endownload

# Copy distributive files into version folder
cp -r jwidget-files/* ../version

# Delete temporary folder
rm -r jwidget-files
