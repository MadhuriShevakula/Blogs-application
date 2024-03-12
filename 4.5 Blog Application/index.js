import bodyParser from "body-parser";
import express from "express";
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

// app.use(methodOverride("_method"));
var posts=[];

app.get("/",(req,res)=>{
    res.render("index.ejs",{ posts });
})

app.post("/add",(req,res)=>{
    console.log(req.body);
    const newPost = req.body.blogPost;
    posts.push(newPost);
    console.log(posts);
    res.redirect("/");
})

app.post("/edit/:index",(req,res)=>{
    const index=req.params.index;
    const editedPost=req.body.editedPost;
    posts[index]=editedPost;
    res.redirect("/");
});

app.post("/delete/:index",(req,res)=>{
    const index=req.params.index;
    posts.splice(index,1);
    res.redirect("/");
})
app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
})