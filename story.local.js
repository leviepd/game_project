
write = function(s) {
	var h = document.getElementById("output").innerHTML; 
	document.getElementById("output").innerHTML = h + "<br>" + s;
}

block1 = {
	name: "Front Yard",
	disc: "It is a bright, sunny, summer day. There is a house to the north. The grass is sunbaked, and brown.",
	exits: {},
	items: {},
	rdmcmd: {},
	
};

block2 = {
	name: "Front Porch",
	disc: "The porch is small and has a roof. There is a large oak door to the north... There is a bench to the left.",
	exits: {},
	items: {},
	things: {},
};

block3 = {
	name: "Right side of House",
	disc: "",
	exits: {},
	items: {},
	things: {}
};

septic_tank = {
	name: "Old septic tank",
	disc: "You have fallen to the bottom of an old abandoned septic tank. There is no way out and no one to help you.  You DIE of starvatio. Waaay to gooo DUMBASS!",
	end: true,
	exits: {},
	items: {},
};

block5 = {
	name: "Mailbox",
	disc: "The mailbox appears to be wide open.",
	disc2: "Labyrinth is a game of adventure. Beware of any danger out there. Happy Exploring.",
	exits: {},
	items: {},
	things: {}
};

block6 = {
	name: "Front Door ",
	disc: "What a beautifully crafted door... with two knobs???",
	exits: {},
	items: {},
	things: {}
};

block8 = {
	name: "Bottom of a Pit",
	disc: "A trap door opens. You fall straight down onto long, rusty lengths of re-bar. The rebar impales your body. You bleed out and DIE!",
	end: true,
	exits: {},
	items: {},
	things: {}
};

block9 = {
	name: "Entry Way",
	disc: "What a cozy little house. The entry way is extremely small. To the east is a living room. North leads down a narrow hallway that goes to the end of the house. There is a staircase directly to the west that leads upwards... what a strange place for a staircase...",
	exits: {},
	items: {},
	things: {}
};

block7 = {
	name: "Bench",
	disc: "A 6 ton weight falls and crushes you... Really? You just had sit on the fucking bench.",
	end: true,
	exits: {},
	items: {},
	things: {}
};

block10 = {
	name: "Living Room",
	disc: "All the surrounding walls are covered in bookshelves. In the center of the room there is a chair, and a small table. The table is covered in all kinds of interesting trinkets.",
	exits: {},
	items: {},
	things: {}
};

block11 = {
	name: "Narrow Hallway",
	disc: "You make your way down the hallway. Ten paces down you trip over a rug, and crack your head open on the hardwood floor... and DIE!",
	end: true,
	exits: {},
	items: {},
	things: {}
};

block12 = {
	name: "Upstairs hallway",
	disc: "At the top of the stairs you find yourself facing another long narrow hallway. To the east is a door that has a piece of paper taped to it. To the west is another door.",
	disc2: "Beware, this is no place for wanderers.",
	exits: {},
	items: {},
	things: {}
};

block13 = {
	name: "Bedroom",
	disc: "This room appears to belong to a young teenager. The walls are littered with amateurish sketches of demonic creatures. WTF, the more you look, the freakier they become. There are dirty dishes all over the floor. Across the room is a door that could go to a closet. In the middle of the room there is a bed... blankets covered in red blood stains. ",
	exits: {},
	items: {},
	things: {}
};

block14 = {
	name: "Closet",
	disc: "Inside the closet you find a staircase that leads down into blackness... You would need some light to go down there. There may be a light switch around here somewhere.",
	disc2: "You are to afraid to go down... need more light.",
	exits: {},
	items: {},
	things: {}
};

block15 = {
	name: "Basement",
	disc: "The basement is a cold, damp place... You hear water droplets echo almost as if you are in a cavern. The basement is empty besides the piece of paper lying on the floor. There is no apparent direction you can go besides back up the stairs.",
	exits: {},
	items: {}
};

block16 = {
	name: "West Main Corridor",
	disc: "The basement appears to extend beyond the extremities of the house above it. You travel foreward for a few minutes without discovering any new room, or object. All you can see is the stone like walls to your sides and blackness beyond the reach of your lantern's light.",
	exits: {},
	items: {},
};

