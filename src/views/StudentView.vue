<template>
    <div>
        <!-- <img src="https://qqq-tuchuang.https://oss-cn-chengdu.aliyuncs.com/IMG_20230311_134929.jpg" alt=""> -->
        <div class="Head">
            <img src="../../public/img/CQUST.svg" alt="">
            <text class="" selectable="false" space="false" decode="false">
                重庆科技学院创新学分认定系统
            </text>
        </div>
        <div class="StuInfo">
            <div class="InfoCard">
                <img class="colorInfo" src="../../public/img/Color.svg" />
                <div class="HeadImg">
                    <img :src="this.StudentInfo.studentImage" alt="">
                </div>
                <div class="infoText">
                    <div>姓名 : <text>{{ StudentInfo.studentName }}</text></div>
                    <div>学号 : <text>{{ StudentInfo.studentId }}</text></div>
                    <div>学院 : <text>{{ StudentInfo.studentCollege }}</text></div>
                    <div>宿舍 : <text>{{ StudentInfo.living }}</text></div>
                    <div>班级 : <text>{{ StudentInfo.studentClass }}</text></div>
                </div>
            </div>
            <div class="SureCredit">
                <text>您已经认定的学分</text>
                <text>学分</text>
                <div>{{ StudentInfo.credit }}</div>
            </div>
            <div class="NeedCredit">
                <text>您至少还需认定的学分</text>
                <text>学分</text>
                <div class="fenshu">{{ (2 - this.StudentInfo.credit) > 0 ? 2 - this.StudentInfo.credit : 0 }}</div>
                <div class="clickCredit" @click="ChangeApply()">APPLY</div>
            </div>
        </div>
        <div>
        </div>
        <text class="title1">已认定的学分</text>
        <div class="sumN">{{ this.Credit.length }}份</div>
        <div class="CreditInfo" ref="CreditInfo">
            <div v-for="(item, key, index) in Credit" v-bind:key="item" class="CreditBox">
                <div class="Name" :title=item.name>
                    {{ item.competition }}
                </div>
                <div class="level0">
                    {{ item.level0 }}
                </div>
                <div class="level">
                    {{ item.competitionState }}
                </div>
                <div class="credit">
                    <div>{{ item.recognizedCredits }}<text>学分</text></div>
                </div>
                <div class="time">
                    {{ item.time }}</div>
                <div class="img"><img :src="item.materialAddress" alt="" @click="viewImage(item.materialAddress)"></div>
            </div>
        </div>

        <div class="ApplyCredit" v-show="Show">
            <div class="Exit" @click="Exit()">x</div>
            <div class="input-group">
                <label class="label">填写认定项目名称</label>
                <input autocomplete="off" name="projectName" id="projectName" class="input" type="text"
                    v-model="projectName">
                <div></div>
            </div>
            <div class="input-group">
                <label class="label">填写认定项目级别</label>
                <input autocomplete="off" name="projectlevel" id="projectlevel" class="input" type="text"
                    v-model="projectlevel" placeholder="请按照相应格式输入">
                <div></div>
            </div>
            <div class="input-group">
                <label class="label">填写认定项目等级</label>
                <input autocomplete="off" name="projectlevel0" id="projectlevel0" class="input" type="text"
                    v-model="projectlevel0" placeholder="请按照相应格式输入" required>
                <div></div>
            </div>
            <div class="input-group">
                <label class="label">完成或获奖情况（若有排名请标明）</label>
                <input autocomplete="off" name="projectstate" id="projectstate" class="input" type="text"
                    v-model="projectstate" placeholder="请按照相应格式输入" required>
                <div></div>
            </div>
            <div class="input-group">
                <label class="label">申请学分</label>
                <input autocomplete="off" name="projectCredit" id="projectCredit" class="input" type="text"
                    v-model="projectCredit" oninput="this.value=this.value.replace(/[^0-9]/g,'')" required>
                <div></div>
            </div>
            <div class="input-group">
                <label class="label">支撑材料</label>
                <input autocomplete="off" name="projectMaterial" id="projectMaterial" class="input" type="text"
                    v-model="projectMaterial" required>
                <div></div>
            </div>

            <el-upload class="upload" ref="upload" action="string" :file-list="fileList" :auto-upload="false"
                :http-request="uploadFile" 自定义上传的方法 :on-change="handleChange" :on-preview="handlePreview"
                :on-remove="handleRemove" multiple="multiple">
                <el-button size="small" type="primary" @click="delFile" class="select">选取文件</el-button>
            </el-upload>
            <el-button @click="onSubmit" class="btn">提交</el-button>
        </div>
        <text class="title2">正在认定的学分</text>
        <div class="sumN2">{{ this.Credit_process.length }}份</div>
        <div class="CreditInfo_process" ref="CreditInfo_process">
            <div v-for="(item, key, index) in Credit_process" v-bind:key="item" class="CreditBox">

                <div class="Name" :title=item.competition>
                    {{ item.competition }}

                </div>
                <div class="level0">
                    {{ item.level0 }}
                </div>
                <div class="level">
                    {{ item.competitionState }}
                </div>
                <div class="credit">
                    <div>{{ item.recognizedCredits }}<text>学分</text></div>
                </div>
                <div class="state">
                    {{ item.state }}
                </div>
                <div class="time">
                    {{ item.time }}</div>
                <span class="content">{{ item.content }}</span>
                <div class="img"><img :src="item.materialAddress" alt="" @click="viewImage(item.materialAddress)"></div>
                <button v-show="item.state == '认定退回' ? true : false" class="learn-more" id="Bt" @click="repeat(item.id)">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">重新提交</span>
                </button>
                <button v-show="item.state == '认定退回' ? true : false" class="learn-more" id="Bt" @click="onShenSu(item.id)">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">认定申诉</span>
                </button>
            </div>
            <div class="ApplyCredit" v-show="Show1">
                <div class="Exit" @click="Exit()">x</div>
                <div class="input-group">
                    <label class="label">填写认定项目名称</label>
                    <input autocomplete="off" name="projectName" id="projectName" class="input" type="text"
                        v-model="projectName">
                    <div></div>
                </div>
                <div class="input-group">
                    <label class="label">填写认定项目级别</label>
                    <input autocomplete="off" name="projectlevel" id="projectlevel" class="input" type="text"
                        v-model="projectlevel" placeholder="请按照相应格式输入">
                    <div></div>
                </div>
                <div class="input-group">
                    <label class="label">填写认定项目等级</label>
                    <input autocomplete="off" name="projectlevel0" id="projectlevel0" class="input" type="text"
                        v-model="projectlevel0" placeholder="请按照相应格式输入" required>
                    <div></div>
                </div>
                <div class="input-group">
                    <label class="label">完成或获奖情况（若有排名请标明）</label>
                    <input autocomplete="off" name="projectstate" id="projectstate" class="input" type="text"
                        v-model="projectstate" placeholder="请按照相应格式输入" required>
                    <div></div>
                </div>
                <div class="input-group">
                    <label class="label">申请学分</label>
                    <input autocomplete="off" name="projectCredit" id="projectCredit" class="input" type="text"
                        v-model="projectCredit" oninput="this.value=this.value.replace(/[^0-9]/g,'')" required>
                    <div></div>
                </div>
                <div class="input-group">
                    <label class="label">支撑材料</label>
                    <input autocomplete="off" name="projectMaterial" id="projectMaterial" class="input" type="text"
                        v-model="projectMaterial" required>
                    <div></div>
                </div>

                <el-upload class="upload" ref="upload" action="string" :file-list="fileList" :auto-upload="false"
                    :http-request="uploadFile" 自定义上传的方法 :on-change="handleChange" :on-preview="handlePreview"
                    :on-remove="handleRemove" multiple="multiple">
                    <el-button size="small" type="primary" @click="delFile" class="select">选取文件</el-button>
                </el-upload>
                <el-button @click="onSubmit1" class="btn">提交</el-button>
            </div>
        </div>
        <text class="title3" v-if="StudentInfo.group1 == 1">小组认定学分</text>
        <text class="title3" v-else>暂无小组权限</text>
        <div class="sumN3" v-show="StudentInfo.group1 == 1">{{ this.supp.length }}份</div>
        <div v-show="StudentInfo.group1 == 1" class="StudentGroup" ref="StudentGroup">
            <div v-for="(student, key, index) in supp" v-bind:key="index" class="CreditBox">
                <label class="avatar" :style="{
                    'background-image': 'url(' + student.materialAddress + ')'
                }" @click="viewImage(student.materialAddress)">

                </label>

                <span class="studentName">
                    {{ key }} {{ student.studentName }}
                </span>
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
                <div class="state">
                    {{ student.state }}

                </div>
                <div class="time">
                    {{ student.time }}
                </div>
                <div class="content-2">
                    {{ student.studentId }}
                </div>
                <button @click="Agree(student.studentId, student.id, student.competition, student.studentName, key)"
                    :id="'button_' + student.id" :for="'button_' + student.id" v-show="!student.yes">
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front text">小组确认
                    </span>
                </button>
                <button :id="'button_' + student.id" :for="'button_' + student.id" v-show="student.yes">
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front text">已经确认
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script >
import axios from "axios";
// import { el } from 'element-plus/es/locale';
// import { ref, reactive } from 'vue'
// import { ElMessage } from 'element-plus'
// import { UploadProps, UploadUserFile } from 'element-plus'
// import { el } from 'element-plus/es/locale';

