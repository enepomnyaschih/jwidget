find dist -mindepth 1 -maxdepth 1 -type d -print0 | xargs -0 rm -r --
rm dist/*.js
rm dist/*.d.ts
rm -r dist-tsc
