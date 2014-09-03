var formID;
$( document).ready(function () {
  console.log('ready');
  $('#subscribe_de').submit(function(event) {
    console.log('form submit');
    event.preventDefault();
    ajaxFormSubmit(event);
  });

  $('#submit-email-btn').click(function(event){
    console.log('form submit2');
    event.preventDefault();
    ajaxFormSubmit(event);
  });
});

function ajaxFormSubmit(event) {
  formID = event.target.form.id;
 
  if(event) event.preventDefault();
  thisForm = $('#' + formID);
  console.log('ajax');

  register(thisForm);
}

// needed??
$(function () {
  var $form = $('#mc-embedded-subscribe-form');
 
  $('#mc-embedded-subscribe').on('click', function(event) {
    console.log('click');
    if(event) event.preventDefault();
    register($form);
  });
});

function register($form) {
  var email = $('input', $form).val();
  console.log('reg fct');

  console.log($form.attr('method'));
  console.log($form.attr('action'));
  console.log($form.serialize());

  $.ajax({
    type: "post",//$form.attr('method'),
    url: "//schaumschau.us7.list-manage.com/subscribe/post-json?u=d8060e213888bbfdffd8ba6dd&amp;id=c67ae71a5e&c=?",//$form.attr('action'),
    data: $form.serialize(),
    cache       : false,
    dataType    : 'json',
    contentType: "application/json; charset=utf-8",
    error       : function(err) { $('#notification_container').html('<span class="alert">Could not connect to server. Please try again later.</span>'); },
    success     : function(data) {      

      console.log(data);

      if (data.result == "success") {
        // console.log('success');
        mixpanel.track("signup success");
        mixpanel.identify(mixpanel.get_distinct_id());
        mixpanel.people.set({
          "$created": new Date(),
          "$email": email
        });
        console.log('email: ' + email);
        // fb sign up conversion pixel
        $('head').append('<script>(function() {var _fbq = window._fbq || (window._fbq = []);if (!_fbq.loaded) {var fbds = document.createElement("script");fbds.async = true;fbds.src = "//connect.facebook.net/en_US/fbds.js";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(fbds, s);_fbq.loaded = true;}})();window._fbq = window._fbq || [];window._fbq.push(["track", "6017780604058", {"value":"0.00","currency":"EUR"}]);</script><noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6017780604058&amp;cd[value]=0.00&amp;cd[currency]=EUR&amp;noscript=1" /></noscript>');
      } else {
        console.log('error');
      }
     }
  });
}

function scrollToBlock(number){
  scrollToElem('#block' + number);
}

// nav bar animation
var startNavHeight = 0;
$( window ).scroll(function(e) {
  var scrollTop = $(window).scrollTop();
  var header = $('#navigation');
  var breakPoint = $('#head-block').height();
  var regButton = $('#nav-btn');

  if (startNavHeight == 0) {
    startNavHeight = header.height();
  }

  // console.log("scroll: " + scrollTop + " breakPoint: " + breakPoint);
  // header.css('margin-left', -$(window).scrollLeft());

  if (scrollTop >= breakPoint) {
    // $('#navigation').addClass('navbar-fixed-top');
    // console.log("overbreak");

    // header.css('box-shadow', '0 0 4px rgba(0, 0, 0, 0.32)');
    header.css('position', 'fixed').css('top', scrollTop).css('height','53px');
    regButton.fadeIn(300);
  } else {
    // header.css('box-shadow', 'none');
    // var percentage = (breakPoint - scrollTop) / breakPoint;
    header.css('position', 'relative').css('top', 0).css('height', startNavHeight);
    regButton.fadeOut(300);
    // header.css('position', 'relative').css('top', 0).css('height','5%');
  }
});