const path = require('path');
const fs = require('fs');

const folderPath = './public/story';

const padWithZeros = (number, length) => {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

fs.readdir(folderPath, (error, files) => {
  if (error) {
    // Handle error here
    console.log(error);
  }
  
  let start = 5105
  let unit = 1
  let count = 1
  const end = 5258
  for (let i = start; i <= end; i++) {
    const fileInfoElement = files.find(x => path.parse(x).name === `IMG_${i}`);
    if (!fileInfoElement) {
      console.log("Toang: ", i);
      continue;
    }
    const fileInfo = path.parse(fileInfoElement)
    
    console.log("file name: ", fileInfo.name)
    const oldPath = path.join(__dirname, folderPath, fileInfoElement);
    if (fileInfo.name.includes(`${i}`)) {
      
      const newName = `U${padWithZeros(unit, 2)}_${padWithZeros(count, 2)}${fileInfo.ext}`
      const newPath = path.join(__dirname, folderPath, newName);
      
      fs.renameSync(oldPath, newPath);
      // console.log(`File names ${fileInfo.name} changed to ${newName} successfully`);
    }
    if (count === 3) {
      count = 0;
      unit++;
    }
    count++;
  }
  
});
