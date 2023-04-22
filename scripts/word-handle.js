const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const XLSX = require("xlsx");

const SEPARATE_CHAR = "|"
var {utils} = XLSX;
const {sheet_to_json} = utils;


function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getDataOfExcel() {
  const wb = XLSX.readFile("./data/WordStudy.xlsx");
  /* Get first worksheet */
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];

  /* Convert array of arrays */
  const listOfRow = sheet_to_json(ws, {header: 1, blankrows: false});

  const words = []
  listOfRow.forEach((listOfColumnByRow, rowInd) => {
    if(rowInd !== 0) {
      const word = {}
      listOfColumnByRow.forEach((cellData, cellInd) => {
        if (cellInd === 0) word.id = cellData
        if (cellInd === 1) word.unitId = cellData
        if (cellInd === 2) word.word = capitalize(cellData);
        if (cellInd === 3) word.answers = cellData.split(SEPARATE_CHAR).map(s => capitalize(s)) || []
        if (cellInd === 4) word.sentences = cellData.split(SEPARATE_CHAR).map(s => capitalize(s)) || []
        if (cellInd === 5) word.phrases = cellData.split(SEPARATE_CHAR).map(s => capitalize(s)) || []
        if (cellInd === 6) word.verb = cellData.split(SEPARATE_CHAR).map(s => capitalize(s)) || []
      })
      words.push(word);
    }
  })
  return words
}

const saveDataToFile = (fileName, data) => {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "data");
  console.info("SaveDataToFile: filename: %s, size: %s", fileName, data.length);
  return fs.writeFileSync(jsonDirectory + fileName, JSON.stringify(data, null, 4));
}

function update(dataInput) {
  const vocabularies = require("../data/vocabularies.vi.json");
  dataInput.forEach(w => {
    const wUpdateIndex = vocabularies.findIndex(x => x.id === w.id);
    if (wUpdateIndex >= 0) {
      vocabularies[wUpdateIndex] = {...w};
    } else {
      vocabularies.push(w);
    }
  })
  saveDataToFile("/vocabularies.vi.json", vocabularies)
}

function reformatting(words) {
  const wb = XLSX.readFile("./data/WordStudy.xlsx");
  const rows = []
  words.forEach(w => {
    rows.push({
      ...w,
      answers: w.answers ? w.answers.join(SEPARATE_CHAR) : "",
      sentences: w.sentences ? w.sentences.join(SEPARATE_CHAR) : "",
      phrases: w.phrases ? w.phrases.join(SEPARATE_CHAR) : "",
    })
  })
  const ws = utils.json_to_sheet(rows)

  utils.book_append_sheet(wb, ws, "Update_" + uuidv4().substring(0, 4))

  // Writing to our file
  XLSX.writeFile(wb, './data/WordStudy.xlsx')
}

const listOfWord = getDataOfExcel()
// reformatting(listOfWord)
console.log("Size: ", listOfWord.length)
update(listOfWord)
