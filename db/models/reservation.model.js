var mongoose = require('mongoose');
var reservationSchema = mongoose.Schema({
  date-arrivée: Date,
  date-départ: Date,
  réservation: String,
  nombre-personnes: Number
});

mongoose.model("Réservation",reservationSchema, "reservation");
