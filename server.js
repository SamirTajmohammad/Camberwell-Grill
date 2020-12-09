if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const stripeSecretKey = process.env.STRIPE_SAM_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const stripe = require("stripe")(stripeSecretKey);

const express = require("express");
const app = express();
const fs = require("fs");
const { json } = require("express");
var expressLayouts = require("express-ejs-layouts");

var firebase = require("firebase/app");
require("firebase/auth");
var firebaseDB = require("firebase/database");
var config = {
  apiKey: "AIzaSyCmwgd_tTOO6n7qXNsUKTkgXHrEKNlfyfw",
  authDomain: "london-bridge-cafe.firebaseapp.com",
  databaseURL: "https://london-bridge-cafe.firebaseio.com",
  projectId: "london-bridge-cafe",
  storageBucket: "london-bridge-cafe.appspot.com",
  messagingSenderId: "87643963255",
  appId: "1:87643963255:web:6dc1f9ec4eda3839762b72",
  measurementId: "G-HP1D5V00GB",
};
firebase.initializeApp(config);

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(express.json());
app.use(expressLayouts); //now we can use a place to store layouts

app.use(express.static("public"));

app.get("/store", function (req, res) {
  fs.readFile("items.json", function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render("pages/store", {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data),
      });
    }
  });
});

app.get("/index", function (req, res) {
  res.render("pages/index");
});

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/register", function (req, res) {
  res.render("pages/register");
});

app.get("/login", function (req, res) {
  res.render("pages/login");
});

app.get("/address", function (req, res) {
  res.render("pages/address");
});
app.get("/account", function (req, res) {
  res.render("pages/account");
});

app.post("/customerData", (req, res) => {
  console.log(res);
  const data = req.body;
  res.json({
    status: "Success",
    customerName: data.xfullName,
    customerEmail: data.xemail,
  });

  var customersNode = firebase.database().ref("Accounts").child("Customers");
  var pushKey = customersNode.push().getKey();
  customersNode.child(pushKey).set({
    name: data.xname,
    address: data.xaddressline1,
    town: data.xtown,
    homephone: data.xDoorNum,
    postCode: data.xpostcode,
    phone: data.xphone,
    email: data.xemail,
    comment: data.xcomment,
    cart: data.cartItems,
  });

  //   reference index to know which email belongs to which id.
  var usernameNode = firebase.database().ref("Accounts").child("Usernames");
  usernameNode.child(pushKey).set(data.xemail);
});

app.post("/purchase", function (req, res) {
  fs.readFile("items.json", function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      const itemsJson = JSON.parse(data);
      const itemsArray = itemsJson.Burgers.concat(
        itemsJson.ChickenandWings,
        itemsJson.CombinationKebabs,
        itemsJson.Drink,
        itemsJson.KMeal,
        itemsJson.Kebab,
        itemsJson.MainCourses,
        itemsJson.SideOrders
      );
      let total = 0;
      req.body.items.forEach(function (item) {
        const itemsJson = itemsArray.find(function (i) {
          return i.id == item.id;
        });
        total = total + itemsJson.price * item.quantity;
      });

      stripe.charges
        .create({
          amount: total,
          source: req.body.stripeTokenId,
          currency: "gbp",
        })
        .then(function () {
          console.log("Succesful");
          res.json({ message: "Successfully purchased items" });
        })
        .catch(function () {
          console.log("Charge failed");
          res.status(500).end();
        });
    }
  });
});

app.listen(process.env.PORT || 5000);
