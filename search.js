write = function(s) {
        var h = document.getElementById("output").innerHTML;
        document.getElementById("output").innerHTML = h + "<br>" + s;
        // why is <br> in quatations??
}

db = new DB("levi", "784N7cvbz2eUTenm");


/*function show_order_search(name) {
        db.sql("select * from orders where customer like ?", ["%" + name + "%"], function(r) {
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
                                for(i = 0; i < x.lines.length; i++) {
                                	write("Product: " + x.lines[i].product.name + " Quantity: " + x.lines[i].qty + " Subtotal: " + x.lines[i].sub);
                                      	
                                }
				write("Total: " + x.tote);
				write("");
                        }
                }
        });
} */

function show_order_search(c) {
	db.sql("select distinct(orders.id) from orders left join items on items.order_id = orders.id where customer like ? or product like ?", ["%" + c + "%", "%" +  c + "%"], function(r) {
		if(r.error) {
                        alert("Error: " + o2j(r.error));
		}
		else {
			if(r.records.length === 0) {
				write("No existing Record(s)");
			}
			else {
				for(i = 0; i < r.records.length; i++) {
                        	        var id = r.records[i].id;
					db.sql("select customer from orders where id = ?", [id], function(r) { 
						var customer = r.records[0].customer;
						write("customer: " + customer); 
						db.sql("select * from items where order_id = ?", [id], function(r) {
							var items = r.records;
							for(i = 0; i < items.length; i++) {
								write(items[i].product + items[i].price + items[i].qty); // price qty id
								write("");
							}
						});
					});
				}
			}
		}
	});
}

function input_data() {
	c = document.getElementById("name");
	show_order_search(c.value)
	
};

