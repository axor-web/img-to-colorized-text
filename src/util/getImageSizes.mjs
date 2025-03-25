import { Jimp } from 'jimp';

export const getImageSizes = async (imagePath) => {
  const image = await Jimp.read(imagePath);

  return [ image.bitmap.width, image.bitmap.height ];
};
