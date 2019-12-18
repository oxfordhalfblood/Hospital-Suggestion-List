const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var config = require('./config.js');
const morgan = require('morgan');
const mysql = require('mysql');
var router = express.Router();
var HashMap = require('hashmap');
var Map = require('sorted-map');
var ArrayList = require('arraylist');
var HashTable = require('hashtable');
var Multimap = require('multimap');
const sortMap = require('sort-map')

const request = require('request');
const argv = require('yargs').argv;
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
// const dom = new JSDOM('index.ejs');

app.use(morgan('short'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(auth)
// app.set('views', '/views')
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    
    let url = `http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses`
    
    request(url, function(error, response, body, next) {
        var illness = JSON.parse(body)
        var ill = illness._embedded.illnesses
        //var link = _links.self        
        
       res.render('index', {ill: ill} );
    });

});




function getConnection(){
    var connection = mysql.createConnection(config.databaseOptions);
    return connection

}

app.get('/apires', (req,res)=> {
    let url = `http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals`;

        request(url, function(error, response, body, next) {

            var parseddata = JSON.parse(body)
            var hospitals = parseddata._embedded.hospitals
            var hosid = hospitals.id 
          
            res.json(hospitals);
  });
  
    //res.send("api data page");
})

app.post('/displayhospital', (req, res) => {
    console.log("trying to get form data");
    const email = req.body.email_name;
    const disease = req.body.disease;
    const pain = req.body.pain;
    const queryString = "INSERT INTO patient (email, disease, painlevel) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE disease = VALUES(disease), painlevel = VALUES(painlevel)"

    // var painmap= new HashMap();

    // map.set("Mild", 0);
    // map.set("Moderate", 1);
    // map.set("Severe", 2);
    // map.set("Very Severe", 3);
    // map.set("Extreme Pain", 4);


    const pains = {
        "Mild": 0,
        "Moderate":1,
        "Severe":2,
        "Very Severe":3,
        "Extreme Pain":4
      }


    if(email==""){
        res.redirect('back');
    }

    else{
         
    getConnection().query(queryString, [email,disease,pain],(err,results, fields)=>
    {
        if(err){
            console.log("failed to insert in db" + err);
            res.sendStatus(500)
           // res.redirect('back');
            // res.render('index')
            //return
        }
        console.log("inserted new patient ");
        
        // res.end();

    })

    let url = `http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals`;

    request(url, function(error, response, body, done) {

        var parseddata = JSON.parse(body)
        var hospitals = parseddata._embedded.hospitals
        var hosid = hospitals.id 
        var name = []
        var list = new ArrayList;
        var w_time = []
        var map = new HashMap();
        var obj = {};
        var hashtable = new HashTable();
        var m = new Multimap();
        
        // res.render('result', { hospitals: hospitals });
        if (error) throw new Error(error);

        else{ 
            hospitals.forEach(function(h){

            wlist = h.waitingList
            //if(pain === h.waitingList.)
            wlist.forEach(function(wl){
                // console.log(pains[pain]); 
                hospitalpain = wl.levelOfPain;
                // console.log("hospain", pains[pain], hospitalpain); 

                // if(pains[pain] === hospitalpain)   //  [arraylist]
                if(pains[pain] === hospitalpain)
                {  
                    // console.log(h.name);  
                    ptncnt = wl.patientCount;
                    avgtime = wl.averageProcessTime;
                    time = ptncnt*avgtime;
                    // console.log(time);  
                    // map.set(time, h.name);
                    // list.add({});
                   list.add({name: h.name, time: time});   //  [arraylist]
                   // console.log(list.get(6));  
                //    hashtable.put(time,h.name);  [hashtable]
                    // m.set(time, h.name);
                } 

            });
        });

        list.sort((a, b) => a.time - b.time);
        
            list.each(function(k){
                console.log(k.name);
                console.log(k.time);
              });
            res.render('result', { hospitals: list}); 
            
        }
        res.end();
    });

    }
});
    

    


const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

