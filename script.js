document.getElementById("check-btn").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value.trim();
    const resultsDiv = document.getElementById("results-div");

    // Check if the input is empty
    if (!userInput) {
        alert("Please provide a phone number");
        resultsDiv.textContent = "";
        return;
    }

    // Check for "55 55-55-555-5"
    if (/^\d{2} \d{2}-\d{2}-\d{3}-\d{1}$/.test(userInput)) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    const validChars = /^[0-9\s\-\(\)]*$/;
    if (!validChars.test(userInput)) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    let openCount = 0;
    let closeCount = 0;

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === `(`) openCount++;
        if (userInput[i] === `)`) closeCount++;
    }

    if (openCount !== closeCount) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    if (/(\s{2,}|\-{2,}|\(\){2,})/.test(userInput)) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    // Check if it starts with -1
    if (userInput.startsWith("-1")) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    if (userInput.startsWith("(") && userInput.endsWith(")") && userInput.length > 2) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    const cleanedInput = userInput.replace(/[\s\-\(\)]/g, "");

    // Check the length of the phone number (should be 10-11)
    if (cleanedInput.length < 10 || cleanedInput.length > 11) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    // Check if the number starts with 1
    if (cleanedInput.length === 11 && cleanedInput.charAt(0) !== `1`) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    const areaCode = cleanedInput.length === 11 ? cleanedInput.slice(1, 4) : cleanedInput.slice(0, 3);
    if (areaCode.charAt(0) === `0` || areaCode.charAt(0) === `1`) {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    const firstDigitAfterAreaCode = cleanedInput.length === 11 ? cleanedInput.charAt(4) : cleanedInput.charAt(3);
    if (firstDigitAfterAreaCode === '0' || firstDigitAfterAreaCode === '1') {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
        resultsDiv.className = "error";
        return;
    }

    // If everything is valid
    resultsDiv.textContent = `Valid US number: ${userInput}`;
    resultsDiv.className = "success";
});

// Clear button
document.getElementById("clear-btn").addEventListener("click", function() {
    document.getElementById("user-input").value = "";  
    document.getElementById("results-div").textContent = "";  
});