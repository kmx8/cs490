if(sessionStorage.getItem("ucid")==null){
	sessionStorage.clear();
	window.location.href = "login.html";
}

if(sessionStorage.getItem("type")==2){
	sessionStorage.clear();
	window.location.href = "login.html";
}

function displayBank() {
	//onload display questions from quesion bank
	var xhttp = new XMLHttpRequest();
	
	var search = {};

	if (document.getElementById("topicDD").value !== ""){
		search.topic = document.getElementById("topicDD").value;
	}
	if (document.getElementById("diffDD").value !== ""){
		search.difficulty = document.getElementById("diffDD").value;
	}
	if (document.getElementById("keyword").value !== ""){
		search.keyword = document.getElementById("keyword").value;
	}

	console.log(JSON.stringify(search));
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var x;
			var txt = "";
			var arr = JSON.parse(this.responseText);
			txt += "<table width='100%' border=1>";
			txt += "<th>Function</th>";
			txt += "<th>Question</th>";
			txt += "<th>Topic</th>";
			txt += "<th>Difficulty</th>";
			txt += "<th>Constraints</th>";
			txt += "<th>Test Cases In</th>";
			txt += "<th>Test Cases Out</th>";
			txt += "</tr>";
			for (x in arr) {
				txt += "<tr>";
				txt += "<td style='width:100px'>"+arr[x].FUNC+"</td>";
				txt += "<td>"+arr[x].QUESTION_NAME+"</td>";
				txt += "<td>"+arr[x].TOPIC+"</td>";
				txt += "<td>"+arr[x].DIFFICULTY+"</td>";
				txt += "<td>"+arr[x].QCONSTRAINT+"</td>";
				txt += "<td>"+arr[x].TESTCASE_IN+"</td>";
				txt += "<td>"+arr[x].TESTCASE_OUT+"</td>";
				txt += "</tr>";
			}
			txt += "</table>";
			document.getElementById("questionBank").innerHTML = txt;
		}
	};
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/displayBank.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(search));
}

function displayBank2() {
	//onload display questions from quesion bank
	var xhttp = new XMLHttpRequest();

	var search = {};

	if (document.getElementById("topicDD2").value !== ""){
		search.topic = document.getElementById("topicDD2").value;
	}
	if (document.getElementById("diffDD2").value !== ""){
		search.difficulty = document.getElementById("diffDD2").value;
	}
	if (document.getElementById("keyword2").value !== ""){
		search.keyword = document.getElementById("keyword2").value;
	}

	console.log(JSON.stringify(search));
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var x;
			var txt = "";
			var arr = JSON.parse(this.responseText);
			txt += "<table id='table1' width='100%' border=1>";
			txt += "<th>Add?</th>";
			txt += "<th>Points</th>";
			txt += "<th>Function</th>";
			txt += "<th>Question</th>";
			txt += "<th>Constraints</th>";
			txt += "<th>Topic</th>";
			txt += "<th>Difficulty</th>";
			txt += "<th>Test Cases In</th>";
			txt += "<th>Test Cases Out</th>";
			txt += "</tr>";
			for (x in arr) {
				txt += "<tr>";
				txt += "<td><input type='checkbox' name='checked' value='"+JSON.stringify(arr[x])+"'></input></td>";
				txt += "<td><input type='text' id='points"+x.toString()+"' name='points"+x.toString+"' size='2'></input></td>";
				txt += "<td>"+arr[x].FUNC+"</td>";
				txt += "<td>"+arr[x].QUESTION_NAME+"</td>";
				txt += "<td>"+arr[x].QCONSTRAINT+"</td>";
				txt += "<td>"+arr[x].TOPIC+"</td>";
				txt += "<td>"+arr[x].DIFFICULTY+"</td>";
				txt += "<td>"+arr[x].TESTCASE_IN+"</td>";
				txt += "<td>"+arr[x].TESTCASE_OUT+"</td>";
				txt += "</tr>";
			}
			txt += "</table>";
			document.getElementById("questionBank2").innerHTML = txt;
		}
	};
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/displayBank.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(search));
}

function addBank(callback) {
	var xhttp = new XMLHttpRequest();

	var q = {
		func:document.getElementById("funcName").value,
		exam_id:1,
		question_name:document.getElementById("question").value,
		topic:document.getElementById("topic").value,
		difficulty:document.getElementById("difficulty").value,
		constraints:document.getElementById("constraints").value,
		testcase_in:[document.getElementById("testIn").value],
		testcase_out:[document.getElementById("testOut").value]
	};
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			updateDisplays();
		}
	}
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/addQuestion.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(q));
}

function addExam() {
	var examName=document.getElementById("examName").value;
	var output = {
		exam_name:examName
	};
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var txt = "Exam " + examName + " has been added to the exam bank";
			document.getElementById("enResp").innerHTML = txt;
			setTimeout(function() {
				document.getElementById("enResp").innerHTML = "";
			},3000);
		}
	}
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/addExam.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(output));
	setTimeout(onload(), 300);
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
	document.getElementById(tabName).style.display = "flex";
	evt.currentTarget.className += " active";
} 

