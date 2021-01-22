<template>
  <div>付款管理页面</div>
</template>

<script>
export default {
  name: "payManage",
  data() {
    return {};
  },
  created() {
    // 如果之前登录过，需要处理url带参数问题。
    if (window.location.href.includes("index")) {
      let hostUrl = window.location.href.split("?")[0].split("#")[0];
      hostUrl = hostUrl.slice(0, hostUrl.length - 1);
      console.log("hostUrl", hostUrl);
      setTimeout(() => {
        window.location.href = hostUrl;
      }, 500);
    }
  },
};
</script>

<style>
</style>