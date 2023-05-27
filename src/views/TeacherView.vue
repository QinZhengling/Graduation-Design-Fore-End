<template>
    <div class="body">
        <div class="bodyBox">
            <text class="Title">Teacher Home</text>
            <div class="navbar">
                <ul>
                    <li v-for="(item, index) in menuItems" :key="index" @click="activeIndex = index"
                        :style="{ color: activeIndex === index ? '#5A67D2' : '' }">
                        {{ item }}
                        <span :class="activeIndex == index ? 'active' + index : 'active'"></span>
                    </li>
                </ul>
                <img src="../../public/img/CQUST.svg" alt="重庆科技学院">
            </div>
            <div class="content">
                <transition name="fade">
                    <div v-show="activeIndex === 0" class="PersonalInfo">
                        <div class="Bg">
                            <div class="bg_0"></div>
                            <text class="word" selectable="false" space="false" decode="false">
                                welcome to<br />
                                Innovative credit<br />
                                recognition system<br />
                            </text>
                        </div>
                        <div class="TeacherInfo">
                            <div class="card">
                                <div class="card-border-top">
                                </div>
                                <div class="img" :style="{
                                    'background-image': 'url(' + teacherInfo.teacherImgurl + ')'
                                }">
                                </div>
                                <span> {{ teacherInfo.teacherName }}</span>
                                <span> {{ teacherInfo.teacherCollege }}</span>
                                <p class="job"> {{ teacherInfo.teacherId }}</p>
                            </div>
                            <img src="../../public/img/Teacher2.png" alt="" class="t2">
                        </div>
                        <div class="classList" ref="classList">
                            <div class="card1 work" v-for="(item) in banjiVoList" :key="item.id">
                                <div class="img-section">
                                    <img src="../../public/img/Background_2.svg" alt="" class="img-section_1">
                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" height="77" width="76">
                                        <path fill-rule="nonzero" fill="#640a886b"
                                            d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z">
                                        </path>
                                    </svg> -->
                                </div>
                                <div class="card1-desc">
                                    <div class="card1-header">
                                        <div class="card1-title">{{ item.className }}</div>

                                        <div class="card1-menu">
                                            <div class="dot"></div>
                                            <div class="dot"></div>
                                            <div class="dot"></div>
                                        </div>
                                    </div>
                                    <div class="card1-time">{{ item.classSize }}人</div>
                                    <p class="recent">{{ item.grade }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="activeIndex === 1" class="StudentInfoList">
                        <div class="List" v-for="(list, index) in banjiVoList" :key="index">
                            <text class="class_name" selectable="false" space="false" decode="false">
                                {{ list.className }}
                            </text>
                            <div class="List_stu" :ref="'stu_list_' + index" @wheel.prevent="handleScroll">
                                <div v-for="(student, studentIndex) in StudentList[index]" :key="studentIndex"
                                    class="student">
                                    <label class="avatar" :style="{
                                        'background-image': 'url(' + student.studentImage + ')'
                                    }"></label>
                                    <label class="info">
                                        <span class="info-1">{{ student.studentName }}</span>
                                        <span class="info-2">{{ student.living }}</span>
                                    </label>
                                    <div class="content-1">已认定的学分:{{ student.recognizedCredits }}</div>
                                    <div class="content-2">{{ student.studentId }}</div>
                                    <div class="checkbox" title="是否选为认定小组成员">
                                        <input type="checkbox" :id="'_checkbox' + student.studentId" class="_checkbox"
                                            v-model="student.group1" :checked=student.group1
                                            @click="checkedStu(index, studentIndex, list.className, student.studentId, student.group1)">
                                        <label :for="'_checkbox' + student.studentId">
                                            <div id="tick_mark"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="activeIndex === 2" class="StudentCredit">
                        <div class="List" v-for="(list, index) in banjiVoList" :key="index">
                            <text class="class_name" selectable="false" space="false" decode="false">
                                {{ list.className }}
                            </text>
                            <div class="List_stu" :ref="'stu_list_' + index" @wheel.prevent="handleScroll">
                                <div v-for="(student, Index) in supp[index]" :key="Index" class="student">
                                    <label class="avatar" :style="{
                                        'background-image': 'url(' + student.materialAddress + ')'
                                    }" @click="viewImage(student.materialAddress)"></label>
                                    <label class="info">
                                        <span class="info-1">{{ student.studentName }}</span>
                                    </label>
                                    <div class="Name" :title=student.competition>
                                        {{ student.competition }}
                                    </div>
                                    <div class="level0">
                                        {{ student.level0 }}
                                    </div>
                                    <div class="level">
                                        {{ student.competitionState }}
                                    </div>
                                    <div class="credit">
                                        <div>{{ student.recognizedCredits }}<text>学分</text></div>
                                    </div>
                                    <span class="Studnetcontent">{{ student.content }}</span>
                                    <div class="state">
                                        {{ student.state }}
                                    </div>
                                    <div class="time">
                                        {{ student.time }}</div>
                                    <div class="content-2">{{ student.studentId }}</div>
                                    <div class="checkbox" title="是否确认审核" v-show="student.state == '小组审核完成' ? true : false">
                                        <input type="checkbox" :id="'checkbox_' + student.id" class="checkbox_"
                                            v-model="student.checked"
                                            @click="agreeStu(student.studentId, student.id, student.checked)">
                                        <label :for="'checkbox_' + student.id">
                                            <div id="tick_mark"></div>
                                        </label>
                                    </div>
                                    <button @click="noAgree(student.studentId, student.id)"
                                        v-show="student.state == '班级审核完成' || student.state == '认定完成' ? false : true">
                                        <span class="shadow"></span>
                                        <span class="edge"></span>
                                        <span class="front text">退回认定
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="activeIndex === 3">
                        <div>
                            <div id='showorders'
                                style="width: 600px; height: 700px;position: absolute;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                left: 100px;top: 150px;"
                                @click="changeClass()"></div>
                            <div id="showChart"
                                style="width: 800px; height: 500px;position: absolute;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    right: 100px;top: 150px;">
                            </div>
                            <div @click="downloadExcel()">
                                <button class="downLoad">
                                    <span>导出班级明细表</span>
                                </button>
                            </div>
                            <div @click="downloadExcel2()">
                                <button class="downLoad2">
                                    <span>导出班级汇总表</span>
                                </button>
                            </div>
                            <div @click="downloadExcel3()">
                                <button class="downLoad3">
                                    <span>导出班级学生学分表</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script >

