<template>
  <div class="home">
    <!--  <div class="bg"></div>-->
    <div class="head">
      <text>WelCome</text>
      <div class="underLine1"></div>
      <div class="underLine2"></div>

      <div class="navigation_bar">
        <div @click="PersonalCenter()">个人中心</div>
        <div>记录足迹</div>
        <div>学习中心</div>
        <div>关于本作</div>
      </div>

      <div class="SignBt" v-if="LoginBT">
        <div class="signIn" @click="SignUp()">Sign Up</div>
        <div class="signUp" @click="SignIn()">Sign In</div>
      </div>

      <div class="HeadImg" v-else :style="{ background: 'url(' + this.$store.state.headImg + ')', backgroundSize: 'cover' }"
        @click="LoginOut()">
        <text>{{ this.$store.state.username }}</text>
        <!--        <img :src="this.$store.state.headImg" alt="" >-->
      </div>
    </div>

    <div class="HeadWord">
      不要害怕完美<br />
      你永远也达不到
      <text>Have no fear of perfection,
        you'll never reach it.
      </text>
    </div>

    <div class="HomeBox">

      <div class="HomeBox2">

      </div>
    </div>

    <div class="BodyBox">
      <div class="BBHead">
        <text>学习进度</text>
        <div class="BBHeadWord">发奋识遍天下字<br />立志读尽人间书</div>
      </div>

      <div class="StudyRate" v-if="this.Show">
        <div v-for="(item, key, index) in Study" v-bind:key="item" class="StudyBox">
          <div class="StudyImg"><img :src="item.imgPath" alt=""
              :style="{ 'width': item.classname === 'Python' ? '103%' : '', 'height': item.classname === 'Python' ? '103%' : '' }" />
          </div>
          <div class="StudyClass" :style="[{
            'color': item.classname === 'Java' ? '#d20f43' : item.classname === 'Python' ? '#3c78d8' : item.classname === 'HTML' ? '#e06666' :
              item.classname === 'C' ? '#13227a' : '', 'top': item.classname === 'Python' ? '108px' : ''
          }]">{{ item.classname }}
          </div>
          <div class="StudyST">
            <text>开始学习时间:</text>
            {{ item.startTime }}年
          </div>
          <div class="StudyDT">
            <text>已经学习时间:</text>
            {{ item.studyTime }}天
          </div>
          <div class="StudyPro">
            <span class="progress_out">
              <span class="progress_in" :style="{
                width: item.processes + '%', background: item.classname === 'Java' ? '#d20f43' : item.classname === 'Python' ? '#3c78d8' : item.classname === 'HTML' ? '#e06666' :
                  item.classname === 'C' ? '#13227a' : ''
              }"></span>
            </span>
            <div class="processes" :style="{
              background: item.classname === 'Java' ? '#d20f43' : item.classname === 'Python' ? '#3c78d8' : item.classname === 'HTML' ? '#e06666' :
                item.classname === 'C' ? '#13227a' : ''
            }">
              {{ item.processes }}
            </div>
          </div>
          <div v-show="false">{{ key }}{{ index }}</div>
        </div>
      </div>
      <div class="StudyRateF" v-else>
        <div class="WordTitle">您暂时还没有学习记录呢!</div>
        <div class="AddSR" @click="addUserStudy">点击这里添加您的学习记录</div>
      </div>
      <div class="addBoxBig">
        <div class="addBox" v-show="addShow">
          <div class="input-data">
            <input type="text" id="classname" v-model="addclassname" required>
            <div class="underline"></div>
            <label>课程名称</label>
          </div>
          <div class="input-data">
            <input type="text" id="processes" v-model="addprocesses" @keyup.enter="addClassInfo()" required>
            <div class="underline"></div>
            <label>学习进度</label>
          </div>
          <div class="input-data">
            <input type="text" id="startTime" v-model="addstartTime" required>
            <div class="underline"></div>
            <label>开始时间</label>
          </div>
          <div class="input-data">
            <input type="text" id="studyTime" v-model="addstudyTime" @keyup.enter="addClassInfo()" required>
            <div class="underline"></div>
            <label>学习时长</label>
          </div>
          <button @click="addClassInfo()">添加</button>
        </div>
      </div>

    </div>

    <div class="BodyBoxT">
      <div class="BBHead">
        <text>时间历程</text>
        <div class="BBHeadWord">莫倚儿童轻岁月<br />丈人曾共尔同年</div>
      </div>
      <div class="TimeProcess">
        <div class="Month">
          <text>年</text>
          <span class="progress_out">
            <span class="progress_in" :style="{ width: month + '%', background: year ? '#ed1941' : '' }"></span>
          </span>
        </div>

        <div class="Day">
          <text>月</text>
          <span class="progress_out">
            <span class="progress_in" :style="{ width: day + '%', background: day ? '#8552a1' : '' }"></span>
          </span>
        </div>

        <div class="Hours">
          <text>日</text>
          <span class="progress_out">
            <span class="progress_in" :style="{ width: hour + '%', background: day ? '#f05b72' : '' }"></span>
          </span>
        </div>

        <div class="Body">
          <text>德</text>
          <span class="progress_out">
            <span class="progress_in" :style="{ width: this.$store.state.Body + '%', background: day ? '#ef4136' : '' }"></span>
          </span>
        </div>

        <div class="Wisdom">
          <text>智</text>
          <span class="progress_out">
            <span class="progress_in" :style="{ width: this.$store.state.Wisdom + '%', background: day ? '#2585a6' : '' }"></span>
          </span>
        </div>

        <div class="Strength">
          <text>体</text>
          <span class="progress_out">
            <span class="progress_in" :style="{ width: this.$store.state.Strength + '%', background: day ? '#f47920' : '' }"></span>
          </span>
        </div>

        <div class="Garden"></div>
      </div>

      <div class="FinBox">
        <div class="Garden"></div>
        <div class="Garden2"></div>
        <div class="Garden3"></div>
        <div class="FinBoxText">
          今日学习记录
        </div>
        <div class="FinBoxStudy">
          <div class="FinBoxStudyItem" v-for="(item, key, index) in TodayStudy" v-bind:key="item">
            <!--            <img :src="item.imgPath" alt="">-->
            <div>{{ item.classname }}</div>
            <div v-show="false">{{ key }}{{ index }}</div>
          </div>
        </div>
      </div>

      <div class="EndBox">
        <div class="Garden"></div>
        <div class="Garden1"></div>
        <div class="Garden3"></div>
        <div class="EndBoxText">
          每日任务
        </div>
        <div class="EndBoxStudy">
          <div v-for="(item, index) in Daily_task" class="task_line" :key="index" :style="{ 'background-color': item.color }">
            <text class="text">{{ item.name }}</text>
            <!--            <image :src="imgsrc[index]" mode="aspectFit|aspectFill|widthFix" = "Complete" id ="{{index}}" data-index='{{index}}'></image>-->
          </div>


          <!--          <div :class="EndBoxStudy+1" @click="EndBoxStudyF()" >学习三时</div>
          <div class="EndBoxStudy2">喝水八杯</div>
          <div class="EndBoxStudy3">运动一时</div>
          <div class="EndBoxStudy4">读书一时</div>
          <div class="EndBoxStudy5">听歌一时</div>
          <div class="EndBoxStudy6">早睡早起</div>-->
        </div>
      </div>
    </div>

    <div class="FootBox">
      <div class="underLine"></div>
      <div class="underWord">© 2021 Qzl</div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Progress from "easy-circular-progress";
