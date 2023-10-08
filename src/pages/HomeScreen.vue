<template>
  <div class="launch-screen">
    <div>
      <div class="logo">
        <Vue3Lottie :animationData="logoJSON" :height="100" />
        <div>by <b>zonecrypto.com</b></div>
      </div>
      <div class="btn-list">
        <button class="btn-basic" @mouseover="hoveritem='newsfeed'" @mouseleave="hoveritem=''" @click="$router.push('/news')">
          <img :src="hoveritem=='newsfeed'?hovernewsFeedIcon:newsFeedIcon" alt="" />
          News Feed
        </button>
        <button class="btn-basic" @mouseover="hoveritem='savednews'" @mouseleave="hoveritem=''" @click="$router.push('/like-news')">
          <img :src="hoveritem=='savednews'?hoversavedIcon:savedIcon" alt="" />
          Saved News
        </button>
        <button class="btn-basic" @mouseover="hoveritem='about'" @mouseleave="hoveritem=''">
          <img :src="hoveritem=='about'?hoveraboutIcon:aboutIcon" alt="" />
          About
        </button>
      </div>
      <div class="footer">
        <Vue3Lottie :animationData="zonecrypto" width="50%" />
      </div>
    </div>
  </div>
</template>

<script setup>
import logoJSON from "../assets/sorter-icon.json";
import newsFeedIcon from "../assets/Huge-icon.svg";
import savedIcon from "../assets/Subtract.svg";
import aboutIcon from "../assets/about.svg";
import hovernewsFeedIcon from "../assets/Huge-icon-hover.svg";
import hoversavedIcon from "../assets/Subtract-hover.svg";
import hoveraboutIcon from "../assets/about-hover.svg";
import zonecrypto from "../assets/zonecrypto-animated.json";
</script>
<script>
import { Vue3Lottie } from "vue3-lottie";

export default {
  name: "HomeScreen",
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      hoveritem: ""
    }
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: grid;
  margin-top: 90px;
  img {
    margin: auto;
  }
  > div {
    text-align: center;
    font-weight: 500;
    font-size: 13.7px;
  }
}
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
  background: url(../assets/Dolphin_fin.png);
  background-position: center;
  background-size: cover;
}
.launch-screen > div {
  width: 100%;
  height: 100%;
  background: rgb(39, 39, 39, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.btn-list {
  padding: 3rem;

  button {
    width: 100%;
    position: relative;
    img {
      position: absolute;
      left: 18px;
      margin-top: 5px;
    }
  }
}

.footer {
  display: flex;
  justify-content: center;
}
</style>