import * as echarts from 'echarts';
import { ref, onMounted } from "vue";
import axios from "axios";
import { ElDescriptionsItem } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
onMounted(
    () => {
        init()
    }
)
export default {
    name: "TeachertView",
    components: {
    },
    data() {
        return {
            selectedNum: 0,
            activeIndex: 0, // 当前选中的菜单项
            menuItems: ['个人信息', '学生信息', '学分审核', '学分详情'], // 菜单项列表
            atvieCls: 'active0',
            activeColor: -1,
            list: [],
            teacherInfo: {},
            banjiVoList: [],
            imgUrl: "https://img0.baidu.com/it/u=4060770951,4069855872&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            StudentList: [],
            supp: [],
            count: 0
        }
    },
    methods: {
        changeClass() {
            var chart = echarts.init(document.getElementById('showorders'));
            // 获取ECharts配置项
            var option = chart.getOption();
            // 获取标题
            var titleText = option.title[0].text;
            console.log(titleText);
            let classId;
            if (this.count < this.banjiVoList.length - 1) {
                this.count++;
                classId = this.banjiVoList[this.count].className
                axios.get("/Teacher/TeacherLookStudentByClass", {
                    params: {
                        classId: classId
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    console.log(res.data.Class);
                    let list = res.data.Class
                    // console.log(classId);
                    this.showorders(classId, list)
                })
            }
            else {
                this.count = 0
                classId = this.banjiVoList[this.count].className
                axios.get("/Teacher/TeacherLookStudentByClass", {
                    params: {
                        classId: classId
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    console.log(res.data.Class);
                    let list = res.data.Class
                    // console.log(classId);
                    this.showorders(classId, list)
                })
            }
        },
        downloadExcel() {
            let promiseArr = this.banjiVoList.map(element => {
                // console.log(element.className);
                return axios({
                    url: '/Teacher/downloadExcel',
                    method: 'GET',
                    responseType: 'blob',
                    params: {
                        classId: element.className // 传入classId
                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    let Ed = []
                    Ed.push(url)
                    Ed.push(element.className)
                    // console.log(Ed);
                    return Ed
                })
            });
            Promise.all(promiseArr).then(Ed => {
                for (let i = 0; i < Ed.length; i++) {
                    const link = document.createElement('a')
                    link.href = Ed[i][0]
                    // console.log(Ed[i][0]);
                    // console.log(Ed[i][1]);
                    link.setAttribute('download', Ed[i][1] + '班级明细表.xlsx')
                    document.body.appendChild(link)
                    link.click()
                }
            }).catch(error => {
                console.log(error);
            });
        },
        downloadExcel2() {
            let promiseArr = this.banjiVoList.map(element => {
                // console.log(element.className);
                return axios({
                    url: '/Teacher/downloadExcel2',
                    method: 'GET',
                    responseType: 'blob',
                    params: {
                        classId: element.className // 传入classId
                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    let Ed = []
                    Ed.push(url)
                    Ed.push(element.className)
                    // console.log(Ed);
                    return Ed
                })
            });
            Promise.all(promiseArr).then(Ed => {
                for (let i = 0; i < Ed.length; i++) {
                    const link = document.createElement('a')
                    link.href = Ed[i][0]
                    // console.log(Ed[i][0]);
                    // console.log(Ed[i][1]);
                    link.setAttribute('download', Ed[i][1] + '班级汇总表.xlsx')
                    document.body.appendChild(link)
                    link.click()
                }
            }).catch(error => {
                console.log(error);
            });
        },
        downloadExcel3() {
            let promiseArr = this.banjiVoList.map(element => {
                // console.log(element.className);
                return axios({
                    url: '/Teacher/downloadExcel3',
                    method: 'GET',
                    responseType: 'blob',
                    params: {
                        classId: element.className // 传入classId
                    }
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    let Ed = []
                    Ed.push(url)
                    Ed.push(element.className)
                    // console.log(Ed);
                    return Ed
                })
            });
            Promise.all(promiseArr).then(Ed => {
                for (let i = 0; i < Ed.length; i++) {
                    const link = document.createElement('a')
                    link.href = Ed[i][0]
                    // console.log(Ed[i][0]);
                    // console.log(Ed[i][1]);
                    link.setAttribute('download', Ed[i][1] + '班级学生学分表.xlsx')
                    document.body.appendChild(link)
                    link.click()
                }
            }).catch(error => {
                console.log(error);
            });
        },
        showorders(classId, studentList) {
            var chartDom = document.getElementById('showorders');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                title: {
                    text: classId + '班级学分情况',
                    subtext: '学分统计(点击切换班级)',
                    left: 'center',
                    triggerEvent: true
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right'
                },
                color: ["#9297C8", "#B6C796", "#BAD7DF"
                    , "#F6C1A7", "#EE7036", "#FFE2E2"],
                series: [
                    {
                        name: '班级学分情况',
                        type: 'pie',
                        radius: '50%',
                        data: studentList,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        showChart(list) {
            var chartDom = document.getElementById('showChart');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    text: '班级学分情况对比',
                    top: 20
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                },
                legend: {},
                color: ["#F6C1A7", "#EE7036", "#FFE2E2"],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                xAxis: {
                    type: 'category',
                    data: ['认定学分不足2分', '2<=学分<4', '4<=学分<6', '6<=学分<8', '8<=学分<10', '10<=学分']
                },
                series: list
            };

            option && myChart.setOption(option);

        },
        viewImage(materialAddress) {
            // this.$router.push({ name: 'image-viewer', params: { id: materialAddress } })
            // this.$router.push('/image-viewer?id=' + materialAddress, '_blank')
            window.open(this.$router.resolve({ name: 'image-viewer', params: { id: materialAddress } }).href, '_blank')
        },
        handleScroll(e) {
            e.preventDefault();
            let dundong = e.deltaY;
            let element = e.currentTarget;
            element.scrollLeft += dundong;
        },
        checkedStu(index, id, classname, studentId, checked) {
            // console.log(this.StudentList[index][id]);
            // console.log(checked);
            // console.log(!checked);
            let Ed = new FormData();
            Ed.append("studentId", studentId);
            Ed.append("grouped", !checked);
            Ed.append("className", classname);
            // console.log(classname);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('/Teacher/updateGroup', Ed, config).then(response => {
                if (response.data.result == "人数已经达到6人") {
                    this.$message({
                        message: response.data.result + "，无法继续添加",
                        type: 'error'
                    })
                    this.StudentList[index][id].group1 = false;
                }
                else {
                    this.$message({
                        message: response.data.result,
                        type: 'success'
                    })
                }
                // console.log(response.data);
            })
                .catch(error => {
                    console.log(error);
                });
            // axios.post("/progress", Ed, config)
        },
        agreeStu(studentId, id, checked) {
            if (!checked) {
                this.lication(studentId, id);
            }
        },
        lication(studentId, id) {
            console.log(studentId);
            console.log(id);
            let Ed = new FormData();
            Ed.append("studentId", studentId);
            Ed.append("id", id);
            axios.post('/Teacher/UpdateState', Ed, {
                'Content-Type': 'multipart/form-data'
            }).then(response => {
                console.log(response);
                // location.reload();
            })
        },
        noAgree(studentId, id) {
            ElMessageBox.prompt('请输入退回理由', '提示', {
                confirmButtonText: '确认退回',
                cancelButtonText: '取消',
                // inputPattern:
                //     /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                // inputErrorMessage: 'Invalid Email',
            })
                .then(({ value }) => {
                    this.rejectApplication(studentId, id, value);
                    // ElMessage({
                    //     type: 'success',
                    //     message: `Your email is: ${value}`,
                    // });
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消',
                    });
                });
            // if (confirm("确定要退回" + studentId + "的这一个认定申请吗？")) {
            //     // 用户点击了确定按钮，执行退回操作
            //     this.rejectApplication(studentId, id);
            // }
        },
        rejectApplication(studentId, id, value) {
            let Ed = new FormData();
            Ed.append("studentId", studentId);
            Ed.append("id", id);
            Ed.append("content", value)
            // 发送请求，将该学生的认定申请状态改为退回
            // ...
            axios.post('/Teacher/updateCreditStatus', Ed, {
                'Content-Type': 'multipart/form-data'
            }).then(res => {
                this.$message({
                    message: '已退回认定申请',
                    type: 'success'
                })
                location.reload();
            }).catch(err => {
                console.log(err)
            })
        }
    },
    beforeCreate() {
        sessionStorage.setItem("activeIndex", 0)
    },
    mounted() {
        this.teacherInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        console.log(this.teacherInfo);
        axios.get("/Teacher/TeacherLookClassBy", {
            params: {
                teacherId: this.teacherInfo.teacherId
            }
        }, {
            'Content-Type': 'application/x-www-form-urlencoded'
        }).then(res => {
            console.log(res.data.Class);
            this.showChart(res.data.Class)
        })
        this.$refs.classList.addEventListener('wheel', (e) => {
            // console.log(this.$refs.classList.scrollLeft);
            let dundong = -e.wheelDelta;
            this.$refs.classList.scrollLeft = this.$refs.classList.scrollLeft + dundong;
            e.returnValue = false;
        });

        // console.log(this.teacherInfo);
        // console.log(this.teacherInfo.teacherId);
        axios.get("/Teacher/TeacherInfo", {
            params: {
                teacherID: this.teacherInfo.teacherId
            }
        }, {
            'Content-Type': 'application/x-www-form-urlencoded'
        }).then(res => {
            // console.log(res.data)
            this.banjiVoList = res.data.banjiVoList
            let classId = this.banjiVoList[0].className
            this.count = 0
            axios.get("/Teacher/TeacherLookStudentByClass", {
                params: {
                    classId: classId
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                // console.log(res.data.Class);
                let list = res.data.Class
                // console.log(classId);
                this.showorders(classId, list)
            })

            let promiseArr1 = res.data.banjiVoList.map(element => {
                // console.log(element.className);
                return axios.get("/Teacher/TeacherStudentInfo", {
                    params: {
                        classID: element.className
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(su => {
                    return su.data.teacherFindStudentInfos;
                })
            });
            let promiseArr2 = res.data.banjiVoList.map(element => {
                // console.log(element.className);
                return axios.get("/Teacher/TeacherStudentInfo", {
                    params: {
                        classID: element.className
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(su => {
                    return su.data.supportingmaterials;
                })
            });
            Promise.all(promiseArr1).then(studentLists => {
                this.StudentList = studentLists
                // console.log(studentLists);
                // for (let i = 0; i < studentLists.length(); i++) {
                //     this.StudentList[i].checked = this.StudentList.group1
                // }
                // console.log(studentLists);
            }).catch(error => {
                console.log(error);
            });
            Promise.all(promiseArr2).then(supportingmaterials => {
                this.supp = supportingmaterials
                // console.log(supportingmaterials);
            }).catch(error => {
                console.log(error);
            });
        })

    },
    updated() {

    }
}
</script>

<style scoped>
.body {
    padding: 0;
    margin: 0;
    background-color: #E9ECF7;
}

.body .bodyBox {
    position: relative;
    margin: auto;
    top: 50px;
    background-image: linear-gradient(to bottom right, rgb(255, 255, 255), rgb(197, 201, 226));

    width: 1680px;
    height: 860px;
    border-radius: 26px;
    /* 
    box-shadow: 15px 15px 30px #bebebe,
        -15px -15px 30px rgba(212, 216, 228, 0.6); */
    box-shadow: 2px 2px 8px 8px rgba(212, 216, 228, 0.6);
    overflow-y: auto;
    overflow-x: hidden;
}

.Title {
    position: absolute;
    font-family: "阿里巴巴普惠体 2.0 65 Medium";
    font-weight: 600;
    font-size: 40px;
    top: 30px;
    left: 40px;
    background: linear-gradient(to bottom right, rgb(143, 132, 237), rgb(167, 70, 211));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 60px;
    top: 20px;
}

.navbar img {
    width: 100px;
    position: absolute;
    right: 30px;
}

ul {
    position: absolute;
    width: 100%;
    height: 60px;
    display: flex;
    list-style: none;
    padding: 0;
}

li {
    position: relative;
    padding: 30px;
    cursor: pointer;
    font-family: "阿里巴巴普惠体 2.0 65 Medium";
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    left: 1000px;
    justify-content: center;
    font-size: 18px;
    user-select: none;
}


@property --activeUnder {
    syntax: '<length>';
    initial-value: 0;
    inherits: false;
}

.active {
    position: absolute;
    width: var(--activeUnder);
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #fff;
    border-radius: 5px 5px 0 0;
}

.active0 {
    position: absolute;
    --activeUnder: 60px;
    width: var(--activeUnder);
    bottom: 0;
    height: 2px;
    background-color: #5A67D2;
    border-radius: 20px;
    transition: --activeUnder .3s;
}

.active1 {
    position: absolute;
    --activeUnder: 60px;
    width: var(--activeUnder);
    bottom: 0;
    height: 2px;
    background-color: #5A67D2;
    border-radius: 20px;
    transition: --activeUnder .3s;
}

.active2 {
    position: absolute;
    --activeUnder: 60px;
    width: var(--activeUnder);
    bottom: 0;
    height: 2px;
    background-color: #5A67D2;
    border-radius: 20px;
    transition: --activeUnder .3s;
}

.active3 {
    position: absolute;
    --activeUnder: 60px;
    width: var(--activeUnder);
    bottom: 0;
    height: 2px;
    background-color: #5A67D2;
    border-radius: 20px;
    transition: --activeUnder .3s;
}


::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}

.content {
    width: 100%;
    height: 670px;
    /* border: 1px solid; */
    margin-top: 100px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.StudentInfoList {
    position: relative;
    margin: auto;
    width: 98%;
    height: 1000px;
    /* border: 1px solid; */
}

.content .PersonalInfo {
    width: 100%;
    height: auto;
    position: absolute;
    display: flex;
    justify-content: center;
}

.Bg {
    position: absolute;
    width: 40%;
    height: 400px;
    top: 20px;
    left: 120px;
    background-image: linear-gradient(to bottom right, rgb(143, 132, 237), rgb(167, 70, 211));
    box-shadow: 5px 15px 30px rgba(167, 70, 211, 0.5);
    border-radius: 20px 80px 20px;
}

.Bg .bg_0 {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgb(229, 227, 241);
    border-radius: 50%;
    right: 30px;
    top: 30px;
    box-shadow: inset 5px 5px 10px rgba(154, 102, 224, 0.6);
    ;
}

.Bg .word {
    position: absolute;
    user-select: none;
    width: 100%;
    height: 258px;
    font-family: "Poppins";
    font-style: italic;
    top: 60px;
    left: 40px;
    font-weight: 600;
    font-size: 60px;
    line-height: 90px;
    z-index: 0;
    word-wrap: break-word;
    text-align: left;
    /* or 86px */
    color: #ffffff;
    /* border: 1px solid red; */
    text-shadow: 2px 2px 2px #640a886b;
}



.TeacherInfo {
    position: absolute;
    width: 40%;
    height: 400px;
    top: 20px;
    right: 180px;
    background-image: linear-gradient(to bottom right, rgb(143, 132, 237), rgb(167, 70, 211));
    box-shadow: 5px 15px 30px rgba(167, 70, 211, 0.5);
    border-radius: 20px 80px 20px;
    /*, 
        -15px -15px 30px rgba(212, 216, 228, 0.6); */
}

.TeacherInfo .t2 {
    position: absolute;
    left: 330px;
    top: 0px;
    width: 70%;
    z-index: 1;
}


.card {
    position: absolute;
    font-family: "阿里巴巴普惠体 2.0 65 Medium";
    top: 50px;
    left: 100px;
    width: 240px;
    height: 304px;
    border-radius: 15px;
    /* background-image: linear-gradient(to bottom right, rgb(143, 132, 237), rgb(167, 70, 211)); */
    box-shadow: 0px -20px 20px 0px #640a886b;
    transition: all 0.5s;
}



.card .card-border-top {
    width: 60%;
    height: 3%;
    background: rgb(255, 255, 255);
    margin: auto;
    border-radius: 0px 0px 15px 15px;
}

.card span {
    font-weight: 600;
    color: white;
    text-align: center;
    display: block;
    font-size: 18px;
    position: relative;
    top: 20px;
    margin-top: 5px;
}

.card .job {
    font-weight: 400;
    font-family: "Poppins";
    color: white;
    display: block;
    text-align: center;
    margin-top: 25px;
    font-size: 18px;

}

.card .img {
    width: 150px;
    height: 160px;
    background: #6b64f3;
    border-radius: 15px;
    margin: auto;
    margin-top: 25px;
    background-repeat: no-repeat;
    background-size: cover;
}

.card1 {
    --primary-clr: linear-gradient(to top left, rgb(143, 132, 237), rgb(167, 70, 211));
    ;
    --dot-clr: #BBC0FF;
    --play: rgb(143, 105, 237);
    width: 200px;
    height: 170px;
    border-radius: 10px;
    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    user-select: none;
    flex-direction: row;
    flex-wrap: wrap;
    flex-shrink: 0;
    left: 100px;
    margin-left: 50px;
    margin-right: 50px;
}

.card1 {
    font-family: "Poppins";
    color: #fff;
    display: grid;
    cursor: pointer;
    grid-template-rows: 50px 1fr;
}

.card1:hover .img-section {
    transform: translateY(-15px);
}

.img-section .img-section_1 {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    transform: rotateZ(20deg);
}

.card1-desc {
    border-radius: 7px;
    padding: 15px;
    position: relative;
    top: -10px;
    gap: 10px;
    background: var(--primary-clr);
}

.card1-time {
    font-size: 1.7em;
    font-weight: 600;
    letter-spacing: 5px;
}

.img-section {
    transition: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    background: hsl(0, 0%, 100%);
    position: relative;
    top: 10px;
}

.card1-header {
    display: flex;
    align-items: center;
    width: 100%;
}

.card1-title {
    flex: 1;
    font-size: 0.9em;
    font-weight: 500;
}

.card1-menu {
    display: flex;
    gap: 4px;
    margin-inline: auto;
}

.card1 svg {
    float: right;
    max-width: 100%;
    max-height: 100%;
}

.card1 .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--dot-clr);
}

.card1 .recent {
    line-height: 0;
    font-size: 0.8em;
    letter-spacing: 3px;
    padding-left: 3px;
}

.classList {
    width: 100%;
    height: 180px;
    position: absolute;
    /* border: 1px solid red; */
    display: flex;
    /* justify-content: center; */
    align-items: center;
    user-select: none;
    overflow: hidden;
    top: 480px;
}

.StudentInfoList .List {
    width: 100%;
    height: 220px;
    position: relative;
    /* border: 1px solid red; */
    display: flex;
    /* justify-content: center; */
    align-items: center;
    user-select: none;
    overflow-x: hidden;
    margin-top: 20px;
    border-radius: 16px;
    background-image: linear-gradient(to bottom right, rgba(143, 132, 237, 0.5), rgba(167, 70, 211, 0.5));
}

.StudentInfoList .List .class_name {
    position: relative;
    width: 150px;
    font-size: 22px;
    left: 22px;
    font-family: 'Poppins';
    font-weight: normal;
    color: #ffffff;
}

.StudentInfoList .List_stu {
    width: 100%;
    height: 100%;
    position: relative;
    /* border: 1px solid red; */
    display: flex;
    /* justify-content: center; */
    align-items: center;
    user-select: none;
    overflow-x: hidden;
}

.StudentInfoList .List .student {
    width: 230px;
    height: 190px;
    border-radius: 44px;
    background: lightgrey;
    background: linear-gradient(to bottom right, rgba(143, 132, 237, 0.5), rgba(167, 70, 211, 0.5));
    box-shadow: 2px 3px 3px rgba(143, 132, 237, 0.5),
        2px 3px 3px rgba(167, 70, 211, 1);
    /* border: 1px solid red; */
    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    user-select: none;
    flex-direction: row;
    flex-wrap: wrap;
    flex-shrink: 0;
    margin-right: 50px;
    margin-left: 50px;

}

.StudentInfoList .List .student .avatar {
    width: 55px;
    height: 55px;
    display: inline-block;
    /* background-color: rgba(255, 255, 255, 0.9); */
    margin: 25px 10px 15px 20px;
    border-radius: 14px;
    background-size: cover;
    background-repeat: no-repeat;
}

.StudentInfoList .List .student .info {
    display: inline-block;
    vertical-align: top;
    margin-top: 33px;
    width: 105px;
}

.StudentInfoList .List .student .info-1 {
    margin-top: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 100%;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    font-family: 'Poppins';
    font-weight: normal;
    letter-spacing: 6px;
    padding-left: 6px;
}

.StudentInfoList .List .student .info-2 {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 60%;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.9);
    text-align: center;
    font-size: 14px;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    font-weight: normal;
}



.StudentInfoList .List .student .content-1 {
    width: 80%;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    font-weight: normal;
    background: rgba(255, 255, 255, 0.9);
    height: 40px;
    margin: auto;
    font-size: 20px;
}

.StudentInfoList .List .student .content-2 {
    width: 60%;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.9);
    height: 18px;
    margin: 10px 0 0 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    font-weight: normal;
}

.StudentInfoList .List .student ._checkbox {
    display: none;
}

.StudentInfoList .List .student .checkbox {
    position: relative;
    left: 80px;
    top: 30px;
}

.StudentInfoList .List .student .checkbox label {
    position: absolute;

    bottom: 0%;
    right: 0;
    left: 0;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    background: linear-gradient(to bottom right, rgba(143, 132, 237, 0.5), rgba(167, 70, 211, 0.5));
    transform: translateY(-50%);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s ease transform, 0.2s ease background-color, 0.2s ease box-shadow;
    overflow: hidden;
    z-index: 1;
}

.StudentInfoList .List .student .checkbox label:before {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    width: 24px;
    height: 23px;
    margin: 0 auto;
    background-color: #fff;
    transform: translateY(-50%);
    border-radius: 50%;
    box-shadow: inset 0 7px 10px #f7b8ff;
    transition: 0.2s ease width, 0.2s ease height;
}

.StudentInfoList .List .student .checkbox label:hover:before {
    transform: translateY(-50%) scale(1.1);
    box-shadow: inset 0 7px 10px #f7b8ff;
}

.StudentInfoList .List .student .checkbox label:active {
    transform: translateY(-50%) scale(0.9);
}

.StudentInfoList .List .student .checkbox #tick_mark {
    position: absolute;
    top: 0px;
    right: 0;
    left: 0;
    width: 15px;
    height: 18px;
    margin: 0 auto;
    margin-left: 5px;
    transform: rotateZ(-40deg);
}

.StudentInfoList .List .student .checkbox #tick_mark:before,
.StudentInfoList .List .student .checkbox #tick_mark:after {
    content: "";
    position: absolute;
    background-color: #fff;
    border-radius: 2px;
    opacity: 0;
    transition: 0.2s ease transform, 0.2s ease opacity;
}

.StudentInfoList .List .student .checkbox #tick_mark:before {
    left: 0;
    bottom: 0;
    width: 4px;
    height: 10px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.23);
    transform: translateY(-68px)
}

