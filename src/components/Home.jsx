import React, { Component } from "react";
import "../css/all.css";
class Home extends Component {
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

  //輪播圖
  showSlides = () => {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");

    const showSlide = () => {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
    };

    setInterval(showSlide, 3000); // Change image every 2 seconds
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
              <img src="/image/linkedin_banner_image_1.png" alt="banner" />
            </div>
            <ul className="nav-list">
              <li>
                <a href="#" id="active">
                  首頁
                </a>
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
                src="./image/icon/menu-burger.png"
                alt=""
                onClick={this.menuBurger}
              />
            </div>
          </div>
        </nav>
        <div className="slideshow-container">
          <div className="mySlides fade">
            <img src="./image/banner/1.jpg" className="home-banner" />
          </div>

          <div className="mySlides fade">
            <img src="./image/banner/2.jpg" className="home-banner" />
          </div>

          <div className="mySlides fade">
            <img src="./image/banner/3.jpg" className="home-banner" />
          </div>
        </div>

        <div className="content">
          <div className="contentAbout">
            <h1>camping</h1>
            <p>自然 悠閒 放鬆</p>
            <p>
              在camping，我們致力於提供全方位的露營用具租借服務，讓您能夠輕鬆享受大自然的美好，無需擔心設備的瑣碎事務。
            </p>
            <p>
              無論您是想在山川湖泊中露營、參加露天音樂節、還是與家人朋友共度一個難忘的露天活動，我們都能滿足您的需求。
            </p>
          </div>
        </div>
        <div className="recommendation">
          <div className="wrap">
            <h3 className="section-title">好評推薦</h3>
            <div className="recommendation-wall">
              <ul className="gallery-top">
                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/10 Best Makeup Products Of 2019 You Need For The Summer - Society19.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>凱倫</p>
                        <p className="recommend-text">印地安帳篷</p>
                      </div>
                    </div>
                    <p className="feeback">
                      真的超讚的！感謝你們提供這麼優質的商品和服務。
                    </p>
                  </div>
                </li>

                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/3309041a-8f5b-4621-b1dd-632e70a42db8.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>王凱</p>
                        <p className="recommend-text">多功能車尾帳</p>
                      </div>
                    </div>
                    <p className="feeback">
                      超級滿意的租借體驗！商品品質一流，客服態度超好，下次還會再來！
                    </p>
                  </div>
                </li>
                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/35 Coolest Two Block Haircut Ideas for Men.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>許皓</p>
                        <p className="recommend-text">印地安帳篷</p>
                      </div>
                    </div>
                    <p className="feeback">
                      非常推薦！租借流程簡單順暢，而且快遞速度超快，真的是讓人驚艷！
                    </p>
                  </div>
                </li>
                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/68d41974-5ad4-46ed-bd0c-4b39569d2090.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>家輝</p>
                        <p className="recommend-text">全自動極速製冰機</p>
                      </div>
                    </div>
                    <p className="feeback">
                      感謝您們的用心。商品也相當滿意，值得信賴！
                    </p>
                  </div>
                </li>

                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/779cd302-1ba5-4d7b-8b9b-5674ed48f32f.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>敏俊</p>
                        <p className="recommend-text">加厚雙人充氣睡墊</p>
                      </div>
                    </div>
                    <p className="feeback">
                      商品不僅價格實惠，品質也沒話說，會推薦給朋友！
                    </p>
                  </div>
                </li>
              </ul>

              <ul className="gallery-bottom">
                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/8 K-Beauty Products That Work Beautifully - Society19.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>里美</p>
                        <p className="recommend-text">便攜式折疊躺椅</p>
                      </div>
                    </div>
                    <p className="feeback">租借簡單又方便，</p>
                  </div>
                </li>

                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/credits_ @oystarisland shared by ʀᴏᴄᴋs✞ᴀʀ on We Heart It.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>子翔</p>
                        <p className="recommend-text">露營折疊桌_中</p>
                      </div>
                    </div>
                    <p className="feeback">
                      客服回覆迅速且有耐心，商品也符合預期。
                    </p>
                  </div>
                </li>

                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/Our Riley (Reverse Harem Mafia Romance).jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>一展</p>
                        <p className="recommend-text">摺疊露營手拉車</p>
                      </div>
                    </div>
                    <p className="feeback">
                      品質保證，價格實在，已經介紹給身邊的朋友了！
                    </p>
                  </div>
                </li>
                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/20 Cool Wolf Cut Hairstyles for Men.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>里歐</p>
                        <p className="recommend-text">提爾4人帳</p>
                      </div>
                    </div>
                    <p className="feeback">
                      不管是商品還是服務，都值得給予最高的評價。
                    </p>
                  </div>
                </li>
                <li className="recommendation-card">
                  <div className="recommend-content">
                    <div className="recommend-img">
                      <img
                        src="./image/avatar/nicolas-horn-MTZTGvDsHFY-unsplash.jpg"
                        alt="avatar"
                        className="img-width"
                      />
                      <div>
                        <p>馬丁</p>
                        <p className="recommend-text">Landnest帳棚天幕組</p>
                      </div>
                    </div>
                    <p className="feeback">CP值很高。</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="popular-product">
          <div className="product-card-list">
            <h2>熱賣商品</h2>

            <ul id="popular" className="product-card-first">
              <li className="product-card">
                <a href="/Product/SKU-5104022148">
                  <img
                    src="./image/sleeping-pad/154538.png"
                    alt="sleeping-pad"
                  />
                  <h3>充氣睡墊單人</h3>
                  <p>NT$200/3日</p>
                  <div className="product-btn">預約</div>
                </a>
              </li>

              <li className="product-card">
                <a href="/Product/SKU-1149535506">
                  <img src="./image/light/150038.png" alt="light" />
                  <h3>復古冷暖三色溫露營燈</h3>
                  <p>NT$200/3日</p>
                  <div className="product-btn">預約</div>
                </a>
              </li>

              <li className="product-card">
                <a href="/Product/SKU-6879074191">
                  <img src="./image/tent/151849.png" alt="tent" />
                  <h3>Landnest帳棚天幕組</h3>
                  <p>NT$900/3日</p>
                  <div className="product-btn">預約</div>
                </a>
              </li>

              <li className="product-card">
                <a href="/Product/SKU-9294184331">
                  <img src="./image/other/162605.png" alt="other" />
                  <h3>照明露營風扇</h3>
                  <p>NT$200/3日</p>
                  <div className="product-btn">預約</div>
                </a>
              </li>
              <li className="product-card">
                <a href="/Product/SKU-8180199377">
                  <img src="./image/keep-fresh/193643.png" alt="keep-fresh" />
                  <h3>全自動極速製冰機</h3>
                  <p>NT$350/3日</p>
                  <div className="product-btn">預約</div>
                </a>
              </li>
              <li className="product-card">
                <a href="/Product/SKU-3512780188">
                  <img src="./image/tables-chairs/160304.png" alt="tables" />
                  <h3>可折疊式椅背</h3>
                  <p>NT$200/3日</p>
                  <div className="product-btn">預約</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <footer>
          <div className="footer-logo">
            <div className="logo-image">
              <img
                src="./image/linkedin_banner_image_1.png"
                alt="linkedin_banner_image_1"
              />
            </div>
            <div className="pay-list">
              <img
                src="./image/pay/1156722_finance_jcb_logo_payment_icon.png"
                alt=""
              />
              <img
                src="./image/pay/294654_visa_icon.png"
                alt="1156722_finance_jcb_logo_payment_icon"
              />
              <img
                src="./image/pay/380809_card_master_mastercard_icon.png"
                alt="380809_card_master_mastercard_icon"
              />
              <img
                src="./image/pay/7123945_logo_pay_google_gpay_icon.png"
                alt="7123945_logo_pay_google_gpay_icon"
              />
              <img
                src="./image/pay/8666205_apple_pay_icon.png"
                alt="8666205_apple_pay_icon"
              />
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
    this.showSlides();
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

export default Home;
