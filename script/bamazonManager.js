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
			console.log(ans.selectPrompt);

			
			function productSales() {
				// for (var i=0; i<)
				connection.query('SELECT * FROM products', function(err, res) {
					if (err) throw err;
					console.log(res);

					for (var i = 0; i < res.length; i++) {
						if (ans.selectPrompt === 'View Products for Sale') {
							console.log(res[i].id);
							console.log(res[i].product_name);
							console.log('$' + res[i].price);
							console.log(res[i].stock_quantity);
							console.log('-----------------------------------------------------------');
						}
					}

					//
				});
            };
            
            productSales()
		});
};

// begin();

// var sale = function() {
// 	console.log('id');
// };