import { ElMessage, ElMessageBox } from 'element-plus';
export default {
    name: "StudentView",
    components: {

    },
    data() {
        return {
            NeedCredit: 0,
            StudentInfo: {},
            Show: false,
            Show1: false,
            Credit: [],
            Credit_process: [],
            fileList: [],
            // 不支持多选
            multiple: false,
            formData: "",
            projectName: "",
            projectlevel: "",
            projectlevel0: "",
            projectstate: "",
            projectCredit: "",
            projectMaterial: "",
            supp: [],
            id: 0
        }
    },
    props: {
        // imageUrl: item.materialAddress
    },
    methods: {
        Agree(studentId, id, competition, studentName, key) {
            console.log(key);
            if (confirm("确定审核" + studentName + "的" + competition + "这一个认定申请吗？")) {
                // 用户点击了确定按钮，执行退回操作
                this.lication(studentId, id, key);
                location.reload();
            }
        },
        repeat(id) {
            this.Show1 = true
            this.id = id
            console.log(id);
        },
        onShenSu(id) {
            ElMessageBox.prompt('请输入申诉理由', '提示', {
                confirmButtonText: '确认申诉',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    this.shensuApplication(id, value);
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消',
                    });
                });
        },
        shensuApplication(id, value) {
            let formData = new FormData();
            formData.append("id", id)
            formData.append("value", value)
            axios.post("/shensu", formData, {
                'Content-Type': 'multipart/form-data'
            }).then(res => {
                console.log(res);
            })
        },
        onSubmit1() {
            console.log(this.id);
            if (this.fileList[0] && this.projectName != "" && this.projectlevel != "" && this.projectlevel0 != "" &&
                this.projectstate != "" &&
                this.projectCredit != "" &&
                this.projectMaterial != "") {
                let SupportingmaterialVo = {
                    "id": this.id,
                    "studentId": this.StudentInfo.studentId,
                    "studentName": this.StudentInfo.studentName,
                    "specializedSubject": this.StudentInfo.specializedSubject,
                    "competition": this.projectName,
                    "level0": this.projectlevel,
                    "level1": this.projectlevel0,
                    "competitionState": this.projectstate,
                    "state": "申请已提交",
                    "material": this.projectMaterial,
                    "recognizedCredits": this.projectCredit,
                    "classCredit": 0,
                    "studentClass": this.StudentInfo.studentClass
                }
                SupportingmaterialVo
                let formData = new FormData();
                let SupportingmaterialVoJson = JSON.stringify(SupportingmaterialVo);
                formData.append("file", this.fileList[0].raw);//拿到存在fileList的文件存放到formData中
                formData.append("SupportingmaterialVo", SupportingmaterialVoJson)
                //下面数据是我自己设置的数据,可自行添加数据到formData(使用键值对方式存储)
                formData.append("title", this.title);
                axios.post("/update", formData, {
                    'Content-Type': 'multipart/form-data'
                }).then(res => {
                    if (res.data.Result.response === "success") {
                        this.$notify({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        });
                        this.Show1 = false;
                        this.id = 0
                        this.projectName = ""
                        this.projectlevel = ""
                        this.projectlevel0 = ""
                        this.projectstate = ""
                        this.projectCredit = ""
                        this.projectMaterial = ""
                        location.reload();
                    }
                    else {
                        console.log(res.data.Result);
                        this.$notify({
                            title: res.data.Result,
                            message: '更新失败',
                            type: 'false',
                            duration: 2000
                        });
                    }
                })
            }
            else {
                alert("填写完整内容")
            }
        },
        lication(studentId, id, key) {
            console.log(studentId);
            console.log(id);
            console.log(key);
            let Ed = new FormData();
            Ed.append("studentId", this.StudentInfo.studentId);
            Ed.append("id", id);
            Ed.append("classname", this.StudentInfo.studentClass)
            axios.post('/Student/Team', Ed, {
                'Content-Type': 'multipart/form-data'
            }).then(response => {
                if (response.data.msg == "sucess") {
                    this.supp[key].yes = true
                }
                else {
                    this.supp[key].yes = true
                }
            })
        },
        ChangeApply() {
            let data = new Date();
            console.log(data.getDate());
            if (this.Show) {
                this.Show = false
            }
            else {
                this.Show = true
            }
            // if (data.getMonth() + 1 === 11 && data.getDate() > 0 && data.getDate() < 15) {

            // }
            // else {
            //     alert("未到认定时间！认定时间为：11月第一周~第二周")
            // }
        },
        Exit() {
            this.Show = false
            this.Show1 = false
        },
        delFile() {
            this.fileList = [];
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
            // console.log(this.fileList, "sb");
        },
        //自定义上传文件
        uploadFile(file) {
            this.formData.append("file", file.file);
            // console.log(file.file, "sb2");
        },
        //删除文件
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 点击文件
        handlePreview(file) {
            console.log(file);
        },
        onSubmit() {
            console.log(this.projectName);
            if (this.fileList[0] && this.projectName != "" && this.projectlevel != "" && this.projectlevel0 != "" &&
                this.projectstate != "" &&
                this.projectCredit != "" &&
                this.projectMaterial != "") {
                let SupportingmaterialVo = {
                    "studentId": this.StudentInfo.studentId,
                    "studentName": this.StudentInfo.studentName,
                    "specializedSubject": this.StudentInfo.specializedSubject,
                    "competition": this.projectName,
                    "level0": this.projectlevel,
                    "level1": this.projectlevel0,
                    "competitionState": this.projectstate,
                    "state": "申请已提交",
                    "material": this.projectMaterial,
                    "recognizedCredits": this.projectCredit,
                    "classCredit": 0,
                    "studentClass": this.StudentInfo.studentClass
                }
                SupportingmaterialVo
                let formData = new FormData();
                let SupportingmaterialVoJson = JSON.stringify(SupportingmaterialVo);
                formData.append("file", this.fileList[0].raw);//拿到存在fileList的文件存放到formData中
                formData.append("SupportingmaterialVo", SupportingmaterialVoJson)
                //下面数据是我自己设置的数据,可自行添加数据到formData(使用键值对方式存储)
                formData.append("title", this.title);
                axios.post("/upload", formData, {
                    'Content-Type': 'multipart/form-data'
                }).then(res => {
                    if (res.data.Result.response === "success") {
                        this.$notify({
                            title: '成功',
                            message: '提交成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.Show = false;
                        this.projectName = ""
                        this.projectlevel = ""
                        this.projectlevel0 = ""
                        this.projectstate = ""
                        this.projectCredit = ""
                        this.projectMaterial = ""
                        location.reload();
                    }
                    else {
                        console.log(res.data.Result);
                        this.$notify({
                            title: res.data.Result,
                            message: '提交失败',
                            type: 'false',
                            duration: 5000
                        });
                    }
                })
            }
            else {
                alert("填写完整内容")
            }
        },
        viewImage(materialAddress) {
            this.$router.push({ name: 'image-viewer', params: { id: materialAddress } })
        },
    },
    mounted() {
        // console.log(JSON.parse(sessionStorage.getItem("userInfo")));
        this.StudentInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        this.$refs.CreditInfo.addEventListener('wheel', (e) => {
            // console.log(this.$refs.CreditInfo.scrollLeft);
            let dundong = -e.wheelDelta;
            this.$refs.CreditInfo.scrollLeft = this.$refs.CreditInfo.scrollLeft + dundong;
            e.returnValue = false;
        });
        this.$refs.CreditInfo_process.addEventListener('wheel', (e) => {
            // console.log(this.$refs.CreditInfo_process.scrollLeft);
            let dundong = -e.wheelDelta;
            this.$refs.CreditInfo_process.scrollLeft = this.$refs.CreditInfo_process.scrollLeft + dundong;
            e.returnValue = false;
        });
        this.$refs.StudentGroup.addEventListener('wheel', (e) => {
            // console.log(this.$refs.CreditInfo_process.scrollLeft);
            let dundong = -e.wheelDelta;
            this.$refs.StudentGroup.scrollLeft = this.$refs.StudentGroup.scrollLeft + dundong;
            e.returnValue = false;
        });
        // console.log(this.StudentInfo.studentId);
        axios.get("/Student/SsmIng", {
            params: {
                studentId: this.StudentInfo.studentId
            }
        }, {
            'Content-Type': 'application/x-www-form-urlencoded'
        }).then(res => {
            this.Credit_process = res.data.SsmIng
            console.log(res.data.SsmIng)
        })
        axios.get("/Student/SsmSucess", {
            params: {
                studentId: this.StudentInfo.studentId
            }
        }, {
            'Content-Type': 'application/x-www-form-urlencoded'
        }).then(res => {
            this.Credit = res.data.SsmSucess
            // console.log(res.data.SsmSucess.length)
        })
        axios.get("/Teacher/TeacherStudentInfo", {
            params: {
                classID: this.StudentInfo.studentClass
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(su => {
            // console.log(su.data.supportingmaterials);
            let promises = su.data.supportingmaterials.map(student => {
                // console.log(this.StudentInfo.studentId);
                return axios.get("/Student/Yes", {
                    params: {
                        id: student.id,
                        studentId: this.StudentInfo.studentId
                    }
                }, {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }).then(res => {
                    // console.log(res.data);
                    return res.data.msg;
                });
            });
            Promise.all(promises).then(results => {
                this.supp = su.data.supportingmaterials.map((student, index) => {
                    return {
                        ...student,
                        yes: results[index]
                    };
                });
            });
        })
        // console.log(this.state(12, "2019444140"));
        // this.state(10, "2019444140")
    },
}
</script>

<style scoped>
.Head {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    height: 180px;
    font-size: 25px;
    line-height: 38px;
    /* identical to box height */
    text-align: center;
    color: rgba(190, 190, 190, 0.7);
    /* border: 1px solid red; */
}

.Head img {
    position: absolute;
    width: 691.09px;
    height: 137px;
}

.Head text {
    position: absolute;
    z-index: -1;
    top: 160px;
    user-select: none;
}

.StuInfo {
    position: relative;
    width: 1654px;
    height: 432px;
    left: 139px;
    top: 97px;
    /* border: 1px solid red; */
}

.StuInfo .InfoCard .colorInfo {
    position: absolute;
    width: 100px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 25px;
    top: 25px;
}

.StuInfo .InfoCard {
    position: absolute;
    width: 768px;
    height: 432px;
    /* border: 1px solid red; */
    background: #FFFFFF;
    box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.25);
    border-radius: 22px;
    user-select: none;
}

.StuInfo .InfoCard .HeadImg {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 227px;
    height: 322px;
    left: 55px;
    top: 55px;
    border-radius: 24px;
}

.StuInfo .InfoCard .HeadImg img {
    position: absolute;
    width: 100%;
    display: block;
}

.StuInfo .InfoCard .infoText {
    position: absolute;
    /* border: 1px solid red; */
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 37px;
    width: 385px;
    height: 243px;
    left: 335px;
    top: 65px;
    user-select: none;
}

.StuInfo .InfoCard .infoText div {
    position: relative;
    /* border: 1px solid red; */
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 37px;
    margin-top: 24px;
}

.StuInfo .InfoCard .infoText div text {
    padding-left: 30px;
    user-select: none;
}

.StuInfo .SureCredit {
    position: absolute;
    width: 363px;
    height: 432px;
    left: 860px;
    /* border: 1px solid red; */
    background: #C08EAF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.StuInfo .SureCredit text {
    position: absolute;
    user-select: none;
    width: 100%;
    height: 38px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    /* or 38px */
    display: flex;
    justify-content: center;
    padding-left: 8px;
    letter-spacing: 8px;
    align-items: center;
    color: #FFFFFF;
}

.StuInfo .SureCredit text:nth-child(1) {
    text-align: center;
    top: 80px;
    user-select: none;
}

.StuInfo .SureCredit div {
    position: absolute;
    height: 133px;

    user-select: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 90px;
    line-height: 147.9%;
    /* or 133px */

    display: flex;
    align-items: center;
    letter-spacing: 8px;

    color: #FFFFFF;
}

.StuInfo .SureCredit text:nth-child(2) {
    text-align: center;
    bottom: 80px;
    font-size: 50px;
    font-weight: 700;
    user-select: none;
}

.StuInfo .NeedCredit {
    position: absolute;
    width: 363px;
    height: 432px;
    right: 0;
    /* border: 1px solid red; */
    background: #8076A3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.StuInfo .NeedCredit text {
    position: absolute;
    width: 100%;
    height: 38px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    /* or 38px */
    display: flex;
    justify-content: center;
    padding-left: 8px;
    letter-spacing: 8px;
    align-items: center;
    color: #FFFFFF;
    user-select: none;
}

.StuInfo .NeedCredit text:nth-child(1) {
    text-align: center;
    user-select: none;
    top: 80px;
}

.StuInfo .NeedCredit .fenshu {
    position: absolute;
    height: 133px;
    user-select: none;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 90px;
    line-height: 147.9%;
    /* or 133px */

    user-select: none;
    display: flex;
    align-items: center;
    letter-spacing: 8px;

    color: #FFFFFF;
}

.StuInfo .NeedCredit text:nth-child(2) {
    text-align: center;
    bottom: 80px;
    font-size: 50px;
    font-weight: 700;
    user-select: none;
}

.CreditInfo {
    position: relative;
    width: 1654px;
    height: 543px;
    background: #D5CCFF;
    border-radius: 24px;
    left: 139px;
    top: 160px;
    margin-bottom: 130px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    user-select: none;
    overflow-x: scroll;
    gap: 20px;
}

::-webkit-scrollbar {
    display: none;
}

.title1 {
    position: relative;
    top: 155px;
    left: 159px;
    font-size: 26px;
    font-family: 'Poppins';
    font-weight: 600;
}

.CreditInfo .CreditBox {
    display: inline-block;
    height: 70%;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 2px 1px rgba(119, 119, 119, 0.25);
    border-radius: 22px;
    position: relative;
    margin: 34px;
    background: #F4F2FF;
    border-radius: 12px;
    user-select: none;
    flex-direction: row;
    flex-wrap: wrap;
    flex-shrink: 0;
}

.CreditInfo .CreditBox .Name {
    width: 80%;
    position: absolute;
    top: 10px;
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

.CreditInfo .CreditBox .level0 {
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

.CreditInfo .CreditBox .level {
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

.CreditInfo .CreditBox .credit {
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

.CreditInfo .CreditBox .credit div {
    position: absolute;
    width: 100px;
}

.CreditInfo .CreditBox .credit text {
    width: 40px;
    position: absolute;
    font-size: 16px;
    font-weight: 400;
    bottom: 10px;
}



/* .CreditBox .Name:hover {
    width: 290px;
    border: 1px solid red;
    display: flex;
    justify-content: left;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 31px;
    color: #000000;
} */

.clickCredit {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 50px;
    height: 25px;
    border-radius: 12px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 12px;
    color: #8076A3;
    font-family: 'Poppins';
    cursor: pointer;
}

.ApplyCredit {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    background-color: #ffffff;
    width: 400px;
    height: 600px;
    border-radius: 20px;
    box-shadow: 2px 2px 8px 1px rgba(119, 119, 119, 0.25);
    border: 1px solid #05060f0a;
    z-index: 99;
}



.input {
    max-width: 190px;
    height: 44px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25, .01, .25, 1) 0s, color .3s cubic-bezier(.25, .01, .25, 1) 0s, background .2s cubic-bezier(.25, .01, .25, 1) 0s;
}

.label {
    display: block;
    margin-bottom: .3rem;
    font-size: .9rem;
    font-weight: bold;
    color: #05060f99;
    transition: color .3s cubic-bezier(.25, .01, .25, 1) 0s;
}

.input-group {
    position: relative;
    top: 10px;
    margin: auto;
    left: 90px;
    margin-top: 10px;
}

.input:hover,
.input:focus,
.input-group:hover .input {
    outline: none;
    border-color: #05060f;
}

.input-group:hover .label,
.input:focus {
    color: #05060fc2;
}

.select {
    position: relative;
    margin-left: 98px;
    top: 90px;
    width: 100px;
    height: 30px;
    border-radius: 4px;
    background-color: #ffffff;
    border: none;
    color: #05060f99;
    font-weight: 600;
    font-size: 12px;
    font-family: 'Poppins';
    box-shadow: 2px 2px 4px 1px rgba(119, 119, 119, 0.25);
}

.btn {
    position: absolute;
    bottom: -11px;
    left: 210px;
    width: 100px;
    height: 30px;
    border-radius: 4px;
    background-color: #ffffff;
    border: none;
    color: #05060f99;
    font-weight: 600;
    font-size: 12px;
    font-family: 'Poppins';
    box-shadow: 2px 2px 4px 1px rgba(119, 119, 119, 0.25);
}

.CreditInfo_process {
    top: 80px;
    position: relative;
    width: 1654px;
    height: 543px;
    background: #D5CCFF;
    border-radius: 24px;
    left: 139px;
    margin-bottom: 100px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    user-select: none;
    overflow-x: scroll;
    gap: 20px;
}

.CreditInfo_process .CreditBox {
    display: inline-block;
    height: 70%;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 2px 1px rgba(119, 119, 119, 0.25);
    border-radius: 22px;
    position: relative;
    margin: 34px;
    background: #F4F2FF;
    border-radius: 12px;
    user-select: none;
    flex-direction: row;
    flex-wrap: wrap;
    flex-shrink: 0;
}

.title2 {
    position: relative;
    top: 70px;
    left: 159px;
    font-size: 26px;
    font-family: 'Poppins';
    font-weight: 600;
}

.CreditInfo_process .CreditBox .state {
    height: 30px;
    /* border-radius: 20px;
    background: #c2a1b7; */
    position: absolute;
    /* border: 1px solid red; */
    text-align: center;
    bottom: 215px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #2B1887;
    /* Inside auto layout */
    user-select: none;
}

.CreditInfo_process .CreditBox .Name {
    width: 80%;
    position: absolute;
    top: 10px;
    /* border: 1px solid red; */
    display: inline-block;
    justify-content: left;
    align-items: center;
    text-align: center;
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

.CreditInfo_process .CreditBox .level0 {
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

.CreditInfo_process .CreditBox .level {
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

.CreditInfo_process .CreditBox .credit {
    width: 190px;
    height: 30px;
    top: 80px;
    /* border-radius: 20px;
    background: #c2a1b7; */
    position: absolute;
    /* border: 1px solid red; */
    text-align: center;
    margin-right: 5px;
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

.CreditInfo_process .CreditBox .credit div {
    position: absolute;
    width: 100px;
}

.CreditInfo_process .CreditBox .credit text {
    width: 40px;
    position: absolute;
    font-size: 16px;
    font-weight: 400;
    bottom: 10px;
}

.CreditInfo_process .CreditBox .img {
    position: absolute;
    bottom: 10px;
    width: 300px;
    height: 150px;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 10px;
}

.CreditInfo_process .CreditBox .img img {
    position: absolute;
    width: 100%;
    display: block;
}

.CreditInfo .CreditBox .img {
    position: absolute;
    bottom: 10px;
    width: 300px;
    height: 150px;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 10px;
}

.CreditInfo .CreditBox .img img {
    position: absolute;
    width: 100%;
    display: block;
}

.CreditInfo_process .CreditBox .time {
    position: absolute;
    font-family: 'Poppins';
    bottom: 185px;
    font-size: 18px;
    font-weight: 600;
    color: #2B1887;
}

.CreditInfo .CreditBox .time {
    position: absolute;
    font-family: 'Poppins';
    bottom: 185px;
    font-size: 18px;
    font-weight: 600;
    color: #2B1887;
}


.StudentGroup {
    top: 60px;
    position: relative;
    width: 1654px;
    height: 543px;
    background: #D5CCFF;
    border-radius: 24px;
    left: 139px;
    margin-bottom: 100px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    user-select: none;
    overflow-x: scroll;
    gap: 20px;
}

.StudentGroup .CreditBox {
    display: inline-block;
    height: 70%;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 2px 1px rgba(119, 119, 119, 0.25);
    border-radius: 22px;
    position: relative;
    margin: 34px;
    background: #F4F2FF;
    border-radius: 12px;
    user-select: none;
    flex-direction: row;
    flex-wrap: wrap;
    flex-shrink: 0;
}

.title3 {
    position: relative;
    top: 50px;
    left: 159px;
    font-size: 26px;
    font-family: 'Poppins';
    font-weight: 600;
}

.StudentGroup .CreditBox .state {
    height: 30px;
    /* border-radius: 20px;
    background: #c2a1b7; */
    position: absolute;
    /* border: 1px solid red; */
    text-align: center;
    bottom: 215px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #2B1887;
    /* Inside auto layout */
    user-select: none;
}

.StudentGroup .CreditBox .Name {
    width: 80%;
    position: absolute;
    top: 30px;
    /* border: 1px solid red; */
    display: inline-block;
    justify-content: left;
    align-items: center;
    text-align: center;
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

.StudentGroup .CreditBox .level0 {
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

.StudentGroup .CreditBox .level {
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

.StudentGroup .CreditBox .credit {
    width: 190px;
    height: 30px;
    top: 80px;
    /* border-radius: 20px;
    background: #c2a1b7; */
    position: absolute;
    /* border: 1px solid red; */
    text-align: center;
    margin-right: 5px;
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

.StudentGroup .CreditBox .content-2 {
    position: absolute;
    top: 0;
    right: 0;
    height: 25px;
    width: 30%;
    border-radius: 0 12px 0 12px;
    background: rgba(213, 204, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: '阿里巴巴普惠体 2.0 65 Medium';
    font-weight: normal;
    font-size: 14px;
    font-family: 'Poppins';
    font-weight: normal;
    letter-spacing: 2px;
    padding-left: 2px;
}

.StudentGroup .CreditBox .studentName {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 30%;
    border-radius: 12px 0 12px 0;
    background: rgba(213, 204, 255, 0.8);
    font-size: 18px;
    font-family: 'Poppins';
    font-weight: normal;
    letter-spacing: 6px;
    padding-left: 6px;
}

.StudentGroup .CreditBox .credit div {
    position: absolute;
    width: 100px;
}

.StudentGroup .CreditBox .credit text {
    width: 40px;
    position: absolute;
    font-size: 16px;
    font-weight: 400;
    bottom: 10px;
}

.StudentGroup .CreditBox .img {
    position: absolute;
    bottom: 10px;
    width: 300px;
    height: 150px;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 10px;
}

.StudentGroup .CreditBox .img img {
    position: absolute;
    width: 100%;
    display: block;
}

.StudentGroup .CreditBox .time {
    position: absolute;
    font-family: 'Poppins';
    bottom: 185px;
    font-size: 18px;
    font-weight: 600;
    color: #2B1887;
}

.StudentGroup .CreditBox button {
    position: relative;
    top: 230px;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
    user-select: none;
    touch-action: manipulation;
}


.StudentGroup .CreditBox .shadow {
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


.StudentGroup .CreditBox .edge {
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


.StudentGroup .CreditBox .front {
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


.StudentGroup .CreditBox button:hover {
    filter: brightness(110%);
}

.StudentGroup .CreditBox button:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}


.StudentGroup .CreditBox button:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
}


.StudentGroup .CreditBox button:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}


.StudentGroup .CreditBox button:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
}


.StudentGroup .CreditBox button:focus:not(:focus-visible) {
    outline: none;
}

.StudentGroup .CreditBox .avatar {
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

#Bt {
    position: relative;
    top: 230px;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
}

#Bt.learn-more {
    width: 12rem;
    height: auto;
}

#Bt.learn-more .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: #282936;
    border-radius: 1.625rem;
}

#Bt.learn-more .circle .icon {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
}

#Bt.learn-more .circle .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
}

#Bt.learn-more .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
}

#Bt.learn-more .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    color: #282936;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
}

#Bt:hover .circle {
    width: 100%;
}

#Bt:hover .circle .icon.arrow {
    background: #fff;
    transform: translate(1rem, 0);
}

#Bt:hover .button-text {
    color: #fff;
}

.Exit {
    position: absolute;
    left: 10px;
    top: 10px;
    user-select: none;
}

.content {
    position: absolute;
    top: 195px;
    font-family: 'Poppins';
    bottom: 180px;
    font-size: 18px;
    font-weight: 600;
    color: #2B1887;
}

.sumN {
    position: relative;
    top: 112px;
    left: 1680px;
    font-size: 26px;
    font-family: 'Poppins';
    font-weight: 600;
    margin-bottom: -40px;
    letter-spacing: 10px;
    width: 100px;
}

.sumN2 {
    position: relative;
    top: 30px;
    left: 1680px;
    font-size: 26px;
    font-family: 'Poppins';
    font-weight: 600;
    margin-bottom: -45px;
    width: 100px;
    letter-spacing: 10px;
}

.sumN3 {
    position: relative;
    width: 100px;
    top: 8px;
    left: 1680px;
    font-size: 26px;
    font-family: 'Poppins';
    font-weight: 600;
    margin-bottom: -45px;
    letter-spacing: 10px;
}
</style>