import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      addclassname: '',
      addprocesses: '',
      addstartTime: '',
      addstudyTime: '',
      Study: [],
      processes: [],
      Progress,
      addShow: false,
      year: '',
      month: '',
      day: '',
      hour: '',
      count: 0,
      s: [1, 2, 3],
      TodayStudy: [],
      Daily_task: [{ name: "学习三时", color: "#74C1FF", imgsrc: "https://pic.imgdb.cn/item/61bca34f2ab3f51d919b2083.png" }
        , { name: "运动一时", color: "#FF7E7E", imgsrc: "https://pic.imgdb.cn/item/61bca34f2ab3f51d919b2083.png" }
        , { name: "早睡早起", color: "#BAA1ED", imgsrc: "https://pic.imgdb.cn/item/61bca34f2ab3f51d919b2083.png" }
        , { name: "读书一时", color: "#F47CA7", imgsrc: "https://pic.imgdb.cn/item/61bca34f2ab3f51d919b2083.png" }
        , { name: "听歌一时", color: "#3EC3BB", imgsrc: "https://pic.imgdb.cn/item/61bca34f2ab3f51d919b2083.png" }
        , { name: "喝水八杯", color: "#FDBA6D", imgsrc: "https://pic.imgdb.cn/item/61bca34f2ab3f51d919b2083.png" }
        , { name: "英语单词", color: "#FF8A8A", imgsrc: "https://pic.imgdb.cn/item/61bca34f2ab3f51d919b2083.png" }
        , { name: "操作代码", color: "#9E86D0", imgsrc: "https://pic.imgdb.cn/item/61bca34f2ab3f51d919b2083.png" }]
    }
  },
  mounted() {

  },
  methods: {
    PersonalCenter() {
      if (this.$store.state.username) {
        let fd = new FormData();
        fd.append("username", this.$store.state.username);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post("http://localhost:8089/study/PersonalCenter", fd, config).then(res => {
          alert(res.data.msg)
          console.log(res.data)
          if (res.data.msg === "个人信息查询成功") {
            this.$store.state.PersonalCenter = res.data.personalCenter
            this.$router.push({ path: '/PersonalCenter' })
          }
        }).catch(res => {
          console.log(res.data)
        })

      }
      else {
        alert("请先登录您的账号再进入个人中心")
      }
    },
    SignIn: function () {
      this.$router.push({ path: '/Login' })
    },
    SignUp: function () {
      this.$router.push({ path: '/SignUp' })
    },
    LoginOut: function () {
      this.$store.commit('logs/RESET_STATE');
      console.log(11)
      location.pathname = 'Home'
    },
    addUserStudy: function () {
      if (this.$store.state.username) {
        console.log("开始添加")
        this.addShow = true
      } else {
        alert("请先登录您的账号再进行添加学习记录")
      }
    },
    addClassInfo() {
      let fd = new FormData();
      fd.append("username", this.$store.state.username);
      fd.append("classname", this.addclassname);
      fd.append("processes", this.addprocesses);
      fd.append("startTime", this.addstartTime);
      fd.append("studyTime", this.addstudyTime);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post("http://localhost:8089/study/addUserStudy", fd, config).then(res => {
        console.log(res.data)
        if (res.data.msg === "添加成功") {
          alert(res.data.msg)
          this.addShow = false
        }
      }).catch(res => {
        console.log(res.data)
      }).then(axios.post("http://localhost:8089/study/home", fd, config).then(res => {
        /* console.log(res.data);*/

        if (res.data.userStudy.length > 5) {
          for (let i = 0; i < 4; i++) {
            this.Study[i] = res.data.userStudy[i];
            this.Study[i].startTime = res.data.userStudy[i].startTime.split('-')[0]
            this.processes[i] = res.data.userStudy[i].processes;
          }
        } else {
          for (let i = 0; i < res.data.userStudy.length; i++) {
            this.Study[i] = res.data.userStudy[i];
            this.Study[i].startTime = res.data.userStudy[i].startTime.split('-')[0]
            this.processes[i] = res.data.userStudy[i].processes;
          }
        }
        this.$store.state.Study = this.Study
        this.$store.state.processes = this.processes
      }).catch(res => {
        console.log(res.data)
      }))
    }

  },
  created() {

    const aData = new Date();
    if (this.$store.state.username) {
      this.LoginBT = false
    } else {
      this.LoginBT = true
    }
    if (this.$store.state.username && this.$store.state.Study.length !== 0) {
      this.Show = true
    } else {
      this.Show = false
    }
    this.value = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
    this.year = aData.getFullYear()
    this.month = aData.getMonth() / 12 * 100
    const BigMonth = [1, 3, 5, 7, 8, 10, 12]
    const SmallMonth = [4, 6, 9, 11]
    if (BigMonth.includes(aData.getMonth() + 1)) {
      this.day = aData.getDate() / 31 * 100
    } else {
      if (SmallMonth.includes(aData.getMonth() + 1)) {
        this.day = aData.getDate() / 30 * 100
      }
      if (aData.getMonth() === 2 && this.year % 4 === 0) {
        this.day = aData.getDate() / 29 * 100
      } else {
        this.day = aData.getDate() / 28 * 100
      }
    }

    this.hour = aData.getHours() / 24 * 100


    this.Study = this.$store.state.Study
    this.processes = this.$store.state.processes
    this.TodayStudy = this.$store.state.TodayStudy


  },
  /*updated() {
    let that=this;
    window.setInterval(() => {
      setTimeout(()=>{
        let Study = that.Study
        let processes = that.processes
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let fd = new FormData();
        fd.append("username","qzl");
        axios.post("/home", fd,config).then( res => {
          /!* console.log(res.data);*!/
          for (let i = 0; i < res.data.userStudy.length;i++){
            Study[i] = res.data.userStudy[i];
            Study[i].startTime = res.data.userStudy[i].startTime.split('-')[0]
            processes[i] = res.data.userStudy[i].processes;
          }

        }).catch( res => {
          console.log(res.data)
        })
      },0)
    }, 10000)
  }*/
}

