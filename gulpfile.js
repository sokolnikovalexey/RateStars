var gulp = require('gulp'),
    closureCompiler = require('gulp-closure-compiler'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

gulp.task('scripts', function () {
    return gulp.src(['js/**.js'])
        .pipe(closureCompiler({
            compilerPath: 'lib/compiler.jar',
            fileName: 'CompiledRateFormPage.js',
            compilerFlags: {
                compilation_level: 'ADVANCED_OPTIMIZATIONS'
            }
        }))
        .pipe(gulp.dest('bin/js'));
});


gulp.task('styles', function() {
    return gulp.src(['style/**.scss'])
        .pipe(compass({
            sass: 'style',
            image: 'img',
            css: 'bin/css',
            generated_images_dir: 'bin/img'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('bin/css'));
});

gulp.task('default', ['scripts', 'styles']);