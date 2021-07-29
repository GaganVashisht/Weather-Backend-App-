const express = require("express");
const path=require("path");
const hbs=require("hbs");
const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");

const app = express();
// defineing paths
const publicDirectoryPath=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");
// setup handlers ,views and partials
app.set("view engine","hbs");
app.set("views",viewPath);
hbs.registerPartials(partialsPath); 

//static dir to serve
app.use(express.static(publicDirectoryPath));

app.get("",(req,res)=>{
  res.render("index",{
    title:"Weather app",
    name:"Gagan"
  }); 
});
app.get("/about",(req,res)=>{
  res.render("about",{
    title:"About Page",
    name:"Gagan "
  });
});
app.get("/help",(req,res)=>{
  res.render("help",{
    title:"Help Page",
    helptext:"This is some helpful text",
    name:"Gagan "
  });
});

app.get("/weather", (req, res) => {

  if(!req.query.address){
    return res.send({
      error:"You must provide address",
    });
  }

  geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({ error });
    }
      forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
          return res.send({error});
        }
        res.send({
          forecast:forecastData,
          location,
          address:req.query.address,
        })
      })
    
  });



  // res.send({
  //   forcast: "Clear sky",
  //   location: "Talwara, Punjab, India",
  //   address:req.query.address,
  // });


});

app.get("/help/*",(req,res)=>{
  res.render("404",{
    errorMessage:"Help Article not found",
    title:"404",
    name:"Gagan"
  });
});


app.get("*",(req,res)=>{
  res.render("404",{
    errorMessage:"Page not Found",
    title:"404",
    name:"Gagan"
  });
});


app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
