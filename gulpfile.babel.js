import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)

function clean(str) {
  return del([`./lib${str}`]);
}

gulp.task('scss', () => {
  clean('/components/styles.css');
  return gulp.src('./src/styles.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./lib'));
});

gulp.task('build:component:SideMenu', () => {
  clean('/components/SideMenu.js');
  return gulp.src('./src/components/SideMenu.jsx')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('./lib/components'));
});

gulp.task('build:component:List', () => {
  clean('/components/List.js');
  return gulp.src('./src/components/List.jsx')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('./lib/components'));
});

gulp.task('build:component:View', () => {
  clean('/components/View.js');
  return gulp.src('./src/components/View.jsx')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('./lib/components'));
});

gulp.task('build:component:Editor', () => {
  clean('/components/Editor.js');
  return gulp.src('./src/components/Editor.jsx')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('./lib/components'));
});
gulp.task('build:component:Markdown', () => {
  clean('/components/Markdown.js');
  return gulp.src('./src/components/Markdown.jsx')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('./lib/components'));
});

gulp.task('build:component:Layout', () => {
  clean('/index.js');
  return gulp.src('./src/index.jsx')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
});

gulp.task('build:middleware', () => {
  clean('/middleware.js');
  return gulp.src('./src/middleware.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '6.10',
            },
          },
        ],
      ],
      plugins: [
        "@babel/plugin-transform-flow-comments",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        [
          "@babel/plugin-proposal-decorators",
          {
            "legacy": true
          }
        ],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions"
      ],
      babelrc: false,
      env: {
        production: {
          presets: [
            '@babel/preset-flow',
          ],
          comments: false,
          compact: true,
          minified: true,
        },
      },
    }))
    .pipe(gulp.dest('./lib'));
});

gulp.task('watch', () => {
  gulp.watch('./src/components/styles.scss', gulp.parallel('scss'));
  gulp.watch('./src/components/SideMenu.jsx', gulp.parallel('build:component:SideMenu'));
  gulp.watch('./src/components/List.jsx', gulp.parallel('build:component:List'));
  gulp.watch('./src/components/View.jsx', gulp.parallel('build:component:View'));
  gulp.watch('./src/components/Editor.jsx', gulp.parallel('build:component:Editor'));
  gulp.watch('./src/components/Markdown.jsx', gulp.parallel('build:component:Markdown'));
  gulp.watch('./src/index.jsx', gulp.parallel('build:component:Layout'));
  gulp.watch('./src/middleware.js', gulp.parallel('build:middleware'));
});

gulp.task('default', gulp.parallel(
  'scss',
  'build:component:SideMenu',
  'build:component:List',
  'build:component:View',
  'build:component:Editor',
  'build:component:Markdown',
  'build:component:Layout',
  'build:middleware',
));