block17 = { 
	name: "Somewhere in the West Main Corridor",
	disc: "It has now been atleast 10 minutes since you first entered the passage. There has been no other direction to go than foreward... You hear a rustle near your feet... There appears to be another note.", 
	exits: {},
	items: {},

};

block18= {
	name: "The Creepy Cavern",
	disc: "As you are walking you notice the walls at your sides disappear. You must have entered some kind room, or cavern. You can't help but noticed the amount of noise every footstep you take is making. Each step step echoes as if you are in a large canvern. All you can see is the blackness beyond the light of your lantern.",
	exits: {},
	items: {},
};
// Search the cavern to find a door that leads "beyond"
// player needs key to open the door
block19 = {
	name: "Out and Beyond",
	disc: "Beyond the door you find yourself back outdoors in the scorching sun. You are standing on the side of a rocky hill in the forrest. There is a path to East that curves up and around the hillside. Around you are all kinds of wild berry bushes. The only one you can distinguish is the black berry push just ahead of you.", 
	exits: {},
	items: {},
};

block20 = {
	name: "Back Yard",
	disc: "The path was extremely long. Not much to see along the way besides the surrounding forrest. It lead straight back to where you came from, the house. You are now in the back yard of the house. There is an old rusty swingset sitting in the middle of the yard. To the right of the house is a tall cedar fence that has no gate. To the left of te house is more open yard. Straight ahead is the house. There as a glass sliding door. Through the door you can see a kitchen.",
	exits: {},
	items: {},
};

block21 = {
	name:"Kitchen Living Space",
	disc: "What a cozy little kitchen here... Just ahead is a table that has been set. Beyond that is a narrow hallway that appears to lead to the front of the house. Just beyond the kitchen and to the left is a path that may lead to another room.", 
	exits: {},
	items: {},
};

block22 = {
	name: "Kitchen Table",
	disc: "There is fresh food on this table. Looks like Thanksgiving dinner.",
	exits: {},
	items: {},
};

block23 = {
	name: "Entertainment Space",
	disc: "At the end of a short hallway you enter a large room. The room appears to be the living/entertainment room of the house. There is a large wrap around couch that centers on a large tv mounted on the wall. This is to the left of you. Just ahead is a pool table. To the right is staircase that leads upwards.",
	exits: {},
	items: {},
};

block24 = {
	name: "Upstairs",
	disc: "Straight ahead is a narrows hallway. The hallway has few doors off of it. At the end of the hallway is another stairscase that leads downward.",
	exits: {},
	items: {},
};

block25 = {
	name: "Craft Room", 
	disc: "You enter into a craft room. There is a sewing machine in the corner running, but with no one using it. There is a ladder on the wall that goes up to a trapdoor on the ceiling. To the right leads to another room.",
	exits: {},
	items: {},
};




leaflet = {
	take: true,
	readable: true,
	disc: "Labyrinth is game of adventure. Beware of any danger out there. Happy Exploring.  - Maker",
	end: false,
};

note1 = {
	take: true,
	readable: true,
	disc: "Beware, this is no place for wanderers",
	end: false,
};

note2 = {
	take: true,
	readable: true,
	disc: "Wander as you will... we have warned you... we are watching.",
	end: false,
};

bat = {
	take: true,
	readable: true,
	disc: "Vahmpyre",
	end: false,
};

key = {
	take: true,
	readable: false,
	endingMove: "You charge with the key above you head in a finishing move. You stab the teen directly in the eye for a gruesome finish. You survived the Labyrinth.",
	end: false,
};

lantern = {
	take: true,
	readable: false,
	disc: "Much better... You can now enter the basement.",
	lit: false,
	end: false,
};
knife = {
	take: true,
	readable: true,
	disc: "Supa Stabby",
	end: false,
};

bottle = {
	take: true,
	readable: true,
	disc: "The contents of this bottle is toxic. We don't know exactly what it is... just DON'T DRINK IT! Flavor: Cherry.",
	endingMove: "You down the entire bottle. Surprisingly, it tastes amazing. The liqiud pumps you with energy.",
	used: false,	
	end: false,
};

