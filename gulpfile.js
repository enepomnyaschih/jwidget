var tsproject = require('tsproject');
var gulp = require('gulp');

gulp.task('build', function() {
	// path to directory of tsconfig.json provided
	tsproject.src('.')
		.pipe(gulp.dest('./dist'));

	// path to named configuration file provided and optional settings specified 
	/*return tsproject.src( './src/project_a/myconfig.json',
		{ 
			logLevel: 1,
			compilerOptions: {
				listFiles: true
			} 
		})
		.pipe( gulp.dest( './mybuild' ) );*/
});
