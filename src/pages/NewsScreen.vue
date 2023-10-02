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
        :like-card="likeCard"
        :dislike-card="dislikeCard"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @cardSkipped="handleCardSkipped"
        @hideCard="removeCardFromDeck"
      />
      <div class="loadding" v-if="loading">
        <img :src="loadingIcon" width="100" alt="" />
      </div>
      <div class="showing-issue" v-if="issueMsg!==''">
        {{ issueMsg }}
      </div>
    </div>
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
</template>

<script setup>
import backIcon from "../assets/back.png";
import loadingIcon from "../assets/loading.gif";
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
      loading: false,
      visibleCards: [],
      likeCard: false,
      dislikeCard: false,

      issueMsg: ""
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
      this.$router.push("/");
    },
    openNews() {
      if(this.visibleCards.length){
        window.open(this.visibleCards[0].link, 'popup');
      }
    }
  },
  async created() {
    this.loading = true;
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://feeder.co/out/folder/e372a60a28.rss"
      );
      const root = parse(response.data);
      const feedAry = root.getElementsByTagName("item");
      const newsFeed = feedAry.map((item) => {
        const linkInd = item.childNodes.findIndex((val) => val?.rawTagName == "link");
        const link = item.childNodes[linkInd + 1]?._rawText;
        return {
          title: item.getElementsByTagName("title")[0].childNodes[0]._rawText,
          media: item.getElementsByTagName("media:content")[0]?.getAttribute("url"),
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

.loadding{
  display: flex;
  justify-content: center;
  align-items: center;
}
.showing-issue{
  text-align: center;
}
</style>
