var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

const [Jhon , Paul, George, Richard] = beatles


http.createServer(function(req, res){
  if(req.url === '/'){
    res.writeHead(200, {'Content-Type':'text/html'})
    let html = fs.readFileSync(__dirname + '/index.html')
    res.end(html)
  }
  else if(req.url === '/api'){
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(beatles))
  }
  else if(req.url === '/John%20Lennon'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    let html = fs.readFileSync(__dirname + '/beatle.html', 'utf-8')
    html = html.replace(/{name}/g, Jhon.name)
    html = html.replace(/{link}/g, Jhon.profilePic)
    html = html.replace(/{fecha}/g, Jhon.birthdate)
    res.end(html)
  }
  else if(req.url === '/George%20Harrison'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    let html = fs.readFileSync(__dirname + '/beatle.html', 'utf-8')
    html = html.replace(/{name}/g, George.name)
    html = html.replace(/{link}/g, George.profilePic)
    html = html.replace(/{fecha}/g, George.birthdate)
    res.end(html)
  }
  else if(req.url === '/Paul%20McCartney'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    let html = fs.readFileSync(__dirname + '/beatle.html', 'utf-8')
    html = html.replace(/{name}/g, Paul.name)
    html = html.replace(/{link}/g, Paul.profilePic)
    html = html.replace(/{fecha}/g, Paul.birthdate)
    res.end(html)
  }
  else if(req.url === '/Richard%20Starkey'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    let html = fs.readFileSync(__dirname + '/beatle.html', 'utf-8')
    html = html.replace(/{name}/g, Richard.name)
    html = html.replace(/{link}/g, Richard.profilePic)
    html = html.replace(/{fecha}/g, Richard.birthdate)
    res.end(html)
  }
}).listen(1337, '127.0.0.1')
