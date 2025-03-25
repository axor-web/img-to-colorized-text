import { getFontLinkTag } from "./getFontLinkTag.mjs";

const JETBRAINS_MONO_FONT_URL = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swapp';
const BASE_FONT_NAME = 'JetBrains Mono';
const BASE_FONT_SIZE = '24.5px';
const BASE_LINE_HEIGHT = '12.25px';
const BASE_BACKGROUND_COLOR = '#000';

/**
* @typedef {Object} Params
* @property {string=} fontUrl
* @property {string=} fontName
* @property {string=} fontSize
* @property {string=} lineHeight
*/

/**
 * Добавляет ссылку на шрифт + стили для body в <head>.
 * 
 * @param {Params=} options
 * @returns {string}
 */
export const getStartOfHTML = (options) => {
  const {
    fontUrl = JETBRAINS_MONO_FONT_URL,
    fontName = BASE_FONT_NAME,
    fontSize = BASE_FONT_SIZE,
    lineHeight = BASE_LINE_HEIGHT,
    backgroundColor = BASE_BACKGROUND_COLOR,
  } = options ?? {};

  const style = `
    <style>
      body {
        font-family: ${fontName};
        font-size: ${fontSize};
        line-height: ${lineHeight};
        background-color: ${backgroundColor};
      }
    </style>
  `;

  const link = getFontLinkTag(fontUrl);

  return `<html><head>${link}${style}</head><body>\n`;
};
