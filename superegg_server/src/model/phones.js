const fs = require('fs');
const moment = require('moment');

function list() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-phones.json')) {
            fs.writeFileSync('data-phones.json', '');
        }

        fs.readFile('data-phones.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let phones = data ? JSON.parse(data) : [];

            resolve(phones);
        });
    });
}
function create(date, end, diff) {
    return new Promise((resolve, reject) => {
        const newPhone = {
          date: date,
          diff: diff,
          end: end,
          ts: moment().unix()
        };

        list().then(phones => {
            phones = [
                newPhone,
                ...phones
            ];
            fs.writeFile('data-phones.json', JSON.stringify(phones), err => {
                if (err) reject(err);

                resolve(newPhone);
            });
        });
    });
}

module.exports = {
    list,
    create
};
