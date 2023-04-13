import {Jobs} from "@/app/api/v1/jobs/[id]/Jobs";
import {capitalize} from "@/shared/utils";
import logger from "@/services/Logger.service";
import { promises as fs } from 'fs';
const path = require("path");
const XLSX = require("xlsx");

export const getListOfJob = () => {
  const jobs: Jobs[] = [
    {
      id: "sync-word",
      name: "Sync word",
      description: "Sync word in excel file to vocabularies.json file"
    }
  ]
  return jobs;
}

export const getJobById = (jobId: string) => {
  const jobs = getListOfJob()
  return jobs.find(x => x.id === jobId);
}

export const syncWordJob = () => {
  let  {utils} = XLSX;
  const {sheet_to_json} = utils;


  function getDataOfExcel() {
    let sourceFile = path.join(process.cwd(), "data") + "/WordStudy.xlsx"
    logger.info("Source file excel: %s", sourceFile)
    const wb = XLSX.readFile(sourceFile);
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];

    /* Convert array of arrays */
    const listOfRow = sheet_to_json(ws, {header: 1, blankrows: false});

    const words: any[] = []
    listOfRow.forEach((listOfColumnByRow: any[], rowInd: number) => {
      if(rowInd !== 0) {
        const word: any = {}
        listOfColumnByRow.forEach((cellData, cellInd) => {
          if (cellInd === 0) word.id = cellData
          if (cellInd === 1) word.unitId = cellData
          if (cellInd === 2) word.word = capitalize(cellData);
          if (cellInd === 3) word.answers = cellData.split(",").map((s: string) => capitalize(s)) || []
          if (cellInd === 4) word.sentences = cellData.split(",").map((s: string) => capitalize(s)) || []
          if (cellInd === 5) word.phrases = cellData.split(",").map((s: string) => capitalize(s)) || []
          if (cellInd === 6) word.verb = cellData.split(",").map((s: string) => capitalize(s)) || []
        })
        words.push(word);
      }
    })
    return words
  }

  const saveDataToFile = (fileName: string, data: string | any[]) => {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), "data");
    logger.info("jsonDirectory path: %s", jsonDirectory);
    logger.info("SaveDataToFile: filename: %s, size: %s", fileName, data.length);
    return fs.writeFile(jsonDirectory + fileName, JSON.stringify(data, null, 4));
  }

  function update(dataInput: any[]) {
    const desFile = require(path.join(process.cwd(), "data") + "/vocabularies.vi.json");
    dataInput.forEach(w => {
      const wUpdateIndex = desFile.findIndex((x: { id: any; }) => x.id === w.id);
      if (wUpdateIndex >= 0) {
        desFile[wUpdateIndex] = {...w};
      } else {
        desFile.push(w);
      }
    })
    saveDataToFile("/vocabularies.vi.json", desFile).then()
  }

  const listOfWord = getDataOfExcel()
  logger.info("Size of word after detect: %o", listOfWord.length)
  update(listOfWord)
}