let gulp = require("gulp");
let sass = require('gulp-sass');
let plumber = require('gulp-plumber');
let notify = require('gulp-notify');
let autoprefixer = require('gulp-autoprefixer');

let uglify = require('gulp-uglify-es').default;
let uglify_option = {
  keep_fnames: false,
  mangle: true
}

let scss_path_src = "./scss/**/*.scss";
let scss_path_dest = "./src/css/";
let js_path_src = "./es6/*.js";
let js_path_dest = "./src/js/";

gulp.task("default", function() {
  return gulp.watch(scss_path_src, function() {
    return (
      gulp
        .src(scss_path_src)
        .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(
          sass({
            outputStyle: "expanded"
          })
          .on("error", sass.logError)
        )
        .pipe(gulp.dest(scss_path_dest))
    );
  });
});

// .pipe(notify({
//   title: 'Task running Gulp',
//   message: 'sass file compiled.?',
//   sound: 'none',
// }))
// .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
// .pipe(autoprefixer(['last 3 versions', 'ie >= 9', 'Android >= 5', 'iOS >=10']))


gulp.task("uglify", function () {
  return gulp.src(js_path_src)
      .pipe(uglify(uglify_option))
      .pipe(gulp.dest(js_path_dest));
});