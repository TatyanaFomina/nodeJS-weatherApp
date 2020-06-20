const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));



app.get('', (req,res)=> {
    res.render('index', {title:"Weather App", name: 'Tanya F'});
})

app.get('/about', (req,res)=> {
    res.render('about',{title:"About me", name:"Tanya F"});
})

app.get('/help', (req,res)=> {
    res.render('help',{title:"Help", message:"Help message by Tanya F", title: "Help", name:"Tanya F"});
})

app.get('/weather', (request,response)=> {
    if(!request.query.address) {
        return response.send({
            error: 'You must provide an address!',
        })
    } 
    geocode(request.query.address, (error, {latitude, longitude, location} = {})=> {

        if(error) {
            return  response.send({error});
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return response.send({error});
            }
        response.send({location, forecastData});
        
        
      })
    })
   
})

app.get('/products', (request,response)=> {
    if(!request.query.search){
        return response.send({
            error:'You must provide a search term',
        })
    }
    response.send({products: []});
})

app.get('/help/*', (req, res)=> {
    res.render('error', {title:'404 Page',errorMessage:'Help article not found', name:"Tanya F"})
})

app.get('*', (req,res)=> {
    res.render('error', {title:'404 Page', errorMessage:'My 404 page', name:'Tanya F'});
})

app.listen(3000,()=> {
    console.log('Server is up on port 3000')
})