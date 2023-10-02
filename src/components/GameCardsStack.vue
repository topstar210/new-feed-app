<template>
  <div class="cards">
    <GameCard
      v-for="(card, index) in cards"
      :key="card"
      :card="card"
      :is-current="index === 0"
      :isLike="index === 0 && isLike"
      :isDisLike="index === 0 && isDisLike"
      @cardAccepted="$emit('cardAccepted', card)"
      @cardRejected="$emit('cardRejected')"
      @cardSkipped="$emit('cardSkipped')"
      @hideCard="$emit('hideCard')"
    />
  </div>
</template>

<script>
import GameCard from "../components/GameCard";

export default {
  components: {
    GameCard,
  },
  data() {
    return {
      isLike: false,
      isDisLike: false
    };
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
    likeCard: {
      type: Boolean,
      required: true,
    },
    dislikeCard: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    likeCard(newValue) {
      this.isLike = newValue;
    },
    dislikeCard(newValue) {
      this.isDisLike = newValue;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  margin: 25px;
  width: 350px;
}

@media (max-width: 400px) {
  .cards {
    margin: 20px;
  }
}
</style>
