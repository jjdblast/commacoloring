function p(x) {
  console.log(x);
}

// fill this in
var user_email = "none";
var user_gid = "0";

function handleClientLoad() {
  // Load the API client and auth library
  gapi.load('client:auth2', initAuth);
}

function initAuth() {
  var clientId = "138657060507-qpcm4j6admrv7bm85n5pbtj7i4mc9rte.apps.googleusercontent.com";
  var clientSecret = "M_XWywELzOSXmIRCvusdFi50";
  var scopes = "profile";

  gapi.client.setApiKey(clientSecret);
  gapi.auth2.init({
    client_id: clientId,
    scope: scopes
  }).then(function () {
    auth2 = gapi.auth2.getAuthInstance();
    // Listen for sign-in state changes.
    auth2.isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.

    $('.sign-in').click(function(e) {
      updateSigninStatus(auth2.isSignedIn.get());
    });

    if (auth2.isSignedIn.get()) {
      updateSigninStatus(true);
    }
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    fillUserInfo();
  } else {
    auth2.signIn();
  }
}

function fillUserInfo() {
  var basicProfile = auth2.currentUser.get().getBasicProfile();
  user_email = basicProfile.getEmail();
  user_gid = basicProfile.getId();
  $(".sign-in-box")[0].innerHTML = "<div class='signed-in'>signed in as <span class='signed-in-email'>"+user_email+ "</span></div>";
}

