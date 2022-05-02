import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import tiny from "gulp-tinypng-compress";

export const images = () => {
  return app.gulp.src(`${app.path.src.images}**/*.{jpg,jpeg,png,gif,webp,svg,ico}`)
    // Делаем webp-шки
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(webp({
      quality: 100
    }))
    .pipe(app.gulp.dest(app.path.build.images))

    // Переносим картинки
    .pipe(app.gulp.src(`${app.path.src.images}**/*.{jpg,jpeg,png,gif,webp,svg,ico}`))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(app.gulp.dest(app.path.build.images))

    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))

    .pipe(app.plugins.browserSync.stream());
};

export const prepareIMG = () => {
  // Ужатие PNG, JPG, WEBP
  app.gulp.src(`${app.path.src.rawImages}**/*.{webp,png,jpg,jpeg}`)
  // === закомментировать, если нет API-ключа
  .pipe(tiny({
    key: app.keys.tinyPNG,
    sigFile: 'images/.tinypng-sigs',
    log: true
  }))
  // === раскомментировать, если нет API-ключа
  // .pipe(imagemin({
  //   progressive: true,
  //   svgolugins: [{ removeViewBox: false, }],
  //   interlaced: true,
  //   optimizationLevel: 3, // 0-7
  // }))
  .pipe(app.gulp.dest(`${app.path.src.images}`));

  // Ужатие остальных файлов
  return app.gulp.src(`${app.path.src.rawImages}**/*.{gif,svg,ico}`)
    .pipe(imagemin({
      progressive: true,
      svgolugins: [{ removeViewBox: false, }],
      interlaced: true,
      optimizationLevel: 3, // 0-7
    }))
    .pipe(app.gulp.dest(`${app.path.src.images}`))
};
