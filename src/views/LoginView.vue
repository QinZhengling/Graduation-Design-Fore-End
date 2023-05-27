<template>
    <div id="body">
        <div class="Bg_1"></div>
        <div class="HeadWord">
            welcome to
            Innovative credit
            recognition system
        </div>
        <div class="HeadWord_2">
            A whole new productive journey
            starts right here
        </div>
        <div class="Img">
            <img src="../../public/img/Background_1.svg">
            <img src="../../public/img/Background_2.svg" alt="">
        </div>
        <div class="Part_2">
            <div class="Button">
                <div :class=bt1 @click="Bfun()">
                    Sign In
                    <div class="Under"></div>
                </div>
                <div :class=bt2 @click="Bfun_2()">
                    Register
                    <div class="Under"></div>
                </div>
            </div>
            <div class="CQUST_Img">
                <img src="../../public/img/CQUST.svg" alt="CQUST">
            </div>
            <div class="InputPart">
                <div class="UserNameBox">
                    <input type="text" name="username" id="username" placeholder="Enter your account" v-model="username"
                        required>
                </div>
                <div class="PassWordBox">
                    <input type="password" name="password" id="password" placeholder="Enter your password"
                        v-model="password" @keyup.enter="Login()" required>
                </div>
                <label class="checkbox-btn">
                    <label for="checkbox">Keep me login</label>
                    <input id="checkbox" type="checkbox" @click="selectBtn()">
                    <span class="checkmark"></span>
                </label>
                <text class="Forget" selectable="false" space="false" decode="false">
                    Forgot Passcode?
                </text>
                <div class="LoginBtn" @click="Login()">
                    <text class="" selectable="false" space="false" decode="false">
                        SIGN IN
                    </text>
                </div>
            </div>
            <div class="cut_apart">
                <div class="one"></div>
                <text>
                    or continue with
                </text>
                <div class="tow"></div>
            </div>
            <div class="OtherLogin">
                <img src="../../public/img/Goolgle.svg" alt="">
                <img src="../../public/img/WeChat.svg" alt="">
                <img src="../../public/img/GitHub.svg" alt="">
            </div>
            <div class="UnderExplain">©️ 2023 Zhengling Qin All Rights Reserved </div>
        </div>

    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import axios from "axios";
export default {
    name: "LoginView",
    data() {
        return {
            message: "HelloWorld",
            bt1: "bt1_1",
            bt2: "bt2",
            username: "",
            password: "",
            state: false
        }
    },
    methods: {
        Bfun() {
            if (this.bt1 === "bt1" && this.bt2 === "bt2_1") {
                this.bt1 = "bt1_1";
                this.bt2 = "bt2";
            }
            console.log(this.bt1 + "        " + this.bt2)

        },
        Bfun_2() {
            if (this.bt2 === "bt2" && this.bt1 === "bt1_1") {
                this.bt1 = "bt1";
                this.bt2 = "bt2_1";
            }
            console.log(this.bt1 + "        " + this.bt2)
            ElMessage({
                showClose: true,
                message: "暂不需要注册,请使用自己学号进行登录",
                type: 'warning',
            })
            // this.bt1 = "bt1_1";
            // this.bt2 = "bt2";
        },
        selectBtn() {
            if (event.target.checked) {
                this.state = true
            }
            console.log(event.target.checked);
        },
        Login() {
            if (this.bt2 === "bt2_1") {
                ElMessage({
                    showClose: true,
                    message: "暂不需要注册,请使用自己学号进行登录",
                    type: 'warning',
                })
            }
            else {
                if (this.username && this.password) {
                    if (this.state) {
                        console.log(this.state);
                    }
                    else {
                        let Ed = new FormData();
                        Ed.append("UserID", this.username);
                        Ed.append("password", this.password);
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                        console.log(this.state);
                        axios.post("/Login", Ed, config).then(res => {
                            if (res.data.msg == "学生登录") {
                                console.log(res);
                                sessionStorage.setItem("userInfo", JSON.stringify(res.data.studentInfo))
                                this.$router.push({ path: '/home' });
                                ElMessage({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: 'success',
                                })
                            }
                            else if (res.data.msg == "教师登录") {
                                if (res.data.teacher.roles === 1) {
                                    sessionStorage.setItem("userInfo", JSON.stringify(res.data.teacher))
                                    console.log(res.data.teacher);
                                    this.$router.push({ path: '/TeachertView' });
                                    ElMessage({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: 'success',
                                    })
                                }
                                if (res.data.teacher.roles === 2 || res.data.teacher.roles === 3) {
                                    sessionStorage.setItem("userInfo", JSON.stringify(res.data.teacher))
                                    this.$router.push({ path: '/Teacher2' });
                                    ElMessage({
                                        showClose: true,
                                        message: "系主任、教务处登录",
                                        type: 'success',
                                    })
                                }
                            }
                            else {
                                ElMessage({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: 'warning',
                                })
                            }
                        })
                    }
                }
                else {
                    ElMessage({
                        showClose: true,
                        message: "账号密码不能为空",
                        type: 'warning',
                    })
                }
            }
        },
    },
    setup() {
        const mess = "你好世界"

        return {
            mess
        }
    },
}
</script>