</script>

<style>
.home {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  /*position: fixed;*/
}

.bg {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../../public/bg1.jpg") no-repeat;
  background-size: cover;
  transform: scale(1.01);
  filter: blur(5px);
  z-index: -999;
}

.head text {
  position: absolute;
  font-size: 36px;
  font-family: SF Pro Rounded, sans-serif;
  font-weight: bold;
  letter-spacing: 0.0825em;
  left: 156px;
  top: 34px;
  user-select: none;
}

.head {
  width: 100%;
  height: 110px;
}

.underLine1 {
  position: absolute;
  left: 162px;
  top: 80px;
  width: 50px;
  height: 1px;
  background: #000;
}

.underLine2 {
  position: absolute;
  left: 165px;
  top: 85px;
  width: 100px;
  height: 1px;
  background: #c0c0c0;
}

.home .navigation_bar {
  display: flex;
  position: absolute;
  width: 680px;
  height: 24px;
  left: 440px;
  top: 50px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.navigation_bar div {
  float: left;
  width: calc(25%);
  font-family: Alibaba, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 171% */
  /* Grayscale 900 Opacity/72% */
  color: rgba(25, 25, 25, 0.95);
  /* Inside Auto Layout */
  flex: none;
  order: 3;
  flex-grow: 0;
  user-select: none;
  cursor: pointer;
  letter-spacing: 0.0825em;
}

.SignBt {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  position: absolute;
  width: 206px;
  height: 40px;
  left: 1550px;
  top: 40px;
  user-select: none;
}

.SignBt .signIn {
  width: calc(50%);
  text-align: center;
  font-family: Poppins, system-ui;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */
  /* Grayscale / 900 */
  color: #000;
  cursor: pointer;
}

.SignBt .signUp {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(50%);
  height: calc(100%);
  text-align: center;
  font-family: Poppins, system-ui;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */
  /* Grayscale / 900 */
  color: #ffffff;
  background: #444BD3;
  border-radius: 6px;
  cursor: pointer;
}

.HeadImg {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  position: absolute;
  width: 80px;
  height: 80px;
  left: 1650px;
  border-radius: 50%;
  top: 40px;
  user-select: none;
  border: 4px solid silver;
}

.HeadImg text {
  position: relative;
  left: 80px;
  font-size: 24px;
  top: 0;
  font-family: Poppins, system-ui;
}

.HeadWord {
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 836px;
  height: 190px;
  top: 70px;
  /* Inside Auto Layout */
  order: 0;
  flex-grow: 0;
  margin: auto;
  font-family: Alibaba, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 56px;
  line-height: 120%;
  /* or 67px */
  text-align: center;
  /* Grayscale / 900 */
  color: #121127;
  letter-spacing: 0.2825em;
}

.HeadWord text {
  font-family: Poppins, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 180%;
  margin-left: -10px;
  /* identical to box height, or 36px */
  /* Grayscale 900 Opacity/72% */
  color: rgba(18, 17, 39, 0.72);
  margin-top: 10px;
  letter-spacing: 0.0825em;
}

.HomeBox {
  position: relative;
  width: 744px;
  height: 418px;
  margin: auto;
  top: 102px;
  background: url("../../public/bg1.jpg") no-repeat;
  filter: drop-shadow(0px 20px 80px rgba(0, 0, 0, 0.2));
  border-radius: 16px;
}

.HomeBox2 {
  position: absolute;
  width: 260px;
  height: 132px;
  bottom: -70px;
  right: -100px;
  background: url("../../public/bg1.jpg") no-repeat;
  background-size: cover;
  /* Custom Shadow */
  border-radius: 12px;
  box-shadow: 0 40px 80px -16px rgba(0, 0, 0, 0.08);
}

.BodyBox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  position: relative;
  top: 312px;
  width: 100%;
  height: 626px;
  /* Inside Auto Layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}


.BodyBox .BBHead {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 604px;
  height: 144px;
  left: 156px;
  /* Inside Auto Layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 24px 0;
  letter-spacing: 0.0825em;
}

.BodyBox .BBHead text {
  position: static;
  width: 76px;
  height: 24px;
  /* Overline / LG */
  font-family: Alibaba, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  /* identical to box height, or 24px */
  letter-spacing: 0.1825em;
  text-transform: uppercase;
  /* Indigo / 500 */
  color: #444BD3;
}

