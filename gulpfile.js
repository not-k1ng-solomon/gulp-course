const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');

const browserSync = require('browser-sync');

const isDevelopment = true;
const debugInfo = false;

gulp.task('less',()=>{
    return gulp.src('src/less/**/*.less')
        .pipe(gulpIf(debugInfo,debug({title:'src'})))
        .pipe(gulpIf(isDevelopment,sourcemaps.init()))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 16 versions'],
            cascade: false
        }))
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulpIf(isDevelopment,sourcemaps.write()))
        .pipe(gulp.dest('tmp'))
        .pipe(browserSync.stream());
});

gulp.task('html-main',()=>{
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('tmp'));
});

gulp.task('serve',()=>{
    browserSync.init({
        server:{
            baseDir:'./tmp'
        }
    });
    gulp.watch('src/less/**/*.less',gulp.series('less'));
    gulp.watch('src/*.html').on('change',browserSync.reload);

});

gulp.task('default',gulp.series('less','html-main','serve'));

//Урок 1
/*
gulp.task('css', () => {
    return gulp.src('src/!**!/!*')
        .pipe(gulp.dest('tmp'));
});
gulp.task('hello2', () => {
    console.log('hello world2');
});

gulp.task('default',gulp.parallel('css'));
*/
