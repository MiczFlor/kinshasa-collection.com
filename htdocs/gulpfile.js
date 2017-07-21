const gulp = require('gulp');
const sugarss = require('sugarss');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const autoprefixer = require('autoprefixer');
const cssnext = require('cssnext');
const precss = require('precss');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const pump = require('pump');
const inlinesource = require('gulp-inline-source');
const webp = require('gulp-webp');

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
        .pipe(gulp.dest('vendor/kingcollection/css'));
});

gulp.task('compress', function(cb) {
    pump([
            gulp.src('src/js/*.js'),
            uglify(),
            gulp.dest('vendor/kingcollection/js')
        ],
        cb
    );
});

gulp.task('inlinesource', ['styles'], function() {
    return gulp.src('src/**/*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest(''));
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
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 10 })
        ], {
            verbose: true
        }))
        .pipe(gulp.dest('static'))
});

/* generate webp images */
gulp.task('webp', () =>
    gulp.src('src/media/*')
    .pipe(webp())
    .pipe(gulp.dest('static'))
);


// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/**/*.css', ['styles', 'inlinesource', browserSync.reload]);

    // Watch .js files
    gulp.watch('src/**/*.js', ['compress', browserSync.reload]);

    // Watch any files in root html, reload on change
    gulp.watch("src/**/*.html", ['inlinesource', browserSync.reload]);

});

gulp.task('default', ['styles', 'inlinesource', 'compress', 'browser-sync', 'watch']);