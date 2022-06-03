let fs = require('fs')

module.exports = {
    echo: function(args,print) {
        print(args.join(' '))
    },
    date: function (args,print) {
        print(Date())
    },
    ls: function (args,print) {
        fs.readdir('.', function(err,files){
            if(err) throw err;
            print(files.join('\n'))
        })
    },
    pwd: function (args,print) {
        print(process.cwd())
    },
    cat: function (args,print) {
        //args = archivo que debo leer
        fs.readFile(args[0], 'utf-8', function(err,data) {
            if(err) throw err
            print(data)
        })
    }
}