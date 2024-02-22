import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';
import { ObservablePoint } from 'pixi.js';
///GLOBAL FUNC
function Vector2(x,y){
    this.x = x;
    this.y = y;
}
Vector2.prototype.magnitude = function(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
}
Vector2.prototype.normalized = function(){
    const magn = this.magnitude();
    const result = new Vector2(this.x / magn, this.y / magn);

    return result;
}
function getDistanceVector(from, to){
    const distanceVector = {
        x: to.x - from.x,
        y: to.y - from.y
    }
    return new Vector2(distanceVector.x, distanceVector.y);
}

//ADD .Move (Move objects from one vector to another)

///

const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

const app = new Application({
    resizeTo: window,
    backgroundAlpha: 1,
    antialias: true
});

app.renderer.background.color = 0x000000;
app.renderer.resize(window.innerWidth,window.innerHeight);
app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

//Update Method
app.ticker.add(delta => Update(delta));

function Update(delta){ 
    UpdateBackground();
    moonBackToOriginalPos();
}

function UpdateBackground(){
    starsSprite.tilePosition.x += 0.05;
}


const appMiddle = {
    x: app.screen.width * 0.5,
    y: app.screen.height * 0.5
}



//Create an array of gameobjects (GameObject class=) to create an array and set anchor etc for all of them.

//SPRITES:

const moon = PIXI.Sprite.from('./Assets/moon.png')
moon.anchor.set(0.5);
moon.position.set(appMiddle.x,appMiddle.y);
moon.scale.set(1,1);
const blurFilter = new PIXI.BlurFilter(3);
moon.filters = [blurFilter];

const starsBGTexture = PIXI.Texture.from('./Assets/bgblack.png')
const starsSprite = new PIXI.TilingSprite(
    starsBGTexture,
    app.screen.width,
    app.screen.height,
);
starsSprite.tileScale.set(0.8,0.8);

//TEXT:
const style = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowAlpha: 0.4,
    dropShadowAngle: 0,
    dropShadowBlur: 3,
    dropShadowColor: "#500d87",
    fontFamily: "Courier New",
    fontSize: 55,
    letterSpacing: 5,
    lineJoin: "bevel",
    miterLimit: 8,
    stroke: "#98108d",
    strokeThickness: 1
});

const myText = new PIXI.Text('STUDIO AERIA', style);
myText.anchor.set(0.5);
myText.position.set(appMiddle.x,appMiddle.y);
myText.skew.set(0.2,0);

//GRAPHICS:
const textBackground = new Graphics();
textBackground.beginFill(0xFFFFFF)
.drawRect(appMiddle.x - 250, appMiddle.y - 25, 500, 50)
.endFill();

app.stage.addChild(starsSprite);
app.stage.addChild(moon);
app.stage.addChild(textBackground);
app.stage.addChild(myText);

app.stage.eventMode = 'static';
app.stage.addEventListener('pointermove', (e) => {
    moveTowardsMouseOnPointerMove(e);
});

const moonMoveSpeed = 0.1;
function moveTowardsMouseOnPointerMove(e){
    //Calculate Distance vector from moon to pointerpos.
    const distanceVector = getDistanceVector(moon.position,e.global);
    //Normalize the distance vector. (It gives us direction)
    const dir = distanceVector.normalized();
    //Speed of moon moving towards the mouse.

    //MOVE IT TO MOUSE MOVEMENT DIRECTION
    moon.position.x += dir.x * moonMoveSpeed * 2; 
    moon.position.y += dir.y * moonMoveSpeed * 2;

    //We need to set boundaries of movement
}

function moonBackToOriginalPos(){
    const distance = getDistanceVector(appMiddle, moon.position);
    const dir = distance.normalized();
    
    if (moon.position.x !== appMiddle.x && moon.position.y !== appMiddle.y ){
        moon.position.x += -dir.x * moonMoveSpeed / 2;
        moon.position.y += -dir.y * moonMoveSpeed / 2;
    }

}




















// const rectangle = new Graphics();
// rectangle.beginFill(0xAA33BB)
// .lineStyle(4, 0xFFEA00, 1)
// .drawRect(200, 200, 100, 120)
// .endFill();

// app.stage.addChild(rectangle);

// const poly = new Graphics();
// poly.beginFill(0xFF66FF)
// .lineStyle(4, 0xFFEA00, 1)
// .drawPolygon([
//     600, 10,
//     800, 150,
//     900, 300,
//     400, 400
// ]).endFill();

// const circle = new Graphics();
// circle.beginFill(0x22AACC)
// .drawCircle(440, 200, 80)
// .endFill();

// app.stage.addChild(circle);
// app.stage.addChild(poly);

// const line = new Graphics();
// line.lineStyle(5, 0xFFEA00, 1)
// .moveTo(1500, 100)
// .lineTo(1500, 800);

// app.stage.addChild(line);
// // If you add Math.PI / 2, it will make the torus an arc.
// const torus = new Graphics();
// torus.beginFill(0xFFFDDD)
// .drawTorus(100, 700, 80, 100, 0, Math.PI / 2)
// .endFill();

// app.stage.addChild(torus);

// const star = new Graphics();
// star.beginFill(0xADADAD)
// .drawStar(900, 700, 6, 80)
// .endFill();
// app.stage.addChild(star);





// const character1Bunny = PIXI.Texture.from('https://pixijs.com/assets/bunny.png');
// const char = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
// const char2 = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");

// app.stage.addChild(char);
// app.stage.addChild(char2);

// character1Sprite.width = 200;
// character1Sprite.height = 200;

// character1Sprite.scale.x = 2;
// character1Sprite.scale.y = 2;
// char.scale.set(2,2,);

// character1Sprite.x = 500;
// char.position.set(500,100);
//radian, top left cornor is the original.
// char.rotation = 1;
//Set the pivot for rotation for middle
// character1Sprite.anchor.x = 0.5;
// character1Sprite.anchor.y = 0.5;
// char.anchor.set(0.5, 0.5);


//Making sprite clickable
// char.eventMode = 'static';

// char.on('pointerdown', function(){
//     char.scale.x += 0.1;
//     char.scale.y += 0.1;
// })

// document.addEventListener('keydown', function(e){
//     if(e.key === 'ArrowRight')
//         char.x += 10;
//     if(e.key === 'ArrowLeft')
//         char.x -= 10;
// });

//This is where a container becomes a parent object.
//Position of sprites are relative to the container.
// const container = new PIXI.Container();
// container.addChild(char);
// container.addChild(char2);
// app.stage.addChild(container);
// container.position.set(100,100);

// console.log(char2.getGlobalPosition());
// console.log(container.children);


//Particular Container -> Performant but less features
// const particleContainer = new PIXI.ParticleContainer(1000, {
//     position: true,
//     rotation: true,
//     vertices: true, //scale and anchos position of children
//     tint: true,
//     uvs: true
// })

//LOADER
// const loader = PIXI.Loader;
// loader.add('char3', './Assets/moon.png')
// loader.load(setup);

// function setup(loader, resources){
//     const char3 = new PIXI.Sprite(resourcers.char3.texture);
//     char3.y = 400;
//     app.stage.addChild(char3);
// }


