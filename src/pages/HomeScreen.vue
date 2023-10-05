<template>
  <div class="launch-screen">
    <div>
      <div class="logo">
        <img :src="logoIcon" alt="logo" />
        <div>by <b>zonecrypto.com</b></div>
      </div>
      <div class="btn-list">
        <button class="btn-basic highlight" @click="$router.push('/news')">
          <img :src="newsFeedIcon" alt="" />
          News Feed
        </button>
        <button class="btn-basic" @click="$router.push('/like-news')">
          <img :src="savedIcon" alt="" />
          Saved News
        </button>
        <button class="btn-basic"><img :src="aboutIcon" alt="" />About</button>
      </div>
      <div class="footer">
        <img :src="logo" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import logoIcon from "../assets/sorter_logo.svg";
import newsFeedIcon from "../assets/Huge-icon.svg";
import savedIcon from "../assets/Subtract.svg";
import aboutIcon from "../assets/about.svg";
import logo from "../assets/zonecrypto-svglogo.svg";
</script>
<script>
export default {
  name: "HomeScreen",
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
    }
  }
}

.footer{
  display: flex;
  justify-content: center;
  img{
    width: 50%;
  }
}
</style>
