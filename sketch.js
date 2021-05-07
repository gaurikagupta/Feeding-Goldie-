//Declaring variables
var fish, happyFish, database, foodS, foodStock, foodCount;
var fishImg, happyFishImg;
var addB, feedB;
var lastFed;
var food;
var background, backgroundImage;

//Loading the images
function preload(){
fishImg=loadImage("fish.png");
happyFishImg=loadImage("happyFish.png");
backgroundImage=loadImage("Image.jpg")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();

  foodS=10;

  //Creating background
  background=createSprite(250,250,500,500);
  background.addImage(backgroundImage);

  //Creating the fish
  fish=createSprite(320,250,40,40);
  fish.addImage(fishImg);
  fish.scale=0.3;

  //Creating the fish-food
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  //Creating food
  food=new Food(0);

  //Creating the FEED BUTTON
  feedB=createButton("Feed Goldie");
  feedB.position(450,100,40,40);
  feedB.mousePressed(feedFish);

  //Creating the ADD BUTTON
  addB=createButton("Refresh Stock");
  addB.position(700,100,40,40);
  addB.mousePressed(addFood);
  
  //Creating the time
  lastFed=hour();
}

function draw() {  
drawSprites();

//Displaying text for the time 
fill("white");
textSize(20);
if(lastFed>=12){
 text("Last you fed Goldie:"+lastFed%12+"PM",150,485);
}
else if(lastFed==0){
 text("Last you fed Goldie:12 AM",150,485);
}
else{
 text("Last you fed Goldie:"+lastFed+"AM",150,485);
}

//Displaying  text for FOOD LEFT 
fill("white");
textSize(20);
text("Fish food left: "+foodS,190,30);
}

//Creating function for reading the databse value
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  //Decreasing the number of food if only foodS>0 
  if(x<=0){
  x=0;
  textSize(50);
  fill("red");
  text("Goldie is full!!!",100,450);
  fish.scale=0.3;
  }
  else{
  x=x-1;  
  food.display();
  fish.scale=fish.scale+0.1;
  }
  database.ref('/').update({
  Food:x
  })
}

//Creating function for feeding fish
function addFood(){
  if(foodS>=10){
    foodS=10;
  }
  else{
    foodS=foodS+1;
  }
}

//Creating function for adding food
function feedFish(){
  writeStock(foodS);
  fish.addImage(happyFishImg);
}