<style scoped>
@import url("@/assets/font/font.css");


#body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: #E9ECF7;
    width: 100%;
    height: 100%;
    max-height: 100vh;
}

.Bg_1 {
    position: absolute;
    width: 639px;
    height: 639px;
    left: 431px;
    top: 31px;
    background: #CADCED;
    filter: blur(150px);
    border-radius: 50%;
    /* border: 1px solid red; */
}

.HeadWord {
    position: relative;
    user-select: none;
    width: 691px;
    height: 258px;
    left: 178px;
    top: 157px;
    font-family: "Poppins";
    font-style: italic;
    font-weight: 600;
    font-size: 70px;
    line-height: 122.5%;
    /* or 86px */
    color: #7B86E7;
    /* border: 1px solid red; */
}

.HeadWord_2 {
    position: relative;
    user-select: none;
    width: 486px;
    height: 90px;
    left: 184px;
    top: 173px;
    /* border: 1px solid red; */
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 45px;
    color: #686868;
}

.Img {
    position: relative;
    width: 800px;
    top: 60px;
    left: 350px;
    /* border: 1px solid red; */
}

.Img :nth-child(1) {
    position: absolute;
    width: 457.8px;
    height: 457.8px;
    left: 85px;
    top: 40px;
}

.Img :nth-child(2) {
    position: absolute;
    width: 242px;
    height: 242px;
    left: 490px;
    top: 33px;
}

.Part_2 {
    margin: 0;
    padding: 0;
    position: relative;
    display: block;
    width: 478px;
    height: 834px;
    /* border: 1px solid red; */
    left: 1330px;
    top: -300px;
    margin-bottom: -300px;

}

.Button {
    width: 100%;
    height: 71px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    /* identical to box height */
    color: #000000;
    user-select: none;
}

.Button text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    /* identical to box height */
    color: #000000;
    user-select: none;
}

@property --bt1 {
    syntax: '<color>';
    initial-value: none;
    inherits: false;
}

@property --bt1_p {
    syntax: '<number>';
    initial-value: 10px;
    inherits: false;
}

@property --bt1_Under {
    syntax: '<length>';
    initial-value: 0;
    inherits: false;
}

.bt1 {
    cursor: pointer;
    position: absolute;
    width: 219px;
    height: 71px;
    left: 0;
    top: var(--bt1_p);
    background: #FFFDFD;
    box-shadow: 10px 14px 35px rgba(123, 134, 231, 0.08);
    border-radius: 99px;
    border: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* text-decoration-color: #e66363;
    text-underline-offset: var(--bt1_Under);
    text-decoration: underline; */
    transition: background .5s, color .5s;
}

.bt1 .Under {
    position: absolute;
    --bt1_Under: 0px;
    width: var(--bt1_Under);
    top: 61px;
    height: 9px;
    background: #5A67D2;
    border-radius: 99px;
    transition: --bt1_Under .5s;
}


.bt1_1 {
    position: absolute;
    width: 219px;
    height: 71px;
    left: 0;
    top: 0px;
    background: #FFFDFD;
    box-shadow: 10px 14px 35px rgba(123, 134, 231, 0.08);
    border-radius: 99px;
    border: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* text-decoration-color: #ffffff;
    text-underline-offset: var(--bt1_Under);
    text-decoration: underline; */
    transition: background .5s, color .5s;
    background: var(--bt1);
    width: 219px;
    height: 71px;
    color: #5A67D2;
    box-shadow: none;
    /* --bt1_Under: 10px; */
}

.bt1_1 .Under {
    position: absolute;
    --bt1_Under: 50px;
    width: var(--bt1_Under);
    height: 9px;
    background: #5A67D2;
    border-radius: 99px;
    top: 61px;
    transition: --bt1_Under .5s;
}

/* .bt1:active {
    background: var(--bt1);
    width: 219px;
    height: 71px;
    color: #5A67D2;
    box-shadow: none;
    --bt1_Under: 10px;
} */

.bt2 {
    cursor: pointer;
    position: absolute;
    width: 219px;
    height: 71px;
    right: 0;
    top: var(--bt1_p);
    background: #FFFDFD;
    box-shadow: 10px 14px 35px rgba(123, 134, 231, 0.08);
    border-radius: 99px;
    border: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* text-decoration-color: #e66363;
    text-underline-offset: var(--bt1_Under);
    text-decoration: underline; */
    transition: background .5s, color .5s;
}

.bt2 .Under {
    position: absolute;
    --bt1_Under: 0px;
    width: var(--bt1_Under);
    top: 61px;
    height: 9px;
    background: #5A67D2;
    border-radius: 99px;
    transition: --bt1_Under .5s;
}

