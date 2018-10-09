// Eduardo González Real
var score = 0;
var lifes = 3;
function initUserScore(userInput) {
	document.getElementById("user-info").innerHTML = "<b>" + userInput + ":</b> " + score + "pts";
	document.getElementById("lifes-div").innerHTML = "";
	if(lifes <= 0) {
		alert("YOU LOSE!");
		updateData(userName, score);
		endGame();
	} else
		for(var i = 0; i < lifes; i++) {
			document.getElementById("lifes-div").style.display = "inline";
			var image = document.createElement("img");
			image.className = "life-img";
			image.src = "img/life.png";
			document.getElementById("lifes-div").appendChild(image);
		}
}
function incrementScore(itemPoints, itemCell) {
	var points = parseInt(itemPoints);
	var item = itemCell;
	item.removeChild(item.childNodes[0]);
	switch(points) {
		case 6: 
			score += 10;
			item.appendChild(initImage(2));
			break;
		case 3:
			score += 10;
			item.appendChild(initImage(2));
			break;
		case 5: 
			score += 20;
			item.appendChild(initImage(3));
			break;
		case 4:
			score += 20;
			item.appendChild(initImage(3));
			break;
		case 1: 
			score += 30;
			item.appendChild(initImage(4));
			break;
		case 2: 
			score += 30;
			item.appendChild(initImage(4));
			break;
	}
	initUserScore(userName);
}
function decrementLifes(lifesLess, itemCell) {
	var item = itemCell;
	item.removeChild(item.childNodes[0]);
	item.appendChild(initImage(6));
	lifes-=lifesLess;
	initUserScore(userName);
}
function incrementLifes(itemCell) {
	var item = itemCell;
	item.removeChild(item.childNodes[0]);
	item.appendChild(initImage(7));
	lifes+=1;
	initUserScore(userName);
}
function resetLifes() {
	lifes = 3;
	initUserScore(userName);
}