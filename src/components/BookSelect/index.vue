<template>
  <el-dropdown trigger="click" @command="SwitchBook">
    <div>
      <i style="font-size:24px;vertical-align:middle;color:#cf5a1a" class="el-icon-notebook-1"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.financial_book_no" :disabled="bookNo===item.financial_book_no" :command="item.financial_book_no">
        {{item.financial_book_name }}
        <span v-if="bookNo===item.financial_book_no">（当前）</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { get_financial_book_list } from '@/api/pay.js'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  computed: {
    bookNo() {
      return this.$store.getters.bookNo
    }
  },
  created() {
      this.getFinancialBookList();
  },
  methods: {
    async getFinancialBookList(){
        let res = await get_financial_book_list({
            access_token: getToken("finance_token")
        });
        // console.log('账本', res);
        if(res.code===0){
            this.sizeOptions = res.financial_book_list;
            this.$store.commit('zzb/SET_BOOK_NO',this.sizeOptions&&this.sizeOptions.length>0?this.sizeOptions[0].financial_book_no:0)
        }
    },
    SwitchBook(book_no) {
      console.log('book_no', book_no);
    //   this.$ELEMENT.size = size
    //   this.$store.dispatch('app/setSize', size)
      this.$store.commit('zzb/SET_BOOK_NO',book_no)
      this.refreshView()
      this.$message({
        message: '切换成功',
        type: 'success'
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route
        
      this.$nextTick(() => {
        this.$router.push({
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>
