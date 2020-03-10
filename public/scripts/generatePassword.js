function generatePassword(uppercase, passLength, spChar, num) {
  let outputPassword = [];
  let alphaCharList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let numCharList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let spCharList = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "?"];
  let optionArr = [alphaCharList];

  // if user wants num and/or spChar append these arrays in posisble options for computer to choose from
  if(num){optionArr.push(numCharList)}
  if(spChar){optionArr.push(spCharList)}

  for (let i = 0; i < passLength; i++) {
    let computerChoosesOption = optionArr[Math.floor(Math.random() * optionArr.length)];
    let computerChooseIndex = Math.floor(Math.random() * computerChoosesOption.length);
    let computerChooseCase = 0;

    // if user asks for uppercase make computer choose if THIS character should be uppercase TRUE(1) FALSE(0)
    if(uppercase) {
      computerChooseCase = Math.floor(Math.random() * 2);
    }

    // if user asks for uppercase and computer chose alphaCharList and computer chose TRUE(1)
    if(uppercase && computerChooseCase && (computerChoosesOption[0] === "a")) {
      let upperChar = computerChoosesOption[computerChooseIndex];
      outputPassword.push(upperChar.toUpperCase());
    } else {
      outputPassword.push(computerChoosesOption[computerChooseIndex]);
    }
  }

  if (checkValidPassword(outputPassword, uppercase, spChar, num)) {
    return outputPassword.join("");
  } else {
    console.log("THE IMPOSSIBLE JUST HAPPENED!!!")
    return generatePassword(uppercase, passLength, spChar, num)
  }

}

// ================================= main function on top =====================================
// ================================= helper function below ====================================

function checkValidPassword(passwordArr, uppercase, spChar, num) {
  let lowercaseCheck = false;
  let uppercaseCheck = false;
  let numCheck = false;
  let spCharCheck = false;

  for (let i = 0; i < passwordArr.length; i++) {
    if (/[a-z]/.test(passwordArr[i])) {
      lowercaseCheck = true;
    }

    if (/[A-Z]/.test(passwordArr[i])) {
      uppercaseCheck = true;
    }

    if (/[0-9]/.test(passwordArr[i])) {
      numCheck = true;
    }

    if (/[!@#$%^&*()?]/.test(passwordArr[i])) {
      spCharCheck = true;
    }
  }

  if ( lowercaseCheck && (uppercaseCheck === uppercase) && (spCharCheck === spChar) && (numCheck === num) ) {
    return true
  } else {
    return false
  }
}

// console.log(generatePassword(true, 10, true, true));
module.exports = { generatePassword }