function addToExam() {
	var grid = document.getElementById("table1");
	var examId = document.getElementById("exam_id").value;
	var checkBoxes = grid.getElementsByTagName("INPUT");
	console.log("this is the exam id",examId);
	for (var i = 0; i < checkBoxes.length; i+=2) {
		if (checkBoxes[i].checked){
			var sig = JSON.parse(checkBoxes[i].value);
			var row = checkBoxes[i].parentNode.parentNode;
			var xhttp = new XMLHttpRequest();
			var txt = "points";
			txt += (i/2).toString();
			console.log("points="+(i/2));
			var outputJSON = {
				question_id:sig.QUESTION_ID,
				func:sig.FUNC,
				exam_id: examId,
				question_name:sig.QUESTION_NAME,
				topic:sig.TOPIC,
				difficulty:sig.DIFFICULTY,
				constraints:sig.QCONSTRAINT,
				points:[document.getElementById(txt).value],
				testcase_in:[sig.TESTCASE_IN],
				testcase_out:[sig.TESTCASE_OUT],
			};
			xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/addToExam.php', true);
			xhttp.setRequestHeader("Content-type", "application/json");
			xhttp.send(JSON.stringify(outputJSON));
		}
	}
	setTimeout(displayExam(0), 500);
}

function loadExams() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var txt = "<select id='exam_id' onchange='displayExam(updateDisplays())'>";
			txt += "<option value=''>------------------</option>";
			console.log(this.responseText);
			var arr = JSON.parse(this.responseText);
			for (x = 0; x < arr.length; x++) {	
				//makes a dropdown of exams
				txt += "<option value='"+arr[x].exam_id+"'>"+arr[x].exam_name+"</option>";
			}
			txt += "</select>";
		}
		document.getElementById("examBank").innerHTML = txt;
	};
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/loadExams.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
}

async function displayExam(num) {
	var xhttp = new XMLHttpRequest();
	var examID = {
		exam_id: parseInt(document.getElementById("exam_id").value)
	};
	xhttp.onreadystatechange = async function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("examID="+JSON.stringify(examID));
			//console.log("this.responseText="+this.responseText);
			var x;
			var txt = "";
			//console.log("2");
			var arr = JSON.parse(this.responseText);
			//console.log("arr="+JSON.stringify(arr));
			txt += "<table width='100%' border='1'>";
			txt += "<th>Function</th>";
			txt += "<th>Question</th>";
			txt += "<th>Topic</th>";
			txt += "<th>Difficulty</th>";
			txt += "<th>Constraints</th>";
			txt += "<th>Test Cases In</th>";
			txt += "<th>Test Cases Out</th>";
			txt += "<th>Points</th></tr>";
			for (x in arr) {
				txt += "<tr>";
				txt += "<td style='width:100px'>"+arr[x].FUNC+"</td>";
				txt += "<td>"+arr[x].QUESTION_NAME+"</td>";
				txt += "<td>"+arr[x].TOPIC+"</td>";
				txt += "<td>"+arr[x].DIFFICULTY+"</td>";
				txt += "<td>"+arr[x].QCONSTRAINT+"</td>";
				txt += "<td>"+arr[x].TESTCASE_IN+"</td>";
				txt += "<td>"+arr[x].TESTCASE_OUT+"</td>";
				txt += "<td>"+arr[x].POINTS+"</td>";
				txt += "</tr>";
			}
			//console.log("3");
			txt += "</table>";
			document.getElementById("exams").innerHTML = txt;
		}
	};
	//console.log("1");
	console.log("displayExam")
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/displayExamBank.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(examID));
	if (num==1) {
		setTimeout(displayExam(0),500);
	}
}

function loadGradingDropdown() {
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var x;
			var arr = JSON.parse(this.responseText);
			var txt = "<select id='examDD' onchange='loadStudentDD()'>";//exam dropdown
			txt += "<option value=''>----------------</option>";
			for (x in arr) {
				txt += "<option value='"+arr[x].exam_id+"'>"+arr[x].exam_name+"</option>";
			}
			txt += "</select>";
			document.getElementById("examDropDown").innerHTML = txt;
			console.log("loading grading dropdown");
		}
	}
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/getExamsGraded.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
}

async function loadStudentDD(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var x;
			var arr = JSON.parse(this.responseText);
			var txt = "<label>Choose Student: </label>";
			txt += "<select id='studentDD' onchange='loadStudentRes()'>";
			txt += "<option value=''>----------------</option>";
			for (x in arr) {
				txt += "<option value='"+arr[x].USER+"'>"+arr[x].USER+"</option>";
			}
			txt += "</select>";
			document.getElementById("studentD").innerHTML = txt;
			console.log("loading student dropdown");
		}
	}
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/getStudentsExam.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
}