.StudentInfoList .List .student .checkbox #tick_mark:after {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.23);
    transform: translateX(78px)
}

.StudentInfoList .List .student .checkbox ._checkbox:checked+label {
    background-color: #07d410;
}

.StudentInfoList .List .student .checkbox ._checkbox:checked+label:before {
    width: 0;
    height: 0;
}

.StudentInfoList .List .student .checkbox ._checkbox:checked+label #tick_mark:before,
.StudentInfoList .List .student .checkbox ._checkbox:checked+label #tick_mark:after {
    transform: translate(0);
    opacity: 1;
}


.StudentCredit {
    position: relative;
    margin: auto;
    width: 90%;
}

.StudentCredit .List {
    width: 100%;
    height: 543px;
    position: relative;
    /* border: 1px solid red; */
    display: flex;
    /* justify-content: center; */
    align-items: center;
    user-select: none;
    overflow-x: hidden;
    margin-top: 20px;
    border-radius: 16px;
    background-image: linear-gradient(to bottom right, rgba(143, 132, 237, 0.5), rgba(167, 70, 211, 0.5));
}

.StudentCredit .List .class_name {
    position: relative;
    width: 150px;
    font-size: 22px;
    left: 22px;
    font-family: 'Poppins';
    font-weight: normal;
    color: #ffffff;
}

