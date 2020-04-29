<?php
/*
$file = file_get_contents('./example.json');
$newString = str_replace("}]}
{", "}]}, {", $file);

echo $file;
echo "<br>";
echo "<br>";
$end = "[" . $newString . "]";
echo $end;
echo "<br>";
echo "<br>";*/

$myfile = fopen("./example.json", "r") or die("Unable to open file!");
// Output one line until end-of-file
$newContent = '';
while (!feof($myfile)) {
	$line = fgets($myfile);
	$line = str_replace("}]}", "}]},", $line);
	echo $line;
	$newContent .= $line;


}
fclose($myfile);

$newFile = fopen('./result.json', 'w') or die("Unable to open file!");
fwrite($newFile, "[" . $newContent . "]");
fclose($newFile);

$resultFile = file_get_contents('./result.json');
$newString = str_replace("}]},]", "}]}]", $resultFile);

$resultFileOpen = fopen('./result.json', 'w') or die("Unable to open file!");
fwrite($resultFileOpen, $newString);
fclose($resultFileOpen);


