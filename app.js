const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js')

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

var items = [];
var workItems = [];

app.get("/", (req, res) => {

	let day = date()

	res.render('list', {listTitle: day, newListItem: items})
})

app.post("/", (req, res) => {

	item = req.body.item

	// console.log(req.body)

	if(req.body.list === "Work List") {
		workItems.push(item)
		res.redirect("/work")
	} else {
		// Putting items into array 
		items.push(item)
		res.redirect("/")
	}

	
	

	
})


app.get("/work", (req,res) => {
	res.render("list", {listTitle: "Work List", newListItem: workItems})
})

app.post("/work", (req, res) => {
	let item = req.body.item;
	workItems.push(item)

	res.redirect("/work")
})

app.listen(3000, () => {
	console.log('server is running on port 3000');
})