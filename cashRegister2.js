
write = function(s) {
	var h = document.getElementById("output").innerHTML;
	document.getElementById("output").innerHTML = h + "<br>" + s;
	// why is <br> in quatations??
}


db = new DB("levi", "784N7cvbz2eUTenm");

function save_order(order) {
	db.sql("insert into orders (customer, `order`) values(?, ?)", [order.customer, o2j(order)], function(r) {
		if(r.error) {
			alert("Save Error: "+o2j(r.error));
		}
	});
}

function show_order(num) {
	db.sql("select * from orders where id=?", [num], function(r) {
		if(r.error) {
			alert("Save Error: "+o2j(r.error));
		}
		var o = j2o(r.records[0].order);
		// JSON to object 
		// is norder now o?	
		write("Name: " + o.customer);
		write("Total: " + o.tote);
		for(i = 0; i < o.lines.length; i++) {
			write(o.lines[i].product.name);
			write(o.lines[i].qty);
			write(o.lines[i].sub);
		}
	});
}

function show_order_search(letter) {
        db.sql("select * from orders where customer like ?", ["%" + letter + "%"], function(r) {
                if(r.error) {
                        alert("Error: " +o2j(r.error));
                }
                if(r.records.length === 0) { // All records?
                        write("No existing Record(s).");
                }
                else {
                        for(y = 0; y < r.records.length; y++) {
                                var x = j2o(r.records[y].order);
				write("Name: " + r.records[y].customer);
                               	write("Total: " + x.tote);
                               	for(i = 0; i < x.lines.length; i++) {
                                       	write(x.lines[i].product.name);
                                     	write(x.lines[i].qty);
                                       	write(x.lines[i].sub);
                               		write("");
				}
			}
                }
        });
}

function change_name(num, new_name) {
	db.sql("select * from orders where id=? ", [num], function(r) {
		if(r.error) {
			alert("Error: " + o2j(r.error));
		}
		else {
			db.sql("update orders set customer =? where id =?", [new_name, num], function(r) {
				if(r.error) {
					alert("Update Error: " +o2j(r.error));	
				}
			}); 
		}
	});
}


// type save
// pass order to save_order() 
//


// Data 

snes = {
	name: "snes",
	price: 75,
};

sega = {
	name: "sega",
	price: 40,
};

gamecube = {
	name: "gamecube",
	price: 40,
};

ps1 = {
	name: "ps1",
	price: 40,
};

products = [snes, sega, gamecube, ps1];

// Order Holds The Data

order = {
	byName: [], // contains orders byname
}

// Do's... If type customer name, then create a new order
// When finished with the order store the order in seperate location (maybe an array for now)
// Be able to clear the order

// Inputs handle_data into HTML

function input_data(element) {
	handle_data(element.value);
	element.value = "";
	element.scrollIntoView();
}
function new_order(a) {
	a = {
		customer: a,
		lines: [], // product, qty, sub
		tote: "",
	}
	norder = a;
	write(norder.customer);
}


// Prints Item, Cost.
// Calculates Item's Subtotal

function sub_total(prod, num) {
	write("Product: " + prod.name);
	write("Price: " + prod.price);
	var l = {
		product: prod,
		qty: num,
		sub: prod.price * num,
	}
	// l for "lines"...
	norder.lines.push(l);
	// pushes l into "lines" array.
}

// Calculates Order Total

total = 0;

calc = true;

calcTot = function() {
	if(calc === true) {
	var i;
	for(var i = 0; i < norder.lines.length; i++) {
		total += norder.lines[i].sub;
	}
	norder.tote = total;
	write("");
	write("Customer: " + norder.customer);
	write("Total: " + total);
	
	order.byName.push(norder);
	}
};

// Handles the Data

no = 0;

handle_data = function(data) {
	data = data.toLowerCase();
	data = data.split(" ");  // ["", ""]
	entry = data[0];
	num = parseInt(data[1]);
	
	var i;
	for(i = 0; i < products.length; i++) {
		var prod = products[i];
		if(entry === prod.name) {
			if(num === undefined) {
				write("Enter the item, and the item's quantity.");
			}
			else { // num is defined
				sub_total(prod, num);
			}
		}
	}
	if(entry === "customer") { 
		// changes customer name using the order id...
		// "customer", "change" (order id), then (new name of customer)... 
		if(data[1] === "change") {
			var num = parseInt(data[2]);
			var new_name = data[3];
			change_name(num, new_name);
			// How to make it so that can change name by useing name rather than order id #...
		}
	}
	else 
	if(entry === "new") {
		if(data[1]) {
			new_order(data[1]);
		}
	}
	else
	if(entry === "subtotal") {
		var i;
		for(i = 0; i < norder.lines.length; i++) {
			write("");
			write("Product: " + norder.lines[i].product.name);
			write("Quantity: " + norder.lines[i].qty);
			write("Subtotal: " + norder.lines[i].sub);
		}
	}
	else 
	if(entry === "total") {
		calcTot();
		calc = false;
	}
	else
	if(entry === "save") {
		if(norder === undefined) {
			write("There is no order to be saved.");
		}
		else { // norder has been defined
			save_order(norder);	
		}
	}
	else
	if(entry === "show") {
		if(num) { // shows by the order number
			show_order(num);
		}
		else
		if(data[1]) {
			show_order_search(data[1]);
		}
	}
};

