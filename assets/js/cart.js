
/*AJAX request for updating the item's quantity in the cart*/
$("input[name='Quantity']").on("change",function(event){
    console.log("event fired!!");
    let o_id=$(event.target).parent().find("input[name='Order_id']").attr("value");
    let qty=$(event.target).val();

    $.ajax({
        method:"GET",
        url:`/cart/update-item-quantity/?order=${o_id}&qty=${qty}`,
        success:function(data){
            location.reload();
        },
        error:function(err){
            console.log(err);
            return;
        }
    })
})


/*AJAX req for adding an item to the cart*/
$(".add-item-link").click(function(event){
    event.preventDefault();
    let link=$(event.target).attr("href");

    $.ajax({
        method:"GET",
        url:link,
        success:function(data){
            if(data.user)
                displayFlashMessage(data.message);
            else
                displayFlashMessage(null,"Sign In To Shop")
        },
        error:function(err){
            console.log(err);
            return;
        }
    })
})



let displayFlashMessage=function(success_msg,error_msg)
{  
   if(success_msg)
   {
       new Noty({
       text: success_msg,
       type:"success",
       theme:"relax",
       timeout:400,
       animation:{
           open:"animate__animated animate__headShake",
           close:"animate__animated animate__headShake"
       }
       }).show();
   }
   else if(error_msg)
   {
        new Noty({
        text: error_msg,
        type:"error",
        theme:"relax",
        timeout:400,
        animation:{
            open:"animate__animated animate__headShake",
            close:"animate__animated animate__headShake"
        }

        }).show();
   }

}
      

