import React, { Component } from "react";
import "../css/all.css";
import axios from "axios";
import swal from "sweetalert";
class buyCart extends Component {
  state = {
    userName: "",
    carts: [],
    recipient: "",
    phone: "",
    address: "",
  };
  //登出
  logout = () => {
    localStorage.removeItem("user");
    let newState = { ...this.state };
    newState.userName = "";
    this.setState(newState);
  };
  chechout = () => {
    let newState = { ...this.state };
    if (newState.carts.length < 1) {
      swal({
        title: "購物車為空",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    document.querySelector(".pay-form").style.display = "block";
  };

  closebtn = () => {
    document.querySelector(".pay-form").style.display = "none";
  };

  submitOrder = async () => {
    let newState = { ...this.state };
    if (!newState.phone || !newState.recipient || !newState.address) {
      swal({
        title: "請將資訊填寫完整",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    document.querySelector(".pay-form").style.display = "none";
    await axios.delete("http://localhost:8000/delete/carts").then(async () => {
      let result = await axios.get("http://localhost:8000/carts");
      newState.carts = result.data;
      let totalPrice = 0;
      newState.totalPrice = totalPrice;
      this.setState(newState);
    });
  };
  menuBurger = () => {
    const navList = document.querySelector(".nav-list");
    navList.classList.toggle("menu-show");
  };

  cartMenuClick = (e) => {
    e.preventDefault();
    if (this.state.userName) {
      window.location = `/buyCart`;
    } else {
      window.location = "/Login";
    }
  };

  frashbtn = async (index) => {
    console.log(index);
    try {
      if (this.state.carts.length <= 1) {
        swal({
          title: "已無法再減少商品",
          icon: "warning",
          dangerMode: true,
        });
        return;
      }

      await axios
        .delete(`http://localhost:8000/delete/carts/${index}`)
        .then(async () => {
          const response = await axios.get("http://localhost:8000/carts");
          const carts = response.data;
          let totalPrice = 0;
          carts.forEach((item) => {
            totalPrice += item.price;
          });

          this.setState({
            carts: carts,
            totalPrice: totalPrice,
          });
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  nameChange = (e) => {
    let newState = { ...this.state };
    newState.recipient = e.target.value;
    this.setState(newState);
  };
  nameCheck = () => {
    let newState = { ...this.state };
    let rules = new RegExp(/^[\u4e00-\u9fa5a-zA-Z]+$/);
    newState.recipient = rules.test(newState.recipient)
      ? newState.recipient
      : "";
    this.setState(newState);
    if (!newState.recipient) {
      swal({
        title: "請填入正確的姓名",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  phoneChange = (e) => {
    let newState = { ...this.state };
    newState.phone = e.target.value;
    this.setState(newState);
  };
  //正規表示是檢查
  phoneCheck = () => {
    let rules = new RegExp(/^09\d{8}/);
    let newState = { ...this.state };
    newState.phone = rules.test(newState.phone) ? newState.phone : "";
    this.setState(newState);
    if (!newState.phone) {
      swal({
        title: "請填入正確的電話號碼",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  addressChange = (e) => {
    let newState = { ...this.state };
    newState.address = e.target.value;
    this.setState(newState);
  };

  methodChange = (e) => {
    let newState = { ...this.state };
    newState.method = e.target.value;
    this.setState(newState);
  };

  componentDidMount = async () => {
    let userdata = localStorage.getItem("user");
    userdata = JSON.parse(userdata);
    let newState = { ...this.state };
    if (userdata) {
      newState.userName = userdata.userName;
    }

    let result = await axios.get("http://localhost:8000/carts");
    newState.carts = result.data;
    let totalPrice = 0;
    newState.carts.forEach((item) => {
      totalPrice += item.price;
    });
    newState.totalPrice = totalPrice;

    this.setState(newState);
  };
  render() {
    return (
      <React.Fragment>
        <nav>
          <div className="nav-container">
            <div className="logo">
              <img src="./image/linkedin_banner_image_1.png" alt="" />
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
        <div className="buy-cart-container">
          <table className="buy-cart-table">
            <thead>
              <tr>
                <th>商品名稱</th>
                <th>價格</th>
                <th>數量</th>
                <th>預約日期</th>
                <th>運送方式</th>
              </tr>
            </thead>
            <tbody className="order-List">
              {this.state.carts.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="product-name">
                      <div className="graphics-text">
                        <img src={item.productImage} alt="productImage" />
                        <p>{item.productName}</p>
                      </div>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.stardate} - {item.enddate}
                    </td>
                    <td>
                      <div className="methodFrash">
                        <span> {item.method}</span>
                        <span>
                          <img
                            src="/image/icon/trash.png"
                            alt="frash"
                            className="frash"
                            onClick={() => {
                              this.frashbtn(i);
                            }}
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td colSpan="5" className="total-price">
                  總計{this.state.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="pay-btn">
            <button type="button" onClick={this.chechout}>
              結帳
            </button>
          </div>

          <div className="pay-form">
            <form action="">
              <div className="cross-img" onClick={this.closebtn}>
                <img src="./image/icon/cross.png" alt="" />
              </div>
              <h3>您的訂單</h3>
              <div>
                <label htmlFor="attention">
                  收件人姓名:
                  <input
                    type="text"
                    id="attention"
                    name="attention"
                    value={this.state.recipient}
                    onChange={this.nameChange}
                    onBlur={this.nameCheck}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="address">
                  收件人地址:
                  <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={this.addressChange}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="attention-phone">
                  收件人電話:
                  <input
                    type="text"
                    id="attention-phone"
                    name="attention-phone"
                    value={this.state.phone}
                    onChange={this.phoneChange}
                    onBlur={this.phoneCheck}
                  />
                </label>
              </div>
              <div>
                <p>
                  訂單金額:
                  <span className="pay-price">{this.state.totalPrice}</span>
                </p>
              </div>
              <div className="pay-method">
                <span>付款方式:</span>
                <label htmlFor="ATM">
                  網路轉帳
                  <input
                    type="radio"
                    name="pay"
                    value="網路轉帳"
                    id="ATM"
                    onChange={this.methodChange}
                  />
                </label>
                <label htmlFor="visa">
                  信用卡
                  <input
                    type="radio"
                    name="pay"
                    value="信用卡"
                    id="visa"
                    onChange={this.methodChange}
                  />
                </label>
              </div>
              <div className="finish-btn">
                <button onClick={this.submitOrder} type="button">
                  送出訂單
                </button>
              </div>
            </form>
          </div>
        </div>
        <footer>
          <div className="footer-logo">
            <div className="logo-image">
              <img src="./image/linkedin_banner_image_1.png" alt="" />
            </div>
            <div className="pay-list">
              <img
                src="./image/pay/1156722_finance_jcb_logo_payment_icon.png"
                alt=""
              />
              <img src="./image/pay/294654_visa_icon.png" alt="" />
              <img
                src="./image/pay/380809_card_master_mastercard_icon.png"
                alt=""
              />
              <img
                src="./image/pay/7123945_logo_pay_google_gpay_icon.png"
                alt=""
              />
              <img src="./image/pay/8666205_apple_pay_icon.png" alt="" />
            </div>
          </div>
          <div className="footer-content">
            <h3>camping</h3>
            <ul className="meau">
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
}

export default buyCart;
