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
    <div class="control-area">
      <div class="button-frame">
        <button class="button-takedown"></button>
      </div>
      <div class="button-frame">
        <button class="button-leaveup"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import backIcon from "../assets/back.png";
</script>

<script>
// import { parse } from "node-html-parser";
// import axios from "axios";

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
      if (ind == -1) storeData.push(acceptedCard);
      localStorage.setItem("likeData", JSON.stringify(storeData));

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
    // const response = await axios.get(
    //   "https://cors-anywhere.herokuapp.com/https://feeder.co/out/folder/e372a60a28.rss"
    // );
    // const root = parse(response.data);
    // const feedAry = root.getElementsByTagName("item");
    // const newsFeed = feedAry.map((item) => {
    //   const linkInd = item.childNodes.findIndex((val) => val?.rawTagName == "link");
    //   const link = item.childNodes[linkInd + 1]?._rawText;
    //   return {
    //     title: item.getElementsByTagName("title")[0].childNodes[0]._rawText,
    //     media: item.getElementsByTagName("media:content")[0]?.getAttribute("url"),
    //     feeder: item.getElementsByTagName("feeder:image")[0]?.getAttribute("url"),
    //     description:
    //       item.getElementsByTagName("description")[0].childNodes[0]?._rawText ?? "",
    //     pubDate: item.getElementsByTagName("pubDate")[0].childNodes[0]?._rawText,
    //     guid: item.getElementsByTagName("guid")[0].childNodes[0]?._rawText,
    //     source: {
    //       url: item.getElementsByTagName("source")[0]?.getAttribute("url"),
    //     },
    //     link,
    //   };
    // });
    // this.visibleCards = newsFeed;
    this.visibleCards = [
      {
        title: "The Energy Dilemma and AI’s Soaring Consumption",
        feeder: "https://icons.feedercdn.com/www.cryptopolitan.com",
        description:
          "&lt;p&gt;Artificial intelligence (AI) is poised to become the most influential technological advancement since the internet, driving excitement in the stock market. However, this AI surge comes with a significant downside: an unprecedented increase in energy consumption. &lt;/p&gt;\n\n\n\n&lt;p&gt;AI’s breakthrough is undeniable, but it’s not without consequences. OpenAI’s ChatGPT, a popular AI-powered chatbot, exemplifies the energy dilemma. Research from the University of Washington reveals that hundreds of millions of queries to ChatGPT can devour approximately 1 gigawatt-hour of energy daily. This is equivalent to the energy consumption of 33,000 US households.&lt;/p&gt;\n\n\n\n&lt;p&gt;Sajjad Moazeni, a professor of electrical and computer engineering at UW, highlights the stark contrast in energy consumption between ChatGPT and email inquiries. ChatGPT’s power demands are estimated to be 10 to 100 times greater.&lt;/p&gt;\n\n\n\n&lt;p&gt;Arijit Sengupta, CEO of Aible, a leading enterprise AI solutions provider, warns that this is just the tip of the iceberg. He predicts a looming energy crisis due to AI unless urgent measures are taken.&lt;/p&gt;\n\n\n\n&lt;h2 class=&quot;wp-block-heading&quot;&gt;Data centers: The energy core of AI&lt;/h2&gt;\n\n\n\n&lt;p&gt;Data centers are at the heart of AI’s energy consumption. These facilities house thousands of processing units and servers and are central to the cloud computing industry, primarily managed by tech giants like Google, Microsoft, and Amazon.&lt;/p&gt;\n\n\n\n&lt;p&gt;Angelo Zino, VP and senior equity analyst at CFRA Research, underscores the pivotal role of data centers as AI models grow larger. As AI relies heavily on graphics processing units (GPUs), energy-intensive components, energy demand is set to soar. GPUs consume 10 to 15 times more power per processing cycle than traditional CPUs.&lt;/p&gt;\n\n\n\n&lt;h2 class=&quot;wp-block-heading&quot;&gt;Rising energy consumption becomes a global concern&lt;/h2&gt;\n\n\n\n&lt;p&gt;Research by Benjamin C. Lee and Professor David Brooks revealed that data center energy usage surged by 25% annually between 2015 and 2021, preceding the explosion in generative AI and ChatGPT usage.&lt;/p&gt;\n\n\n\n&lt;p&gt;Meanwhile, renewable energy deployment in the US grew at an annual rate of 7% during the same period. However, this growth is expected to accelerate with initiatives like the Inflation Reduction Act.&lt;/p&gt;\n\n\n\n&lt;p&gt;The disparity between data center energy growth and renewable energy adoption poses a significant challenge. As Lee points out, cloud computing may seem costless, but it entails substantial infrastructure costs.&lt;/p&gt;\n\n\n\n&lt;h2 class=&quot;wp-block-heading&quot;&gt;The green pledge of tech giants&lt;/h2&gt;\n\n\n\n&lt;p&gt;To address energy concerns, major cloud providers, including Google Cloud, Microsoft Azure, and Amazon Web Services, invest in renewable energy to match their annual electricity consumption. They pledge to achieve net-zero emissions and remove as much carbon as they emit.&lt;/p&gt;\n\n\n\n&lt;p&gt;– Microsoft’s Azure, carbon neutral since 2012, aims to be carbon negative by 2030.&lt;/p&gt;\n\n\n\n&lt;p&gt;– Amazon plans to power its operations with 100% renewable energy by 2025 and achieve net-zero carbon emissions by 2040.&lt;/p&gt;\n\n\n\n&lt;p&gt;– Google targets net-zero emissions across all operations by 2030.&lt;/p&gt;\n\n\n\n&lt;p&gt;However, achieving net-zero doesn’t guarantee being carbon-free. During low renewable energy availability, cloud providers still draw energy from the grid.&lt;/p&gt;\n\n\n\n&lt;h2 class=&quot;wp-block-heading&quot;&gt;Reshaping data center operations&lt;/h2&gt;\n\n\n\n&lt;p&gt;Researchers like Lee explore strategies to shift or reschedule data center computations based on the availability of carbon-free energy. This approach optimizes energy consumption by performing more tasks during periods of abundant renewable energy.&lt;/p&gt;\n\n\n\n&lt;p&gt;Efficiency is a driving force in the industry. Companies are actively seeking ways to reduce energy consumption in AI workloads. Technologies like serverless computing, which optimally allocates resources on demand, offer significant energy savings.&lt;/p&gt;\n\n\n\n&lt;p&gt;KPMG’s US climate data and technology leader, Tegan Keele, emphasizes the multifaceted reasons for efficiency improvements. Factors such as emissions reduction, financial benefits, investor pressures, and operational cost reductions all contribute to this focus.&lt;/p&gt;\n\n\n\n&lt;h2 class=&quot;wp-block-heading&quot;&gt;Consolidation in the cloud&lt;/h2&gt;\n\n\n\n&lt;p&gt;As energy efficiency becomes paramount, data center operators are poised to emerge as winners. The consolidation of data usage is anticipated to concentrate in the hands of a few major companies. More businesses are turning to cloud services rather than building their own data centers due to anticipated cost escalations.&lt;/p&gt;\n\n\n\n&lt;p&gt;AI’s remarkable advancements come with a steep energy price. The growth of data centers and the energy-intensive nature of AI models pose challenges to sustainability. While tech giants pledge to reduce their carbon footprint, a concerted effort to optimize energy consumption and adopt efficient technologies is imperative. The future of AI will depend on its ability to innovate and minimize its environmental impact as it continues to shape our world.&lt;/p&gt;",
        pubDate: "Sat, 30 Sep 2023 15:14:45 -0000",
        guid: "3a47da6f-5fa4-11ee-ae9b-1a21cf3a468a",
        source: {
          url: "https://www.cryptopolitan.com",
        },
        link: "https://www.cryptopolitan.com/energy-dilemma-and-ais-soaring-consumption/",
      },
    ];
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
