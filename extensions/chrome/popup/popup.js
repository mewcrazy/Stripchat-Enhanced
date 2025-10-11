$(function() {
  
  var SeRequest = function(url, data, success) {
    return $.ajax({
      url: url,
      type: 'POST',
      contentType: "application/json",
      data: JSON.stringify(data),
      success: success
    });
  }

  // sign in
  $('.se-sign-in2').on('click', function() {
    let email = $('.se-email').val()
    let password = $('.se-password').val()
    if(!email || !password) return "empty nicht man"
    if(!validateEmail(email)) return "email invalid"

    SeRequest('https://stripchat-enhanced.247camming.com/api/users/register', {"key" : "value"}, function(data) {
        console.log("sign in data : %o", data);
    });
  })
  
  // sign up
  $('.se-sign-up2').on('click', function() {
    alert("sign up")

    SeRequest('https://stripchat-enhanced.247camming.com/api/users/register', {"key" : "value"}, function(data) {
        console.log("sign in data : %o", data);
    });
  })

  // forget password
  $('.se-forget-password2').on('click', function() {
    alert("forget password")

    SeRequest('https://stripchat-enhanced.247camming.com/api/users/register', {"key" : "value"}, function(data) {
        console.log("forget password data : %o", data);
    });
  })

  // global functions
  const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  
  // tabs
  $('.tab.hidden').hide().removeClass('hidden')
  $('.goto-tab').on('click', function(e) {
      $('.tab').hide()
      $("#"+$(this).attr('data-tab')).fadeIn("fast")
  });

  // i18n
  if(chrome.i18n.getUILanguage()) {
    $('[data-i18n]').each(function(k, v) {
      $(v).text(chrome.i18n.getMessage($(v).attr("data-i18n")))
    })
  }
});