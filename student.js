if(sessionStorage.getItem("ucid")==null){
	sessionStorage.clear();
	window.location.href = "login.html";
}

if(sessionStorage.getItem("type")==1){
	sessionStorage.clear();
	window.location.href = "login.html";
}

async function getExam() {
	var q = {
		exam_id:sessionStorage.getItem("exam_id"),
		ucid:sessionStorage.getItem("ucid")
	}
	console.log("stored exam_id="+q.exam_id);
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var arr = JSON.parse(this.responseText);
			console.log(arr);
			var txt = "<table id='table' width='100%' border='1'>";
			for (x in arr) {
				txt += "<tr><th>Function</th><th>Question</th><th>Points</th></tr>";
				txt += "<tr>";
				txt += "<td>"+arr[x].FUNC+"</td>";
				txt += "<td>"+arr[x].QUESTION_NAME+"</td>";
				txt += "<td>"+arr[x].POINTS+"</td>";
				txt += "</tr>";
				txt += "<tr><td>Student Response</td><td colspan='2'><textarea id='response"+x+"' style='width:100%;height:150px'></textarea></td></tr>";
			}
			txt += "</table>";
			document.getElementById("loadExam").innerHTML = txt;
			document.getElementById("examName").innerHTML = sessionStorage.getItem("exam_name");
		}
	}
    xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/displayExamBank.php', true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(q));
}

async function sendExam() {
	var grid = document.getElementById("table");
	var responses = grid.getElementsByTagName("TEXTAREA");
	var output = {
		exam_id:sessionStorage.getItem("exam_id"),
		ucid:sessionStorage.getItem("ucid")
	}
	var response = await fetch('https://web.njit.edu/~mk595/frontend/displayExamBank.php', {
		method: 'POST',
		body: JSON.stringify(output)
	});
	var responseJSON = await response.json();
	var examQuestions = JSON.stringify(responseJSON);
	//console.log("examQuestions="+examQuestions);
	for (var i = 0; i < responses.length; i++) {
		var txt = "response" + i.toString();
		//console.log("response#="+i);
		responseJSON[i]["STUDENT_RESP"] = await document.getElementById(txt).value;
		responseJSON[i]["UCID"] = sessionStorage.getItem("ucid");
		//var sig = document.getElementById(txt).value;
		//console.log("sig="+sig);
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = await function() {
		if(this.readyState==4 && this.status==200){
			console.log("response="+this.responseText);
			document.getElementById("response").innerHTML = "TEST HAS BEEN SUBMITTED REDIRECTED IN 3 SECONDS";
			setTimeout(function() {
				window.location.href = "https://web.njit.edu/~mk595/frontend/student.html";
			},3000);
		}
	}
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/sendExam.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	var output = await JSON.stringify(responseJSON);
	console.log(output);
	xhttp.send(output);
}

async function loadTakeExamDD() {
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var arr = JSON.parse(this.responseText);
			console.log(arr);
			for (x in arr) {
				var select = document.getElementById("takeExam");
				var option = document.createElement("option");
				option.value = arr[x].exam_id;
				option.text = arr[x].exam_name;
				select.add(option);
			}
		}
	}
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/fetchUngradedExams.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	console.log("Take Exam DD loaded")
}

async function loadReviewExamDD() {
	var q = {
		ucid:sessionStorage.getItem("ucid")
	}
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var arr = JSON.parse(this.responseText);
			console.log(arr);
			for (x in arr) {
				var select = document.getElementById("reviewExam");
				var option = document.createElement("option");
				option.value = arr[x].exam_id;
				option.text = arr[x].exam_name;
				select.add(option);
			}
		}
	} //needs to be from graded exams
	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/fetchGradedExams.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(q));
	console.log("Review DD loaded")
}

async function loadReview() {
	//tag to replace is "loadExam"
	var xhttp = new XMLHttpRequest();
	var examID = {
		exam_id:sessionStorage.getItem("exam_id"),
		ucid:sessionStorage.getItem("ucid")
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
				txt += "<td align='center' style='width:150px' colspan='2' rowspan='2'><b>Possible Points: </b>"+arr[x].POINTS+"</td>";
				txt += "</tr><tr>";
				txt += "<th>Question</th>";
				txt += "<th>Student Response</th>";
				txt += "<th>Comments</th>";
				txt += "</tr><tr>";
				txt += "<td style='width:300px'>"+arr[x].QUESTION_NAME+"</td>";
				txt += "<td style='vertical-align: text-top; white-space:pre; width:250px;'><br>"+arr[x].STUDENT_RESP+"</td>";
				txt += "<td style='width:400px' colspan='2'><textarea disabled style='width:100%;height:200px;' id='comments"+x+"'>"+arr[x].COMMENT+"</textarea></td>";
				//td for grade
				txt += "<td style='width:150px'>";
				txt += "<p>Function Name: <input disabled type='text' style='width:30px' id='gradeFuncName"+x+"' value='"+grade.funcName+"'></input></p>";
				txt += "<p>Constraint: <input disabled type='text' style='width:30px' id='gradeConstraint"+x+"' value='"+grade.constraint+"'></input></p>";
				txt += "<p>Colon: <input disabled type='text' style='width:30px' id='gradeColon"+x+"' value='"+grade.colon+"'></input></p>";
				txt += "<p>Earned Points: <input disabled type='text' style='width:30px' id='gradeEarned"+x+"' value='"+grade.earned+"'></input></p>";
				txt += "<p>Total Points: <input disabled type='text' style='width:30px' id='gradeTotal"+x+"' value='"+grade.total+"'></input></p>";
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


async function loadDD() {
	loadTakeExamDD();
	loadReviewExamDD();
}

async function redirect(url, DD) {
	var dd = document.getElementById(DD);
	var index = dd.selectedIndex;
	var option = dd[index];
	sessionStorage.setItem('exam_id', dd.value);
	sessionStorage.setItem('exam_name', option.innerHTML);
	console.log("Storing exam_id="+dd);
	window.location.href = url;
}

async function redirectStudent() {
	window.location.href = "student.html";
}

function logOut() {
	sessionStorage.clear();
	window.location.href = "login.html";
}
