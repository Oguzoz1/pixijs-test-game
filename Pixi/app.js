const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

const app = new Application({
    width: 600,
    height: 600,
    backgroundAlpha: 0,
    antialias: true
});

app.renderer.backgroundColor = 0x23395D;
app.renderer.resize(window.innerWidth,window.innerHeight);
app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);


const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
.lineStyle(4, 0xFFEA00, 1)
.drawRect(200, 200, 100, 120)
.endFill();

app.stage.addChild(rectangle);

const poly = new Graphics();
poly.beginFill(0xFF66FF)
.lineStyle(4, 0xFFEA00, 1)
.drawPolygon([
    600, 10,
    800, 150,
    900, 300,
    400, 400
]).endFill();

const circle = new Graphics();
circle.beginFill(0x22AACC)
.drawCircle(440, 200, 80)
.endFill();

app.stage.addChild(circle);
app.stage.addChild(poly);

const line = new Graphics();
line.lineStyle(5, 0xFFEA00, 1)
.moveTo(1500, 100)
.lineTo(1500, 800);

app.stage.addChild(line);
// If you add Math.PI / 2, it will make the torus an arc.
const torus = new Graphics();
torus.beginFill(0xFFFDDD)
.drawTorus(100, 700, 80, 100, 0, Math.PI / 2)
.endFill();

app.stage.addChild(torus);

const star = new Graphics();
star.beginFill(0xADADAD)
.drawStar(900, 700, 6, 80)
.endFill();
app.stage.addChild(star);

const style = new PIXI.TextStyle({
    fontFamily: 'Montserrat',
    fontSize: 48,
    fill: 'deepskyblue',
    stroke: '#ffffff',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowDistance: 10,
    dropShadowAngle: Math.PI / 2,
    dropShadowBlur: 4,
    dropShadowColor: '#000000'
})

const myText = new PIXI.Text('Hello World!', style);
app.stage.addChild(myText);

myText.text = 'Hello Text Changed';
myText.style.wordWrap = true;
myText.style.wordWrapWidth = 100;
myText.style.align = 'center';


// const character1Bunny = PIXI.Texture.from('https://pixijs.com/assets/bunny.png');
const char = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
const char2 = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");

app.stage.addChild(char);
app.stage.addChild(char2);

// character1Sprite.width = 200;
// character1Sprite.height = 200;

// character1Sprite.scale.x = 2;
// character1Sprite.scale.y = 2;
char.scale.set(2,2,);

// character1Sprite.x = 500;
char.position.set(500,100);
//radian, top left cornor is the original.
char.rotation = 1;
//Set the pivot for rotation for middle
// character1Sprite.anchor.x = 0.5;
// character1Sprite.anchor.y = 0.5;
char.anchor.set(0.5, 0.5);


//Making sprite clickable
char.interactive = true;
char.buttonMode = true;

char.on('pointerdown', function(){
    char.scale.x += 0.1;
    char.scale.y += 0.1;
})

document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight')
        char.x += 10;
    if(e.key === 'ArrowLeft')
        char.x -= 10;
});

//This is where a container becomes a parent object.
//Position of sprites are relative to the container.
const container = new PIXI.Container();
container.addChild(char);
container.addChild(char2);
app.stage.addChild(container);
container.position.set(100,100);

console.log(char2.getGlobalPosition());
console.log(container.children);


//Particular Container -> Performant







//Update Method
app.ticker.add(delta => loop(delta));

function loop(delta){
    container.rotation += 0.01;
}
