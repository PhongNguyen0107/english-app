const options = {
  method: 'POST',
  headers: {
    Authorization: 'Bearer ' + "secret_UTOnwttGQduIYMUi0beQwJi0NsPFPmIICrSfgkVlodQ",
    accept: 'application/json',
    'Notion-Version': '2022-06-28',
    'content-type': 'application/json'
  },
  body: JSON.stringify({page_size: 100})
};

const transformPayload = (response) => {
  const results = response.results;
  
  const outcome = results.map((item) => {
    let dataMapping = {
      ...item,
      attributes: Object.entries(item.properties).map(child => {
        if (typeof child[1] === "object") {
          return {
            key: child[0],
            ...child[1],
          }
        }
        
        return {
          [child[0]]: child[1]
        }
      })
    }
    delete dataMapping.properties;
    return dataMapping;
  })
  
  console.log(JSON.stringify(outcome, null, 2))
  console.log("✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰✰")
  console.log(JSON.stringify(outcome))
  return outcome
}

fetch('https://api.notion.com/v1/databases/eb209d55146a43a29c7590e14863b79e/query', options)
  .then(response => response.json())
  .then(response => transformPayload(response))
  .catch(err => console.error(err));
