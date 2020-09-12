//该js要在根目录下创建

//导入模块
let gulp = require('gulp');
let concat = require('gulp-concat');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let cssnano = require('gulp-cssnano');
let babel = require('gulp-babel');
let sass = require('gulp-sass');


//发布任务
//优化js任务
function fnJS() {
    return gulp.src('../mall/src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('../mall/dist/js'));
}



//优化css
function fnSass() {
    return gulp.src('../mall/src/sass/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('../mall/dist/css'));
}

//优化image
function fnImg() {
    return gulp.src('../mall/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../mall/dist/img'));
}

//复制index.html
function fnCopyIndex() {
    return gulp.src('../mall/src/index.html')
        .pipe(gulp.dest('../mall/dist'));
}

//监听任务
function fnWatch() {
    gulp.watch('../mall/src/sass/*.scss', fnSass);
    gulp.watch('../mall/src/js/*.js', fnJS);
    gulp.watch('../mall/src/index.html', fnCopyIndex);
}


//导出任务
exports.js = fnJS;
exports.sass = fnSass;
exports.img = fnImg;
exports.copyIndex = fnCopyIndex;
exports.default = fnWatch;
