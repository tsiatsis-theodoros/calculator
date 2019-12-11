// Checks if div with id="calculator" has style display:none to hide or show the div

function myFunction() {
  let x = document.getElementById("calculator");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Reads the value from element with id history-value
function getHistory(){
	return document.getElementById("history-value").innerText;
}

// Prints the value to the element with id history-value
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}

// Reads the value from element with id output-value
function getOutput(){
	return document.getElementById("output-value").innerText;
}

// Prints the value to the element with id output-value
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}

// Formating an integer with a comma as a thousands separators
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	let n = Number(num);
	let value = n.toLocaleString("en");
	return value;
}

// Removes all commas
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

// Get all elements with class name operator and save to operator
let operator = document.getElementsByClassName("operator");


for(let i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			let output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			let output=getOutput();
			let history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					let result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

// Get all elements with class name number and save to number
let number = document.getElementsByClassName("number");

// For each number we click, we add this number to the end of the number on output field
for(let i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		let output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id; 
			printOutput(output);
		}
	});
}