.BodyBox .BBHeadWord {
  position: absolute;
  width: 604px;
  height: 112px;
  left: 30px;
  top: 32px;
  /* Heading / 2 */
  font-family: Alibaba, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 140%;
  /* or 56px */
  /* Grayscale / 900 */
  color: #121127;
  flex: none;
  order: 1;
  letter-spacing: 0.1825em;
}

.StudyRate {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 322px;
  top: 208px;
  /* Inside Auto Layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 40px 0;
  text-align: center;
}

.StudyRateF {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 322px;
  top: 208px;
  font-size: 48px;
  font-family: Alibaba, system-ui;
  /* Inside Auto Layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  text-align: center;
}

.StudyRateF .WordTitle {
  position: absolute;
  width: 600px;
  user-select: none;
}

.StudyRateF .AddSR {
  position: absolute;
  width: 400px;
  top: 210px;
  font-size: 24px;
  font-family: Alibaba, system-ui;
  cursor: pointer;
  color: #d3d7d4;
}

.StudyRate .StudyBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 56px 24px;
  position: static;
  width: 264px;
  height: 322px;
  left: 0;
  top: 0;
  /* Black & White/White */
  background: #FFFFFF;
  /* Drop Shadow/High */

  box-shadow: 0 20px 50px rgba(18, 17, 39, 0.08);
  border-radius: 12px;
  /* Inside Auto Layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0 24px;
}

.StudyRate .StudyBox .StudyImg {
  position: absolute;
  top: 40px;
  width: 50px;
  height: 50px;
}

.StudyImg img {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.StudyRate .StudyBox .StudyClass {
  position: absolute;
  top: 110px;
  font-family: Poppins, sans-serif;
  font-size: 28px;
  letter-spacing: 0.0525em;
  user-select: none;
}

.StudyRate .StudyBox .StudyST {
  position: absolute;
  top: 170px;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0325em;
  user-select: none;
}

.StudyRate .StudyBox .StudyDT {
  position: absolute;
  top: 190px;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0325em;
  user-select: none;
}

.StudyRate .StudyBox .StudyPro {
  position: relative;
  top: 100px;
  width: 35px;
  height: 37px;
  font-family: Poppins, sans-serif;
  font-size: 28px;
  user-select: none;
}

.StudyRate .StudyBox .StudyPro .processes {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100px;
  height: 20px;
  color: white;
  border-radius: 20px;
  background: #6cd6da;
  font-size: 14px;
  position: relative;
  top: 30px;
  left: -32px;
  box-shadow: 0 4px 4px rgba(18, 17, 39, 0.32);
}

.progress_out {
  display: inline-block;
  width: 390%;
  height: 5px;
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 0;
  left: -50px;
  margin-right: 10px;
  box-shadow: 0 4px 3px rgba(18, 17, 39, 0.12);
}

.progress_in {
  display: inline-block;
  height: 5px;
  border-radius: 2px;
  background: center right;
  position: absolute;
  top: 0;
  left: 0;
}

.BodyBoxT {
  position: relative;
  top: 382px;
  width: 100%;
  height: 526px;
}


.BodyBoxT .BBHead {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 604px;
  height: 144px;
  left: 156px;
  /* Inside Auto Layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 24px 0;
  letter-spacing: 0.0825em;
}

.BodyBoxT .BBHead text {
  position: static;
  width: 76px;
  height: 24px;
  /* Overline / LG */
  font-family: Alibaba, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  /* identical to box height, or 24px */
  letter-spacing: 0.1825em;
  text-transform: uppercase;
  /* Indigo / 500 */
  color: #444BD3;
}

