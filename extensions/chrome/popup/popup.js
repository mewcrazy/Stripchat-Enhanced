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
  $('.se-form-sign-in').on('submit', function(e) {
    e.preventDefault
    let email = $('.se-email').val()
    let password = $('.se-password').val()
    $('.error').addClass('hidden').text("")
    if(!email || !password) { throwError("Please enter your email address and password."); return false;  }
    if(!validateEmail(email)) { throwError("Please enter a valid email address."); return false; }
    
    SeRequest('https://247camming-2025.local.dev/api/users/login', {"key" : "value"}, function(data) {
        console.log("sign in data : %o", data);
    });
    return false
  })
  
  // sign up
  $('.se-form-sign-up').on('submit', function(e) {
    e.preventDefault
    let email = $('.se-email').val()
    let password = $('.se-password').val()
    $('.error').addClass('hidden').text("")
    if(!email || !password) { throwError("Please enter your email address and password."); return false;  }
    if(!validateEmail(email)) { throwError("Please enter a valid email address."); return false; }
    
    SeRequest('https://247camming-2025.local.dev/api/users/register', {"email" : email, "password": password}, (data) => {
        console.log("sign in data : %o", data);
    });
  })

  // forget password
  $('.se-form-forget-password').on('submit', function(e) {
    e.preventDefault
    let email = $('.se-email').val()
    $('.error').addClass('hidden').text("")
    if(!email) { throwError("Please enter a valid email address."); return false;  }
    if(!validateEmail(email)) { throwError("Please enter a valid email address."); return false; }
    
    SeRequest('https://247camming-2025.local.dev/api/users/forget-password', {"key" : "value"}, function(data) {
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
    $('.error').addClass('hidden').text("")
    $('.tab').hide()
    $("#"+$(this).attr('data-tab')).fadeIn("fast")
  });

  // i18n
  if(chrome.i18n.getUILanguage()) {
    $('[data-i18n]').each(function(k, v) {
      $(v).text(chrome.i18n.getMessage($(v).attr("data-i18n")))
    })
  }

  // error handling
  function throwError(msg) {
    $('.error').removeClass('hidden').text(msg)
  }
});