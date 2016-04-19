
write = function(s) {
        var h = document.getElementById("output").innerHTML;
        document.getElementById("output").innerHTML = h + "<br>" + s;
};

db = new DB("levi", "784N7cvbz2eUTenm");

function save_order(order) {
        db.sql("insert into orders (customer, `order`) values(?, ?)", [order.customer, o2j(order)], function(r) {
                if(r.error) {
                        alert("Save Error: "+o2j(r.error));
                }
        });
}

function input_data() {
        x = document.getElementById("name").value;
	x = x.toLowerCase();
        x = x.split(" ");

        if(x[0] === undefined && x[1] === undefined && x[2] === undefined) {
               write("error");
        }
	else 
	if(x[0] !== undefined && x[1] === undefined && x[2] === undefined) {
		write("error");
	}
	else 
	if(x[0] !== undefined && x[1] !== undefined && x[2] === undefined) {
		write("error");
	}
	else { // defined
		if(x[0] === "new" && x[1] === "order" && x[2] !== undefined) {
			new_order(x[2]);
			write(order.customer[0].product);
		}
		else {
			write("incorrect entry");
		}
	}
};

order = {
	customer: [],  
};

new_order = function(cname) {
	cname = {
		product: p,
		price: pr,
		qty: q,
	}
	cname.push(order.customer);
}

