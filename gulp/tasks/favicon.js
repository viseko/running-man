import svg2png from "gulp-svg2png";
import rename from "gulp-rename";
import imagemin from "gulp-imagemin";
import fs from "fs";

export const favicon = (cb) => {
  const favicon = `${app.path.src.favicon}favicon.svg`;

  // Если фавиконки нет, ничего не делаем
  if (!fs.existsSync(favicon)) return cb();

  // Создаём файл манифеста
  const manifest = `${app.path.build.html}manifest.json`;
  const manifestData = {
    name: app.path.rootFolder,
    short_name: app.path.rootFolder,
    icons: [{
      src: "google-touch-icon.png",
      sizes: "512x512",
    }],
    start_url: "http://localhost:3000", // заменить для прод-версии
    background_color: "#ffffff",
    theme_color: "#ffffff",
    display: "fullscreen",
  };

  fs.writeFile(manifest, JSON.stringify(manifestData), () => {});

  // Делаем разные варианты фавиконок из исходной svg
  app.gulp.src(favicon)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FAVICON",
        error: "Error: <%= error.message %>",
      }))
    )
    .pipe(app.gulp.dest(app.path.build.html))

  app.gulp.src(`${app.path.src.favicon}favicon.svg`)
    .pipe(svg2png({
      width: 180,
      height: 180,
    }))
    .pipe(imagemin({
      progressive: true,
      svgolugins: [{ removeViewBox: false, }],
      interlaced: true,
      optimizationLevel: 3, // 0-7
    }))
    .pipe(rename("apple-touch-icon.png"))
    .pipe(app.gulp.dest(app.path.build.html))

  return app.gulp.src(`${app.path.src.favicon}/favicon.svg`)
    .pipe(svg2png({
      width: 512,
      height: 512,
    }))
    .pipe(imagemin({
      progressive: true,
      svgolugins: [{ removeViewBox: false, }],
      interlaced: true,
      optimizationLevel: 3, // 0-7
    }))
    .pipe(rename("google-touch-icon.png"))
    .pipe(app.gulp.dest(app.path.build.html))
};
