<?php
header("Access-Control-Allow-Origin: *");
//$target_dir = "/productos-img/";
$target_file = basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        //echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "Error";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    $target_file = pathinfo($target_file, PATHINFO_FILENAME) . "-" . date("His") . "." . pathinfo($target_file, PATHINFO_EXTENSION);
    //echo "File already exists. Renamed to ".$target_file;
    //$uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 1000000) {
    echo "Error";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Error";
    //echo $_FILES["fileToUpload"]["name"];
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Error";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        //echo basename( $_FILES["fileToUpload"]["name"]);
        echo $target_file;
    } else {
        echo "Error";
    }
}
?>