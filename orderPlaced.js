let httpRequest = new XMLHttpRequest(),
  jsonArray,
  method = "GET",
  jsonRequestURL = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
var total;
httpRequest.open(method, jsonRequestURL, true);
httpRequest.send();
httpRequest.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    total = JSON.parse(this.responseText);
    var productObj = {
      counter: 0,
      amount: 0,
      items: [],
      address: "",
      mnumber: "",
      email: "",
    };
    var req = document.cookie;
    console.log(total);
    console.log(req);
    var temp = "";
    var arr = [];
    for (let i = 8; i < req.length; i++) {
      if (req.charAt(i) == "," || req.charAt == "0") break;
      if (req.charAt(i) != " ") temp += req.charAt(i);
      else {
        arr.push(+temp);
        temp = "";
      }
    }
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      productObj.counter += 1;
      productObj.amount += total[arr[i] - 1].price;
      productObj.items.push(total[arr[i] - 1].name);
    }
    var httpRequest1 = new XMLHttpRequest();
    httpRequest1.open(
      "POST",
      "https://sem-7-7f4e0-default-rtdb.firebaseio.com/products.json",
      true
    );
    productObj.address = prompt("Please enter your address");
    productObj.mnumber = prompt("Please enter your mobile number");
    productObj.email = localStorage.getItem("email");
    httpRequest1.send(JSON.stringify(productObj));
    document.cookie = "orderId=" + 0 + ",counter=" + 0;
  }
};