.bt2_1 {
    position: absolute;
    width: 219px;
    height: 71px;
    right: 0;
    top: 0px;
    background: #FFFDFD;
    box-shadow: 10px 14px 35px rgba(123, 134, 231, 0.08);
    border-radius: 99px;
    border: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* text-decoration-color: #ffffff;
    text-underline-offset: var(--bt1_Under);
    text-decoration: underline; */
    transition: background .5s, color .5s;
    background: var(--bt1);
    width: 219px;
    height: 71px;
    color: #5A67D2;
    box-shadow: none;
    /* --bt1_Under: 10px; */
}

.bt2_1 .Under {
    position: absolute;
    --bt1_Under: 50px;
    width: var(--bt1_Under);
    height: 9px;
    background: #5A67D2;
    border-radius: 99px;
    top: 61px;
    transition: --bt1_Under .5s;
}

.CQUST_Img {
    position: relative;
    width: 187px;
    height: 37.07px;
    left: 0px;
    top: 90px;
}

.InputPart {
    position: relative;
    width: 456px;
    height: 395px;
    /* border: 1px solid red; */
    top: 110px;
    margin: auto;
}

.UserNameBox {
    position: absolute;
    width: 456px;
    height: 80px;
    left: 0px;
    top: 0px;
}

.UserNameBox input {
    position: absolute;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    background: #E0E6F8;
    line-height: 30px;
    width: 418px;
    height: 100%;
    border: none;
    padding: 0;
    margin: 0;
    padding-left: 38px;
    outline: none;
}

.PassWordBox {
    position: absolute;
    width: 456px;
    height: 80px;
    left: 0px;
    top: 122px;
}

.PassWordBox input {
    position: absolute;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    background: #E0E6F8;
    line-height: 30px;
    width: 418px;
    height: 100%;
    border: none;
    padding: 0;
    margin: 0;
    padding-left: 38px;
    outline: none;
}

/* Customize the label (the checkbox-btn) */
.checkbox-btn {
    display: block;
    position: relative;
    width: 120px;
    top: 224px;
    padding-left: 35px;
    margin-bottom: 10px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

}

.checkbox-btn label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    top: 0px;
}

/* Hide the browser's default checkbox */
.checkbox-btn input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkbox-btn label {
    cursor: pointer;
    font-size: 14px;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background: rgba(123, 134, 231, 0.27);
    border-radius: 5px;
    transition: .2s linear;
}

.checkbox-btn input:checked~.checkmark {
    background-color: transparent;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    visibility: hidden;
    opacity: 0;
    left: 50%;
    top: 40%;
    width: 10px;
    height: 14px;
    border: 2px solid #5A67D2;
    filter: drop-shadow(0px 0px 10px #5A67D2);
    border-width: 0 2.5px 2.5px 0;
    transition: .2s linear;
    transform: translate(-52%, -52%) rotate(-90deg) scale(0.2);
}

/* Show the checkmark when checked */
.checkbox-btn input:checked~.checkmark:after {
    visibility: visible;
    opacity: 1;
    transform: translate(-52%, -52%) rotate(0deg) scale(1);
    animation: pulse 1s ease-in;
}

.checkbox-btn input:checked~.checkmark {
    transform: rotate(45deg);
    border: none;
}

@keyframes pulse {

    0%,
    100% {
        transform: translate(-52%, -52%) rotate(0deg) scale(1);
    }

    50% {
        transform: translate(-52%, -52%) rotate(0deg) scale(1.5);
    }
}

.Forget {
    position: relative;
    width: 124px;
    height: 21px;
    left: 332px;
    top: 190px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */

    user-select: none;
    cursor: pointer;
    color: #5A67D2;
}

.LoginBtn {
    position: relative;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 250px;
    width: 440px;
    height: 83px;
    background: #3D60E8;
    box-shadow: 0px 20px 59px rgba(61, 96, 232, 0.2);
    border-radius: 15px;
    transition: .5s;
}

.LoginBtn:hover {
    position: relative;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 250px;
    width: 440px;
    height: 83px;
    background: rgb(61, 96, 232);
    box-shadow: 0px 20px 59px rgba(0, 51, 255, 0.686);
    border-radius: 15px;
    cursor: pointer;
}

.LoginBtn text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    /* identical to box height */
    color: #FFFFFF;
    user-select: none;
}

.cut_apart {
    position: relative;
    width: 478px;
    height: 25px;
    top: 160px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.cut_apart .one {
    position: absolute;
    width: 110px;
    height: 0px;
    left: 4px;
    border: 1px solid #515151;
}

.cut_apart .tow {
    position: absolute;
    width: 110px;
    height: 0px;
    right: 4px;
    border: 1px solid #515151;
}

.cut_apart text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */
    color: #515151;
    user-select: none;
}

.OtherLogin {
    position: relative;
    margin: 0;
    width: 478px;
    height: 80px;
    display: flex;
    top: 210px;
    /* border: 1px solid red; */
}

.OtherLogin img {
    position: relative;
    width: 33%;
    height: 100%;
}

.UnderExplain {
    position: absolute;
    height: 22px;
    bottom: -50px;
    right: 10px;
    margin-bottom: 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    /* identical to box height, or 22px */
    color: #747474;
}
</style>