.BodyBoxT .BBHeadWord {
  position: absolute;
  width: 604px;
  height: 112px;
  left: 30px;
  top: 32px;
  /* Heading / 2 */
  font-family: Alibaba, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 140%;
  /* or 56px */
  /* Grayscale / 900 */
  color: #121127;
  flex: none;
  order: 1;
  letter-spacing: 0.1825em;
}

.TimeProcess {
  position: absolute;
  width: 456px;
  height: 284px;
  left: 230px;
  top: 220px;
  background: #FFFFFF;
  box-shadow: 0 7px 30px rgba(18, 17, 39, 0.12);
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.TimeProcess .Garden {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 230px;
  right: -20px;
  border-radius: 50%;
  background-image: linear-gradient(#A9F99E, #46ADD5);
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.22);
}

.TimeProcess .Month {
  width: 50%;
  position: absolute;
  top: 40px;
  left: 170px;
}

.TimeProcess text {
  position: relative;
  top: -9px;
  left: -80px;

}

.TimeProcess .Day {
  width: 50%;
  position: absolute;
  top: 80px;
  left: 170px;
}

.TimeProcess .Hours {
  width: 50%;
  position: absolute;
  top: 120px;
  left: 170px;
}

.TimeProcess .Body {
  width: 50%;
  position: absolute;
  top: 160px;
  left: 170px;
}

.TimeProcess .Wisdom {
  width: 50%;
  position: absolute;
  top: 200px;
  left: 170px;
}

.TimeProcess .Strength {
  width: 50%;
  position: absolute;
  top: 240px;
  left: 170px;
}

.TimeProcess .progress_out {
  display: inline-block;
  width: 100%;
  height: 5px;
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 0;
  left: -50px;
  margin-right: 10px;
  box-shadow: 0 4px 3px rgba(18, 17, 39, 0.12);

}

.TimeProcess .progress_in {
  display: inline-block;
  height: 5px;
  border-radius: 2px;
  background: center right;
  position: absolute;
  top: 0;
  left: 0;
  background: #2c6fdb;
}

@keyframes progressAnimationStrike {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

.FinBox {
  width: 400px;
  height: 486px;
  position: absolute;
  left: 780px;
  top: 80px;
  background: #FFFFFF;
  box-shadow: 0 7px 30px rgba(18, 17, 39, 0.12);
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  display: flex;

  user-select: none;
}

.FinBox .Garden {
  width: 200px;
  height: 200px;
  position: absolute;
  top: -80px;
  left: -90px;
  border-radius: 50%;
  background-image: linear-gradient(135deg, #9FA5D5, #E8F5C8);
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.12);
  opacity: 0.85;
}

.FinBox .Garden2 {
  width: 40px;
  height: 40px;
  position: absolute;
  top: -60px;
  left: 100px;
  border-radius: 50%;
  background-image: linear-gradient(54deg, #9FA5D5, #E8F5C8);
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.22);
}

.FinBox .Garden3 {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  left: 115px;
  border-radius: 50%;
  background-image: linear-gradient(#9FA5D5, #E8F5C8);
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.22);
}

.FinBox .FinBoxText {
  position: absolute;
  top: 60px;
  font-family: Alibaba, sans-serif;
  font-size: 28px;
  letter-spacing: 0.0825em;
  color: silver;
}

.FinBox .FinBoxStudy {
  position: absolute;
  top: 120px;
  width: 200px;
  height: 350px;
}

.FinBox .FinBoxStudy .FinBoxStudyItem {
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.22);
  letter-spacing: 0.0325em;
  color: white;
  text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  background-color: #9FA5D5;
  background-image: linear-gradient(90deg, #9FA5D5 3%, #E8F5C8 73%);
  width: 100%;
  height: 40px;
  display: flex;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  position: static;

  font-family: Poppins, sans-serif;
  font-size: 20px;
  font-weight: bold;
  border-radius: 12px;
}

.FinBoxStudyItem img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  left: 20px;
}

.EndBox {
  width: 380px;
  height: 380px;
  position: absolute;
  box-shadow: 0 7px 30px rgba(18, 17, 39, 0.12);
  left: 1270px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  display: flex;
  user-select: none;

}

.EndBox .Garden {
  width: 120px;
  height: 120px;
  position: absolute;
  top: -30px;
  right: -30px;
  border-radius: 50%;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.22);
}

