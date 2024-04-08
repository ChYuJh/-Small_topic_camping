import React, { Component } from "react";
import "../css/all.css";
class Rule extends Component {
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

  //手風琴
  btn = () => {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  };

  //漢堡選單
  menuBurger = () => {
    const navList = document.querySelector(".nav-list");
    navList.classList.toggle("menu-show");
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
                <a href="#" id="active">
                  租借規範
                </a>
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
        <div className="rule-banner">
          <img src="./image/banner/4.png" alt="租借" />
          {/* <div className="banner-text">租借規範</div> */}
        </div>

        <div className="contentrule">
          <button className="accordion" onClick={this.btn}>
            1.租借流程：
          </button>
          <div className="panel">
            <p>
              顧客可透過線上平台選擇所需露營用具，選擇租借日期，完成預訂程序。
            </p>
            <p>確認： 系統將發送確認郵件，包含租借詳情、價格和取貨地點。</p>
            <p>支付： 顧客需在預訂後指定時間內完成支付，確保租借訂單生效。</p>
          </div>
          <button className="accordion" onClick={this.btn}>
            2.租借期限：
          </button>
          <div className="panel">
            <p>起訖日期： 租借期限以預訂時選擇的開始和結束日期為準。</p>
            <p>超時： 若在租借期滿後未歸還，將產生額外費用。</p>
          </div>
          <button className="accordion" onClick={this.btn}>
            3.預訂取消
          </button>
          <div className="panel">
            <p>
              取消政策：
              顧客可在指定期限內取消預訂，取消後將扣除部分或全部租金。
            </p>
          </div>
          <button className="accordion" onClick={this.btn}>
            4.保證金
          </button>
          <div className="panel">
            <p>
              保證金：
              部分租借物品可能需支付保證金，保證金將在歸還物品且無損壞的情況下全額退還。
            </p>
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
  componentDidMount() {
    let userdata = localStorage.getItem("user");
    userdata = JSON.parse(userdata);
    let newState = { ...this.state };
    if (userdata) {
      newState.userName = userdata.userName;
      this.setState(newState);
      console.log(newState);
    }
  }
}

export default Rule;