.StudentCredit .List_stu {
    width: 100%;
    height: 100%;
    position: relative;
    /* border: 1px solid red; */
    display: flex;
    /* justify-content: center; */
    align-items: center;
    user-select: none;
    overflow-x: hidden;
}

.StudentCredit .List .student {
    width: 430px;
    height: 390px;
    border-radius: 44px;
    background: lightgrey;
    background: linear-gradient(to bottom right, rgba(143, 132, 237, 0.5), rgba(167, 70, 211, 0.5));
    box-shadow: 2px 3px 3px rgba(143, 132, 237, 0.5),
        2px 3px 3px rgba(167, 70, 211, 1);
    /* border: 1px solid red; */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    flex-direction: row;
    flex-wrap: wrap;
    flex-shrink: 0;
    margin-right: 50px;
    margin-left: 50px;

}

.StudentCredit .List .student .avatar {
    position: absolute;
    bottom: 30px;
    width: 300px;
    height: 150px;
    display: inline-block;
    /* background-color: rgba(255, 255, 255, 0.9); */
    border-radius: 14px;
    background-size: cover;
    background-repeat: no-repeat;
}

.StudentCredit .List .student .Name {
    width: 80%;
    position: absolute;
    top: 30px;
    /* border: 1px solid red; */
    display: inline-block;
    justify-content: left;
    text-align: center;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    color: #000000;
    /* Inside auto layout */
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    user-select: none;
}

