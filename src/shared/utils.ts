
/**
 * Convert "/api/v1/health-check/:<paramName1>/:<paramName2>/config" to "/api/v1/health-check/<paramValue2>/<paramValue2>/config";
 * @param url: the link endpoint api has param name variable
 * @param params: value list to replace for param name
 * @returns {string}: the endpoint api
 */
export const convertUrlParamToEndpoint = (url: string, ...params: string[]) : string => {
  if (!url) return "";

  let i = 0;
  const pattern = /:(\w+)/gm;
  return url.replace(pattern, (matched) => matched.replace(matched, params[i++]));
};


export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}


/**
 * Copy text into clipboard
 * @param value
 */
export const copyToClipboardLargeData = (value: string) => {
  let contentToCopy: string;

  function copyDataToClipboard(e: any) {
    e.preventDefault(); // default behaviour is to copy any selected text
    e.clipboardData.setData("text/plain", contentToCopy);
  }

  function copy(content: string) {
    contentToCopy = content;
    document.addEventListener("copy", copyDataToClipboard);
    try {
      document.execCommand("copy");
    } catch (exception) {
      console.error("Copy to clipboard failed");
    } finally {
      document.removeEventListener("copy", copyDataToClipboard);
    }
  }

  copy(value);
};


export const saveDataToFile = (fileName: string, data: any) => {
  let path = require("path");
  let fs = require('fs');
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "data");
  console.info("SaveDataToFile: filename: %s, size: %s", fileName, data.length);
  return fs.writeFileSync(jsonDirectory + fileName, JSON.stringify(data, null, 4));
}
