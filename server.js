var express = require('express');
var app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const fs=require("fs");
const { redirect } = require('express/lib/response');
app.set('view engine','ejs'),


app.use(express.static(__dirname+"/public"))
app.get('/',function(req,res){
    res.render("index.ejs");
})

app.get('/books', function(req, res){
    fs.readFile(__dirname+"/books.txt",(err,data)=>{
        let sended=JSON.parse(data.toString());
        console.log("sended:",sended);
        res.render("books.ejs",{books:sended});      
    }
    
)

})
    
    
app.get('/addbook', function(req, res){
    res.render("AddBook.ejs");
});

app.post("/addbook",function(req,res){
    console.log(req.body);
    fs.readFile(__dirname+"/books.txt",(err,data)=>{
        const d = JSON.parse(data.toString());
        d.push(req.body)
        fs.writeFile(__dirname+"/books.txt", JSON.stringify(d),()=>{
        console.log("success")
        res.redirect("/books")
        });
   })
})



app.listen(3000);