export const config = {
  IMAGE_FILE_PATH: process.env.ORIG_IMAGE_FILE_PATH,
  TEXT_FILE_PATH: process.env.TEXT_FILE_PATH,

  LETTER_HEIGHT: Number(process.env.LETTER_HEIGHT_PX),
  LETTER_WIDTH: Number(process.env.LETTER_WIDTH_PX),
  
  HTML_FILE_PATH: process.env.HTML_FILE_PATH,
  PNG_FILE_PATH: process.env.PNG_FILE_PATH,
  
  FONT_URL: process.env.FONT_URL,
  FONT_NAME: process.env.FONT_NAME,
  
  RENDER_IMAGE_QUALITY: Number(process.env.RENDER_IMAGE_QUALITY || 2),

  BACKGROUND_COLOR: process.env.BACKGROUND_COLOR,
};
