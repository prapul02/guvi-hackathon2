const mongoose = require("mongoose");

const { Schema, model } = mongoose;


const theatreSchema = new Schema({            
	theatreName: String,
	theatreSeats: Number,
	ticketPrice: Number,
	theatreShows: Number
});

const Theatre = model("Theatre", theatreSchema);

module.exports = Theatre;