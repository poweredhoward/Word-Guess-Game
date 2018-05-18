var lettersGuessed = [];
var wordPool = ["kobe", "lebron", "curry", "harden", "westbrook", "giannis", "durant", "kawhi", "davis", "kyrie"];
var wins = 0;
var guessesLeft = 9;
var mysteryword = [];
var wordToGuess = wordPool[Math.floor((Math.random()*wordPool.length-1 + 1) + 0)];
var letter = '';
var lettersCountdown = wordToGuess.length;
var foundLetters =[];

function print(content) {
	console.log(content);
}

//Reset all values and elements
function newgame() {
	guessesLeft = 7;
	mysteryword = [];
	wordToGuess = wordPool[Math.floor((Math.random()*wordPool.length-1 + 1) + 0)];
	letter = '';
	lettersCountdown = wordToGuess.length;
	foundLetters =[];
	lettersGuessed = [];
	document.getElementById("newgame").style.visibility = "hidden";
	initializeBoard();
	document.getElementById("lettersguessed").innerHTML = '';

}

//Used for starting games, setting elements to correct values
function initializeBoard (){

	document.getElementById("wordsection").innerHTML = '';
	document.getElementById("wins").textContent = wins;

	//Make empty word slashes and put on page
	for (var i=0 ; i<wordToGuess.length ; i++){
		var span = document.createElement("span");
		span.id = "letter"+i;
		span.setAttribute("class", "letters");
		span.textContent = "_";
		document.getElementById("wordsection").appendChild(span);
	}

	document.getElementById("numguess").textContent = guessesLeft;
	document.getElementById("hangmanpic").src = "assets/images/hangman-0.png";

	print("Mystery word: " + wordToGuess);

}

//Set up/display guesses left section
var guess_span = document.createElement("span");
guess_span.id = "numguess";
guess_span.textContent = guessesLeft;
document.getElementById("guesses").appendChild(guess_span);

initializeBoard();


document.onkeyup = function(event) {
	letter = event.key;

	//If wrong guess
	if ( wordToGuess.indexOf(letter) === -1) {

		//Only run if wrong char that hasn't been guessed yet
		if (lettersGuessed.indexOf(letter)  === -1 ){
			lettersGuessed.push(letter);
			guessesLeft--;

			//Append to wrong letters list
			var letter_span = document.createElement("span");
			letter_span.setAttribute("class", "letters");
			letter_span.textContent = letter;
			document.getElementById("lettersguessed").appendChild(letter_span);

			//Update guesses remaining
			document.getElementById("numguess").textContent = guessesLeft;
			document.getElementById("hangmanpic").src = "assets/images/hangman-"+(9 - guessesLeft) +".png";

		}

		//Game over, user lost
		if (guessesLeft < 1){
			alert("Loser");
			document.getElementById("newgame").style.visibility = "visible";
		}
	}

	//If a correct letter was already found
	else if (foundLetters.indexOf(letter) > -1) {
		return;
	}

	//Correct guess, account for multiple occurences of char
	else {
		for (var i = 0 ; i < wordToGuess.length ; i++){
			if (wordToGuess[i] === letter){
				mysteryword[i] = letter;
				lettersCountdown--;
				document.getElementById("letter"+i).textContent = letter;
			}
		}

		foundLetters.push(letter);

		//User wins
		if (lettersCountdown < 1){
			wins++;
			document.getElementById("wins").textContent = wins;
			document.getElementById("newgame").style.visibility = "visible";
		}	


	}

	print("Mystery word: " + wordToGuess);
	print("guessesLeft: " + guessesLeft);
	print("Letters Guessed: " + lettersGuessed);
	console.log("Letters to go: " + lettersCountdown);

};