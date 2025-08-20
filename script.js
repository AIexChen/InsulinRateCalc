document.getElementById("processBtn").addEventListener("click", () => {
  const input1 = document.getElementById("input1").value.trim();
  const input2 = document.getElementById("input2").value.trim();
  const input3 = document.getElementById("input3").value.trim();


  // Regex for positive numbers (allows decimals, no negatives, no extra chars)
  const numberRegex = /^\d+(\.\d+)?$/;

  if (!numberRegex.test(input1) || !numberRegex.test(input2) || !numberRegex.test(input3)) {
    document.getElementById("output").textContent = "Please enter valid positive numbers (e.g. 7.0, 1). Do not type units or other unique characters such as commas or slashes.";
    return;
  }

  let whatDo = "";
  let change = 0;

  // Convert to numbers
  const num1 = parseFloat(input1);
  const num2 = parseFloat(input2); 
  const num3 = parseFloat(input3); 

  if (num2 <= 5.0) {
    whatDo = "HOLD INSULIN INFUSION, implement hypoglycemia medical directive if blood glucose less than 4 mmol/L. Resume IV insulin infulin at 0.25x the previous rate when blood glucose is greater than or equal to 5 mmol/L.";
  }
  else {
    let dif = num2 - num1;
    //hardcoding lol, not sure about the rounding bc the chart goes in .1 intervals
    if (num2 > 5.0 && num2 <= 6.0) {                                                // first table row
      if (dif <= -1.5) {
        whatDo = "Reduce infusion rate to 0.25x its current value"; 
        change = num3 * 0.25;
      }
      else if (dif > -1.5 && dif <= -0.6) {
        whatDo = "Reduce infusion rate to 0.5x its current value"; 
        change = num3 * 0.5;
      }
      else if (dif > -0.6 && dif <= 0.5) {
        whatDo = "Reduce infusion rate to 0.75x its current value"; 
        change = num3 * 0.75;
      }
      else if (dif > 0.5 && dif <= 1.5) {
        whatDo = "No change to the current infusion rate is necessary."; 
      }
      else {
        whatDo = "Increase infusion rate to 1.25x its current value"; 
        change = num3 * 1.25;
      }
    }
    else if (num2 > 6.0 && num2 <= 8.0) {                                             // 2nd table row
      if (dif <= -1.5) {
        whatDo = "Reduce infusion rate to 0.5x its current value"; 
        change = num3 * 0.5;
      }
      else if (dif > -1.5 && dif <= -0.6) {
        whatDo = "Reduce infusion rate to 0.75x its current value"; 
        change = num3 * 0.75;
      }
      else if (dif > -0.6 && dif < 1.5) {
        whatDo = "No change to the current infusion rate is necessary."; 
      }
      else {
        whatDo = "Increase infusion rate to 1.25x its current value"; 
        change = num3 * 1.25;
      }
    }
    else if (num2 > 8.0 && num2 <= 10.0) {                                             // 3rd table row
      if (dif <= -1.5) {
        whatDo = "Reduce infusion rate to 0.75x its current value"; 
        change = num3 * 0.75;
      }
      else if (dif > -1.5 && dif <= 0.5) {
        whatDo = "No change to the current infusion rate is necessary."; 
      }
      else if (dif > 0.5 && dif <= 1.5) {
        whatDo = "Increase infusion rate to 1.25x its current value"; 
        change = num3 * 1.25;
      }
      else {
        whatDo = "Increase infusion rate to 1.5x its current value"; 
        change = num3 * 1.5;
      }
    }
    else if (num2 > 10.0 && num2 <= 12.0) {                                             // 4th table row
      if (dif <= -0.6) {
        whatDo = "No change to the current infusion rate is necessary."; 
      }
      else if (dif > -0.6 && dif <= 0.5) {
        whatDo = "Increase infusion rate to 1.25x its current value"; 
        change = num3 * 1.25;
      }
      else if (dif > 0.5 && dif <= 1.5) {
        whatDo = "Increase infusion rate to 1.5x its current value"; 
        change = num3 * 1.5;
      }
      else {
        whatDo = "Increase infusion rate to 2x its current value"; 
        change = num3 * 2;
      }
    }
    else if (num2 > 12.0 && num2 <= 20.0) {                                             // 5th table row
      if (dif <= -1.5) {
        whatDo = "No change to the current infusion rate is necessary."; 
      }
      else if (dif > -1.5 && dif <= -0.6) {
        whatDo = "Increase infusion rate to 1.25x its current value"; 
        change = num3 * 1.25;
      }
      else if (dif > -0.6 && dif <= 0.5) {
        whatDo = "Increase infusion rate to 1.5x its current value"; 
        change = num3 * 1.5;
      }
      else {
        whatDo = "Increase infusion rate to 2x its current value"; 
        change = num3 * 2;
      }
    }
    else {
      whatDo = "The current blood glucose level is extremely high at over 20 mmol/L! Seek help!";
    }
  }
  if (change == 0) {
    document.getElementById("output").textContent = `${whatDo}`;
  }
  else {
    document.getElementById("output").textContent = `${whatDo} for a new rate of ${change}.`;

  }
});
