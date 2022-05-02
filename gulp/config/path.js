// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

// Основные папки
const
  buildFolder = `./build`,
  srcFolder = `./src`;

// Пути к файлам и папкам
export const path = {
  build: {
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    files: `${buildFolder}/files/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    js: `${srcFolder}/js/*.js`,
    vendor: `${srcFolder}/vendor/**/*.*`,
    rawImages: `${srcFolder}/img_raw/`,
    images: `${srcFolder}/img/`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/pages/*.pug`,
    files: `${srcFolder}/files/**/*.*`,
    favicon: `${srcFolder}/favicon/`,
    fonts: `${srcFolder}/fonts/`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    scss: `${srcFolder}/**/*.scss`,
    html: `${srcFolder}/pages/**/*.pug`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  srcFolder: srcFolder,
  buildFolder: buildFolder,
  rootFolder: rootFolder,
  ftp: ``, // имя папки для деплоя на ftp
};
