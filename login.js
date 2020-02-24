function login() {
	var	xhttp = new XMLHttpRequest();

	var loginJSON = {
		ucid:document.getElementById("username").value,
		pass:document.getElementById("password").value
	};

	xhttp.open('POST', 'https://web.njit.edu/~mk595/frontend/login.php', true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(loginJSON));

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("response").innerHTML = this.responseText;
			if (this.responseText == 1) {
				sessionStorage.setItem('ucid', loginJSON.ucid);
				sessionStorage.setItem('type', 1);
				window.location.href = "https://web.njit.edu/~mk595/frontend/teacher.html";
			} else if (this.responseText == 2) {
				sessionStorage.setItem('ucid', loginJSON.ucid);
				sessionStorage.setItem('type', 2);
				window.location.href = "https://web.njit.edu/~mk595/frontend/student.html";
			}
		}
	}
	return false;
}
