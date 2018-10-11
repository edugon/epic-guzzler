var userName;
var levelTimeOut;
var generateTimeOut;
var moveTimeOut;
var level = 6;

function generateTable(size) {
	document.getElementById("container").innerHTML = "";
	var table = document.createElement("table");
	table.id = "table";
	for(var i = 1; i <= size - 2; i++) {
		var row = document.createElement("tr");
		row.className = "row";
		row.id = "row-" + i;
		for(var j = 0; j < size - 2; j++) {
			var cell = document.createElement("td");
			cell.className = "cell";
			cell.id = "cell-" + i + "-" + j;
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	document.getElementById("container").appendChild(table);
}

function initGame(userInput, size) {
	console.log("... game starts");

	clearTimeout(levelTimeOut);
	clearTimeout(moveTimeOut);
	clearTimeout(generateTimeOut);
	generateTable(size);
	score = 0;
	resetLifes();
	userName = userInput;
	initUserScore(userInput);

	var playerCell = document.getElementById("row-" + (size - 2)).childNodes[2];
	if(playerCell.childNodes[0] != null)
		playerCell.removeChild(playerCell.childNodes[0]);
	playerCell.appendChild(initImage(0));

	document.body.addEventListener("keydown", function(event) {
		if(event.keyCode == 39)
			movePlayer(playerCell.parentNode, "right");
		else if(event.keyCode == 37)
			movePlayer(playerCell.parentNode, "left");
	});

	incrementDifficulty();
	generateItem();
}

function movePlayer(playerRow, direction) {
	var playerCell = null;
	var playerRowCells = playerRow.childNodes;
	for(var i = 0; i < playerRowCells.length; i++) 
		if(playerRowCells[i].childNodes[0] != null && playerRowCells[i].childNodes[0].id == "player-img")
			playerCell = playerRowCells[i];

	if(playerCell != null) {
		var cellSplited = playerCell.id.split("-");
		if(direction == "right") {	
			var playerNewCell = document.getElementById(cellSplited[0] + "-" + cellSplited[1] + "-" + (parseInt(cellSplited[2]) + 1));
			if(playerCell.id != playerRowCells[playerRowCells.length - 1].id) {
				playerCell.removeChild(playerCell.childNodes[0]);
				if(playerNewCell.childNodes[0] != null) 
					playerNewCell.removeChild(playerNewCell.childNodes[0]);
				playerNewCell.appendChild(initImage(0));
			} 
		} else if(direction == "left") {
			var playerNewCell = document.getElementById(cellSplited[0] + "-" + cellSplited[1] + "-" + (parseInt(cellSplited[2]) - 1));
			if(playerCell.id != playerRowCells[0].id) {
				playerCell.removeChild(playerCell.childNodes[0]);
				if(playerNewCell.childNodes[0] != null) 
					playerNewCell.removeChild(playerNewCell.childNodes[0]);
				playerNewCell.appendChild(initImage(0));
			}
		}
	}
}

function generateItem() {
	generateTimeOut = setTimeout(function() {
		var itemCell = document.getElementById("cell-1-" + Math.floor((Math.random() * 5)));
		if(itemCell.childNodes.length != 0) 
			itemCell.removeChild(itemCell.childNodes[0]);

		var num = Math.floor((Math.random() * 10));
		if(num <= level)
			itemCell.appendChild(initImage(1));
		else if(num > level && num <= 8)
			itemCell.appendChild(initImage(5));
		else
			itemCell.appendChild(initImage(8));
		moveItem(itemCell);
		generateItem();
	}, 500);
}

function moveItem(item) {
	var end = false;
	var rows = document.getElementsByTagName("tr");
	var cellSplited = item.id.split("-");
	
	moveTimeOut = setTimeout(function() {
		var itemImg = item.childNodes[0];
		if(item.childNodes[0] != null && item.childNodes[0].id != "player-img")
			item.removeChild(itemImg);
		var itemNewCell = document.getElementById(cellSplited[0] + "-" + (parseInt(cellSplited[1]) + 1) + "-" + cellSplited[2]);
		if(!end)
			if(itemNewCell != null) {
				if(itemNewCell.parentNode.id != rows[rows.length - 1].id) {
					if(itemNewCell.childNodes.length != 0)
						itemNewCell.removeChild(itemNewCell.childNodes[0]);
					if(itemImg != null)
						itemNewCell.appendChild(itemImg);
					moveItem(itemNewCell);
				} else {
					if(itemNewCell.childNodes.length > 0 && itemNewCell.childNodes[0].id == "player-img") {
						if(itemImg.id == "food-image")
							incrementScore(itemImg.getAttribute("food-points"), itemNewCell);
						else if(itemImg.id == "tool-img")
							decrementLifes(itemImg.getAttribute("tool-points"), itemNewCell);
						else if(itemImg.id == "life-img")
							incrementLifes(itemNewCell);
					} else {
						if(itemNewCell.childNodes.length != 0)
							itemNewCell.removeChild(itemNewCell.childNodes[0]);
						if(itemImg != null)
							itemNewCell.appendChild(itemImg);
						moveItem(itemNewCell);
					}
					end = true;
				}
			}
	}, 400);
}

function incrementDifficulty() {
	levelTimeOut = setTimeout(function() {
		if(level > 2) {
			console.log("food: " + level + "0% | " + 
				"tools: " + (8 - level) + "0% | hearts: 20%");
			level--;
			incrementDifficulty();
		}
	}, 6000);
}

function resetGame() {
	score = 0;
	resetLifes();
	level = 5;
	document.getElementById("restart-button").style.display = "none";
	initGame(userName, 7);
}

function endGame() {
	clearTimeout(levelTimeOut);
	clearTimeout(moveTimeOut);
	clearTimeout(generateTimeOut);
	var text = "<br/><b><u>Top score: </u></b><br/>";
	var scoreArray = [];
	var dataBack = JSON.parse(localStorage.getItem("users"));
	
	for(let i = 0; i < dataBack.length; i++) 
		scoreArray[i] = dataBack[i].user.score;
	
	scoreArray.sort(function(a, b){return b-a});
	for(let i = 0; i < scoreArray.length; i++) {
		for(let j = 0; j < dataBack.length; j++) {
			if(scoreArray[i] === dataBack[j].user.score) 
				text += (i + 1) + ". " + dataBack[j].user.name + ": " + scoreArray[i] + " pts<br/>";
		}
	}
	var scoreDiv = document.createElement("div");
	scoreDiv.id = "score-div";
	scoreDiv.innerHTML = text;
	document.getElementById("container").innerHTML = "";
	document.getElementById("container").appendChild(scoreDiv);
	document.getElementById("restart-button").style.display = "inline";
	document.getElementById("restart-button").addEventListener("click", function(event) {
		resetGame();
	});
}