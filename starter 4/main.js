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

  IOhandler.unzip('./starter 4/myfile.zip', './starter 4/unzipped').then(
    IOhandler.readDir('./starter 4/unzipped')
    // .then((png_array) => console.log(png_array))
    .then((png_array) => {
      console.log('Files Sorted')
      png_array.forEach(image => {
        IOhandler.grayScale(`./starter 4/unzipped/${image}`, './starter 4/gray_scaled')
      });
    }
  )
)
