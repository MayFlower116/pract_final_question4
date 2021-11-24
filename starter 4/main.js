/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

  IOhandler.unzip('./starter 4/myfile.zip', './starter 4/unzipped')
  .then(() => {
    // console.log('uwu')
    console.log('Extraction Done')
    IOhandler.readDir('./starter 4/unzipped')
    // .then((png_array) => console.log(png_array))
    .then((png_array) => {
      console.log('PNGs Pulled')
      IOhandler.grayScale(`./starter 4/unzipped/in.png`, `./starter 4/grayscaled/test.png`)
      // png_array.forEach(png => {
      //   console.log(`./starter 4/unzipped/${png}`)
      //   IOhandler.grayScale(`starter 4/unzipped/in.png`, `./starter 4/gray_scaled/${png}`)
      // });
      for (i=0; i < png_array.length; i++) {
        // IOhandler.grayScale(`starter 4/unzipped/in.png`, `./starter 4/gray_scaled/test`)
      }
    })
  }
    // IOhandler.readDir('./starter 4/unzipped')
    // .then((png_array) => console.log(png_array))
  //   .then((png_array) => {
  //     // console.log(png_array)
  //     console.log('Files Sorted')
  //     png_array.forEach(image => {
  //       IOhandler.grayScale(`./starter 4/unzipped/${image}`, './starter 4/gray_scaled')
  //     });
  //   }
  // )
)
