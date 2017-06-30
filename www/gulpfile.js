var gulp = require('gulp');
var sugarss = require('sugarss');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

gulp.task('styles', function() {
    return gulp.src('src/css/styles.css')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(postcss([
            require('postcss-simple-vars'),
            require('autoprefixer'),
            require('precss'),
            require('postcss-partial-import'),
            require('postcss-extend'),
            require('postcss-nested'),
            require('cssnano')
        ]))
        .pipe(rename({ extname: '.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        open: false,
        server: {
            baseDir: "./",
        }
    });
});

/* optimize images */
gulp.task('images', function() {
    gulp.src('src/media/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/media'))
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/**/*.css', ['styles', browserSync.reload]);

    // Watch any files in root html, reload on change
    gulp.watch("*.html", browserSync.reload);

});

gulp.task('default', ['styles', 'browser-sync', 'watch']);