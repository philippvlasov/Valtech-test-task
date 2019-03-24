let gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    // uglifyjs = require('gulp-uglifyjs'),
    uglifyjs = require('gulp-uglify-es').default;
    cleanCSS = require('gulp-clean-css'),
    cssnano = require('gulp-cssnano'),
    cssimport = require('gulp-cssimport'),
    rename = require('gulp-rename');

gulp.task('sass', function () {
   return gulp.src('resource/sass/**/*.sass')
       .pipe(sass())
       .pipe(prefixer('last 2 versions'))
       .pipe(gulp.dest('resource/css'))
       // .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src([
        'resource/js/jquery-3.3.1.js',
        'resource/js/bootstrap.js',
        'resource/js/myApp.js',
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('resource/js'))
        .pipe(uglifyjs())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('css', ['sass'], function () {
   return gulp.src([
       'resource/css/bootstrap.css',
       'resource/css/main.css'
   ])
       .pipe(concat('styles.css'))
       .pipe(gulp.dest('resource/css'))
       .pipe(cssnano())
       .pipe(rename('styles.min.css'))
       .pipe(cleanCSS({compatibility: 'ie8'}))
       .pipe(gulp.dest('public/css'))
       .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'public'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'css', 'scripts'], function () {
    gulp.watch('resource/sass/**/*.sass', ['css']);
    gulp.watch('resource/js/myApp.js', ['scripts']);
    gulp.watch('public/*.html', browserSync.reload);
});

