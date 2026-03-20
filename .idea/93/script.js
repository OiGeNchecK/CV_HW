let ready = confirm("Are you ready?");

while (!ready) {
    alert("The game will only start when you are ready.");
    ready = confirm("Are you ready?");
}

let wins = 0;

while (wins < 3) {
    const target = Math.floor(Math.random() * 10);
    let guess = null;

    while (guess !== target) {
        let input = prompt("Guess a number between 0 and 9:");

        if (input === null) {
            alert("Please enter a number to continue the game.");
            continue;
        }

        guess = parseInt(input, 10);

        if (isNaN(guess) || guess < 0 || guess > 9) {
            alert("Please enter a valid number between 0 and 9.");
            guess = null;
            continue;
        }

        if (guess < target) {
            alert("The number is bigger than your guess.");
        } else if (guess > target) {
            alert("The number is lower than your guess.");
        }
    }

    alert("Correct guess!");
    wins++;

    if (wins < 3) {
        alert("You've won " + wins + " round(s)! Get ready for the next round.");
    }
}

alert("Congratulations! You won the game!");