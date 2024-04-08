var express = require("express");
var cors = require("cors");
var app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //跨資源

var fs = require("fs");
var dataFileName = "../data.json"; //產品數據
let loginData = "../userdata.json"; //使用者數據
let cartData = "../cartdata.json"; //購物車數據

app.listen(8000);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");

//所有商品
app.get("/allProduct", function (req, res) {
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  console.log(allProduct);
  //   res.set("Content-type", "application/json");
  res.send(JSON.stringify(allProduct));
  res.end();
});

app.get("/cart", function (req, res) {
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let cartClass = allProduct.filter((item) => item.class == "cart");
  console.log(cartClass);
  res.send(JSON.stringify(cartClass));
  res.end();
});

app.get("/light", function (req, res) {
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let lightClass = allProduct.filter((item) => item.class == "light");
  res.send(JSON.stringify(lightClass));
  res.end();
});

app.get("/tables-chairs", function (req, res) {
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let tablesChairsClass = allProduct.filter(
    (item) => item.class == "tables-chairs"
  );
  res.send(JSON.stringify(tablesChairsClass));
  res.end();
});

app.get("/sleeping-pad", function (req, res) {
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let sleepingPadClass = allProduct.filter(
    (item) => item.class == "sleeping-pad"
  );
  res.send(JSON.stringify(sleepingPadClass));
  res.end();
});

app.get("/tent", function (req, res) {
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let tentClass = allProduct.filter((item) => item.class == "tent");
  res.send(JSON.stringify(tentClass));
  res.end();
});

app.get("/keep-fresh", function (req, res) {
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let keepFreshClass = allProduct.filter((item) => item.class == "keep-fresh");
  res.send(JSON.stringify(keepFreshClass));
  res.end();
});

app.get("/other", function (req, res) {
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let otherClass = allProduct.filter((item) => item.class == "other");
  res.send(JSON.stringify(otherClass));
  res.end();
});

//產品
app.get("/Product/:id", function (req, res) {
  console.log(req.params.id);
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let productItem = allProduct.filter((item) => item.id == req.params.id);
  console.log(productItem);
  res.send(JSON.stringify(productItem));
  res.end();
});

//產品分類
app.get("/Classification/:class", function (req, res) {
  console.log("class", req.params.class);
  var data = fs.readFileSync(dataFileName);
  var allProduct = JSON.parse(data);
  let Class = allProduct.filter((item) => item.class == req.params.class);
  console.log(Class);
  res.send(JSON.stringify(Class));
  res.end();
});
//註冊
app.post("/user/create", function (req, res) {
  var data = fs.readFileSync(loginData);

  var userList = JSON.parse(data);
  console.log(userList);
  var item = {
    userId: new Date().getTime(),
    userName: req.body.registerName,
    useremail: req.body.email,
    userpassword: req.body.password,
  };
  console.log(item);
  userList.push(item);
  fs.writeFileSync("../userdata.json", JSON.stringify(userList, null, "\t"));
  res.send("row inserted.");
});

//登入
app.get("/user/login", function (req, res) {
  var data = fs.readFileSync(loginData);
  var userList = JSON.parse(data);
  console.log(userList);
  res.send(JSON.stringify(userList));
});

//新增購物車
app.post("/create/carts", function (req, res) {
  var data = fs.readFileSync(cartData);
  var cartList = JSON.parse(data);
  var item = {
    productName: req.body.productName,
    productImage: req.body.productImage,
    stardate: req.body.stardate,
    enddate: req.body.enddate,
    quantity: req.body.quantity,
    price: req.body.price,
    days: req.body.days,
    method: req.body.method,
  };
  console.log(item);
  cartList.push(item);
  fs.writeFileSync("../cartData.json", JSON.stringify(cartList, null, "\t"));
  res.send("row inserted.");
});

//取得購物車內容
app.get("/carts", function (req, res) {
  var data = fs.readFileSync(cartData);
  var cartList = JSON.parse(data);
  console.log(cartList);
  res.send(JSON.stringify(cartList));
});

//清空購物車
app.delete("/delete/carts", function (req, res) {
  var data = fs.readFileSync(cartData);
  var cartList = JSON.parse(data);
  cartList = [];
  console.log(cartList);
  fs.writeFileSync("../cartData.json", JSON.stringify(cartList, null, "\t"));
  res.send(JSON.stringify(cartList));
});

//刪除購物車品項
app.delete("/delete/carts/:id", function (req, res) {
  let index = req.params.id;
  console.log(index);
  var data = fs.readFileSync(cartData);
  var cartList = JSON.parse(data);
  console.log(cartList);
  cartList = cartList.splice(index, 1);
  fs.writeFileSync("../cartData.json", JSON.stringify(cartList, null, "\t"));
  res.send(JSON.stringify(cartList));
});
