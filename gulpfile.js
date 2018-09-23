"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const postcss = require("gulp-postcss");
const pug = require("gulp-pug");
const autoprefixer = require("autoprefixer");
const livereload = require('gulp-livereload');
const vueify = require('gulp-vueify');
const rename = require('gulp-rename');

const path = {
  dev: "./src",
  prod: "./public"
};

livereload({ start: true });

gulp.task("pug", () => {
  return gulp.src(path.dev + "/templates/index.pug")
    .pipe(pug())
    .pipe(gulp.dest(path.prod))
    .pipe(livereload());
});

gulp.task("scss", () => {
  let plugins = [autoprefixer({ browsers: ["last 2 versions"] })];

  return gulp.src(path.dev + "/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest(path.prod + "/dist/css/"))
    .pipe(livereload());
});

gulp.task("js", () => {
  return gulp
    .src([path.dev + "/js/*.js"])
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest(path.prod + "/dist/js/"))
    .pipe(livereload());
});

gulp.task("vue", () => {
  return gulp.src(path.dev + '/js/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest(path.prod + '/dist/vue'))
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(path.dev + '/**/**.pug', ['pug']);
  gulp.watch(path.dev + '/**/**.js', ['js']);
  gulp.watch(path.dev + '/**/**.scss', ['scss']);
  gulp.watch(path.dev + '/**/**.vue', ['vue']);
});

gulp.task("default", ["watch"], () => {
  gulp.watch(path.dev + "/scss/**/*.scss", ["scss"]);
  gulp.watch(path.dev + "/templates/**/*.pug", ["pug"]);
  gulp.watch(path.dev + "/js/**/*.js", ["js"]);
  gulp.watch(path.dev + "/js/**/*.vue", ["vue"]);
});
