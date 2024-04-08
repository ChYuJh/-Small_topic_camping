import React, { Component } from "react";
import "../css/all.css";
import axios from "axios";

class Classification extends Component {
  state = {
    userName: "",
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
  render() {
    if (!Array.isArray(this.state.data)) {
      return <div>No data available</div>;
    }
    return (
      <React.Fragment>
        <nav>
          <div className="nav-container">
            <div className="logo">
              <img src="/image/linkedin_banner_image_1.png" alt="" />
            </div>
            <ul className="nav-list">
              <li>
                <a href="/Home">首頁</a>
              </li>
              <li>
                <a href="/Classification" id="active">
                  所有商品
                </a>
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
                src="./image/icon/menu-burger.png"
                alt=""
                onClick={this.menuBurger}
              />
            </div>
          </div>
        </nav>
        <div className="product-content">
          <div className="class-list">
            <h3>
              商品分類
              <img
                className="angle-down"
                src="./image/icon/angle-down.png"
                alt=""
                onClick={this.angleDown}
              />
            </h3>
            <ul className="class-item">
              <li>
                <a
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = await axios.get("http://localhost:8000/cart");
                    let newState = { ...this.state };
                    newState.data = result.data;
                    this.setState(newState);
                  }}
                >
                  露營推車
                </a>
              </li>
              <li>
                <a
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = await axios.get("http://localhost:8000/light");
                    let newState = { ...this.state };
                    newState.data = result.data;
                    this.setState(newState);
                  }}
                >
                  露營燈
                </a>
              </li>
              <li>
                <a
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = await axios.get(
                      "http://localhost:8000/tables-chairs"
                    );
                    let newState = { ...this.state };
                    newState.data = result.data;
                    this.setState(newState);
                  }}
                >
                  桌椅組
                </a>
              </li>
              <li>
                <a
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = await axios.get(
                      "http://localhost:8000/sleeping-pad"
                    );
                    let newState = { ...this.state };
                    newState.data = result.data;
                    this.setState(newState);
                  }}
                >
                  睡墊
                </a>
              </li>
              <li>
                <a
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = await axios.get("http://localhost:8000/tent");
                    let newState = { ...this.state };
                    newState.data = result.data;
                    this.setState(newState);
                  }}
                >
                  帳篷
                </a>
              </li>
              <li>
                <a
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = await axios.get(
                      "http://localhost:8000/keep-fresh"
                    );
                    let newState = { ...this.state };
                    newState.data = result.data;
                    this.setState(newState);
                  }}
                >
                  保鮮
                </a>
              </li>
              <li>
                <a
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = await axios.get("http://localhost:8000/other");
                    let newState = { ...this.state };
                    newState.data = result.data;
                    this.setState(newState);
                  }}
                >
                  其他
                </a>
              </li>
            </ul>
          </div>
          <div className="product">
            <h3>{this.state.data[0].classCH}</h3>
            <ul className="product-card-first product-list">
              {this.state.data.map((item, i) => {
                return (
                  <li className="product-card" key={i}>
                    <a href={`/Product/${item.id}`}>
                      <img src={item.url_image} alt={item.product} />
                      <h3>{item.product}</h3>
                      <p>{item.priceStr}</p>
                      <div className="product-btn">預約</div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <footer>
          <div className="footer-logo">
            <div className="logo-image">
              <img src="/image/linkedin_banner_image_1.png" alt="" />
            </div>
            <div className="pay-list">
              <img
                src="/image/pay/1156722_finance_jcb_logo_payment_icon.png"
                alt=""
              />
              <img src="/image/pay/294654_visa_icon.png" alt="" />
              <img
                src="/image/pay/380809_card_master_mastercard_icon.png"
                alt=""
              />
              <img
                src="/image/pay/7123945_logo_pay_google_gpay_icon.png"
                alt=""
              />
              <img src="/image/pay/8666205_apple_pay_icon.png" alt="" />
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

  componentDidMount = async () => {
    let result;
    if (this.props.match.params.class) {
      result = await axios.get(
        `http://localhost:8000/Classification/${this.props.match.params.class}`
      );
    } else {
      result = await axios.get(`http://localhost:8000/allProduct`);
    }
    console.log(result);
    let newState = { ...this.state };
    newState.data = result.data;

    newState.data[0].classCH = "所有商品";
    // newState.classCH}
    this.setState(newState);

    let userdata = localStorage.getItem("user");
    userdata = JSON.parse(userdata);
    if (userdata) {
      newState.userName = userdata.userName;
      this.setState(newState);
      console.log(newState);
    }
  };
}

export default Classification;
