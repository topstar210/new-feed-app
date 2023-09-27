<template>
  <div class="launch-screen">
    <div>
      <div class="logo" style="margin-bottom:10px">News Feed</div>
      <button class="btn-basic highlight" @click="goToNewsScreen">View News</button>
      <button class="btn-basic">My favorites</button>
      <button class="btn-basic">About</button>
      <div>
        Contact info for convenient chat
        <a href="https://t.me/AlSmile0210">telegram</a> <br />
        <a href="https://join.skype.com/invite/u7wpUCf5vKVC">Skype</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeScreen",

  methods: {
    goToNewsScreen() {
        this.$router.push('/news')
    }
  }
};
</script>

<style scoped>
.launch-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  padding: 3rem;
  background: var(--modal-bg-color);
}
.launch-screen > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  max-height: 100%;
  overflow: hidden;
}
</style>
