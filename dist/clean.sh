find . -mindepth 1 -maxdepth 1 -type d -not -name 'src' -print0 | xargs -0 rm -r --
find . -mindepth 1 -maxdepth 1 -type f -name '*.js' -not -name 'karma.conf.js' -not -name 'webpack.config.js' -print0 | xargs -0 rm --
rm *.d.ts
rm *.js.map
