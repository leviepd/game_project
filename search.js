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
				r.records.forEach(function(rec) {
					var id = rec.id;
					db.sql("select customer from orders where id = ?", [id], function(r2) { // get the customer out of the record with this id
						var customer = r2.records[0].customer; // 0 the first object in the array... selected the customer out of the object
						db.sql("select * from items where order_id = ?", [id], function(r3) { 
						// gets objects that have the same order_id and allows me access to data within the objects, unique ids but same order_id
							if(r3.records.length !== 0) {
								write("customer: " + customer + " Id: " + id);
								var items = r3.records;
								for(i = 0; i < items.length; i++) {
									write("--- Product: " + items[i].product + " Price: " + items[i].price + " Quantity: " + items[i].qty); // price qty id	
								}
								write("");
							};
						});
					});
				});
			}
		}
	});
}

function input_data() {
	c = document.getElementById("name");
	show_order_search(c.value)
	
};

