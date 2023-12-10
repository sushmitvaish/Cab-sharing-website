var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bankdetailsnew');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
	console.log("connection succeeded");
})

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

var Schema = mongoose.Schema;
var bankSchema = new Schema({
    account:  String,
    amount: Number
  });

var Bank = mongoose.model('Bank', bankSchema);


app.post('/debited', function (req, res) {
	var account = req.body.account;
	var amount = req.body.amount;
	console.log(account);
	console.log(amount);
	
	Bank.findOne({account: account}, function (err, bankval) {
		if (err) {
			console.log("Error");	
		}
		bankval.amount =  bankval.amount - amount;
		bankval.save();
		console.log(bankval);
		
	});
	return res.redirect('debit.html');
})




app.get('/', function (req, res) {
	Bank.inserOne({account: account}, function (err, bankval) {
		if (err) {
			console.log("Error");	
		}
		bankval.amount =  baamount;
		console.log(bankval.amount);
			
	});
	res.set({
		'Access-control-Allow-Origin': '*'
	});
	return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");