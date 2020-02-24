<?php
$url="https://web.njit.edu/~jeb49/cs490/backend/takeExamGradeQuestion.php";
$inputJSON = file_get_contents('php://input');
$req = curl_init();
curl_setopt($req, CURLOPT_URL, $url);
curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
curl_setopt($req, CURLOPT_POST, 1);
curl_setopt($req, CURLOPT_POSTFIELDS, $inputJSON);
curl_setopt($req, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
$result = curl_exec($req);
echo $result;
?>
