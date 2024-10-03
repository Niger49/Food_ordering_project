<?php
/*$password="meher_niger";
echo password_hash($password,PASSWORD_BCRYPT);*/

/*$new_password="meher_niger";
$str='$2y$10$VGlRVw6wNJ079is2s3762OqVM/vjgiD2U2eqVSLHaoNm0VGzsr/sW';
if(password_verify($new_password,$str)){
	echo "Yes";
}else{
	echo "No";
}*/

session_start();
echo '<pre>';
unset($_SESSION['cart']);

?>