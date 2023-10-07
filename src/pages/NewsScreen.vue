<template>
  <div class="news-layout">
    <div class="top-bar">
      <div class="back-btn" @click="gotoHome">
        <img :src="backIcon" width="15" alt="back" />
      </div>
      <div>
        <Vue3Lottie :animationData="zonecrypto" :width="80"  />
      </div>
      <div class="about-btn">
        <img :src="aboutIcon" width="25" alt="back" />
      </div>
    </div>
    <div
      class="card-area"
      @mousedown="cursorShowing(300, 15000)"
      @touchstart="cursorShowing(300, 15000)"
      @mousemove="cursorShowing(300, 15000)"
      @touchmove="cursorShowing(300, 15000)"
    >
      <GameCardsStack
        v-if="!loading"
        :cards="visibleCards"
        :like-card="likeCard"
        :dislike-card="dislikeCard"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @cardSkipped="handleCardSkipped"
        @hideCard="removeCardFromDeck"
      />
      <div class="loadding" v-if="loading">
        <Vue3Lottie :animationData="loaddingJSON" :height="150" :width="200" />
      </div>
      <div class="showing-issue" v-if="issueMsg !== ''">
        {{ issueMsg }}
      </div>
      <div class="promptbox" ref="promptBox" v-if="!loading && issueMsg == ''">
        <div class="tapperoo"></div>
        <svg
          version="1.1"
          class="tap-gesture"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="140.2 0 293.8 500"
          enable-background="new 140.2 0 293.8 500"
          xml:space="preserve"
        >
          <g>
            <path
              class="hand"
              fill="rgba(0,0,0,0.8)"
              d="M173.2,170.2l1.8,86.2c-3.3,1.8-8.3,5.1-14.7,10.9c-22.1,20-29.3,68.7-4.3,106.3
		c27.8,41.9,60.4,59.8,109,59.8c51.5,0,68.7-25.8,81.9-52.3c12.7-25.5,12.9-122.9,12.9-127.1c0-13-12.3-24.5-26.4-24.5
		c-1.7,0-5.9,0.6-10.2,1.9c-1.1-14.7-13.4-26.4-28.5-26.4c-6.8,0-13,2.4-17.9,6.3c-3.6-11-13.2-18.5-25-18.5
		c-7.8,0-14.8,3.2-19.8,8.5l-1.3-35.1l-0.6-15.9l-0.9-24.8c0-17.4-12.3-30.6-28.6-30.6S172,108,172,125.6l0.6,29.7L173.2,170.2z"
            />
          </g>
        </svg>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="control-area">
        <div class="button-frame">
          <button class="button-takedown" @click="dislikeCard = true"></button>
        </div>
        <div class="button-frame small">
          <button class="button-opennews" @click="openNews"></button>
        </div>
        <div class="button-frame">
          <button class="button-leaveup" @click="likeCard = true"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import aboutIcon from "../assets/about.png";
import backIcon from "../assets/back.png";
import zonecrypto from "../assets/zonecrypto-animated.json";
import loaddingJSON from '../assets/animation-loading.json';
</script>

<script>
import axios from "axios";
import GameCardsStack from "../components/GameCardsStack";
import { Vue3Lottie } from 'vue3-lottie'

export default {
  name: "NewsScreen",

  components: {
    GameCardsStack,
    Vue3Lottie,
  },

  data() {
    return {
      loading: false,
      visibleCards: [],
      likeCard: false,
      dislikeCard: false,

      issueMsg: "",
      fadein: null,
    };
  },

  methods: {
    handleCardAccepted(data) {
      const storeData = JSON.parse(localStorage.likeData ?? JSON.stringify([]));
      const acceptedCard = Object.assign({}, data);
      const ind = storeData.findIndex((val) => acceptedCard.guid == val.guid);
      if (ind == -1) storeData.push(acceptedCard);
      localStorage.setItem("likeData", JSON.stringify(storeData));

      this.likeCard = false;

      console.log("handleCardAccepted");
    },
    handleCardRejected() {
      this.dislikeCard = false;

      console.log("handleCardRejected");
    },
    handleCardSkipped() {
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      this.visibleCards.shift();
    },

    gotoHome() {
      clearTimeout(this.fadein);
      this.$router.push("/");
    },
    openNews() {
      if (this.visibleCards.length) {
        window.open(this.visibleCards[0].link, "popup");
      }
    },

    cursorShowing(fadeOutTime, fadeInAfterTime) {
      if (this.loading) return;
      if(!this.$refs?.promptBox) return
      setTimeout(() => {
        this.$refs.promptBox.style.transition = `${fadeOutTime}ms`;
        this.$refs.promptBox.style.opacity = "0";
        if (this.fadein != null) {
          clearTimeout(this.fadein);
        }
        this.fadein = setTimeout(this.showMe, fadeInAfterTime);
      }, 300);
    },
    showMe() {
      if(!this.$refs?.promptBox) return
      this.$refs.promptBox.style.opacity = "1";
    },
  },
  async created() {
    this.loading = true;
    try {
      const response = await axios.get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://feeder.co/out/folder/e372a60a28.rss&api_key=3qdm7zptkuwegyy5o5yuibs8pvcumt6dfhngmoyt&count=1000"
      );
      const { items } = response.data;
      this.visibleCards = items;
    } catch (err) {
      console.error(err);
      this.issueMsg = err.message;
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.news-layout {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: absolute;
  z-index: 500;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--stack-bg-color);
  background-position: 0 0, 3px 3px;
  background-size: 6px 6px;
}

.loadding {
  display: flex;
  justify-content: center;
  align-items: center;
}
.showing-issue {
  text-align: center;
}
</style>
