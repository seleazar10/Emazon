var mysql = require('mysql');
var inquirer = require('inquirer');

var begin = function(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'selectPrompt',
            message: 'Select from the menu below:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function(ans){
        console.log(ans)
    })
}

begin()