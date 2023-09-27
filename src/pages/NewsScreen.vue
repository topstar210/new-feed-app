<template>
  <div class="news-layout">
    <div class="top-bar">
      <button class="back-btn btn-basic" @click="gotoHome">
        <img :src="backIcon" width="30" alt="back" />
      </button>
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
  import backIcon from '../assets/back.png';
</script>

<script>
import GameCardsStack from "../components/GameCardsStack";

export default {
  name: "NewsScreen",

  components: {
    GameCardsStack,
  },

  data() {
    return {
      visibleCards: ["Test1", "Test2", "Test3"],
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
      this.$router.push('/')
    }
  }
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
.card-area {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
  position: relative;
}
</style>
