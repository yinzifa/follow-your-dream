<template>
  <div class="about-page-container">
    <span @click="handleClick">去 my page</span>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  methods: {
    handleClick() {
      this.$router.push({
        path: "/my",
        query: {
          test: 1
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
