// // This file is speciifcally for extracting data from customers input and storing to db and later used for order placement delivery.

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", begin);
} else {
  begin();
}

function begin() {
  readItemsCategories();
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", deliveryAddress);
}

function deliveryAddress() {
  // this function stores customer input data to Firebase database
  writeToDB();

  // notify customer for registration validity
  // send customer to payment page-
}

function writeToDB() {
  // Extract all necessary data of customer
  var xname = document.getElementById("fname").value;

  var xaddressline1 = document.getElementById("adr").value;
  var xtown = document.getElementById("town").value;
  var xpostcode = document.getElementById("postcode").value;
  var xDoorNum = document.getElementById("hnum").value;
  var xphone = document.getElementById("phone").value;
  var xemail = document.getElementById("email").value;
  var xcomment = document.getElementById("comment").value;

  // check if these are not empty and are validated.
  // if the below fields are not null

  const customerData = {
    xname,
    xaddressline1,
    xDoorNum,
    xtown,
    xpostcode,
    xphone,
    xemail,
    xcomment,
  };

  console.log(customerData);

  fetch("/customerData", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(customerData),
  });
}

// read from database
function readItemsCategories() {
  var fbCount = 2;
  var query = firebase.database().ref("Items").orderByKey();
  query.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var fbcategories = childSnapshot.key;
      var childData = childSnapshot.val();
      // side nav bar
      // create links to side nav bar
      // <a href="#Burgers"></a>
      var a = document.createElement("a");
      document
        .getElementsByTagName("li")
        [fbCount].appendChild(a)
        .setAttribute("href", "#" + fbcategories);
      // set a href innerhtml as snapshot keys
      a.innerHTML = fbcategories;

      // create the source for the links to be directed to
      var h = document.createElement("H2");
      var t = document.createTextNode(fbcategories);
      h.setAttribute("id", fbcategories);
      h.className = "section-header";
      h.appendChild(t);
      document.getElementById("myDiv").appendChild(h);

      var div = document.createElement("div"); //open div
      div.className = "shop-items";
      document.getElementById("myDiv").appendChild(div);

      fbCount++;
      childSnapshot.forEach(function (snapshot2) {
        var div2 = document.createElement("div"); //open div
        div2.className = "shop-item";
        div2.setAttribute("data-item-id", snapshot2.key);
        div.appendChild(div2);
        // div2.id = snapshot2.key;
        // var dataID = document.create("data-item-id = " + snapshot2.key);
        var s = document.createElement("span");
        s.className = "shop-item-title";
        snapshot2.forEach(function (snapshot3) {
          if (snapshot3.key == "name") {
            var t1 = document.createTextNode(snapshot3.val());
            s.appendChild(t1);
            div2.appendChild(s);
          }
          if (snapshot3.key == "price") {
            var div3 = document.createElement("div");
            div3.className = "shop-item-details";

            var s2 = document.createElement("span");
            s2.className = "shop-item-price";
            // take price / 100 and add £
            var pound = "£";
            var fbPrice = snapshot3.val();
            var integer = parseInt(fbPrice, 10);
            var priceEditted = integer / 100;
            var actualPrice = priceEditted.toString();
            var price = pound + actualPrice + "0";
            var t2 = document.createTextNode(price);
            s2.appendChild(t2);
            div3.appendChild(s2);

            var btn = document.createElement("button");
            btn.className = "btn btn-primary shop-item-button";
            btn.setAttribute("type", "button");
            //btn.setAttribute("onclick", "addToCartClicked()");
            btn.addEventListener("click", addToCartClicked);

            var t3 = document.createTextNode("Add to Cart");
            btn.appendChild(t3);
            div3.appendChild(btn);
            div2.appendChild(div3);
          }
        });
      });
    });
  });
}
