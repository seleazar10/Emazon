var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '232400',
	database: 'bamazon_db'
});

connection.connect(function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected as id: ' + connection.threadId);
		begin();
	}
});


var begin = function() {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'selectPrompt',
				message: 'Select from the menu below:',
				choices: [ 'View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product' ]
			}
		])
		.then(function(ans) {
			console.log(ans);
		});
};

// begin();

// var sale = function() {
// 	console.log('id');
// };
