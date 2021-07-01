<?php 
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

$filename = "highscore.json";
$file_content = file_get_contents($filename);
$highscore = json_decode($file_content, true);
print_r($highscore);

array_push($highscore, array(
  "name" => $_POST["name"],
  "character" => $_POST["character"],
  "points" => intval($_POST["points"]),
  "time" => intval($_POST["time"])
));

$json_data = json_encode($highscore);
file_put_contents("highscore.json", $json_data);

?>
