const commands = require('./commands')


let print = (output) => {
  process.stdout.write(output)
  process.stdout.write('\nprompt > ');
}
// Output un prompt
    process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
      let args = data.toString().trim().split(" "); // remueve la nueva línea
      let cmd = args.shift()// le quita el primera valor 

      if (commands[cmd]) {
        commands[cmd](args,print)
        
      } else {
        print('cmd not found')
      }
      
    });