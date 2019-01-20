const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

app.use((req,resp,next)=>{
    var now = new Date();
    console.log(`${now} ${req.method} ${req.url}`);
    next();
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get("/", (req,res)=>{
    res.render('home.hbs',{
        pageTitle:"Home Page",
        //currentYear:new Date().getFullYear(),
        welcomeMsg :'This is the Welcome screen.',
        link:'about'
    });
    
});

app.get('/about',(req,resp)=>{
    resp.render('about.hbs', {
        pageTitle:"About Page"
        //currentYear : new Date().getFullYear()
    });
});

app.get('/bad',(req,resp)=>{
    resp.send({        
        errorMessage : 'not able to response now'
    });
});
app.listen(3000, ()=>{
    console.log('server is up on port 3000');
});