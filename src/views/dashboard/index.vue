<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <img
        src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    background-color: #e3e3e3;
    margin: 30px;
    text-align: center;
    padding-top: 100px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
