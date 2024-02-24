/**
 * @class - Controller
 * @description - Controller class for handling user input
 */
class Controller {
	constructor() {
		this.keyPressed = "d";
	}

	update() {
		this.leftarrow = false;
		this.uparrow = false;
		this.rightarrow = false;
		this.downarrow = false;

		if (this.keyPressed == "d") {
			this.rightarrow = true;
		}
		if (this.keyPressed == "a" || this.keyPressed == "q") {
			this.leftarrow = true;
		}
		if (this.keyPressed == "w" || this.keyPressed == "z") {
			this.uparrow = true;
		}
		if (this.keyPressed == "s") {
			this.downarrow = true;
		}
	}
}
