"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const postcss = require("gulp-postcss");
const pug = require("gulp-pug");
const autoprefixer = require("autoprefixer");
const browserSync = require('browser-sync').create();
const vueify = require('gulp-vueify');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const path = {
  dev: "./src",
  prod: "./public"
};

gulp.task("pug", () => {
  return gulp.src(path.dev + "/templates/index.pug")
    .pipe(pug())
    .pipe(gulp.dest(path.prod))
});

gulp.task("scss", () => {
  let plugins = [autoprefixer({ browsers: ["last 2 versions"] })];

  return gulp.src(path.dev + "/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest(path.prod + "/dist/css/"))
    .pipe(browserSync.stream());
});

gulp.task("js", function () {
  return gulp.src(path.dev + "/js/main.js")
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(path.prod + "/dist/js/"))
    .pipe(browserSync.stream());
});

gulp.task("vue", () => {
  return gulp.src(path.dev + '/js/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest(path.prod + '/dist/vue'))
});

gulp.task('serve', ['scss', 'js'], function () {

  browserSync.init({
    server: "./public"
  });

  gulp.watch("src/**/*.scss", ['scss']);
  gulp.watch("src/**/*.js", ['js']);
  gulp.watch("src/**/*.pug").on('change', browserSync.reload);
});

gulp.task("default", ['serve'], () => {
  gulp.watch(path.dev + "/scss/**/*.scss", ["scss"]);
  gulp.watch(path.dev + "/templates/**/*.pug", ["pug"]);
  gulp.watch(path.dev + "/js/**/*.js", ["js"]);
  gulp.watch(path.dev + "/js/**/*.vue", ["vue"]);
});
