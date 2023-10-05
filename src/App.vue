<template>
  <div id="screen-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import "./styles/global.scss";
#app {
  color: #fff;
  background: rgb(63, 63, 63);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#screen-container {
  background-color: var(--stack-bg-color);
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 860px;
  min-width: 320px;
  overflow: hidden;
}

@media (max-width: 900px) {
  #screen-container {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
