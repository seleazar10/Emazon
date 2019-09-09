var inquirer = require('inquirer');
var mysql = require('mysql');

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
		start();
	}
});

function start() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) {
			console.log(err);
		} else {
			// console.log(res);
		}

		inquirer
			.prompt([
				{
					type: 'rawlist',
					name: 'choice',
					choices: function() {
						var choiceArray = [];
						for (var i = 0; i < res.length; i++) {
							choiceArray.push(res[i].product_name);
						}
						// console.log(choiceArray);

						return choiceArray;
					},
					message: 'Please select the ID of the desired item'
				},
				{
					type: 'input',
					name: 'numbToBuy',
					message: 'How many units of the product would you like to buy?'
				}
			])
			.then(function(answers) {
				// console.log(answers);
				// console.log(answers.choice);
				// console.log(answers.numbToBuy);
				for (var i = 0; i < res.length; i++) {
					// console.log(res[i].stock_quantity)

					if (answers.choice === res[i].product_name) {
						console.log('matched');
						var selectedProduct = res[i].product_name;
						console.log(selectedProduct);
						// console.log(res[i].stock_quantity);

						if (parseInt(answers.numbToBuy) > res[i].stock_quantity) {
                            console.log('Insufficient quantity!');
                            start();
						} else {
							// console.log('lets order');
							connection.query('UPDATE products SET ? WHERE ?', [
								{
									stock_quantity: res[i].stock_quantity - parseInt(answers.numbToBuy)
								},
								{
									id: res[i].id
								}
							]);
							console.log('Your total amount is: '+ res[i].price);
                            console.log('Amount left: '+ res[i].stock_quantity);
                            
                            start()
						}
					} else {
						// console.log('no')
					}
				}
			});
	});
}
