<?php

$url="https://web.njit.edu/~jeb49/cs490/backend/examFetchAllQuestions.php";
$req = curl_init();

curl_setopt($req, CURLOPT_URL, $url);
curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
curl_setopt($req, CURLOPT_POST, 1);

$result = curl_exec($req);
echo $result;

?>
