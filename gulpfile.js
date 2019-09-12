const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');


async function clean() {
    return del.sync('dist');
}

async function html() {
    return gulp
        .src('./app/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}

async function css() {
    return gulp
        .src('app/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
}

async function start() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        startPath: '?fcc-test=true'
    });

    gulp.watch('./app/**/*.+(html|css)').on("change", browserSync.reload);
}

const build = gulp.series(clean, gulp.parallel(html, css));

exports.clean = clean;
exports.html = html;
exports.css = css;
exports.build = build;

exports.start = start;
exports.default = start;