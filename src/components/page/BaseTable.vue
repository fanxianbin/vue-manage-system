<template>
    <div class="table">
        <div class="container" style="font-size:12px;">
            <div class="jy-search-wrapper" style="position: inherit">
                <table style="background-color:#eee;width:100%;padding:10px 0;">
                    <tr>
                        <td>关键字：</td>
                        <td colspan="3">
                            <el-input type="text" ng-model="params.key" class="jy-text"
                                placeholder="案源编号、产证地址、行政区"/>
                        </td>
                        <td>分行：</td>
                        <td>
                            <el-input type="text" ng-model="params.key" class="jy-text"
                                placeholder="案源编号、产证地址、行政区"/>
                        </td>
                        <td rowspan="4" style="width:100px;text-align:center">
                            <el-button type="primary" v-privilegePoint="'queryEmp'">查询</el-button>
                            <br/>
                            <br/>
                            <el-button type="primary" v-privilegePoint="'export'">导出</el-button>
                        </td>
                    </tr>
                    <tr>
                        <td>签约日期：</td>
                        <td>
                            <el-date-picker v-model="cdate" style="width:150px;" placeholder="请选择"></el-date-picker>
                            <span>-</span>
                            <el-date-picker v-model="cdate" style="width:150px;" placeholder="请选择"></el-date-picker>
                        </td>
                        <td>交易进度：</td>
                        <td  style="width:150px">
                            <el-select v-model="chooice" empty-option-text="请选择">
                                <el-option v-for="option in options" :key="option.key" :label="option.label" :value="option.value"></el-option>
                            </el-select>
                        </td>
                        <td>跟进管家：</td>
                        <td  style="width:150px">
                            <el-input type="text" ng-model="params.key" class="jy-text"
                                placeholder="案源编号、产证地址、行政区"/>
                        </td>
                    </tr>
                    <tr>
                        <td>最晚交易日：</td>
                        <td>
                            <el-date-picker v-model="cdate" style="width:150px;" placeholder="请选择"></el-date-picker>
                            <span>-</span>
                            <el-date-picker v-model="cdate" style="width:150px;" placeholder="请选择"></el-date-picker>
                        </td>
                        <td>贷款进度：</td>
                        <td>
                            <el-select v-model="chooice"  style="width: 166px" empty-option-text="请选择">
                                <el-option v-for="option in options" :key="option.key" :label="option.label" :value="option.value"></el-option>
                            </el-select>
                        </td>
                        <td>外区跟进：</td>
                        <td>
                            <el-select v-model="chooice" empty-option-text="请选择">
                                <el-option v-for="option in options" :key="option.key" :label="option.label" :value="option.value"></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>最晚交易日：</td>
                        <td>
                            <el-date-picker v-model="cdate" style="width:310px;" placeholder="请选择"></el-date-picker>
                        </td>
                        <td>贷款进度：</td>
                        <td>
                            <el-select v-model="chooice"  style="width: 166px" empty-option-text="请选择">
                                <el-option v-for="option in options" :key="option.key" :label="option.label" :value="option.value"></el-option>
                            </el-select>
                        </td>
                        <td>外区跟进：</td>
                        <td>
                            <el-select v-model="chooice" empty-option-text="请选择">
                                <el-option v-for="option in options" :key="option.key" :label="option.label" :value="option.value"></el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="margin:15px 0;">
                <span class="left">共计 <b class="green">123</b> 条结果</span>
            </div>
            <el-table style="width: 100%" :data="data" border ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="date" label="日期" >
                </el-table-column>
                <el-table-column prop="name" label="姓名" >
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope" >
                        <el-button size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '@/store'
    export default {
        name: 'basetable',
        data() {
            return {
                options:[],
                cdate:'',
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                quickParam:{},
                chooice:'',
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                list: [{
                    "date": "1997-11-11",
                    "name": "林丽",
                    "address": "吉林省 辽源市 龙山区"
                }, {
                    "date": "1987-09-24",
                    "name": "文敏",
                    "address": "江西省 萍乡市 芦溪县"
                }, {
                    "date": "1996-08-08",
                    "name": "杨秀兰",
                    "address": "黑龙江省 黑河市 五大连池市"
                }, {
                    "date": "1978-06-18",
                    "name": "魏强",
                    "address": "广东省 韶关市 始兴县"
                }, {
                    "date": "1977-07-09",
                    "name": "石秀兰",
                    "address": "江苏省 宿迁市 宿豫区"
                }, {
                    "date": "1994-09-20",
                    "name": "朱洋",
                    "address": "海外 海外 -"
                }, {
                    "date": "1980-01-22",
                    "name": "傅敏",
                    "address": "海外 海外 -"
                }, {
                    "date": "1985-10-10",
                    "name": "毛明",
                    "address": "内蒙古自治区 包头市 九原区"
                }, {
                    "date": "1975-09-08",
                    "name": "何静",
                    "address": "西藏自治区 阿里地区 普兰县"
                }, {
                    "date": "1970-06-07",
                    "name": "郭秀英",
                    "address": "四川省 巴中市 恩阳区"
                }]
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                setTimeout(()=>{
                    this.tableData = this.list;
                },50);
                // this.$axios.post(this.url, {
                //     page: this.cur_page
                // }).then((res) => {
                //     this.tableData = res.data.list;
                // })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    table tr{
        margin:10px;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        /* width: 300px; */
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