async function loadStudentRes() {
	//tag to replace is "loadExam"
	var xhttp = new XMLHttpRequest();
	var examID = {
		exam_id: parseInt(document.getElementById("examDD").value),
		ucid: document.getElementById("studentDD").value
	};
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var arr = JSON.parse(this.responseText);
			var txt = "<table id='table' border=1' width='100%'>";
			for(x in arr) {
				console.log("grade="+arr[x].GRADE);//.funcName, .constraint, .colon, .expected_output, .earned, .total
				const grade = JSON.parse(arr[x].GRADE);
				txt += "<tr>";
				txt += "<td align='center'><b>Function:</b> "+arr[x].FUNC+"</td>";
				txt += "<td align='center'><b>Difficulty:</b> "+arr[x].DIFFICULTY+"</td>";
				txt += "<td align='center'><b>Topic:</b> "+arr[x].TOPIC+"</td>";
				//need earned points
				//student_output get from jon:
				//expected_output:
				txt += "<th rowspan='2'>Comments</th>";
				txt += "<td align='center' style='width:150px' rowspan='2'><b>Possible Points: </b>"+arr[x].POINTS+"</td>";
				txt += "</tr><tr>";
				txt += "<th>Question</th>";
				txt += "<th>Student Response</th>";
				txt += "<th>Student Output</th>";
				txt += "</tr><tr>";
				txt += "<td style='width:300px'>"+arr[x].QUESTION_NAME+"</td>";
				txt += "<td style='vertical-align: text-top; white-space:pre; width:250px;'><br>"+arr[x].STUDENT_RESP+"</td>";
				txt += "<td style='width:150px;vertical-align: text-top;'>"+grade.student_output+"</td>";
				txt += "<td style='width:400px'><textarea style='width:100%;height:200px;' id='comments"+x+"'>"+arr[x].COMMENT+"</textarea></td>";
				//td for grade
				txt += "<td style='width:150px'>";
				txt += "<p>Function Name: <input type='text' style='width:30px' id='gradeFuncName"+x+"' value='"+grade.funcName+"'></input></p>";
				txt += "<p>Constraint: <input type='text' style='width:30px' id='gradeConstraint"+x+"' value='"+grade.constraint+"'></input></p>";
				txt += "<p>Colon: <input type='text' style='width:30px' id='gradeColon"+x+"' value='"+grade.colon+"'></input></p>";
				//txt += "<p>Earned Points: <input type='text' style='width:30px' id='gradeEarned"+x+"' value='"+grade.earned+"'></input></p>";
				txt += "<p>Total Points: <input type='text' style='width:30px' id='gradeTotal"+x+"' value='"+grade.total+"'></input></p>";
				txt += "</td>";
				//txt += "<td><b>pts earned:</b>: "+grade.funcName+"</td>";
				//should have 
				txt += "</tr>";
			}
			txt += "</table>";
			document.getElementById("loadExam").innerHTML = txt;
		}
	};
	console.log("loading student res");
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/getResponses.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(examID));
}

async function sendGrade() {
	var grid = document.getElementById("table");
	var responses = grid.getElementsByTagName("TEXTAREA");
	var output = {
		exam_id:document.getElementById("examDD").value,
		ucid:document.getElementById("studentDD").value
	}
	var response = await fetch('https://web.njit.edu/~mk595/frontend/displayExamBank.php', {
		method: 'POST',
		body: JSON.stringify(output)
	});
	console.log(response);
	var responseJSON = await response.json();
	for (var i = 0; i < responses.length; i++) {
		var comments = "comments" + i.toString();

		var gradeJSON = {};

		var gradeFuncName = "gradeFuncName" + i.toString();
		var gradeConstraint = "gradeConstraint" + i.toString();
		var gradeColon = "gradeColon" + i.toString();
		//var gradeEarned = "gradeEarned" + i.toString();
		var gradeTotal = "gradeTotal" + i.toString();
		
		responseJSON[i].COMMENT = document.getElementById(comments).value;
		gradeJSON.funcName = document.getElementById(gradeFuncName).value;
		gradeJSON.constraint = document.getElementById(gradeConstraint).value;
		gradeJSON.colon = document.getElementById(gradeColon).value;
		//gradeJSON.earned = document.getElementById(gradeEarned).value;
		gradeJSON.total = document.getElementById(gradeTotal).value;
		responseJSON[i].GRADE = JSON.stringify(gradeJSON);
		responseJSON[i].USER = document.getElementById("studentDD").value;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = async function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("updating grades");
			document.getElementById("gradeResp").innerHTML = "TEST HAS BEEN GRADED";
		}
	}
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/releaseExam.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	var q = await JSON.stringify(responseJSON);
	console.log(q);
	xhttp.send(q);
}

function updateDisplays() {
	setTimeout(function(){
		//displayExam();
		displayBank();
		displayBank2();
		//loadStudentRes();
		console.log("updating displays");
	}, 500);
}

function onLoad() {
	setTimeout(function(){
		updateDisplays();
		loadGradingDropdown();
		loadExams();
		console.log("onload finished");
	}, 500);
}

function logOut() {
	sessionStorage.clear();
	window.location.href = "login.html";
}
