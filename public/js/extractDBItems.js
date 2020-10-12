// this file is needed for extracting items from realtime database and pasting to the webview

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function getParent(snapshot) {
  // You can get the reference (A Firebase object) from a snapshot
  // using .ref().
  var ref = snapshot.ref();
  // Now simply find the parent and return the name.
  return ref.parent().getKey();
}

function ready() {
  var testRef = firebase.database().ref();
  testRef.once("value", function (snapshot) {
    // Should alert "Name of the parent: foo".
    alert("Name of the parent: " + getParent(snapshot));
    console.log("parent node: " + getParent(snapshot));
  });
}