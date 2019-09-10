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
			// console.log(ans);
			console.log(ans.selectPrompt);

			function productSales() {
				// for (var i=0; i<)
				connection.query('SELECT * FROM products', function(err, res) {
					if (err) throw err;
					// console.log(res);

					var lessFive = [];

					for (var i = 0; i < res.length; i++) {
						if (ans.selectPrompt === 'View Products for Sale') {
							console.log(res[i].id);
							console.log(res[i].product_name);
							console.log('$' + res[i].price);
							console.log(res[i].stock_quantity);
							console.log('-----------------------------------------------------------');
						} else if (ans.selectPrompt === 'View Low Inventory') {
							// console.log(res[i].id);
							// console.log(res[i].stock_quantity);

							if (res[i].stock_quantity < 5) {
								// console.log(res[i].product_name + ' has less than 5 remaining. Order quick!');

								lessFive.push(res[i].product_name);
							}
							// console.log('-----------------------------------------------------------');

							console.log(lessFive);
						} else if (ans.selectPrompt === 'Add to Inventory') {
							console.log('ID:' + res[i].id);
							console.log('name:' + res[i].product_name);
							console.log('Current quantity: ' + res[i].stock_quantity);

							// addNew()
							adder();
						}
					}

					// console.log('The items below have less than 5 remaining:')

					// console.log(lessFive)

					//
				});
			}

			productSales();

			var adder = function() {
				inquirer
					.prompt([
						{
							type: 'list',
							name: 'selectPrompt',
							message: 'Select an item below',
							choices: function() {
								for (var i = 0; i < res.length; i++) {
									console.log(res);
								}
							}
						},
						{
							type: 'input',
							name: 'addMoreQty',
							message: 'How many more do you want to add?'
						}
					])
					.then(function(answer) {
						// console.log(ans);
						console.log('thing 2');

						// function productSales() {
						//     // for (var i=0; i<)
						//     connection.query('SELECT * FROM products', function(err, res) {
						//         if (err) throw err;
						//         // console.log(res);

						//         var lessFive = [];

						//         for (var i = 0; i < res.length; i++) {
						//             if (ans.selectPrompt === 'View Products for Sale') {
						//                 console.log(res[i].id);
						//                 console.log(res[i].product_name);
						//                 console.log('$' + res[i].price);
						//                 console.log(res[i].stock_quantity);
						//                 console.log('-----------------------------------------------------------');

						//             }else if(ans.selectPrompt === 'View Low Inventory'){
						//                 // console.log(res[i].id);
						//                 // console.log(res[i].stock_quantity);

						//                 if(res[i].stock_quantity < 5){
						//                     // console.log(res[i].product_name + ' has less than 5 remaining. Order quick!');

						//                     lessFive.push(res[i].product_name)

						//                 }
						//                 // console.log('-----------------------------------------------------------');

						//                     console.log(lessFive)

						//             }
						//            else if(ans.selectPrompt === 'Add to Inventory'){
						//                 console.log("ID:" + res[i].id);
						//                 console.log("name:" + res[i].product_name);
						//                 console.log('Current quantity: ' + res[i].stock_quantity);

						//                 addNew()
						//             }
						//         }

						// console.log('The items below have less than 5 remaining:')

						// console.log(lessFive)

						//
					});
			};

			productSales();

			// function addNew(){

			// inquirer.prompt([
			//     {
			//       type: 'input',
			//         name: 'addMoreQty',
			//         message: 'How many more do you want to add?'
			//     }
			// ])

			// connection.query("UPDATE products SET ? WHERE ?",
			// [
			//     {
			//         stock_quantity: answer.numb
			//     },
			//     {
			//         id = res.id
			//     }

			// ],
			// function(err) {
			//     if (err) {
			//         console.log('err');
			//     } else {
			//         console.log('it is sucessful');

			//     }
			// }

			// );

			//     console.log('yupp')
			// }
		});
};
