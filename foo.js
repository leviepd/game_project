


block1 = {
	name: "Room 1",
};
block1 = {
	name: "Room 2",
};

block1.north = block2;
block2.south = block1;

cur = block1;

while(true) {
	console.log("You are here:"+ cur.name);

	cmd = prompt();

	if(cmd == "north" && cur.north != undefined) {
		cur = cur.north;
	}
	else
	if(cmd == "south" && cur.south != undefined) {
		cur = cur.south
	}
	else {
		alert("can't go that way.");
	}

}


