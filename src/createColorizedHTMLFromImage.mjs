import { intToRGBA, Jimp } from 'jimp';
import { promises as fs } from 'node:fs';

import { config } from './config.mjs';
import { getGrayIntensityFromRGB } from './util/getGrayIntensityFromRGB.mjs';
import { getStartOfHTML } from './util/getStartOfHTML.mjs';

// сколько пикселей изображения берем для вычисления цвета символа
const BASE_LETTER_HEIGHT_PX = 4;
const BASE_LETTER_WIDTH_PX = 3;

const BASE_FILE_NAME = 'output.html';

const HTML_END = '\n</body></html>';

/**
 * создаем HTML с разукрашенными символами
 * @param {string} imagePath 
 * @param {string} textFilePath 
 * @returns 
 */
export const createColorizedHTMLFromImage = async (imagePath, textFilePath) => {
  const {
    FONT_URL: fontUrl,
    FONT_NAME: fontName,
    WRITE_HTML: writeHTML = true,
    HTML_FILE_PATH: htmlFilePath = BASE_FILE_NAME,
    LETTER_WIDTH: letterWidth = BASE_LETTER_WIDTH_PX,
    LETTER_HEIGHT: letterHeight = BASE_LETTER_HEIGHT_PX,
    BACKGROUND_COLOR: backgroundColor,
    RENDER_IMAGE_QUALITY: renderImageQuality,
  } = config;

  const image = await Jimp.read(imagePath);

  const imgWidth = image.bitmap.width;
  const imgHeight = image.bitmap.height;

  const charactersLimit = (imgWidth * imgHeight) / (letterWidth * letterHeight);

  const inputText = (await fs.readFile(textFilePath, 'utf-8')).slice(0, charactersLimit).split('');

  const fontSizeMultiplier = letterWidth * renderImageQuality * 1.6;
  const fontSize = `${ fontSizeMultiplier }px`;

  let outputHtml = getStartOfHTML({ fontUrl, fontName, fontSize, lineHeight: '1.2em', backgroundColor });

  inputText.forEach((char, index) => {
    const textX = (index * letterWidth) % imgWidth;
    const textY = Math.floor((index * letterWidth) / imgWidth) * letterHeight;

    if (textY + letterHeight > imgHeight) {
        return;
    }

    const pixelsCount = letterHeight * letterWidth;

    let sumOfGrayIntensity = 0;

    // берем область пикселей, чтобы получить цвет для окрашивания символа
    for (let ordinate = textY; ordinate < textY + letterHeight; ordinate++) {
        for (let abscissa = textX; abscissa < textX + letterWidth; abscissa++) {
            const pixelColor = image.getPixelColor(abscissa, ordinate);
            const { r, g, b } = intToRGBA(pixelColor);
            sumOfGrayIntensity += getGrayIntensityFromRGB({ r, g, b });
        }
    }

    const avgGrayIntensity = Math.round(sumOfGrayIntensity / pixelsCount);

    /**
     * Здесь по-умолчанию проставлен красный
     * Можно сделать любой оттенок, если поиграться с коэффициентами
     * @example
     * // зеленый текст
     * const grayColor = `rgb(${0}, ${avgGrayIntensity}, ${0})`;
     * // фиолетовый текст
     * const grayColor = `rgb(${avgGrayIntensity}, 0, ${avgGrayIntensity})`;
     * // серый текст
     * const grayColor = `rgb(${avgGrayIntensity}, ${avgGrayIntensity}, ${avgGrayIntensity})`;
     *  */
    const grayColor = `rgb(${avgGrayIntensity}, ${0}, ${0})`;
    outputHtml += `<span style="color: ${grayColor}">${char}</span>`;


    if ((textX + letterWidth) % imgWidth === 0) {
      outputHtml += '<br/>\n';
    }
  });

  outputHtml += HTML_END;

  writeHTML && await fs.writeFile(htmlFilePath, outputHtml, 'utf8');

  console.log(`HTML file generated: ${htmlFilePath}`);

  return outputHtml;
}