.StudentCredit .List .student .info {
    display: inline-block;
    position: absolute;
    top: 0;
    width: 200px;
}

.StudentCredit .List .student .info-1 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 100%;
    border-radius: 0 0 8px 8px;
    background: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    font-family: 'Poppins';
    font-weight: normal;
    letter-spacing: 6px;
    padding-left: 6px;
}

.StudentCredit .List .student .info-2 {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 60%;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.9);
    text-align: center;
    font-size: 14px;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    font-weight: normal;
}

.StudentCredit .List .student .credit {
    top: 80px;
    width: 190px;
    height: 30px;
    /* border-radius: 20px;
    background: #c2a1b7; */
    position: absolute;
    /* border: 1px solid red; */
    text-align: center;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 56px;
    color: #2B1887;
    /* Inside auto layout */
    user-select: none;
}

.StudentCredit .List .student .credit text {
    width: 40px;
    position: absolute;
    font-size: 16px;
    font-weight: 400;
    bottom: 10px;
}

.StudentCredit .List .student .time {
    position: absolute;
    font-family: 'Poppins';
    bottom: 185px;
    font-size: 18px;
    font-weight: 600;
    color: #2B1887;
}

.StudentCredit .List .student .level {
    width: 25%;
    height: 30px;
    right: 5px;
    /* border-radius: 20px;
    background: #c2a1b7; */
    position: absolute;
    bottom: 180px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 31px;
    color: #2B1887;
    /* Inside auto layout */
    user-select: none;
}

