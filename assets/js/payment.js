
let totalAmount=$("input[name='total-amount']").val();

axios.post(`/payment/?total=${totalAmount}`).then((info)=>{

    console.log(info);

    var options = {
        "key": info.data.key, // Enter the Key ID generated from the Dashboard
        "name": "Shoppie",
        "description": "Payment",
        "image": "https://c8.alamy.com/comp/2C5HDAY/online-shop-logo-design-vector-illustrtaion-mobile-online-shopping-logo-vector-template-2C5HDAY.jpg",
        "order_id": info.data.order.id, 
        "callback_url": "http://localhost:4000/payment-complete",
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new Razorpay(options);
    document.getElementById('rzp-button').onclick = function(e){
        rzp1.open();
        e.preventDefault();
    }
})