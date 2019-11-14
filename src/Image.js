export default class Image {
  constructor(canvasImage) {
    this.canvasImage = canvasImage;
  }

  as28pxImage() {
    let outputImage = [];
    for (let y = 0; y < 28; y++) {
      outputImage.push([]);
      for (let x = 0; x < 28; x++) {
        outputImage[y][x] = this.poolStride(x, y);
      }
    }
    return outputImage;
  }

  poolStride(x, y) {
    const stride = 392 / 28; // 14
    let currentDarkestPixel = 255;
    for (let strideY = 0; strideY < stride; strideY++) {
      for (let strideX = 0; strideX < stride; strideX++) {
        currentDarkestPixel = Math.min(currentDarkestPixel, this.getOriginalPixelXY(x * stride + strideX, y * stride + strideY));
      }
    }
    return currentDarkestPixel;
  }

  getOriginalPixel(imgData, index) {
    let i = index * 4, d = this.canvasImage.data;
    return d[i];
  }

  getOriginalPixelXY(x, y) {
    return this.getOriginalPixel(this.canvasImage, y * this.canvasImage.width + x);
  }
}