.EndBox .Garden1 {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 50%;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.22);
}

.EndBox .Garden2 {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 4px;
  left: 4px;
  border-radius: 50%;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.22);
}

.EndBox .Garden3 {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 4px;
  right: 4px;
  border-radius: 50%;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -8px 7px 20px rgba(18, 17, 39, 0.22);
  transition: ease 1s;
}

.EndBox .EndBoxText {
  position: absolute;
  top: 30px;
  font-family: Alibaba, sans-serif;
  font-size: 28px;
  letter-spacing: 0.0825em;
  color: silver;
}

.EndBox .EndBoxStudy {
  width: 300px;
  height: 280px;
  position: absolute;
  top: 80px;
}

/*

.EndBox .EndBoxStudy .EndBoxStudy1{
  color: white;text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  font-weight: normal;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0825em;
  width: 100px;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 30px;
  top:40px;
  border-radius: 12px; background-color: #A9C9FF;
  background-image: linear-gradient(270deg, #A9C9FF 0%, #FFBBEC 100%);
  opacity: 0.95;
  box-shadow: -4px 3px 10px rgba(18, 17, 39, 0.22);
  transition: ease 2s ;
}

.EndBox .EndBoxStudy .EndBox1{
  color: white;text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  font-weight: normal;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0825em;
  width: 100px;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 30px;
  top:40px;
  border-radius: 12px;
  opacity: 0.95;
  box-shadow: -4px 3px 10px rgba(18, 17, 39, 0.22);
  background-color: #FBDA61;
  background-image: linear-gradient(225deg, #FBDA61 0%, #FF5ACD 100%);
  transition: ease 2s ;
}
.EndBox .EndBoxStudy .EndBoxStudy2{
  color: white;text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  font-weight: normal;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0825em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -4px 3px 10px rgba(18, 17, 39, 0.22);
  position: absolute;
  top:40px;
  right: 30px;
}
.EndBox .EndBoxStudy .EndBoxStudy3{
  color: white;text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  font-weight: normal;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0825em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -4px 3px 10px rgba(18, 17, 39, 0.22);
  position: absolute;
  left: 30px;
  top:110px;
}
.EndBox .EndBoxStudy .EndBoxStudy4{
  color: white;text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  font-weight: normal;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0825em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -4px 3px 10px rgba(18, 17, 39, 0.22);
  position: absolute;
  top:110px;
  right: 30px;
}
.EndBox .EndBoxStudy .EndBoxStudy5{
  color: white;text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  font-weight: normal;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0825em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -4px 3px 10px rgba(18, 17, 39, 0.22);
  position: absolute;
  left: 30px;
  top:180px;
}
.EndBox .EndBoxStudy .EndBoxStudy6{
  color: white;text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  font-weight: normal;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0825em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-image: linear-gradient(#FD9869, #FEC9C9);
  box-shadow: -4px 3px 10px rgba(18, 17, 39, 0.22);
  position: absolute;
  top:180px;
  right: 30px;
}
*/

