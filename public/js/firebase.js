var app_firebase = {};

(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCmwgd_tTOO6n7qXNsUKTkgXHrEKNlfyfw",
        authDomain: "london-bridge-cafe.firebaseapp.com",
        databaseURL: "https://london-bridge-cafe.firebaseio.com",
        projectId: "london-bridge-cafe",
        storageBucket: "london-bridge-cafe.appspot.com",
        messagingSenderId: "87643963255",
        appId: "1:87643963255:web:6dc1f9ec4eda3839762b72",
        measurementId: "G-HP1D5V00GB"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;


})()