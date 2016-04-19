
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

norder = false;

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
	else
	if(norder === true) {
                        line_data(x[0], x[1], x[2]);
                        write(order.line[0].data.product);
        }
	else { // defined
		if(x[0] === "new" && x[1] === "order" && x[2] !== undefined) {
			new_order(x[2]);
			write(order.customer);
			norder = true;
		}
		else {
			write("unvalid entry");
		}
	}
};

new_order = function(cname) {
	order = {
		customer: cname,
		line: [],
	}
}

line_data = function(prod, pr, num) {
	data = {
		product: prod,
		price: pr,
		qty: num,
	}
	order.line.push(data);
}
