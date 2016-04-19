
write = function(s) {
        var h = document.getElementById("output").innerHTML;
        document.getElementById("output").innerHTML = h + "<br>" + s;
};

db = new DB("levi", "784N7cvbz2eUTenm");

function save_order(order) {
        db.sql("insert into orders (customer) values(?)", [order.customer], function(r) {
                if(r.error) {
                        alert("Save Error: "+o2j(r.error));
                }
        });
}

norder = false;

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
        var x  = document.getElementById("name").value;
	var e = document.getElementById("product");
	var y = e.value;
	e.value = "";
	var e = document.getElementById("quantity");
	var z = e.value;
	e.value = "";
	e = document.getElementById("price");
	var p = e.value;
	e.value = "";
	
	if(x === "") {
		write("invalid value, must enter customer name.");
	}
	else {
		order.customer = x;
	}
	if(y === "") {
		write("invalid value, must enter product.");
	}
	if(z === "") {
		write("invalid value, must enter quantity.");
	}
	if(p === "") {
		write("invalid value, must enter price.");
	}
	
	line_data(y, z, p);
	for(i = 0; i < order.lines.length; i++) { 
	write("--- Product: " + order.lines[i].product + " Quantity: " + order.lines[i].qty + " Price: " + order.lines[i].price);	
	}
	write("");
	
};

line_data = function(prod, num, pr) {
	data = {
		product: prod,
		qty: num,
		price: pr,
	}
	order.lines.push(data);
}
