// Require gulp
var gulp = require('gulp');

// Require all plugins
var sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	prefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');




// Config

var config = {
	bowerDir: 'bower_components/'
};



// ALL Javascripts

var allScripts = [

	// Vendor Plugins
	config.bowerDir + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',	

	// Custom Script
	'src/javascripts/custom-script.js'
];



// Using gulp-sass
gulp.task('sass', function(){
  	return gulp.src('src/sass/**/*.scss')
  		.pipe(sourcemaps.init())
    	.pipe(sass({outputStyle: 'compressed'})) 
    	.pipe(prefix({
    		browsers: ['last 2 versions', 'ie >= 9']
    	}))
    	.pipe(sourcemaps.write('/../maps'))
    	.pipe(gulp.dest('src/build/css'))
    	.pipe(browserSync.stream());
});


// Watch Task
gulp.task('watch', ['sass'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/javascripts/**/*.js', ['scripts']); 
});


// Uglify Task
gulp.task('scripts', function() {
	return gulp.src(allScripts)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('src/build/javascripts/'));
});




// Browser-sync 
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		}
	});
});



// Default Task
gulp.task('default', ['watch', 'sass', 'scripts']);