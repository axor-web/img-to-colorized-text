/**
 * Преобразует интенсивность цветов из RGB в интенсивность серого
 * 
 * Использует стандартную для этого формулу @see https://en.wikipedia.org/wiki/Grayscale
 * 
 * Можно пробовать другие формулы или самостоятельно подбирать коэффициенты для лучшей картинки
 * @param {{ r: number, g: number, b: number }}
 * @returns {number}
 */
export const getGrayIntensityFromRGB = ({ r, g, b }) => 0.299 * r + 0.587 * g + 0.114 * b