.StudentCredit .List .student .level0 {
    width: 25%;
    height: 30px;
    left: 2px;
    /* border-radius: 20px;
    background: #c2a1b7; */
    position: absolute;
    bottom: 180px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 31px;
    color: #2B1887;
    /* Inside auto layout */
    user-select: none;
}

.StudentCredit .List .student .state {
    height: 30px;
    /* border-radius: 20px;
    background: #c2a1b7; */
    position: absolute;
    /* border: 1px solid red; */
    text-align: center;
    bottom: 235px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: '钉钉进步体 Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #2B1887;
    /* Inside auto layout */
    user-select: none;
}

.StudentCredit .List .student .Studnetcontent {
    position: absolute;
    top: 155px;
    font-family: '钉钉进步体 Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: #2B1887;
    /* Inside auto layout */
    user-select: none;
}



.StudentCredit .List .student .content-2 {
    position: absolute;
    bottom: 0px;
    width: 30%;
    border-radius: 8px 8px 0 0;
    color: #E9ECF7;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    font-weight: bold;
    font-size: 14px;
}

.StudentCredit .List .student .checkbox_ {
    display: none;
}

.StudentCredit .List .student .checkbox {
    position: absolute;
    left: 380px;
    top: 380px;
}

.StudentCredit .List .student .checkbox label {
    position: absolute;

    bottom: 0%;
    right: 0;
    left: 0;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    background: linear-gradient(to bottom right, rgba(143, 132, 237, 0.5), rgba(167, 70, 211, 0.5));
    transform: translateY(-50%);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s ease transform, 0.2s ease background-color, 0.2s ease box-shadow;
    overflow: hidden;
    z-index: 1;
}

