// Eduardo Gonzalez Real
function initImage(type) {
	var img = document.createElement("img");
	switch(type) {
		case 0:
			img.id = "player-img";
			img.src = "img/player2.jpg";
			break;
		case 1:
			var value = Math.floor((Math.random() * 6) + 1);
			img.setAttribute("food-points", value);
			img.className = "food-img";
			img.id = "food-image";
			img.src = "img/food" + value + ".jpg";
			break;
		case 2:
			img.id = "player-img";
			img.src = "img/playerWin1.jpg";
			break;
		case 3:
			img.id = "player-img";
			img.src = "img/playerWin2.jpg";
			break;
		case 4:
			img.id = "player-img";
			img.src = "img/playerWin3.jpg";
			break;
		case 5:
			img.id = "tool-img";
			var value = Math.floor((Math.random() * 3) + 1);
			img.setAttribute("tool-points", value);
			img.className = "food-img";
			img.src = "img/tool" + value + ".jpg";
			break;
		case 6:
			img.id = "player-img";
			img.src = "img/player3.jpg";
			break;
		case 7:
			img.id = "player-img";
			img.src = "img/player4.jpg";
			break;
		case 8:
			img.id = "life-img";
			img.src = "img/life.png";
			break;
	}
	return img;
}
function initFaqInfo() {
	var info = "<b>Left and right arrow</b> to move. <br/><u><b>Food points:</b></u> <br/>"
	+ "<img class=\"faq-img\" src=\"img/food6.jpg\"></img> +10pts<br/>"
	+ "<img class=\"faq-img\" src=\"img/food3.jpg\"></img> +10pts<br/>"
	+ "<img class=\"faq-img\" src=\"img/food5.jpg\"></img> +20pts<br/>"
	+ "<img class=\"faq-img\" src=\"img/food4.jpg\"></img> +20pts<br/>"
	+ "<img class=\"faq-img\" src=\"img/food1.jpg\"></img> +30pts<br/>"
	+ "<img class=\"faq-img\" src=\"img/food2.jpg\"></img> +30pts<br/>"
	+ "<u><b>Tool Penalty:</u></b><br/>"
	+ "<img class=\"faq-img\" src=\"img/tool1.jpg\"></img> = <img class=\"faq-img\" src=\"img/death.png\"></img><br/>"
	+ "<img class=\"faq-img\" src=\"img/tool2.jpg\"></img> ="
	+ " <img class=\"faq-img\" src=\"img/death.png\"></img>"
	+ " <img class=\"faq-img\" src=\"img/death.png\"></img><br/>"
	+ "<img class=\"faq-img\" src=\"img/tool3.jpg\"></img> ="
	+ " <img class=\"faq-img\" src=\"img/death.png\"></img>"
	+ " <img class=\"faq-img\" src=\"img/death.png\"></img>"
	+ " <img class=\"faq-img\" src=\"img/death.png\"></img>";
	document.getElementById("faq-div").innerHTML = info;

	var faqButton = document.getElementById("faq-button");
	faqButton.innerHTML = "Hide";
}