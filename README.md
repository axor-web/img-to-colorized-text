# img-to-colorized-text

A simple tool for transforming images to some colorized text.

## Usage

- `npm i`
- `(YOUR ENV PARAMS HERE...) npm start`

## Configuration

Tool can be configurated through the variables in the environment (you can pass them before execution / export / add to `.env` file )

### Parameters

```sh
LETTER_HEIGHT_PX = 8 # rectangular area of image pixels for one letter. Area height
LETTER_WIDTH_PX = 4 # rectangular area of image pixels for one letter. Area width
ORIG_IMAGE_FILE_PATH = "input.png" # path to original image
TEXT_FILE_PATH = "input.txt" # fpath to original text
HTML_FILE_PATH = "output/output.html" # path to rendered HTML (if WRITE_HTML = 1)
PNG_FILE_PATH = "output/output.png" # path to rendered PNG
FONT_URL = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swapp" # your monospace font url
FONT_NAME = "JetBrains Mono"
BACKGROUND_COLOR = "#000000" # background color of your image (background of text)
WRITE_HTML = 1 # write HTML file with result?
RENDER_IMAGE_QUALITY = 2 # multiplies original image sizes. Example: original 1080x720 -> rendered 2160x1440
```

## TODO

- Rewrite with canvas
- Create simple user interface
- Add possibility to use with non-integer letter sizes