apple = {
	take: true,
	readable: false,
	disc: "This is the best tasting apple you have ever had! As soon as you finish, your entire body stiffens... You can not move... You have become a statue... because you can not move you, starve to DEATH!",
	endingMove: "You throw the apple as hard as you can. It hits the teen square in the forehead. The teen appears to diszzy and confused!",
	used: false,
	end: false,
};

lswitch = {
	take: false,
	readable: false,
	disc: "The staircase is dimly lit... you still can not see the bottom... need more light.",
	flipable: true,
};

paper = { // change paper to note2
	take: true,
	readable: true,
	disc: "You are nearly to the end of this fantastic adventure. Thanks for playing. - Maker",
	end: false,
};

fight = {
	name: "Duranged Teen",
	disc: "You turn around to a most horrid sight.",
	loss: "The duranged teen lunges at you in the blink of an eye. The last thing you ever see is long fang like teeth inches from your throat...", 
	disc3: "",
	exits: {},
};

// Game Data
block1.exits.north = block2;
block1.exits.south = block5;
block1.exits.east = block3;
block2.exits.south = block1;
block2.exits.north = block6;
block2.exits.bench = block7;
block2.items.bat = bat;
block2.items.key = key;
block3.exits.west = block1;
block3.exits.north = septic_tank;
block5.items.leaflet = leaflet;
block5.exits.north = block1;
block6.exits.rightknob = block8;
block6.exits.leftknob = block9;
block6.exits.south = block2;
block9.exits.south = block2;
block9.exits.east = block10;
block9.exits.upstairs = block12;
block9.exits.north = block11;
block10.exits.west = block9;
block10.items.apple = apple;
block10.items.bottle = bottle;
block10.items.lantern = lantern;
block12.exits.downstairs = block9;
block12.items.note1 = note1;
block12.exits.west = block13;
block13.exits.east = block12;
block13.exits.north = block14;
block14.exits.south = block13;
block14.exits.downstairs = block15;
block14.items.switch = lswitch;
block15.items.paper = paper;
block15.exits.upstairs = block14;
block15.exits.west = block16;
block16.exits.east = block15;
block16.exits.north = block17;
block17.items.note2 = note2;
block17.exits.south = block16;
block17.exits.north = block18;
// block18.things.search = search;
block18.exits.south = block17;
block18.exits.throughdoor = block19;
block19.exits.throughdoor = block18;
block19.exits.path = block20;
block20.exits.path = block19;
block20.exits.west = septic_tank;
block20.exits.north = block21;
block21.exits.south = block20;
// search block18 in order to go to block19 also, use the key
block21.exits.north = block22;
block21.exits.east = block23
block22.items.knife = knife;
block22.exits.south = block21;
block22.exits.north = block11;
block22.exits.east = block23;
block23.exits.west = block21;
block23.exits.upstairs = block24;
block24.exits.downstairs = block23;
block24.exits.north = block11;
block24.exits.rt_room = block13;

gameOver = false;
gameOver2 = false;

current = block1;

// handles changes to input element in html page
var got_input = function(element) {
	handle_input(element.value);  // calls handle_input and argues a string
	element.value = "";  
	element.scrollIntoView();  
}

inventory = {};

function situation() {
	
	write("");
	write("Location: " + current.name);
	write(current.disc);

	// make a string out of the available exits
	var a = [];   
	for(var k in current.exits) {
		a.push(k);   // pushes k into the array
	}
	var x = a.join(", ");  // x = "north, south"
	write("Go: "+x);


	// make a string out of the available objects
	var a2 = [];
	for(var j in current.items) {
		a2.push(j);
	}
	var y = a2.join(", ");
	write("Objects In View: "+y);
	
	var a3 = [];
	for(var l in inventory) {
		a3.push(l);
	}
	var z = a3.join(", ");
	write("Pack: " +z);

}

situation();

var endFight = 0;

