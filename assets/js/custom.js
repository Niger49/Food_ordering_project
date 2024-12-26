jQuery('#frmRegister').on('submit',function(e){
	jQuery('.error_field').html('');
	jQuery('#register_submit').attr('disabled',true);
	jQuery('#form_msg').html('Please wait...');
	jQuery.ajax({
		url:FRONT_SITE_PATH+'login_register_submit',
		type:'post',
		data:jQuery('#frmRegister').serialize(),
		success:function(result){
			jQuery('#form_msg').html('');
			jQuery('#register_submit').attr('disabled',false);
			var data=jQuery.parseJSON(result);
			if(data.status=='error'){
				jQuery('#'+data.field).html(data.msg);
			}
			if(data.status=='success'){
				jQuery('#'+data.field).html(data.msg);
				jQuery('#frmRegister')[0].reset();
			}
		}
		
	});
	e.preventDefault();
});	


jQuery('#frmLogin').on('submit',function(e){
	jQuery('.error_field').html('');
	jQuery('#login_submit').attr('disabled',true);
	jQuery('#form_login_msg').html('Please wait...');
	jQuery.ajax({
		url:FRONT_SITE_PATH+'login_register_submit',
		type:'post',
		data:jQuery('#frmLogin').serialize(),
		success:function(result){
			jQuery('#form_login_msg').html('');
			jQuery('#login_submit').attr('disabled',false);
			var data=jQuery.parseJSON(result);
			if(data.status=='error'){
				jQuery('#form_login_msg').html(data.msg);
			}
			var is_checkout=jQuery('#is_checkout').val();
			if(is_checkout=='yes'){
				window.location.href='checkout';
			}else if(data.status=='success'){
				//jQuery('#form_login_msg').html(data.msg);
				window.location.href='shop';
			}
		}
		
	});
	e.preventDefault();
});	


jQuery('#frmForgotPassword').on('submit',function(e){
	jQuery('#forgot_submit').attr('disabled',true);
	jQuery('#form_forgot_msg').html('Please wait...');
	jQuery.ajax({
		url:FRONT_SITE_PATH+'login_register_submit',
		type:'post',
		data:jQuery('#frmForgotPassword').serialize(),
		success:function(result){
			jQuery('#form_forgot_msg').html('');
			jQuery('#forgot_submit').attr('disabled',false);
			var data=jQuery.parseJSON(result);
			if(data.status=='error'){
				jQuery('#form_forgot_msg').html(data.msg);
			}
			if(data.status=='success'){
				jQuery('#form_forgot_msg').html(data.msg);
				//window.location.href='shop.php';
			}
		}
		
	});
	e.preventDefault();
});	


function set_checkbox(id){
	var cat_dish=jQuery('#cat_dish').val();
	var check=cat_dish.search(":"+id);
	if(check!='-1'){
		cat_dish=cat_dish.replace(":"+id,'');
	}else{
		cat_dish=cat_dish+":"+id;	
	}
	jQuery('#cat_dish').val(cat_dish);
	jQuery('#frmCatDish')[0].submit();
}

function setFoodType(type){
	jQuery('#type').val(type);
	jQuery('#frmCatDish')[0].submit();
}

function add_to_cart(id, type) {
    var qty = jQuery('#qty' + id).val();
    var attr = jQuery('input[name="radio_' + id + '"]:checked').val();
    var is_attr_checked = '';
    if (typeof attr === 'undefined') {
        is_attr_checked = 'no';
    }
    if (qty > 0 && is_attr_checked != 'no') {
        jQuery.ajax({
            url: FRONT_SITE_PATH + 'manage_cart.php',
            type: 'post',
            data: { qty: qty, attt: attr, type: type },
            success: function (result) {
                var data = jQuery.parseJSON(result);
                if (data.status === 'not_logged_in') {
                    // Redirect to login page
                    swal("Login Required", "You need to log in to add items to your cart.", "warning").then(() => {
                        window.location.href = FRONT_SITE_PATH + 'login_register.php';
                    });
                } else if (data.status === 'success') {
                    swal("Success", "Item added to cart successfully!", "success");
                    jQuery('#shop_added_msg_' + attr).html('(Added - ' + qty + ')');
                    jQuery('#totalCartDish').html(data.totalCartDish);
                    jQuery('#totalPrice').html(data.totalPrice + ' Tk');
                } else {
                    swal("Error", "Failed to add item to cart. Please try again.", "error");
                }
            }
        });
    } else {
        swal("Error", "Please select quantity and an item.", "error");
    }
}

function delete_cart(id,is_type){
	jQuery.ajax({
		url:FRONT_SITE_PATH+'manage_cart',
		type:'post',
		data:'attt='+id+'&type=delete',
		success:function(result){
			if(is_type=='load'){
				window.location.href=window.location.href;
			}else{
				var data=jQuery.parseJSON(result);
				//swal("Congratulation!", "Dish added successfully", "success");
				jQuery('#totalCartDish').html(data.totalCartDish);
				jQuery('#shop_added_msg_'+id).html('');
				
				if(data.totalCartDish==0){
					jQuery('.shopping-cart-content').remove();
					jQuery('#totalPrice').html('');
				}else{
					var tp1=data.totalPrice;
					jQuery('#shopTotal').html(tp1+ 'Tk');
					jQuery('#attr_'+id).remove();
					jQuery('#totalPrice').html(data.totalPrice+' Tk');
				}
			}
			
		}
	});
}


jQuery('#frmProfile').on('submit',function(e){
	jQuery('#profile_submit').attr('disabled',true);
	jQuery('#form_msg').html('Please wait...');
	jQuery.ajax({
		url:FRONT_SITE_PATH+'update_profile',
		type:'post',
		data:jQuery('#frmProfile').serialize(),
		success:function(result){
			jQuery('#form_msg').html('');
			jQuery('#profile_submit').attr('disabled',false);
			var data=jQuery.parseJSON(result);
			if(data.status=='success'){
				jQuery('#user_top_name').html(jQuery('#uname').val());
				swal("Success Message", data.msg, "success");
			}
		}
	});
	e.preventDefault();
});	

jQuery('#frmPassword').on('submit',function(e){
	jQuery('#password_submit').attr('disabled',true);
	jQuery('#password_form_msg').html('Please wait...');
	jQuery.ajax({
		url:FRONT_SITE_PATH+'update_profile',
		type:'post',
		data:jQuery('#frmPassword').serialize(),
		success:function(result){
			jQuery('#password_form_msg').html('');
			jQuery('#password_submit').attr('disabled',false);
			var data=jQuery.parseJSON(result);
			if(data.status=='success'){
				swal("Success Message", data.msg, "success");
			}
			if(data.status=='error'){
				swal("Error Message", data.msg, "error");
			}
		}
	});
	e.preventDefault();
});	