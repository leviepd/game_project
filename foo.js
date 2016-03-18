

sega = {
	name: "SEGA",
	price: 7500,
}
snes = {
	name: "SNES",
	price: 8000,
}
products = [ sega, snes ];


order = {
	customer: "Billy Bob",
	lines: [
		{
			product: sega,
			qty: 1,
			subtotal: 7500,
		},
		{
			product: snes,
			qty: 2,
			subtotal: 160000,
		}
	],
	total: 175000;
}






new_line = {
	id: 1,
	product_id: 2,
	sub_total: 0,
}







block1 = {
	name: "Room 1",
};
block2 = {
	name: "Room 2",
	look: "things"
};

block1.north = block2;
block2.south = block1;

cur = block1;

while(true) {

	alert("You are here:" + cur.name);

	cmd  = prompt("Go North, or South.").toUpperCase();

	if(cmd == "NORTH" && cur.north != undefined) {
		cur = cur.north;
		alert(block2.look);
	}
	else
	if(cmd == "SOUTH" && cur.south != undefined) {
		cur = cur.south
	}
	else {
		alert("can't go that way.");
	}

}


