/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

// const { Resolver } = require("dns");
// const { resolve } = require("path");
// const { resolve } = require("path");
const { resolve } = require("path");
const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");


/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }));
    resolve()
  })//.then(() => {
  //   console.log('Extraction Done')
  //   resolve()
  // })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, data) => {
      new Promise((resolve, reject) => {
        pngArr = []
        for (let i = 0; i < data.length; i++){
          if (path.extname(`${dir}/${data[i]}`).toLowerCase() == '.png') {
            pngArr.push(data[i])
          }
        }
        resolve(pngArr)
      }).then((pngArr) => resolve(pngArr))
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {

  console.log(pathIn)
  console.log(`------------${pathOut}`)

  fs.createReadStream(pathIn)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", function () {
      
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;
   
          // invert color
          this.data[idx] = 255 - this.data[idx];
          this.data[idx + 1] = 255 - this.data[idx + 1];
          this.data[idx + 2] = 255 - this.data[idx + 2];
          // console.log(this.data[idx])
   
          // and reduce opacity
          this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }
   
      this.pack().pipe(fs.createWriteStream(pathOut));
    });

  
  // var fs = require("fs"),
  //   PNG = require("pngjs").PNG;
 
  // fs.createReadStream("in.png")
  // .pipe(
  //   new PNG({
  //     filterType: 4,
  //   })
  // )
  // .on("parsed", function () {
  //   new Promise((resolve, reject) => {
  //     for (var y = 0; y < this.height; y++) {
  //       for (var x = 0; x < this.width; x++) {
  //         var idx = (this.width * y + x) << 2;
   
  //         // invert color
  //         // this.data[idx] = 255 - this.data[idx];
  //         // this.data[idx + 1] = 255 - this.data[idx + 1];
  //         // this.data[idx + 2] = 255 - this.data[idx + 2];
   
  //         // // and reduce opacity
  //         // this.data[idx + 3] = this.data[idx + 3] >> 1;
  //       }
  //     }
  //     // resolve()
  //   }).then(this.pack().pipe(fs.createWriteStream("./folder000/out.png")))

 
    // this.pack().pipe(fs.createWriteStream("out.png"));
  // });
  
  
  
  
  // // console.log(`${pathIn} --- ${pathOut}`)
  // // console.log(path.extname(pathIn))
  // // // see example, barely need any changes to work
  // // // DO NOT CHANGE filter type --- not allowed
  // // // change rgb to make grayscale
  // // // see instructions for "simple algorithms you can use for converting to grayscale"
  // console.log(`---------------------------------------------------------------------`)
  // return new Promise((resolve, reject) => {
  //   var fs = require("fs"),
  //   PNG = require("pngjs").PNG;
  //   // fs.createReadStream('./starter 4/unzipped/in.png')
  //   fs.createReadStream("in.png")
  //   .pipe(
  //     new PNG({
  //       filterType: 4,
  //     })
  //   )
  //   .on("parsed", function () {
  //     console.log('=====================================================================')
  //     for (var y = 0; y < this.height; y++) {
  //       for (var x = 0; x < this.width; x++) {
  //         var idx = (this.width * y + x) << 2;
  
  //         // invert color
  //         this.data[idx] = 255 - this.data[idx];
  //         this.data[idx + 1] = 255 - this.data[idx + 1];
  //         this.data[idx + 2] = 255 - this.data[idx + 2];
  
  //         // and reduce opacity
  //         this.data[idx + 3] = this.data[idx + 3] >> 1;
  //       }
  //     }
  
  //     this.pack().pipe(fs.createWriteStream("out.png"));
      
  //   })
  //   resolve()
  // }).catch((err) => console.log(`+++++++++++++++++++++++++++++ ERROR ++++++++++++++++++++++++++++++++\n\n\n\n${err}\n\n\n+++++++++++++++++++++++++++++ END ++++++++++++++++++++++++++++++++`))


  // fs.createReadStream(pathIn)
  // .pipe(
  //   new PNG({
  //     filterType: 4,
  //   })
  // )
  // .on("parsed", function () {
  //   for (var y = 0; y < this.height; y++) {
  //     for (var x = 0; x < this.width; x++) {
  //       var idx = (this.width * y + x) << 2;
 
  //       // invert color
  //       this.data[idx] = this.data[idx]/3;
  //       this.data[idx + 1] = this.data[idx + 1]/3;
  //       this.data[idx + 2] = this.data[idx + 2]/3;
  //     }
  //   }
 
  //   this.pack().pipe(fs.createWriteStream(pathOut));
  // });
};



module.exports = {
  unzip,
  readDir,
  grayScale,
};
