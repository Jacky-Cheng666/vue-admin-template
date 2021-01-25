<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true">
      <el-form-item label="关键字">
        <el-input
          v-model="queryParams.inputValue"
          placeholder="输入关键字"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结款方式">
        <el-select v-model="queryParams.pay_period" size="small" style="width: 102px">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="预付" value="预付"></el-option>
          <el-option label="到付" value="到付"></el-option>
          <el-option label="月结" value="月结"></el-option>
          <el-option label="自建" value="自建"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否开票">
        <el-select v-model="queryParams.invoiceStatus" size="small" style="width: 102px">
          <el-option label="全部" value="all"></el-option>
          <el-option label="未开票" value="notVoice"></el-option>
          <el-option label="已开票" value="invoiced"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="queryParams.selectStatus" size="small" style="width: 102px">
          <el-option label="全部" value="all"></el-option>
          <el-option label="未申请" value="notApply"></el-option>
          <el-option label="已申请" value="applied"></el-option>
          <el-option label="未付款" value="notPay"></el-option>
          <el-option label="已付款" value="payed"></el-option>
          <el-option label="已暂停" value="已暂停"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
        >新建</el-button>
      </el-col>
      
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getPayDemandList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column align="center" label="请款单号" prop="demand_name" width="150" />
      <el-table-column align="center" label="类别" prop="f_type" width="90" />
      <el-table-column align="center" label="收款方" prop="receive_side_name" width="200" />
      <el-table-column align="center" label="结款" prop="pay_period" width="80" />
      <el-table-column align="center" label="总金额" prop="total_money_with_tax" width="100" />
      <el-table-column align="center" label="已申请金额" prop="applied_money" width="100" />
      <el-table-column align="center" label="未付金额" width="100">
        <template slot-scope="scope">
            <span style="color:#E34348">{{scope.row.total_money_with_tax-scope.row.payed_money}}</span>
          </template>
      </el-table-column>
      <el-table-column align="center" label="开票金额" prop="invoiced_money" width="100" />
      <el-table-column align="center" label="申请人" prop="applier_name" width="90" />
      <el-table-column align="center" label="备注" prop="remark" />
      <el-table-column align="center" label="操作" width="160" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="handleCurrentChange"
    />

    <!-- you can add element-ui's tooltip -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import { get_pay_demand_list } from '@/api/pay.js'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import BackToTop from '@/components/BackToTop'
export default {
  name: "payManage",
  components:{
    BackToTop
  },
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '70px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      queryParams: {
        inputValue: "",
        pay_period: "全部",
        invoiceStatus: "all",
        selectStatus: "all",
        pageNum: 1,
        pageSize: 100,
      },
      showSearch: true,
      loading: false,
      tableData: [],
      total: 0,
      allRows: []
    };
  },
  computed:{
    ...mapGetters(['bookNo'])
  },
  created() {
    // 如果之前登录过，需要处理url带参数问题。
    // if (window.location.href.includes("index")) {
    //   let hostUrl = window.location.href.split("?")[0].split("#")[0];
    //   hostUrl = hostUrl.slice(0, hostUrl.length - 1);
    //   console.log("hostUrl", hostUrl);
    //   setTimeout(() => {
    //     window.location.href = hostUrl;
    //   }, 500);
    // }
    this.getPayDemandList();
    // console.log(getToken("finance_token"));
  },
  methods: {
    handleQuery(){},
    resetQuery(){},
    async getPayDemandList(){
      this.loading = true;
      let res = await get_pay_demand_list({
        access_token: getToken("finance_token"),
        financial_book_no: this.bookNo
      })
      // console.log('res', res);
      if(res.code===0){
        this.loading = false;
        this.allRows = res.pay_demand_list;
        this.paginationRows = this.allRows;
        this.total = this.paginationRows.length;
        this.queryParams.pageNum = 1;
        this.tableData = this.paginationRows.slice(
          this.queryParams.pageSize * (this.queryParams.pageNum - 1),
          this.queryParams.pageSize * this.queryParams.pageNum 
        );
      }
    },
    handleSelectionChange(){},
    handleCurrentChange({limit,page}){
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.tableData = this.paginationRows.slice(
        this.queryParams.pageSize * (this.queryParams.pageNum - 1),
        this.queryParams.pageSize * this.queryParams.pageNum 
      );
    }
  },
};
</script>

<style>
</style>