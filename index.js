const fs = require('fs')
let thing = JSON.parse(fs.readFileSync('./thing.json', 'utf-8'))

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function ask() {
  rl.question('Which command? ', function (command) {
    if (command == 'write') {
     fs.writeFileSync('./thing.json', JSON.stringify(thing, null, 4))
     console.log('Saved.')
     ask()
    }
    if (command == 'make') {
      rl.question('Name? ', function (name) {
        rl.question('Value? ', function (value) {
            let wObject = {
              value: value
            }
            if (!thing[name]) thing[name] = [

            ]
            thing[name].push(wObject)
            console.log('Ready to write!')
            ask()
          })
        })
      }
    if (command == 'get') {
      rl.question('Which object? ', function (object) {
        rl.question(`Which value? There are ${thing[object].length} values in this name. `, function (value) {
          console.log(`This value is '${thing[object][Number(value) - 1].value}'`)
          ask()
        })
      })
    }
    if (command == 'delete') {
      rl.question('Which object? ', function (object) {
        rl.question(`Which value? There are ${thing[object].length} values in this name. `, function (value) {
          thing[object].pop(value - 1)
          console.log('Pop! There goes the value.')
          ask()
        })
      })
    }
    if (command === 'list') {
      rl.question('Which object? ', function (object) {
        for (i = 0; i < thing[object].length; i++) {
          console.log(`There is '${thing[object][i].value}' at position ${i + 1}.`)
        }
        if (thing[object].length == 0) console.log('There are no values in this object.')
        ask()
      })
    }
  })

}
ask()