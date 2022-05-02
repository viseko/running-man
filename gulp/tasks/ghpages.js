import pages from "gulp-gh-pages";

export const ghPages = () => {
  return app.gulp.src(`${app.path.buildFolder}/**/*`)
    .pipe(pages());
};
