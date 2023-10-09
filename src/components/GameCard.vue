<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent,
    }"
    class="card"
    :style="{ transform: transformString }"
  >
    <div :style="{ backgroundImage: 'url(' + getDataFromContant(card.content)[0] + ')' }">
      <small class="cardPubDate">{{ formatDate(card.pubDate) }}</small>
      <div class="data">
        <div class="content">
          <span class="author">{{ getDomain(card.link) }}</span>
          <h1 class="title">
            <a href="#">{{ card.title }}</a>
          </h1>
          <p class="text">
            {{ getDataFromContant(card.content)[1] }}
          </p>
        </div>
        <div style="text-align: center">
          <a :href="card.link" class="button" target="_blank">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import parse from "node-html-parser";
import interact from "interact.js";
const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100,
  },

  props: {
    card: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
    isLike: {
      type: Boolean,
      required: true,
    },
    isDisLike: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },
    };
  },

  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    },
  },

  mounted() {
    interact(this.$refs.interactElement).unset();

    const element = this.$refs.interactElement;

    interact(element).draggable({
      inertia: true,

      onstart: () => {
        this.isInteractAnimating = false;
      },

      onmove: (event) => {
        const { interactMaxRotation, interactXThreshold } = this.$options.static;
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;
        if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
        else if (y > interactYThreshold) this.playCard(SKIP_CARD);
        else this.resetCardPosition();
      },
    });
  },
  watch: {
    isLike(newValue) {
      console.log(`isLike--------- ${newValue}`);
      this.playCard(ACCEPT_CARD);
    },
    isDisLike(newValue) {
      console.log(`isDisLike--------- ${newValue}`);
      this.playCard(REJECT_CARD);
    },
  },
  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit("hideCard", this.card);
      }, 300);
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation,
      } = this.$options.static;

      this.interactUnsetElement();

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation,
          });
          this.$emit(ACCEPT_CARD);
          break;
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation,
          });
          this.$emit(REJECT_CARD);
          break;
        case SKIP_CARD:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate,
          });
          this.$emit(SKIP_CARD);
          break;
      }

      this.hideCard();
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    },

    htmlDecode(input) {
      let doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    },

    getDomain(url) {
      const domainName = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)[1];
      return domainName;
    },

    getDataFromContant(content) {
      const root = parse(content, {
        lowerCaseTagName: false,
        comment: false,
        voidTag: {
          tags: ["img", "source"],
          closingSlash: true,
        },
      });

      return [
        root.getElementsByTagName("img")[0]?.getAttribute("src"),
        root.getElementsByTagName("p")[0]?.innerText,
      ];
    },

    formatDate(dateVal) {
      const date = new Date(dateVal);
      const options = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      return formattedDate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

$cardsTotal: 25;
$cardsWidth: 350px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.1em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(calc(100% - 10px) 100%);
  @include flex-center();

  display: flex;
  max-height: 600px;
  margin: auto;
  color: $c-white;
  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;
  overflow: hidden;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    background-size: cover;
    background-position: center;
    border-radius: 11px;
    .cardPubDate {
      padding: 10px 15px;
    }
    &:hover {
      .data {
        transform: translateY(0);
      }
    }
    .data {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 200px;
      transform: translateY(calc(80px + 1em));
      transition: transform 0.3s;
      background: linear-gradient(-180deg, #27272700 2%, #000 100%);
      .content {
        padding: 1em;
        position: relative;
        height: 136px;
        overflow: hidden;
        z-index: 1;
        h1 > a {
          color: #fff;
          text-decoration: none;
        }
        .button {
          text-align: center;
        }
      }
    }
  }
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index * -1;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    transform: translateY($translation) scale($scale);
    @if $i < 4 {
      border: 5px solid;
      border-color: $card-border;
      opacity: 1;
    }

    @if $i == 3 {
      background-color: $c-red-25;
    } @else if $i == 2 {
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;
    }
  }
}

@media (max-height: 600px) {
  .card {
    height: 60vh;
  }
}
</style>
