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
import backIcon from "../assets/back.png";
</script>

<script>
import { parse } from "node-html-parser";
import axios from "axios";

import GameCardsStack from "../components/GameCardsStack";

export default {
  name: "NewsScreen",

  components: {
    GameCardsStack,
  },

  data() {
    return {
      visibleCards: [],
    };
  },

  methods: {
    handleCardAccepted(data) {
      const storeData = JSON.parse(localStorage.likeData ?? JSON.stringify([]));
      const acceptedCard = Object.assign({}, data);
      const ind = storeData.findIndex((val) => acceptedCard.guid == val.guid);
      if(ind == -1) storeData.push(acceptedCard);
      localStorage.setItem('likeData', JSON.stringify(storeData));

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
    const response = await axios.get('https://cors-anywhere.herokuapp.com/https://feeder.co/out/folder/e372a60a28.rss');
    const root = parse(response.data);
    const feedAry = root.getElementsByTagName("item");
    const newsFeed = feedAry.map((item) => {
      const linkInd = item.childNodes.findIndex((val) => val?.rawTagName == "link");
      const link = item.childNodes[linkInd + 1]?._rawText;
      return {
        title: item.getElementsByTagName("title")[0].childNodes[0]._rawText,
        media: item
          .getElementsByTagName("media:content")[0]
          ?.getAttribute("url"),
        feeder: item.getElementsByTagName("feeder:image")[0]?.getAttribute("url"),
        description:
          item.getElementsByTagName("description")[0].childNodes[0]?._rawText ?? "",
        pubDate: item.getElementsByTagName("pubDate")[0].childNodes[0]?._rawText,
        guid: item.getElementsByTagName("guid")[0].childNodes[0]?._rawText,
        source: {
          url: item.getElementsByTagName("source")[0]?.getAttribute("url"),
        },
        link,
      };
    });
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
.card-area {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
  position: relative;
}
</style>
