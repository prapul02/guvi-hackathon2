const express = require("express");
const Theatre = require("../models/theatreModel");

const theatrerouter = express.Router();

const getAllTheatres =  () => {
    Theatre.find({}, function (err, docs) {
        console.log(JSON.parse(JSON.stringify(docs)));
      return  JSON.parse(JSON.stringify(docs));
   });
  };

theatrerouter.get('/getTheatre', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Theatre.find({}, function (err, docs) {
         res.json(docs);
    });
});

theatrerouter.get('/getTheatre/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Theatre.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

theatrerouter.post('/addTheatre', function(req, res){

var theatre = new Theatre({                
  theatreName : req.body.theatreName,
  theatreSeats: req.body.theatreSeats,
  ticketPrice: req.body.ticketPrice,
  theatreShows: req.body.theatreShows
  });
console.log(theatre)
console.log("i m here")
    theatre.save(function(err, docs){       
     if ( err ) throw err;
     console.log("Theatre Saved Successfully");
    res.json(docs);
});

});

theatrerouter.delete('/deleteTheatre/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Theatre.remove({_id:req.params.id}, function(err, docs){    
        res.json(docs);
    });
});

theatrerouter.put('/updateTheatre/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
   Theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {      
      //console.log(data);
      res.json(data);
    });
});

module.exports = {
    theatrerouter,
    getAllTheatres
}