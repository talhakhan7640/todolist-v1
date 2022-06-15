const express = require("express");
const bodyParser = require("body-parser");
const mongoose  = require("mongoose")
// const date = require(__dirname + '/date.js')

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/todolistDB")

// Create mongoose schema 
const itemSchema  = new mongoose.Schema({
	name: String
})
const Item = mongoose.model("Item", itemSchema)

// var items = [];
// var workItems = [];

// ------------ Putting default items in database --------------
const item1 = new Item({
	name: "Welcome to ToDoList."
})
const item2 = new Item({
	name: "Hit the + button to add new item."
})
const item3 = new Item({
	name: "<--- Hit this to delete an item."
})

const defaultItems = [item1, item2, item3]

app.get("/", (req, res) => {
	// let day = date()

	Item.find({}, function(err, foundItems) {
		if (foundItems.length == 0) {
			Item.insertMany(defaultItems, function(err){
				if(err) {
					console.log(err);
				} else {
					console.log("successfully inserted deafult items to DB.")
				}
			});
			res.redirect("/")
		} else {
			res.render('list', {listTitle: "Today", newListItem: foundItems } )
		}
	})
	// res.render('list', {listTitle: "Today", newListItem: defaultItems } )
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