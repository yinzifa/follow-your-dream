<template>
  <div class="my-page-container">
    <span @click="handleClick">去 about page</span>
  </div>
</template>

<script>
export default {
  name: "MyPage",
  methods: {
    handleClick() {
      this.$router.push({
        name: "AboutPage",
        params: {
          test: 2
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
