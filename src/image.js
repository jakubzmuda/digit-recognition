export default class Image {
  constructor(canvasImage) {
    this.canvasImage = canvasImage;
  }

  as28pxImage() {
    const data = this.canvasImage.data;


    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
    }

    let outputImage = [];
    for (let y = 0; y < 28; y++) {
      outputImage.push([]);
      for (let x = 0; x < 28; x++) {
        outputImage[y][x] = 0.5; // todo here read from prev
      }
    }

    return outputImage;
  }
}
