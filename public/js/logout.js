var mainApp = {};
(function () {



    function logout() {

        firebase.auth().signOut();

        
    }
   

    
    function redirect() {

        window.location.href = "/";
        
    }



    mainApp.logout = logout;
    mainApp.redirect = redirect;

})()