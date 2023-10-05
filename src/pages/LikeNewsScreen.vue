<template>
  <div class="news-layout">
    <div class="top-bar">
      <div class="back-btn" @click="gotoHome">
        <img :src="backIcon" width="15" alt="back" />
      </div>
      <div>
        <img :src="homeIcon" width="60" alt="back" />
      </div>
      <div class="about-btn">
        <img :src="aboutIcon" width="25" alt="back" />
      </div>
    </div>
    <div class="card-area">
      <GameCardsStack
        :cards="visibleCards"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @cardSkipped="handleCardSkipped"
        @hideCard="removeCardFromDeck"
      />
    </div>
  </div>
</template>

<script setup>
import aboutIcon from "../assets/about.png";
import backIcon from "../assets/back.png";
import homeIcon from "../assets/zonecrypto-svglogo.svg";
</script>

<script>
import GameCardsStack from "../components/GameCardsStack";

export default {
  name: "LikeNewsScreen",

  components: {
    GameCardsStack,
  },

  data() {
    return {
      visibleCards: [],
    };
  },

  methods: {
    handleCardAccepted() {
      console.log("handleCardAccepted");
    },
    handleCardRejected() {
      console.log("handleCardRejected");
    },
    handleCardSkipped() {
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      this.visibleCards.shift();
    },

    gotoHome() {
      this.$router.push("/");
    },
  },

  async created() {
    const newsFeed = JSON.parse(localStorage.likeData ?? JSON.stringify([]));
    this.visibleCards = newsFeed;
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
  background-image: linear-gradient(
      45deg,
      hsla(0, 0%, 0%, 0.25) 25%,
      transparent 25%,
      transparent 75%,
      hsla(0, 0%, 0%, 0.25) 75%,
      hsla(0, 0%, 0%, 0.25)
    ),
    linear-gradient(
      45deg,
      hsla(0, 0%, 0%, 0.25) 25%,
      transparent 25%,
      transparent 75%,
      hsla(0, 0%, 0%, 0.25) 75%,
      hsla(0, 0%, 0%, 0.25)
    );
  background-position: 0 0, 3px 3px;
  background-size: 6px 6px;
}
</style>
