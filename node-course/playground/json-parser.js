const fs = require('fs');

fs.readFile('data.json', (err, data) => {
  if (err) throw err;

  const dataObj = JSON.parse(data.toString());
  dataObj.age = 17;
  dataObj.name = 'Dima';

  const newData = JSON.stringify(dataObj);

  fs.writeFile('data.json', newData, (error) => {
    if (error) throw error;
  });
});