.StudentCredit .List .student .checkbox label:before {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    width: 24px;
    height: 23px;
    margin: 0 auto;
    background-color: #fff;
    transform: translateY(-50%);
    border-radius: 50%;
    box-shadow: inset 0 7px 10px #f7b8ff;
    transition: 0.2s ease width, 0.2s ease height;
}

.StudentCredit .List .student .checkbox label:hover:before {
    transform: translateY(-50%) scale(1.1);
    box-shadow: inset 0 7px 10px #cf1be7;
}

.StudentCredit .List .student .checkbox label:active {
    transform: translateY(-50%) scale(0.9);
}

.StudentCredit .List .student .checkbox #tick_mark {
    position: absolute;
    top: 0px;
    right: 0;
    left: 0;
    width: 15px;
    height: 18px;
    margin: 0 auto;
    margin-left: 5px;
    transform: rotateZ(-40deg);
}

.StudentCredit .List .student .checkbox #tick_mark:before,
.StudentCredit .List .student .checkbox #tick_mark:after {
    content: "";
    position: absolute;
    background-color: #fff;
    border-radius: 2px;
    opacity: 0;
    transition: 0.2s ease transform, 0.2s ease opacity;
}

.StudentCredit .List .student .checkbox #tick_mark:before {
    left: 0;
    bottom: 0;
    width: 4px;
    height: 10px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.23);
    transform: translateY(-68px)
}

