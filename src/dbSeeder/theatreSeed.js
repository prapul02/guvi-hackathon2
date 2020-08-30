require("../config/dbConfig");
const Theatre = require("../models/theatreModel");

const saveTheatre = async () => {
    const newTheatre = new Theatre({
        theatreName: "PVR",
      theatreSeats: 100,
      ticketPrice: 250,
      theatreShows: 4
    });
  
    try {
      const result = await newTheatre.save();
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };


  saveTheatre();