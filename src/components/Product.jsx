import React, { Component } from "react";
import "../css/all.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
class Product extends Component {
  state = {
    userName: "",
    quantity: 1,
    startDate: new Date(),
    endDate: null,
    showDatePicker: false,
    method: "",
  };

  //登出
  logout = () => {
    localStorage.removeItem("user");
    let newState = { ...this.state };
    newState.userName = "";
    this.setState(newState);
  };

  cartMenuClick = (e) => {
    e.preventDefault();
    if (this.state.userName) {
      window.location = `/buyCart`;
    } else {
      window.location = "/Login";
    }
  };
  //漢堡選單
  menuBurger = () => {
    const navList = document.querySelector(".nav-list");
    navList.classList.toggle("menu-show");
  };

  //RWD分類列表
  angleDown = () => {
    const angleDown = document.querySelector(".class-item");
    angleDown.classList.toggle("show");
  };

  //數量增加
  addbtn = () => {
    let newState = { ...this.state };
    newState.quantity += 1;
    this.setState(newState);
  };

  //數量減少
  reducebtn = () => {
    let newState = { ...this.state };

    if (newState.quantity === 1) {
      return;
    }
    newState.quantity -= 1;
    this.setState(newState);
  };

  //數量
  quantityChange = (e) => {
    let newState = { ...this.state };
    let rules = new RegExp(/^[0-9]*$/);
    console.log(rules.test(e.target.value));
    if (!rules.test(e.target.value)) {
      newState.quantity = newState.quantity;
      this.setState(newState);
      return;
    }
    newState.quantity = e.target.value;
    this.setState(newState);
  };

  //日期選擇
  dateChange = (date) => {
    this.setState({
      startDate: date[0],
      endDate: date[1],
      showDatePicker: false, // 選擇日期後，關閉DatePicker
    });
  };

  //取貨方法
  method = (e) => {
    let newStaate = { ...this.state };
    newStaate.method = e.target.value;
    this.setState(newStaate);
  };