.task_line {
  color: white;
  text-shadow: rgba(0, 0, 0, 0.59) 1px 2px 3px;
  font-weight: normal;
  font-family: Alibaba, sans-serif;
  font-size: 14px;
  letter-spacing: 0.0825em;
  display: flex;
  float: left;
  margin-top: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 130px;
  margin-left: 20px;
  left: -10px;
  height: 50px;
  border-radius: 12px;
  box-shadow: -4px 3px 10px rgba(18, 17, 39, 0.22);
}

.task_line .text {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.task_line img {
  position: absolute;
  width: 18px;
  height: 18px;
  right: 12px;
  z-index: 999;
}

.FootBox {
  position: relative;
  width: 100%;
  height: 20px;
  top: 490px;
}

.FootBox .underLine {
  position: relative;
  margin: auto;
  width: 200px;
  height: 1px;
  border-bottom: 1px solid silver;
}

.FootBox .underWord {
  position: relative;
  margin: auto;
  text-align: center;
  width: 200px;
  height: 1px;
  color: silver;
}

.addBoxBig {
  position: relative;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.addBox {
  width: 450px;
  height: 440px;
  background: #fff;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

}

.addBox text {
  font-size: 18px;
  font-family: Georgia, serif;
  font-style: normal;
  font-weight: bold;
}

.addBox .input-data {
  position: relative;
  top: 20px;
  width: 100%;
  height: 40px;
  margin-top: 40px;
}

.addBox .input-data input {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  border-bottom: 2px solid #c0c0c0;
}

/*输入框获取焦点的时候*/
.addBox .input-data input:focus~label,
/*输入值合法的时候*/
.addBox .input-data input:valid~label {
  transform: translateY(-25px);
  font-size: 14px;
  color: #2c6fdb;
}

.addBox .input-data label {
  position: absolute;
  bottom: 10px;
  left: 0;
  color: #808080;
  pointer-events: none;
  transition: all 0.3s ease;
}

.addBox .input-data .underline {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: #2c6fdb;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.addBox .input-data input:focus~.underline,
.addBox .input-data input:valid~.underline {
  transform: scaleX(1);
}

.addBox button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 62px;
  height: 48px;
  background: #F5F5FA;
  /* Shadow 3 */
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5), 5px 5px 10px rgba(170, 170, 204, 0.25), 10px 10px 20px rgba(170, 170, 204, 0.5), -10px -10px 20px #FFFFFF;
  border-radius: 12px;
  font-size: 12px;
  color: #7878AB;
  font-family: SF Pro Rounded, sans-serif;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0.0825em;
}</style>
