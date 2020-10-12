var uid = null;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        uid = user.uid;
        var currentUser = firebase.auth().currentUser;
        if (currentUser != null) {
            currentUser.providerData.forEach(function (profile) {
                var takeFirstName = profile.displayName;
                // remove everything after " " i.e. removes last name
                takeFirstName = takeFirstName.substring(0, takeFirstName.indexOf(' '));
                document.getElementById("user_login").innerHTML =
                    "<div> <ul class='ba'> <div class='greetings'>Welcome back, <span>"
                    + takeFirstName +
                    "</span> </div><li><a href='account'>Account</a></li><li"
                    +
                    "style='content: '|'; margin: .4em;"
                    +
                    "><a href='/' onclick='mainApp.logout();'>Logout</a></li></ul></div>";
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });
        }
    } else {
        uid = null;
        document.getElementById("user_login").innerHTML =
            "<div><ul class='ba'><li><a href='login'>Sign in</a></li><li><a href='register'>Register</a></li></ul></div>";
        console.log(user + " " + "is not signed in");


    }
});



