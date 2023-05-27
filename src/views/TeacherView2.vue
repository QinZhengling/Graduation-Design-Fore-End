<template>
    <div class="bodyBox">
        <el-card class="box-card" id="search">
            <el-row>
                <el-input v-model="searchModel.className" placeholder="班级名称查询" clearable></el-input>
                <el-input v-model="searchModel.grade" placeholder="年级查询" clearable></el-input>
                <el-input v-model="searchModel.specializedSubject" placeholder="专业查询" clearable></el-input>
                <el-input v-model="searchModel.College" placeholder="学院查询" clearable></el-input>
                <el-button type="primary" style="margin-left: 50px;" @click="getClassList" round>
                    <el-icon style="margin-right: 10px;">
                        <Search />
                    </el-icon>
                    搜索
                </el-button>
            </el-row>
        </el-card>

        <el-card class="card">
            <el-table :data="tableData" style="width: 100%" size="large" v-infinite-scroll="load">
                <el-table-column prop="id" label="序号" width="80" />
                <el-table-column prop="state" label="状态" width="100">
                    <template #default="scope">
                        <el-tag class="ml-2" type="success" v-if="scope.row.state == 1">已确认</el-tag>
                        <el-tag class="ml-2" type="danger" v-else>未确认</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="className" label="班级名称" width="200" />
                <el-table-column prop="specializedSubject" label="专业" width="280" />
                <el-table-column prop="college" label="学院" width="280" />
                <el-table-column prop="grade" label="年级" />
                <el-table-column label="操作" width="400">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">下载班级明细表资料</el-button>
                        <el-button size="small" @click="handleEdit2(scope.$index, scope.row)">下载班级汇总表资料</el-button>
                        <el-button size="small" type="danger" v-show="scope.row.state == 0"
                            @click="handleDelete(scope.$index, scope.row)">确认审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="searchModel.pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="searchModel.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { Search, Files } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from "axios";
export default {
    name: "Teacher2",
    components: {
        Search,
        Files
    },
    data() {
        return {
            searchModel: {
                pageNo: 1,
                pageSize: 10
            },
            total: 0,
            tableData: []
        }
    },
    methods: {
        handleDelete(index, row) {
            ElMessageBox.confirm(
                '确定审核【' + row.className + '】班级的学分？',
                '注意事项',
                {
                    confirmButtonText: '确认审核',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                axios({
                    url: '/TeacherX/updateState',
                    method: 'PUT',
                    params: {
                        className: row.className
                    }
                }).then(res => {
                    ElMessage({
                        type: 'success',
                        message: '确认成功',
                    })
                    this.getClassList();
                })
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消审核',
                })
            })
        },
        handleEdit(index, row) {
            axios({
                url: '/TeacherX/ClassExcel',
                method: 'GET',
                responseType: 'blob',
                params: {
                    className: row.className // 传入classId
                }
            }).then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]))
                if (url != null) {
                    axios({
                        url: '/TeacherX/ClassExcelZip',
                        method: 'GET',
                        responseType: 'arraybuffer',
                        params: {
                            className: row.className // 传入classId
                        }
                    }).then(response => {
                        let blob = new Blob([response.data], { type: 'application/x-rar-compressed' });
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = row.className + '认定资料.rar';
                        a.click();
                        window.URL.revokeObjectURL(url);
                    }).catch(error => {
                        console.error(error);
                    });
                }
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', row.className + '班级明细表.xlsx')
                document.body.appendChild(link)
                link.click()

            })
        },
        handleEdit2(index, row) {
            axios({
                url: '/TeacherX/ClassExcel2',
                method: 'GET',
                responseType: 'blob',
                params: {
                    className: row.className // 传入classId
                }
            }).then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', row.className + '班级汇总表.xlsx')
                document.body.appendChild(link)
                link.click()
            })
        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getClassList();
        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getClassList();
        },
        getClassList() {
            axios({
                url: '/TeacherX/ClassList',
                method: 'get',
                params: {
                    pageNo: this.searchModel.pageNo,
                    pageSize: this.searchModel.pageSize,
                    classname: this.searchModel.className,
                    college: this.searchModel.College,
                    specializedSubject: this.searchModel.specializedSubject
                }
            }).then(res => {
                this.tableData = res.data.list
                console.log(res.data);
                this.total = res.data.total
            })
        }
    },
    mounted() {
        this.getClassList();
    }
}
</script>

<style scoped>
/* .box-card {
    width: 100%;
} */
.bodyBox {
    position: relative;
    margin: auto;
    top: 50px;
    background-image: linear-gradient(to bottom right, rgb(255, 255, 255), rgb(197, 201, 226));
    width: 1680px;
    height: 860px;
    border-radius: 26px;
    box-shadow: 2px 2px 8px 8px rgba(212, 216, 228, 0.6);
    overflow-y: auto;
    overflow-x: hidden;
}

#search .el-input {
    width: 300px;
    margin-left: 50px;
}



.el-dialog .el-input {
    width: 80%;
}

.el-card {
    margin-bottom: 20px;
}

.card {
    position: relative;
    margin: auto;
    width: 90%;
    height: 80%;
    border-radius: 16px;
}

.block {
    position: relative;
    left: 100px;
    top: 20px;
}
</style>