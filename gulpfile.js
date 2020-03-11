const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm')
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;



sass.compiler = require('node-sass');

task('clean', () => {
  return src('./dist/**/*', { read: false }).pipe(rm())
});

task('copy:html', () => {
  return src('./*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});


const styles = [
  './node_modules/normalize.css/normalize.css',
  './main.scss',
  './css/jquery.bxslider.css'
]


task('styles', () => {
  return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe(gulpif(env === 'dev',
      autoprefixer({
        cascade: true
      })
    ))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});


const libs = [
  './node_modules/jquery/dist/jquery.js',
  './js/*.js'
]


task('scripts', () => {
  return src(libs)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ";" }))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});


task('icons', () => {
  return src('./img/icons/icons_svg/*.svg')
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: {
              attrs: '(fill|stroke|style|width|height|data.*)'
            }
          }
        ]
      })
    )
    //22 урок выдает ошибки с этого места
    // .pipe(
    //   svgSprite({
    //     mode: {
    //       symbol: {
    //         sprite: '../sprite.svg'
    //       }
    //     }
    //   })
    // )

    .pipe(dest('dist/img/icons/icons_svg'));
});


task('images', () => {
  return src(`./img/**/*.*`)
    .pipe(dest('dist/img'))
    .pipe(reload({stream: true}));
});


task('fonts', () => {
  return src(`./fonts/*.*`)
    .pipe(dest('dist/fonts'))
    .pipe(reload({stream: true}));
});




task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});


task('watch', () => {
  watch('./css/**/*.scss', series('styles'));
  watch('./*.html', series('copy:html'));
  watch('./js/*.js', series('scripts'));
  watch('./img/icons/icons_svg/*.svg', series('icons')); //22 урок
  watch('./img/**/*.*', series('images'));
  watch('./fonts/*.*', series('fonts'));

})




task(
  'default',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts', 'icons', 'images', 'fonts'),
    parallel('watch', 'server')
  )
);


task(
  'build',
  series('clean', parallel('copy:html', 'styles', 'scripts', 'icons', 'images', 'fonts'))
);


