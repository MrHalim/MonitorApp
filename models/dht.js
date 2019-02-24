/* jshint esversion:6*/
const db	= require('../models/db');
const sensor	= require('node-dht-sensor');


module.exports = setInterval(function(){
	sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
        
	var t = temperature.toFixed(1);
	var h = humidity.toFixed(1);
	
	
	db.connect(function(err) {
 		if (!err){
  		//	console.log("Connected!");
			}
	var post ={Temperature: t, Humidity:h}
	//var sql = "INSERT INTO DHT (temperature, humidity) SET ? (t, h)";
	var s = db.query('INSERT INTO dht SET ?', post, function(err, result) {

 	});
 	//console.log(s.sql);

    
	});
 }
});
}, 100000);

