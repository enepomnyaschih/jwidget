VERSION=2.0

echo Building guides
jsduck-5.2.0 --output ../docs/$VERSION --title "jWidget $VERSION API documentation" --guides guides.json
