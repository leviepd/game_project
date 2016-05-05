
write = function(s) {
        var h = document.getElementById("output").innerHTML;
        // var h points at output element in html
	document.getElementById("output").innerHTML = h + "<br>" + s;
	// sets element id to h (h is empty) then adds "s". S is the argument that is being passed into the write function. In this case s will be a string. The string will then be displayed on the page through the element id.
};

db = new DB("levi", "784N7cvbz2eUTenm");
// establishes a connection to the database
function save_order() {
	db.sql("insert into orders (customer) values(?)", [order.customer], function(r) {
                // inserts into orders table a customer
		if(r.error) {
                        alert("Save Error: "+o2j(r.error));
			// If there is an error, then alert that there was a save error                
}
		else {
			var id = r.insert_id
			// set id = the id within the database
			for(var i = 0; i < order.lines.length; i++) {
         	        // loop through lines array
				order.lines[i].order_id = id;
				// add id to order_id
               			write(order.lines[i].order_id);
				// write out the order id of the order that has just been saved
				db.sql("insert into items (order_id, product, price, qty) values(?, ?, ?, ?)", [order.lines[i].order_id, order.lines[i].product, order.lines[i].price, order.lines[i].qty], function(r) {
				// insert into items table the order_id, product, price, and quantity
					if(r.error) {
						alert("Save Error: " + o2j(r.error));
						// if there is an error alert that there is a save error
					}	
        			});
			}	
		}
	});	
}

order = {
        customer: "",
        lines: [
	/* data = {
		prod: "" ,
		qty: "" ,
		price: "" ,
	   }; */ 
	],
}

function input_data() {
	var e = document.getElementById("product");
	var y = e.value;
	e.value = "";
	var e = document.getElementById("quantity");
	var z = e.value;
	e.value = "";
	e = document.getElementById("price");
	var p = e.value;
	e.value = "";
	// set e = to the element ids above. Then set the id values equal to given variable... y, z, p

	if(y === "") {
                write("invalid value, must enter product.");
                return;
        }
        if(z === "") {
                write("invalid value, must enter quantity.");
                return;
        }
        if(p === "") {
                write("invalid value, must enter price.");
                return;
        }
	
	// if the values of the given variables are equal to an empty string, then write out invalid value. 

	line_data(y, z, p);

	// call line_data function and pass in the arguments y, z, and o

	for(i = 0; i < order.lines.length; i++) { 
	// loop through order.lines array 
		write("--- Product: " + order.lines[i].product + " Quantity: " + order.lines[i].qty + " Price: " + order.lines[i].price);	
		// while looping through the array write the following values.. Porduct, quantity, and price.... or y, z, and p
	}
	write("");
	// write an empty string in order for the text on the page to be more readable
};

click_save = function() {
	var x  = document.getElementById("name").value;
	// set x equal to the value of the element with the id "name"
	if(x === "") {
                write("invalid value, must enter customer name.");
        	return;
	}
	// if the value of the element with the id of "name" is equal to zero, then write out invalid value
        else {
                order.customer = x;
		save_order();
	}
	// otherwise order.customer is equal to the value of x. x is the value of the element with the id "name". Then call the function save_order
};

line_data = function(prod, num, pr) {
	data = {
		product: prod,
		qty: num,
		price: pr,
	}
	order.lines.push(data);
}
// line_data is a function that creates an object. The object is them pushes into an array called "lines". each order object has an array of lines. These lines contain information similiar to an invoice. 
