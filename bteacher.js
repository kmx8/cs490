function displayBank() {
	//onload display questions from quesion bank
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var x;
			var arr = JSON.parse(this.responseText);
			var txt = "<table border=1><th>Function</th><th>Question</th><th>Topic</th><th>Difficulty</th><th>Test Cases In</th><th>Test Cases Out</th></tr>";
			for (x in arr) {
				txt += "<tr><td>"+arr[x].FUNC+"</td><td>"+arr[x].QUESTION_NAME+"</td><td>"+arr[x].TOPIC+"</td><td>"+arr[x].DIFFICULTY+"</td><td>"+arr[x].TESTCASE_IN+"</td><td>"+arr[x].TESTCASE_OUT+"</td></tr>";
			}
			txt += "</table>";
			document.getElementById("questionBank").innerHTML = txt;
		}
	};
	xhttp.open('GET', 'https://web.njit.edu/~mk595/frontend/displayBank.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
}

function addBank() {
	var xhttp = new XMLHttpRequest();

	var q = {
		func:document.getElementById("funcName").value,
		exam_id:1,
		question_name:document.getElementById("question").value,
		topic:document.getElementById("topic").value,
		difficulty:document.getElementById("difficulty").value,
		testcase_in:[document.getElementById("testIn").value],
		testcase_out:[document.getElementById("testOut").value]
	};

	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/addQuestion.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(q));
}

 
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
} 

function addToExam() {

}
