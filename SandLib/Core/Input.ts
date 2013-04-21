
module SandLib {

    export interface MouseState {
        mouseButtons: bool[];
        x: number;
        y: number;
    }

    export class Input {

        static currentKeyStates: bool[] = new bool[];
        static lastKeyStates: bool[] = new bool[];
        static currentMouseState: MouseState = { mouseButtons: new bool[], x: 0, y: 0 };

        static keyUp(event: KeyboardEvent) {
            currentKeyStates[event.keyCode] = false;
        }

        static keyDown(event: KeyboardEvent) {
            if ([37, 38, 39, 40].indexOf(event.keyCode) == 0) {
                event.preventDefault();
            }

            currentKeyStates[event.keyCode] = true;
        }

        static mouseUp(event: MouseEvent) {
            currentMouseState.mouseButtons[event.button] = false;
        }

        static mouseDown(event: MouseEvent) {
            currentMouseState.mouseButtons[event.button] = true;
        }

        static mouseMove(event: MouseEvent) {

            var oX: number = 0;
            var oY: number = 0;
            var currentElement: HTMLElement = Engine.canvas;

            do {
                oX += currentElement.offsetLeft - currentElement.scrollLeft;
                oY += currentElement.offsetTop - currentElement.scrollTop;
            } while (currentElement = <HTMLElement>currentElement.offsetParent);

            if (event.pageX - oX > 0 && event.pageX - oX < Engine.canvas.width && event.pageY - oY > 0 && event.pageY - oY < Engine.canvas.height) {
                currentMouseState.x = event.pageX - oX;
                currentMouseState.y = event.pageY - oY;
            }
            console.log(currentMouseState.x + ":" + currentMouseState.y);
        }

        static init() {
            addEventListener("keydown", keyDown);
            addEventListener("keyup", keyUp);
            addEventListener("mousedown", mouseDown);
            addEventListener("mouseup", mouseUp);
            addEventListener("mousemove", mouseMove);

            currentMouseState.x = 0;
            currentMouseState.y = 0;
        }

        static isKeyDown(keyCode: number) {
            var b: bool = currentKeyStates[keyCode];
            if (b == null) {
                return false;
            }
            return b;
        }

        static isKeyJustDown(keyCode: number) {
            var bNow: bool = currentKeyStates[keyCode];
            var bThen: bool = lastKeyStates[keyCode];
            if (bNow == true && (bThen == false || bThen == null)) {
                return true;
            }
            return false;
        }

        static update() {
            lastKeyStates = currentKeyStates;
        }

    }
}