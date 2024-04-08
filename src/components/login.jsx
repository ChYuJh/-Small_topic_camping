import React, { Component } from "react";
import "../css/login.css";
import swal from "sweetalert";
import axios from "axios";
class Login extends Component {
  state = {
    registerName: "",
    email: "",
    password: "",
  };

  //註冊、登入頁面切換
  openPage = (pageName, elmnt) => {
    let i, tabcontent;
    tabcontent = document.getElementsByClassName("inputcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      let a = tabcontent[i].id + "-btn";
      document.querySelector(`.${a}`).style.backgroundColor = "gray";
    }
    document.getElementById(pageName).style.display = "block";
    let b = pageName + "-btn";
    document.querySelector(`.${b}`).style.backgroundColor = "black";
  };

  //註冊名字
  registerName = (e) => {
    let newState = { ...this.state };
    newState.registerName = e.target.value;
    this.setState(newState);
  };

  //檢查註冊名字是否符合格式
  registerNameCheck = () => {
    let newState = { ...this.state };
    let rules = new RegExp(/^[\u4e00-\u9fa5a-zA-Z]+$/);
    newState.registerName = rules.test(newState.registerName)
      ? newState.registerName
      : "";
    console.log(newState.registerName);
    this.setState(newState);
    if (!newState.registerName) {
      swal({
        title: "請填入正確的姓名",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  //註冊信箱
  emailChange = (e) => {
    let newState = { ...this.state };
    newState.email = e.target.value;
    this.setState(newState);
  };
  //檢查註冊信箱是否符合格式
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

  //註冊密碼
  passwordChange = (e) => {
    let newState = { ...this.state };
    newState.password = e.target.value;
    this.setState(newState);
  };
  //檢查註冊密碼是否符合格式
  passwordCheck = () => {
    let newState = { ...this.state };
    let rules = new RegExp(/^.{5,}$/);
    newState.password = rules.test(newState.password) ? newState.password : "";
    swal({
      title: "密碼不得少於5個字元",
      icon: "warning",
      dangerMode: true,
    });
  };

  //送出註冊
  submitRegister = async () => {
    let newState = { ...this.state };
    if (!newState.email || !newState.password || !newState.registerName) {
      swal({
        title: "請完整填寫註冊資訊",
        icon: "warning",
        dangerMode: true,
      });
    } else {
      let severData = {
        registerName: this.state.registerName,
        email: this.state.email,
        password: this.state.password,
      };
      let config = {
        headers: {
          "content-type": "application/json",
        },
      };
      let result = await axios
        .post("http://localhost:8000/user/create", severData, config)
        .then(() => {
          swal("註冊成功", "註冊", "success");
          document.getElementById("defaultOpen").click();
        });
    }
  };

  //登入密碼
  loginPasswordChange = (e) => {
    let newState = { ...this.state };
    newState.loginPassword = e.target.value;
    this.setState(newState);
  };

  //登入信箱
  loginEmailChange = (e) => {
    let newState = { ...this.state };
    newState.loginEmail = e.target.value;
    this.setState(newState);
  };

  //檢砸是否匹配
  loginSubmit = async () => {
    let result = await axios.get("http://localhost:8000/user/login");
    let newState = { ...this.state };
    for (let i = 0; i < result.data.length; i++) {
      if (
        result.data[i].useremail === newState.loginEmail &&
        result.data[i].userpassword == newState.loginPassword
      ) {
        let userobj = JSON.stringify({
          userName: result.data[i].userName,
        });
        localStorage.setItem("user", userobj);
        window.location.replace("./Home");
        return;
      }
      swal({
        title: "信箱或密碼輸入錯誤",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-page">
          <div className="login-page-btn">
            <button
              className="login-btn"
              id="defaultOpen"
              onClick={() => this.openPage("login", this)}
            >
              登入
            </button>
            <button
              className="singup-btn"
              onClick={() => this.openPage("singup", this)}
            >
              註冊
            </button>
          </div>

          <div id="login" className="inputcontent">
            <h3>登入帳號</h3>
            <form action="">
              <div>
                <label htmlFor="login-account-input">信箱 </label>
                <input
                  id="login-account-input"
                  type="email"
                  onChange={this.loginEmailChange}
                />
              </div>
              <label htmlFor="login-password-input">密碼 </label>
              <input
                id="login-password-input"
                type="password"
                onChange={this.loginPasswordChange}
              />
              <div>
                <button
                  className="login-go-btn"
                  onClick={this.loginSubmit}
                  type="button"
                >
                  登入
                </button>
              </div>
            </form>
          </div>

          <div id="singup" className="inputcontent">
            <h3>註冊帳號</h3>
            <form action="">
              <div>
                <label htmlFor="singup-name-input">姓名 </label>
                <input
                  id="singup-name-input"
                  type="text"
                  value={this.state.registerName}
                  onChange={this.registerName}
                  onBlur={this.registerNameCheck}
                />
              </div>
              <div>
                <label htmlFor="singup-account-input">信箱 </label>
                <input
                  id="singup-account-input"
                  type="email"
                  onChange={this.emailChange}
                  value={this.email}
                  onBlur={this.emailCheck}
                />
              </div>
              <label htmlFor="singup-password-input">密碼 </label>
              <input
                id="singup-password-input"
                type="password"
                onChange={this.passwordChange}
                value={this.password}
                onBlur={this.passwordCheck}
              />
              <div>
                <button
                  className="singup-go-btn"
                  onClick={this.submitRegister}
                  type="button"
                >
                  註冊
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    document.getElementById("defaultOpen").click();
  }
}

export default Login;