.StudentCredit .List .student .checkbox #tick_mark:after {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.23);
    transform: translateX(78px)
}

.StudentCredit .List .student .checkbox .checkbox_:checked+label {
    background-color: #07d410;
}

.StudentCredit .List .student .checkbox .checkbox_:checked+label:before {
    width: 0;
    height: 0;
}

.StudentCredit .List .student .checkbox .checkbox_:checked+label #tick_mark:before,
.StudentCredit .List .student .checkbox .checkbox_:checked+label #tick_mark:after {
    transform: translate(0);
    opacity: 1;
}

.StudentCredit .List .student button {
    position: relative;
    top: 240px;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
    user-select: none;
    touch-action: manipulation;
}


.StudentCredit .List .student .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}


.StudentCredit .List .student .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(to left,
            hsl(288, 100%, 16%) 0%,
            hsl(288, 100%, 32%) 8%,
            hsl(290, 100%, 32%) 92%,
            hsl(300, 100%, 16%) 100%);
}


.StudentCredit .List .student .front {
    font-family: "站酷高端黑 Regular";
    display: block;
    position: relative;
    padding: 12px 27px;
    border-radius: 12px;
    font-size: 1.1rem;
    color: white;
    background: hsl(288, 100%, 47%);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}


.StudentCredit .List .student button:hover {
    filter: brightness(110%);
}


.StudentCredit .List .student button:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}


.StudentCredit .List .student button:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
}


.StudentCredit .List .student button:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}


.StudentCredit .List .student button:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
}


.StudentCredit .List .student button:focus:not(:focus-visible) {
    outline: none;
}

.downLoad {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 300px;
    top: 765px;
    border-radius: 8px;
    background: #9297C8;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border: none;
}

.downLoad:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #BAD7DF;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
}

.downLoad:hover::after {
    right: auto;
    left: 0;
    width: 100%;
}

.downLoad span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 18px 25px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.3em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
}

.downLoad:hover span {
    color: #491853;
    animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.95);
    }

    100% {
        transform: scale(1);
    }
}


.downLoad2 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 640px;
    top: 765px;
    background: #EE7036;
    border-radius: 8px;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border: none;
}

.downLoad2:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #F6C1A7;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
}

.downLoad2:hover::after {
    right: auto;
    left: 0;
    width: 100%;
}

.downLoad2 span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 18px 25px;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.3em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
}

.downLoad2:hover span {
    color: #491853;
    animation: scaleUp2 0.3s ease-in-out;
}

@keyframes scaleUp2 {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.95);
    }

    100% {
        transform: scale(1);
    }
}


.downLoad3 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 990px;
    top: 765px;
    border-radius: 8px;
    background: #B6C796;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border: none;
}

.downLoad3:after {
    content: " ";
    width: 0%;
    height: 100%;
    position: absolute;
    background: #FFE2E2;
    transition: all 0.4s ease-in-out;
    right: 0;
}

.downLoad3:hover::after {
    right: auto;
    left: 0;
    width: 100%;
}

.downLoad3 span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 18px 25px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.3em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
}

.downLoad3:hover span {
    color: #491853;
    animation: scaleUp3 0.3s ease-in-out;
}

@keyframes scaleUp3 {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.95);
    }

    100% {
        transform: scale(1);
    }
}
</style>