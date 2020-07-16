const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');

const isDevelopment = true;

gulp.task('less',()=>{
    return gulp.src('src/less/**/*.less')
        // .pipe(debug({title:'src'}))
        .pipe(gulpIf(isDevelopment,sourcemaps.init()))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 16 versions'],
            cascade: false
        }))
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulpIf(isDevelopment,sourcemaps.write()))
        .pipe(gulp.dest('tmp'));
});

gulp.task('html-main',()=>{
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('tmp'));
});

gulp.task('watch:less',()=>{
    gulp.watch('src/less/**/*.less',gulp.series('less'));
});
gulp.task('default',gulp.parallel('less','html-main','watch:less'));

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
