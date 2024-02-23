import * as PIXI from 'pixi.js';
import * as PIXIUI from '@pixi/ui';
import '@pixi/graphics-extras';
import '@pixi/math';
import '@pixi/math-extras';
import { Action, Actions, Interpolations} from 'pixi-actions';
//Create an array of gameobjects (GameObject class=) to create an array and set anchor etc for all of them.

//#region VECTOR FUNCTIONS
function Vector2(x,y){
    this.x = x;
    this.y = y;
    
} 
function VectorLerp(from, to, t){
    return new Vector2(
        from.x * (1-t) + to.x * t,
        from.y * (1-t) + to.y * t
    );
}
Vector2.prototype.magnitude = function(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
}
Vector2.prototype.magnitudeSquared = function(){
    return this.x * this.x + this.y * this.y;
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
//#endregion

//#region GLOBALLY USED VARIABLES

//Main References
const Application = PIXI.Application;
const Graphics = PIXI.Graphics;
const app = new Application({
    resizeTo: window,
    backgroundAlpha: 1,
    antialias: true
});
//Overall Variables:
let deltaTime = app.ticker.deltaTime;
const appMiddle = {x: app.screen.width * 0.5,y: app.screen.height * 0.5}
//Sprite References:
const moonContainer = new PIXI.Container();
const moon = PIXI.Sprite.from('./Assets/moon.png')
const moonBackground = PIXI.Sprite.from('./Assets/moon.png')
const moonShadowGreen = PIXI.Sprite.from('./Assets/moon.png')
const starsBGTexture = PIXI.Texture.from('./Assets/bgblack.png')
const starsSprite = new PIXI.TilingSprite(starsBGTexture,app.screen.width,app.screen.height);

//#region Star Warp Variables
//src: https://pixijs.com/examples/advanced/star-warp

const starTexture = PIXI.Texture.from('https://pixijs.com/assets/star.png');

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.025;
let speed = 0;
let warpSpeed = 0;
const starStretch = 5;
const starBaseSize = 0.05;

// Create the stars
const stars = [];
//#endregion

//#endregion

//#region APP INIT
app.renderer.background.color = 0x000000;
app.renderer.resize(window.innerWidth,window.innerHeight);
app.renderer.view.style.position = 'absolute';
document.body.appendChild(app.view);
//#endregion

//#region MAIN
app.ticker.add(delta => Update(delta));
function Update(delta){ 
    StarWarp(delta);
    // UpdateBackground();
}

//Update Methods:
function UpdateBackground(){
    starsSprite.tilePosition.x += 0.025;
}

//#endregion

//#region Sprite Init

//Effects
const blurFilter = new PIXI.BlurFilter(3);

//Moon
function SetMoon(){
    moon.anchor.set(0.5);
    moon.position.set(appMiddle.x,appMiddle.y);
    moon.scale.set(1,1);
    moon.filters = [blurFilter];
    
    moonBackground.anchor.set(0.5);
    moonBackground.scale.set(1,1);
    moonBackground.position.set(appMiddle.x, appMiddle.y);
    moonBackground.tint = 0xA020F0;
    moonBackground.filters = [blurFilter];

    moonShadowGreen.anchor.set(0.5);
    moonShadowGreen.scale.set(1,1);
    moonShadowGreen.position.set(appMiddle.x, appMiddle.y);
    moonShadowGreen.tint = 0x4DFFAF;
    moonShadowGreen.alpha = 0.6;
    moonShadowGreen.filters = [blurFilter];

    moonContainer.addChild(moonBackground);
    moonContainer.addChild(moonShadowGreen);
    moonContainer.addChild(moon);
}
SetMoon();

//BG
starsSprite.alpha = 0;
starsSprite.tileScale.set(0.8,0.8);

//#endregion

//#region Text and Button Animations

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
const PlayButtonText = new PIXI.Text('STUDIO AERIA', style);
const textBackground = new Graphics();
textBackground.beginFill(0xFFFFFF).lineStyle(2,0x000000,1)
.drawRect(appMiddle.x - 250, appMiddle.y - 25, 500, 50)
.endFill();

//BUTTON SETTINGS
PlayButtonText.anchor.set(0.5);
PlayButtonText.position.set(appMiddle.x,appMiddle.y);
PlayButtonText.skew.set(0.2,0);

//Anim Variables
let offSetMyText = 10;
let textAnimationSpeed = 0.1;
const originalTextPosition = new Vector2(PlayButtonText.position.x, PlayButtonText.position.y);

//EVENTS
app.ticker.add((delta) => Actions.tick(delta/60));

function textOnPointOver(){
    Actions.scaleTo(PlayButtonText, 1.1, 1.1, textAnimationSpeed, Interpolations.linear).play();
    Actions.moveTo(PlayButtonText, PlayButtonText.position.x - offSetMyText, PlayButtonText.position.y - offSetMyText, textAnimationSpeed, Interpolations.linear).play();
}

function textOnPointOut(){

    //See how to receive callback func from this actions event so that you could execute a code right after it.
    Actions.scaleTo(PlayButtonText, 1, 1, textAnimationSpeed, Interpolations.linear).play();
    Actions.moveTo(PlayButtonText, originalTextPosition.x,originalTextPosition.y, textAnimationSpeed, Interpolations.linear).play();
}

function textOnPointDown(){
    this.alpha = 0.5;
}

function textOnPointUp(){
    this.alpha = 1;

    //OnClick
    warpSpeed = 1;
    this.alpha = 0;
    textBackground.alpha = 0;
}


PlayButtonText.eventMode = 'static';
PlayButtonText.on('pointerover', textOnPointOver);
PlayButtonText.on('pointerout', textOnPointOut);
PlayButtonText.on('pointerdown', textOnPointDown);
PlayButtonText.on('pointerup', textOnPointUp);




//#endregion

//#region Graphics

//#endregion

//#region Sprite Animations

app.stage.eventMode = 'static';
app.stage.addEventListener('pointermove', (e) => {
    moveTowardsMouseOnPointerMove(e);
});


//#region MOON ANIM
const maxDistance = 500; 
const lerpTime = 0.025;
let moonLerpPosition = {x: 0, y: 0};

function moveTowardsMouseOnPointerMove(e){
    const distanceVector = getDistanceVector(moon.position,e.global);
    const squaredMagn = distanceVector.magnitudeSquared();
    const dir = distanceVector.normalized();
    const clampedLerpMagn = Math.min(distanceVector.magnitude(), maxDistance);
    moonLerpPosition = {
        x: appMiddle.x + -dir.x * clampedLerpMagn,
        y: appMiddle.y + -dir.y * clampedLerpMagn
    };

    moonShadowLerpPosition = {
        x: appMiddle.x + -dir.x * clampedLerpMagn * 0.3,
        y: appMiddle.y + -dir.y * clampedLerpMagn * 0.3
    };

    const lerpedPos = VectorLerp(appMiddle, moonLerpPosition, lerpTime);
    const lerpedPosShadow = VectorLerp(appMiddle, moonShadowLerpPosition, lerpTime);
    moon.position.x = lerpedPos.x;
    moon.position.y = lerpedPos.y;
    moonShadowGreen.position.x = lerpedPosShadow.x;
    moonShadowGreen.position.y = lerpedPosShadow.y;
}
//#endregion

//#region Star Warp
let warpingTimer;
function TriggerStarWarp(timer){
    warpSpeed = 1;
    warpingTimer = timer;
}

function StarWarp(delta){
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    for (let i = 0; i < starAmount; i++)
    {
        const star = stars[i];

        if (star.z < cameraZ) randomizeStar(star);

        // Map star 3d position to 2d with really simple projection
        const z = star.z - cameraZ;

        star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
        star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

        // Calculate star scale & rotation.
        const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
        const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
        const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        const distanceScale = Math.max(0, (2000 - z) / 2000);

        star.sprite.scale.x = distanceScale * starBaseSize;
        // Star is looking towards center so that y axis is towards center.
        // Scale the star depending on how fast we are moving, what the stretchfactor is
        // and depending on how far away it is from the center.
        star.sprite.scale.y = distanceScale * starBaseSize
            + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
        star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
}

setInterval(() =>
{
    warpSpeed = warpSpeed > 0 ? 0 : 0;
}, 5000);

function randomizeStar(star, initial)
{
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;

    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}

//#endregion

//#endregion

//#region Stage Adding
app.stage.addChild(starsSprite);

//#region Star Warp Staging
for (let i = 0; i < starAmount; i++)
{
    const star = {
        sprite: new PIXI.Sprite(starTexture),
        z: 0,
        x: 0,
        y: 0,
    };

    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    randomizeStar(star, true);
    app.stage.addChild(star.sprite);
    stars.push(star);
}
//#endregion

app.stage.addChild(moonContainer);
app.stage.addChild(textBackground);
app.stage.addChild(PlayButtonText);
//#endregion











//#region Code Dictionary
//clamping:
        // const angle = Math.atan2(distanceVector.x, distanceVector.y);
        // moon.position.x = appMiddle.x + Math.cos(angle) * maxDistance;
        // moon.position.y = appMiddle.y + Math.sin(angle) * maxDistance;

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

//#endregion