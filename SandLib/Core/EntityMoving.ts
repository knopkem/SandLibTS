/// <reference path="Scene.ts"/>

module SandLib {
    export class EntityMoving extends Entity {        

        velocity: Vector = { x: 0, y: 0 };

        constructor(x:number,y:number) {
            super(x, y);
        }

        update() {
            super.update();
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    }
}