var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    minifycss = require('gulp-minify-css'),
    cssnano = require('gulp-cssnano'),
    cssimport = require('gulp-cssimport'),
    rename = require('gulp-rename');

gulp.task('sass', function () {
   return gulp.src('resource/sass/**/*.sass')
       .pipe(sass())
       .pipe(prefixer('last 2 versions'))
       .pipe(gulp.dest('public/css'))
       .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src([
        'resource/js/jquery-3.3.1.js',
        'resource/js/bootstrap.js',
        'resource/js/myApp.js',
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('css-libs', function () {
   return gulp.src('resource/css/*.css')
       .pipe(concat('libs.css'))
       .pipe(gulp.dest('public/css'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'public'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function () {
    gulp.watch('resource/sass/**/*.sass', ['sass']);
    gulp.watch('resource/js/myApp.js', ['scripts']);
    gulp.watch('public/*.html', browserSync.reload);
});

