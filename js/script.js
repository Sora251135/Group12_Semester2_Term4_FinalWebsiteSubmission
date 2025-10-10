//===================================================================================//

//Start of Sign Up and Sign in page script.js

// Toggle between Sign In and Sign Up forms using jQuery black magic (also changes the page title)
$(function(){
  var $signIn  = $('#sign-in-form'),
      $signUp  = $('#sign-up-form'),

      $toggleText = $('#toggle-text');
      $toggleName = $('#webTitle');

  $toggleText.on('click', '#toggle-link', function(stopPageReset){
    stopPageReset.preventDefault();
    $signIn.toggle();
    $signUp.toggle();

    //does the text toggle 
    if ($signIn.is(':visible')) {
      $toggleName.html('Sign In - Page');
      $toggleText.html(
        'Don’t have an account? ' +
        '<a href="#" id="toggle-link">Sign up</a>'
      );
    } else {
      $toggleName.html('Sign Up - Page');
      $toggleText.html(
        'Already have an account? ' +
        '<a href="#" id="toggle-link">Sign in</a>'
      );
    }
  });
});

//end of Sign in and Sign up page script.js

//===================================================================================//