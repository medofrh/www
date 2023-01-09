if($.cookie('e')){
  var Cookiess= $.cookie('e');
  $.ajax({
    url: "http://127.0.0.1:3030/check",
    type: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer "+Cookiess+""
      },
    error : function(err) {
      window.location.href="./login.html";
    }
  })
}else{
  window.location.href="./login.html";
}

$(document).ready(function(){
  
  if($('input').val()){
    window.location.reload()
  }

})

$('.back-btn').click(function(){
  window.history.back();
  // window.location=document.referrer;
  // history.back(window.location.reload());
})

$('#Logout').click(function(){
  var Cookiess= $.cookie('e')
    $.ajax({
    url: "http://127.0.0.1:3030/logout",
    type: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer "+Cookiess+""
      },
    error : function(err) {
      console.log('Error!', err)
      $.cookie('e',"")
      window.location.href="./login.html"
    },
    success: function(data) {
      console.log('Success!',data)
      $.cookie('e',"")
      window.location.href="./login.html"
    }
})
});

$('#logoo').click(function(){
  window.location='./'
});