const fs = require('fs');

const loadQuery = (path) => {
  return new Promise(res => {
    fs.readFile(path, (err, query) => {
      if (err) throw err;
      res(query.toString());
    })
  });
};

module.exports = loadQuery;