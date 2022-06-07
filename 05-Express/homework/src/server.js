// const bodyParser = require("body-parser");
const { response } = require("express");
const express = require("express");
const server = express();
const STATUS_USER_ERROR = 422;
server.use(express.json())
let contador = 1;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

server.post('/posts', (req,res,next) => {
    let {author,title,contents}= req.body

    if (!author||!title||!contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    } 
    let post = {
        author:author,
        title:title,
        contents: contents,
        id:contador
    }
    posts.push(post)
    contador++
    return res.status(200).json(post)
    
})

server.post('/posts/author/:author', (req,res,next) =>{
    let {title,contents}= req.body
    
    if (!contents||!title) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    } 
})



server.get('/posts/:author', (req,res,next) => {
    let{author} = req.params
    let arr = []
    
    if(author){
        
        arr = posts.filter(elem => elem.author === author)

        if (arr.length<1) {
            return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
        }

        res.status(200).json(arr)
        
    }else{
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    
})

server.get('/posts/:author/:title', (req,res) => {
    let {author,title} = req.params
    let arr = []

    posts.forEach((e) => {
        if(e.author === author && e.title === title){
            arr.push(e)
        }
    })
    
    if(arr.length < 1) {
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }
    res.status(200).json(arr)
})

server.get('/posts',  (req,res,next) => {
    let arr = []
    let {term} = req.query;
    
    if(
        
        posts.find((elem) => {
            if(elem.title.includes(term) || elem.contents.includes(term)){
                return true
            } else{
                return false
            }
        })  
        
    ){
        
        arr = posts.filter(elem => elem.title.includes(term) || elem .contents.includes(term))
        res.status(200).json(arr)
        
    }else{
        res.status(200).json(posts)
    }
})


server.get('/posts',  (req,res,next) => {
    res.json(posts)
    
})


server.put('/posts', (req,res) => {
    const {id,title,contents} = req.body

    if (!id||!title||!contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }

    const busqueda = posts.find(e => e.id === id)

    if (busqueda) {

        busqueda.title = title;
        busqueda.contents = contents;

        return res.status(200).json(busqueda)
    }else{
        return res.status(STATUS_USER_ERROR).json({error: 'No se encuentra el post con ese id'})
    }
})


server.delete('/posts', (req,res) => {
    const {id} = req.body
    console.log(id);
    if(!id) return res.status(STATUS_USER_ERROR).json({error: 'No enviaste el id :)'})

    const post = posts.find(e => e.id === id)
    if (post === undefined) {
        return res.status(STATUS_USER_ERROR).json({error: 'No se encontro el post con ese Id :)'})
    } 

    posts = posts.filter(e => e.id !== id)
    return res.json({ success: true })
})

server.delete('/author' , (req,res) => {
    const {author} = req.body

    if(!author) return res.status(STATUS_USER_ERROR).json({error: "No me enviaste el author"})

    const autor = posts.find(e => e.author === author)
    console.log(autor);
    if (autor === undefined) {
        return res.status(STATUS_USER_ERROR).json({error: 'No existe el autor indicado'})
    } 
    
    let postAuthor = posts.filter(e => e.author === author)
    posts =  posts.filter(e => e.author !== author)
    return res.json(postAuthor)
})


// TODO: your code to handle requests


module.exports = { posts, server };
