const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(unaccomplishOnly = false, searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-todos.json')) {
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let todos = data ? JSON.parse(data) : [];

            if ( unaccomplishOnly ) {
                todos = todos.filter(t => {
                    return !t.doneTs;
                });
            }

            if ( searchText ) {
                todos = todos.filter(t => {
                    return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
                });
            }
            // if ( unaccomplishOnly && searchText )
            // {
            //     todos = todos.filter(t => {
            //         return (!t.doneTs) | (t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
            //     });
            // }
            // else if ( unaccomplishOnly && !searchText )
            // {
            //     todos = todos.filter(t => {
            //         return !t.doneTs;
            //     });
            // }
            // else if ( searchText ) {
            //     todos = todos.filter(t => {
            //         return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            //     });
            // }
            resolve(todos);
        });
    });
}



function create(mood, text) {
    return new Promise((resolve, reject) => {
        const newTodo = {
            id: uuid(),
            mood: mood.charAt(0).toUpperCase() + mood.slice(1),
            text: text,
            ts: moment().unix(),
            doneTs : null
        };

        list().then(todos => {
            todos = [
                newTodo,
                ...todos
            ];
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(newTodo);
            });
        });
    });
}

function accomplish(id) {
  return new Promise((resolve, reject) => {
      let Todo = null;
      list().then(todos => {
          todos = todos.map(t => {
              if (t.id === id) {
                 Todo = t;
                  t.doneTs = moment().unix();
              }
              return t;
          });

          fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
              if (err) reject(err);

              resolve(Todo);
          });
      });
  });
}

module.exports = {
    list,
    create,
    accomplish
};
