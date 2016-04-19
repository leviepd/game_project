
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
};

order = {
	customer: cname, 
};

new_order = function(cname) {
	cname = {
		product: p,
		price: pr,
		qty: q,
	}
	cname.push(order.customer);
}


handle_data = function(x) {

	x = x.toLowerCase();
	x = x.split(" ");
	if(x[0] === "hello") {
		alert("hello");
		write("hello");
	}
};
