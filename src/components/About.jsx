import React, { Component } from "react";
import swal from "sweetalert";
class About extends Component {
  state = {
    userName: "",
    name: "",
    phone: "",
    message: "",
    email: "",
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

  messageChange = (e) => {
    let newState = { ...this.state };
    newState.message = e.target.value;
    this.setState(newState);
  };

  phoneChange = (e) => {
    let newState = { ...this.state };
    newState.phone = e.target.value;
    this.setState(newState);
  };
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

  emailChange = (e) => {
    let newState = { ...this.state };
    newState.email = e.target.value;
    this.setState(newState);
  };

  emailCheck = () => {
    let newState = { ...this.state };
    let rules = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    newState.email = rules.test(newState.email) ? newState.email : "";
    this.setState(newState);
    if (!newState.email) {
      swal({
        title: "請填入正確的信箱",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  nameChange = (e) => {
    let newState = { ...this.state };
    newState.name = e.target.value;
    this.setState(newState);
  };
  nameCheck = () => {
    let newState = { ...this.state };
    let rules = new RegExp(/^[\u4e00-\u9fa5a-zA-Z]+$/);
    newState.name = rules.test(newState.name) ? newState.name : "";
    this.setState(newState);
    if (!newState.name) {
      swal({
        title: "請填入正確的姓名",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  messageSubmit = () => {
    let newState = { ...this.state };
    if (
      !newState.email ||
      !newState.name ||
      !newState.phone ||
      !newState.message
    ) {
      swal({
        title: "請將表單資訊填寫完整",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    newState.email = "";
    newState.name = "";
    newState.phone = "";
    newState.message = "";
    this.setState(newState);
    swal("成功送出表單", "我們將盡快回復您", "success");
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
                <a href="#" id="active">
                  關於我們
                </a>
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
        <div className="about-page">
          <div className="about-banner">
            <img src="./image/banner/5.jpg" alt="banner" />
          </div>

          <div className="about-intro">
            <h3>我們的服務特色：</h3>
            <div className="service-intro">
              <h4>1. 多樣化的露營用具</h4>
              <p>
                從帳篷、睡袋到露營炊具，我們提供多樣化的露營用品，滿足不同需求和場合。無論是單人探險還是家庭露營，我們都有適合您的器材。
              </p>
              <h4>2. 方便快捷的租借流程</h4>
              <p>
                我們致力於簡化租借流程，讓您能夠輕鬆租借所需用具。透過線上預訂系統，您可以輕鬆選擇您需要的器材，選擇租借日期，並在線上支付租金。我們的流程簡單迅速，讓您更專注於您的露營體驗。
              </p>
              <h4>3. 品質保證和清潔衛生</h4>
              <p>
                我們注重用具的品質和清潔，每件器材在租借前都會經過嚴格的檢查和清潔程序，以確保您在使用時享受到最佳的品質和衛生條件。
              </p>
              <h4>4. 隨時的客戶支援</h4>
              <p>
                無論您在租借過程中遇到什麼問題，我們隨時為您提供支援。我們的客戶服務團隊樂意回答您的問題，解決您的疑慮，確保您的露營體驗順利無憂。
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14561.550206181988!2d120.67327926232807!3d24.15813748280831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d61597adcef%3A0xbbef51b8cd9fc6f9!2zNDA05Y-w5Lit5biC5YyX5Y2A!5e0!3m2!1szh-TW!2stw!4v1704003014756!5m2!1szh-TW!2stw"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="about-form">
          <h3>聯絡我們</h3>
          <form>
            <div className="form-input">
              <label>
                姓名:
                <input
                  type="text"
                  onChange={this.nameChange}
                  value={this.state.name}
                  onBlur={this.nameCheck}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  onChange={this.emailChange}
                  value={this.state.email}
                  onBlur={this.emailCheck}
                />
              </label>
              <label>
                電話:
                <input
                  type="text"
                  onChange={this.phoneChange}
                  value={this.state.phone}
                  onBlur={this.phoneCheck}
                />
              </label>
            </div>
            <label className="message">
              訊息:
              <textarea
                cols="10"
                rows="1"
                onChange={this.messageChange}
                value={this.state.message}
              ></textarea>
            </label>
            <button
              className="form-btn"
              onClick={this.messageSubmit}
              type="button"
            >
              提交
            </button>
          </form>
        </div>

        <footer>
          <div className="footer-logo">
            <div className="logo-image">
              <img src="./image/linkedin_banner_image_1.png" alt="logo" />
            </div>
            <div className="pay-list">
              <img
                src="./image/pay/1156722_finance_jcb_logo_payment_icon.png"
                alt="pay"
              />
              <img src="./image/pay/294654_visa_icon.png" alt="visa" />
              <img
                src="./image/pay/380809_card_master_mastercard_icon.png"
                alt="pay"
              />
              <img
                src="./image/pay/7123945_logo_pay_google_gpay_icon.png"
                alt="pay"
              />
              <img src="./image/pay/8666205_apple_pay_icon.png" alt="pay" />
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

export default About;
