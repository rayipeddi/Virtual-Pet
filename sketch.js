//Create variables here
var dog, dogIMG;
var happyDogIMG;
var database, foodS, foodStock;
function preload()
{
  //load images here
  dogIMG = loadImage("images/dogImg.png")
  happyDogIMG = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  dog = createSprite(250,450,50,50)
  dog.addImage(dogIMG)
  dog.scale = 0.2
 var  foodStock = database.ref('Food')
  foodStock.on('value', readStock)
}


function draw() {  
background(46, 139, 87)
rectMode(CENTER)
if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dog.addImage(happyDogIMG) 
}
/*else{
  dog.addImage(dogIMG)
}*/

  drawSprites();
  //add styles here
  textSize(12)
  fill("white")
  text("Food Remaining: "+foodS,200,200)
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",200,300)
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){

  if(x<= 0){
    x=0
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}