// Основной модуль
import gulp from "gulp";
// Импорт путей
import {path} from "./gulp/config/path.js";
// Импорт общих плагинов
import {plugins} from "./gulp/config/plugins.js";
// Импорт API-ключей (закомментировать, если не требуется)
import {keys} from "./gulp/config/keys.js";

// Передаём значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
  keys: keys
};

// Импорт задач
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images, prepareIMG} from "./gulp/tasks/images.js";
import {svgsprite} from "./gulp/tasks/svgsprite.js";
import {favicon} from "./gulp/tasks/favicon.js";
import {server} from "./gulp/tasks/server.js";
import {otfToTtf, ttfToWoff, fontStyle, cleanFonts} from "./gulp/tasks/fonts.js";
import {zip} from "./gulp/tasks/zip.js";
import {ftp} from "./gulp/tasks/ftp.js";
import {ghPages} from "./gulp/tasks/ghpages.js";

// Отслеживание изменений в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// Основные задачи
const mainTasks = gulp.series(gulp.parallel(copy, html, scss, js, images, svgsprite), favicon); // - почему-то манифест в параллели не генерится

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle, cleanFonts);

// Сценарии выполнения задач
const prepare = gulp.series(fonts, prepareIMG);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);
const deployGH = gulp.series(reset, mainTasks, ghPages);

// Задача по умолчанию
gulp.task("default", dev);

// Экспорт тасков
export {favicon, svgsprite, dev, build, deployZip, deployFTP, deployGH, prepare};
