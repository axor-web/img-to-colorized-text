import puppeteer from 'puppeteer';
import { promises as fs } from 'node:fs';

const BASE_PNG_FILE_PATH = 'output.png';

/**
 * @typedef {Object} Props
 * @property {number=} width
 * @property {number=} height
 */

/**
 * рендерит HTML в headless-chrome и локально сохраняет полученную картинку
 * @param {Props} props
 */
export const renderHtmlToPng = async (props) => {
  const {
    htmlString,
    htmlFilePath,
    pngFilePath = BASE_PNG_FILE_PATH,
    width,
    height
  } = props;

  try {
    const htmlContent = htmlString || await fs.readFile(htmlFilePath, 'utf8');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width, height });

    await page.setContent(htmlContent, {
      waitUntil: ['domcontentloaded', 'load', 'networkidle0'],
    });

    await page.screenshot({
      path: pngFilePath,
    });

    await browser.close();

    console.log('Rendering complete: ' + pngFilePath);

    return pngFilePath;
  } catch (error) {
    console.error('Error rendering HTML:', error);
  }
}
