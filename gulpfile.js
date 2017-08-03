const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-ruby-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pump = require('pump');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const reload = browserSync.reload;

gulp.task('sass', () => //编译scss
  sass('src/scss/*.scss')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .on('error', sass.logError)
  .pipe(gulp.dest('src/css'))
);
gulp.task('serve', ['sass'], () => { //监听文件变化
  browserSync({
    server: {
      baseDir: 'src'
    }
  });
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch(['*.html', 'css/**/*.css', 'scripts/**/*.js'], {
    cwd: 'src'
  }, reload);
});
gulp.task('clean', () => { //清理文件
  gulp.src(['dist/css/*', 'dist/scripts/*'], {
      read: false
    })
    .pipe(clean());
});
gulp.task('cssmin', () => { //压缩css
  gulp.src('src/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});
gulp.task('compress', (cb) => { //js转义以及压缩
  pump([
      gulp.src('src/scripts/*.js'),
      babel(),
      uglify(),
      gulp.dest('dist/scripts')
    ],
    cb
  );
});
gulp.task('htmlmin', () => { //html移动
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});
gulp.task('imagemin', () => //图片压缩
  gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
);
gulp.task('build', ['clean', 'cssmin', 'compress', 'htmlmin', 'imagemin']);