import open from 'open';
import { config } from './config.mjs';
import { createColorizedHTMLFromImage } from './createColorizedHTMLFromImage.mjs';
import { renderHtmlToPng } from './renderHtmlToPng.mjs';
import { getImageSizes } from './util/getImageSizes.mjs';

const main = async () => {
  console.log('Colorizing text...');

  const htmlString = await createColorizedHTMLFromImage(
    config.IMAGE_FILE_PATH,
    config.TEXT_FILE_PATH,
  );

  console.log('Rendering image...')

  const [ imageWidth, imageHeight ] = await getImageSizes(config.IMAGE_FILE_PATH);

  const resultFilePath = await renderHtmlToPng({
    htmlString,
    htmlFilePath: config.HTML_FILE_PATH,
    pngFilePath: config.PNG_FILE_PATH,
    width: imageWidth * config.RENDER_IMAGE_QUALITY,
    height: imageHeight * config.RENDER_IMAGE_QUALITY,
  });
  
  //await open(resultFilePath);

  console.log('Success');
};

main();
