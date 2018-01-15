const fs = require('fs');
const moment = require('moment');

function list() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-sleeps.json')) {
            fs.writeFileSync('data-sleeps.json', '');
        }

        fs.readFile('data-sleeps.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let sleeps = data ? JSON.parse(data) : [];

            resolve(sleeps);
        });
    });
}
function create(date, end, diff) {
    return new Promise((resolve, reject) => {
        const newSleep = {
          date: date,
          diff: diff,
          end: end,
          ts: moment().unix()
        };

        list().then(sleeps => {
            sleeps = [
                newSleep,
                ...sleeps
            ];
            fs.writeFile('data-sleeps.json', JSON.stringify(sleeps), err => {
                if (err) reject(err);

                resolve(newSleep);
            });
        });
    });
}

module.exports = {
    list,
    create
};
