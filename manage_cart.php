<?php
session_start();
include('database.inc.php');
include('function.inc.php');
include('constant.inc.php');
$attr=get_safe_value($_POST['attt']);
$type=get_safe_value($_POST['type']);

if ($type == 'add') {
    $qty = get_safe_value($_POST['qty']);
    if (isset($_SESSION['FOOD_USER_ID'])) {
        $uid = $_SESSION['FOOD_USER_ID'];
        manageUserCart($uid, $qty, $attr);

        $getUserFullCart = getUserFullCart();
        $totalPrice = 0;
        foreach ($getUserFullCart as $list) {
            $totalPrice += ($list['qty'] * $list['price']);
        }

        $getDishDetail = getDishDetailById($attr);
        $price = $getDishDetail['price'];
        $dish = $getDishDetail['dish'];
        $image = $getDishDetail['image'];

        $totalDish = count($getUserFullCart);
        $arr = [
            'status' => 'success',
            'totalCartDish' => $totalDish,
            'totalPrice' => $totalPrice,
            'price' => $price,
            'dish' => $dish,
            'image' => $image,
        ];
        echo json_encode($arr);
    } else {
        // User not logged in
        $arr = ['status' => 'not_logged_in'];
        echo json_encode($arr);
    }
    exit;
}

if($type=='delete'){
	removeDishFromCartByid($attr);
	$getUserFullCart=getUserFullCart();
	$totaDish=count($getUserFullCart);
	$totalPrice=0;
	foreach($getUserFullCart as $list){
		$totalPrice=$totalPrice+($list['qty']*$list['price']);
	}
	$arr=array('totalCartDish'=>$totaDish,'totalPrice'=>$totalPrice);
	echo json_encode($arr);
}
?>
