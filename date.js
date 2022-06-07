module.exports = getDate;

function getDate() {
	let today = new Date()

	 var options = {
	 	weekday: "long",
	 	day: "numeric",
	 	month: "long"
	 };

	var day = today.toLocaleDateString("en-US", options);

	// var currentDay = today.getDay()

	// res.render('list', {listTitle: day, newListItem: items})

	return day
}