handle_input = function(act) {


	jump_to = function() {
		current = current.exits[ood];
		situation();
		if(current.end === true) {
			gameOver = true;
		}
	}

	if(gameOver) {
		write("Sorry, game over.");
		return;
	}
	if(gameOver2) {
		write("Congrats, you win!");
		return;
	}

	act = act.toLowerCase();
	act = act.split(" ");     // act is ["", ""]
	var verb = act[0];												
	var ood = act[1];	     // act = ["verb", "item"]    
	// ood object or direction
	if(verb === "go") { 
		// User wants to go somewhere
		if(current.exits[ood]) {
			// the exit requested does exist
			if(current.exits[ood] === block15) { 
				// You want to go to block15
				if(lantern.lit === false) {  
					// lantern is not lit
					write(block14.disc2);
				}
				else {
					// lantern is lit. Go downstairs
					jump_to();
				}
			}
			else {
				// Go to next block that is not block15
				jump_to();
			}
		}
		else {
			// the exit requested does not exist
			write("can't go that way.");
		}
	}	
	else 
	if(verb === "take") {
		// user want to take something
		if(current.items[ood]) {
			// the item requested does exist
			var thing = current.items[ood]; 
			// "thing" puts a hold on items in the block	
			if(thing.take === true) {
				// flag checks out
				inventory[ood] = thing;
				// "thing" puts a hold on invevtory
				delete current.items[ood];
				// the item is no longer in the block
				situation();
			}	
			else {
					// the item requested does not exist
					write("You can not take that.");
			}
		}
	}
		//	var thing = current.items[ood]   // current.items[ood] = inventory[ood];
		//	inventory[ood] = thing;
	else 
	if(verb === "use") {
		var thing = inventory[ood];
		if(thing === undefined) {
			// thing is undefined
			write("You do not have that item.");
		}
		else { /* // thing is defined
				if(endFight === 0) {
					if(thing === lantern) {
						thing.lit = true;
						write(thing.disc);
					}
					else {
						write("You can not use that item here.");
					}
				}
				else { // endFight is anything but zero
					if(thing === bottle) {
						write(thing.endingMove);
						endFight = 2;
					}
					else
					if(endFight === 2) {
						if(thing === apple) {
							write(thing.endingMove);
							endFight = 3;
						}
						else {
							write(fight.loss);
							gameOver = true;
						}
					}
					else 
					if(endFight === 3) {
						if(thing === key) {
							write(thing.endingMove);
							gameOver2 = true;
						}
						else {
							write(fight.loss);
							gameOver = true;
						}
					}
					else {
						write(fight.loss);
						gameOver = true;
					}
				}
			}  
		} */
	
	switch(endFight) {
		case 0:
			if(thing === lantern) {
				thing.lit = true;
				write(thing.disc);
			}
			else {
				write("You can not use that item here.");
			}
			break;
		case 1: 
			if(thing === bottle) {
				write(thing.endingMove);
				endFight = 2;
			}
			else {
				write(fight.loss);
				gameOver = true;
			}
			break;
		case 2:
			if(thing === apple) {
				write(thing.endingMove);
				endFight = 3;
			}
			else {
				write(fight.loss);
				gameOver = true;
			}
			break;
		case 3:
			if(thing === key) {
				write(thing.endingMove);
				gameOver2 = true;
			}
			else {
				write(fight.loss);
				gameOver = true 
			}
			break;
		}
		}
	}
	// switch statement instead of if/else		
	else
	if(verb === "read") {
		var thing = inventory[ood];
		// "thing" puts a hold on inventory 
		if(thing === undefined) {
			// thing is not in the inventory.
			write("You can not read that.");
		}
		else 
		if(thing.readable === false) {
			// thing is in the inventory, but not readable.
			write("You can not read that.");
		}
		// end of common things you can read
		// below is game ending... you have to read the paper to get to the end of the game.
		else 
		if(thing.readable === true) {
			write(thing.disc);
			// write message if thing.readable === true
			if(thing === paper) {
				endFight = 1;
				write("duranged teen pops out of nowhere and wishes to fight.");
			}
		}
	else
	if(verb === "sit") {
		if(current.exits[ood] === undefined) {
			// The exit requested does not exist
			write("You can not sit there.");
		}
		else {
			// the exit requeated does exist
			current = current.exits[ood];
			situation();
			if(current.end) {
				// flag... if true then gameOver is true
				gameOver = true;
			}
		}
	}
	else
	if(verb === "flip") {
		if(current.items[ood] === undefined) {
			// The exit requested does not exist
			write("You can not flip that.");
		}
		else {
			// The exit requested does exist.
			write(lswitch.disc); 
			// Later use flag
		}
	}
	else {
		write("That is not an option.");
	}
}
}

