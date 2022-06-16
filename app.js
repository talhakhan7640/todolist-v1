const express = require("express");
const bodyParser = require("body-parser");
const mongoose  = require("mongoose")

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
	const itemName = req.body.item
	if(itemName.length == 0) {
		res.redirect("/")
	} else {
		const newItem = new Item({
			name: itemName
		})

		newItem.save().then(() => console.log('Item added'))
	}
	res.redirect("/")
})

app.post("/delete", (req, res) => {
	const checkedItemId = req.body.checkbox

	Item.findByIdAndDelete(checkedItemId, function (err, docs) {
		if (err){
			console.log(err)
		}
		else{
			console.log("Deleted : ", docs);
			res.redirect("/")
		}
	});
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