  //計算租借天數
  dateDiffInDays = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒數
    const timestamp1 = new Date(date1).getTime();
    const timestamp2 = new Date(date2).getTime();
    const diffInMilliseconds = Math.abs(timestamp2 - timestamp1);
    return Math.round(diffInMilliseconds / oneDay);
  };

  reservebtn = async () => {
    let newState = { ...this.state };

    if (!this.state.startDate || !this.state.endDate || !this.state.method) {
      swal({
        title: "租借日期、取貨方式不得為空",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    swal("成功加入購物車", "加入購物車", "success");
    let startY = newState.startDate.getFullYear();
    let startM = newState.startDate.getMonth() + 1;
    let startD = newState.startDate.getDate();
    let endY = newState.endDate.getFullYear();
    let endM = newState.endDate.getMonth() + 1;
    let endD = newState.endDate.getDate();

    const diffDays = this.dateDiffInDays(newState.startDate, newState.endDate);
    if (diffDays < 3) {
      swal({
        title: "租借天數最少為三天",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }

    let serverData = {
      productName: this.state.data[0].product,
      productImage: this.state.data[0].url_image,
      stardate: startY + "/" + startM + "/" + startD,
      enddate: endY + "/" + endM + "/" + endD,
      method: this.state.method,
      quantity: this.state.quantity,
      price:
        diffDays === 3
          ? this.state.data[0].price
          : Math.ceil(diffDays / 3) * this.state.data[0].price,
      days: diffDays,
      method: this.state.method,
    };
    let config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios.post("http://localhost:8000/create/carts", serverData, config);
  };

  render() {
    if (!Array.isArray(this.state.data)) {
      return <div>No data available</div>;
    }
    return (
      <React.Fragment>
        <nav>
          <div className="nav-container">
            <div className="logo">
              <img src="../../image/linkedin_banner_image_1.png" alt="" />
            </div>
            <ul className="nav-list">
              <li>
                <a href="/Home">首頁</a>
              </li>
              <li>
                <a href="/Classification">所有商品</a>
              </li>
              <li>
                <a href="/Rule">租借規範</a>
              </li>
              <li>
                <a href="/About">關於我們</a>
              </li>
            </ul>
            <div className="log-in">
              {!this.state.userName && (
                <a className="login-link" href="/Login">
                  登入/註冊
                </a>
              )}

              {this.state.userName && (
                <div>
                  <span className="account-name">Hi {this.state.userName}</span>
                  <a className="log-out" onClick={this.logout}>
                    登出
                  </a>
                </div>
              )}
              <a onClick={this.cartMenuClick}>
                <img
                  className="shopping-cart"
                  src="/image/icon/shopping-cart.png"
                  alt=""
                />
              </a>
              <img
                className="menu-burger"
                src="/image/icon/menu-burger.png"
                alt=""
                onClick={this.menuBurger}
              />
            </div>
          </div>
        </nav>
        <div className="product-page">
          <div className="class-list">
            <h3>
              商品分類
              <img
                className="angle-down"
                src="../../image/icon/angle-down.png"
                alt=""
                onClick={this.angleDown}
              />
            </h3>
            <ul className="class-item">
              <li>
                <a href="/Classification/cart">露營推車</a>
              </li>
              <li>
                <a href="/Classification/light">露營燈</a>
              </li>
              <li>
                <a href="/Classification/tables-chairs">桌椅組</a>
              </li>
              <li>
                <a href="/Classification/sleeping-pad">睡墊</a>
              </li>
              <li>
                <a href="/Classification/tent">帳篷</a>
              </li>
              <li>
                <a href="/Classification/keep-fresh">保鮮</a>
              </li>
              <li>
                <a href="/Classification/other">其他</a>
              </li>
            </ul>
          </div>
          <div className="product-intro">
            <div className="product-image">
              <img
                src={this.state.data[0].url_image}
                alt={this.state.data[0].product}
              />
            </div>
            <div className="product-info">
              <form>
                <div className="product-title">
                  <h3
                    data-id={this.state.data[0].id}
                    data-price={this.state.data[0].price}
                  >
                    {this.state.data[0].product}
                  </h3>
                </div>

                <ul>
                  {this.state.data[0].feature.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
                <p className="price">{this.state.data[0].priceStr}</p>
                <div className="add-cart">
                  <p>數量:</p>
                  <span>
                    <button
                      className="reduce-btn"
                      onClick={this.reducebtn}
                      type="button"
                    >
                      -
                    </button>
                  </span>
                  <input
                    type="text"
                    name="quantitly"
                    className="select-quantitly"
                    value={this.state.quantity}
                    onChange={this.quantityChange}
                  />
                  <span>
                    <button
                      className="add-btn"
                      onClick={this.addbtn}
                      type="button"
                    >
                      +
                    </button>
                  </span>
                </div>
                <div className="pick-method">
                  <p>運送方式:</p>
                  <label htmlFor="home-delivery">
                    <input
                      type="radio"
                      id="home-delivery"
                      name="method"
                      value="宅配"
                      onChange={this.method}
                      checked={this.state.method === "宅配" ? "checked" : ""}
                    />
                    宅配
                  </label>
                  <label htmlFor="store-pickup">
                    <input
                      type="radio"
                      id="store-pickup"
                      name="method"
                      value="門市取件"
                      onChange={this.method}
                      checked={
                        this.state.method === "門市取件" ? "checked" : ""
                      }
                    />
                    門市取件
                  </label>
                </div>
                <div className="reserve">
                  <p>租借期間:</p>

                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.dateChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    selectsRange
                    selectsStart
                    minDate={new Date()}
                  />

                  <button
                    className="reserve-btn"
                    onClick={this.reservebtn}
                    type="button"
                  >
                    預約
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="product-table">
          <table>
            <tr>
              <th className="table-header" colSpan="2">
                規格說明
              </th>
            </tr>
            {Object.keys(this.state.data[0].Specification).map((key, i) => {
              return (
                <tr>
                  <th className="row-header" key={i}>
                    {key}
                  </th>
                  <td>{this.state.data[0].Specification[key]}</td>
                </tr>
              );
            })}
          </table>
        </div>

        <div className="remind">
          <h3>預約須知</h3>
          <p>預約前請先詳細閱讀租借規範</p>
          <p>
            提醒您請於預約下單後3日內完成匯款，逾時訂單將會取消
            並釋出商品供他人預訂
          </p>
        </div>
        <footer>
          <div className="footer-logo">
            <div className="logo-image">
              <img src="../../image/linkedin_banner_image_1.png" alt="" />
            </div>
            <div className="pay-list">
              <img
                src="../../image/pay/1156722_finance_jcb_logo_payment_icon.png"
                alt=""
              />
              <img src="../../image/pay/294654_visa_icon.png" alt="" />
              <img
                src="../../image/pay/380809_card_master_mastercard_icon.png"
                alt=""
              />
              <img
                src="../../image/pay/7123945_logo_pay_google_gpay_icon.png"
                alt=""
              />
              <img src="../../image/pay/8666205_apple_pay_icon.png" alt="" />
            </div>
          </div>
          <div className="footer-content">
            <h3>camping</h3>
            <ul className="meau">
              <li>
                <a href="../../index.html">首頁</a>
              </li>
              <li>
                <a href="../../all-product.html">所有商品</a>
              </li>
              <li>
                <a href="../../rule.html">租借規範</a>
              </li>
              <li>
                <a href="../../about.html">關於我們</a>
              </li>
            </ul>
          </div>
          <div className="footer-content">
            <h3>聯絡我們</h3>
            <p>台中市北區三民路5號</p>
            <p>TEL:(04)22194322</p>
            <p>E-mail:campingservice@gmail.com</p>
          </div>
          <div className="footer-content">
            <h3>營業時間</h3>
            <p>週一~週五: 8am-5pm</p>
            <p>週六~週日:10am-3pm</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
  componentDidMount = async () => {
    let userdata = localStorage.getItem("user");
    userdata = JSON.parse(userdata);
    let newState = { ...this.state };
    console.log(userdata);
    if (userdata) {
      newState.userName = userdata.userName;
      this.setState(newState);
      console.log(newState);
    }
    let result = await axios.get(
      `http://localhost:8000/Product/${this.props.match.params.id}`
    );
    newState.data = result.data;
    this.setState(newState);
    console.log(newState);
    console.log(newState.data[0].Specification);
  };
}

export default Product;
