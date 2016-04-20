
write = function(s) {
        var h = document.getElementById("output").innerHTML;
        document.getElementById("output").innerHTML = h + "<br>" + s;
};

db = new DB("levi", "784N7cvbz2eUTenm");

function save_order() {
	db.sql("insert into orders (customer) values(?)", [order.customer], function(r) {
                if(r.error) {
                        alert("Save Error: "+o2j(r.error));
                }
		else {
			var id = r.insert_id
			alert(id);
			for(var i = 0; i < order.lines.length; i++) {
         	         	order.lines[i].order_id = id;
               			write(order.lines[i].order_id);
				db.sql("insert into items (order_id, product, price, qty) values(?, ?, ?, ?)", [order.lines[i].order_id, order.lines[i].product, order.lines[i].price, order.lines[i].qty], function(r) {
					if(r.error) {
						alert(("Save Error: " + o2j(r.error));
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

	line_data(y, z, p);

	for(i = 0; i < order.lines.length; i++) { 
		write("--- Product: " + order.lines[i].product + " Quantity: " + order.lines[i].qty + " Price: " + order.lines[i].price);	
	}
	write("");
};

click_save = function() {
	var x  = document.getElementById("name").value;
	if(x === "") {
                write("invalid value, must enter customer name.");
        	return;
	}
        else {
                order.customer = x;
		save_order();
	}
};

line_data = function(prod, num, pr) {
	data = {
		product: prod,
		qty: num,
		price: pr,
	}
	order.lines.push(data);
}
