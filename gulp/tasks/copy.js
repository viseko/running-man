export const copy = () => {
  app.gulp.src(app.path.src.vendor)
    .pipe(app.gulp.dest(app.path.buildFolder))

  app.gulp.src(`${app.path.src.fonts}*.{woff,woff2}`)
    .pipe(app.gulp.dest(app.path.build.fonts))

  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
};
