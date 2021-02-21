<template>
  <div class="portfolio-container" :style="`min-height: 100vh !important;`">
    <scroll class="scroll-component" />
    <div class="h-screen flex items-center justify-center flex-col">
      <div class="title-container text-black dark:text-white category">
        <h1 class="title font-futura-bold text-black dark:text-white mt-4">
          portfolio
        </h1>
        <span v-if="skillName" class="font-futura-bold">{{ skillName }}</span>
      </div>
      <span class="genre">
        <nuxt-link
          to="/portfolio/year/"
          class="genre-name font-fot"
          :class="{ selected: genre === 'year' }"
        >
          年数ごと
        </nuxt-link>
        <span
          class="border-r border-gray-500 dark:border-white border-solid h-6 mx-4"
        />
        <nuxt-link
          to="/portfolio/category/"
          class="genre-name font-fot"
          :class="{ selected: genre === 'category' }"
        >
          カテゴリ
        </nuxt-link>
      </span>
      <span v-if="skills.length > 0">
        <nuxt-link
          v-for="skill in skills"
          :key="skill.fields.id"
          class="icon-container"
          :to="`/portfolio/category/${skill.fields.id}/`"
        >
          <tooltip
            class="icon-wrapper"
            bottom
            :text="skill.fields.name"
            @clickEvent="setCategory(skill.fields)"
          >
            <template v-slot:content>
              <img
                :src="require(`~/assets/images/skills/${skill.fields.id}.png`)"
                :alt="skill.fields.name"
              />
            </template>
          </tooltip>
        </nuxt-link>
      </span>
    </div>
    <div v-if="filterContents.length > 0">
      <div
        v-for="content in filterContents"
        :key="content.sys.id"
        class="contents-container"
        :style="`height: 100vh;`"
      >
        <template v-show="computeIsPc">
          <div class="screen">
            <img src="~/assets/images/portfolio/sp.png" alt="sp" />
            <div class="iframe-container">
              <iframe :src="content.fields.url" />
            </div>
          </div>
        </template>
        <div class="text-container">
          <h2>{{ content.fields.title }}</h2>
          <p>{{ content.fields.description }}</p>
          <div>
            <nuxt-link
              v-for="skill in content.fields.skills"
              class="icon-container"
              :to="`/portfolio/category/${skill.fields.id}/`"
              :key="`${content.sys.id}-${skill.fields.id}`"
            >
              <tooltip
                class="icon-wrapper"
                bottom
                :text="skill.fields.name"
                @clickEvent="setCategory(skill.fields)"
              >
                <template v-slot:content>
                  <img
                    :src="
                      require(`~/assets/images/skills/${skill.fields.id}.png`)
                    "
                    :alt="skill.fields.name"
                  />
                </template>
              </tooltip>
            </nuxt-link>
            <a
              v-show="content.fields.github"
              class="icon-container github"
              :href="content.fields.github"
              target="_blank"
            >
              <tooltip class="icon-wrapper" bottom text="GitHub">
                <template v-slot:content>
                  <img
                    src="~/assets/images/portfolio/github-dark.png"
                    alt="github"
                    v-if="theme === 'dark'"
                  />
                  <img
                    src="~/assets/images/portfolio/github-light.png"
                    alt="github"
                    v-else
                  />
                </template>
              </tooltip>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Theme } from "~/types/type";
import screenHeight from "~/mixins/screenHeight";
import { DateTime } from "luxon";
import createClient from "~/plugins/contentful";
import { Genre, CtfPortfolio } from "~/types/type";
import { Entry } from "contentful";
import PortfolioTitle from "~/components/PortfolioTitle.vue";
import Scroll from "~/components/Scroll.vue";
import Tooltip from "~/components/Tooltip.vue";
// import sal from 'sal.js'

const client = createClient();

type LinkedSkill = {
  sys: {
    type: string;
    linkType: string;
    id: string;
  };
};

export default Vue.extend({
  // screenWidth, screenHeight
  mixins: [screenHeight],
  components: {
    Scroll,
    Tooltip,
  },
  data: () => {
    return {
      year: DateTime.local().toFormat("yyyy") as string,
      category: "" as string,
      genre: "category" as Genre,
      theme: "light" as Theme,
    };
  },
  async asyncData({ error, params, payload }) {
    if (payload) {
      return {
        skills: payload.skills,
        contents: payload.contents,
        skillName: payload.skillName,
      };
    }
    try {
      const s_entries = await client.getEntries({
        content_type: "skillSet",
      });
      const p_entries = await client.getEntries({
        content_type: "portfolio",
      });
      const skill = s_entries.items.find(
        (item) => (item as any).fields.id === params.id
      );
      return {
        skills: s_entries.items,
        contents: p_entries.items,
        skillName: (skill as any).fields.name,
      };
    } catch (err) {
      error({ statusCode: 503, message: "Data not found" });
    }
  },
  computed: {
    filterContents(): Entry<CtfPortfolio<LinkedSkill>>[] {
      const contents = ((this as unknown) as {
        contents: Entry<CtfPortfolio<LinkedSkill>>[];
      }).contents;
      if (contents && contents.length > 0) {
        const genre: Genre | undefined = (this.$route.query as { genre: Genre })
          .genre;
        // 言語の場合
        if (genre) {
          // 選択されたスキルがあればそれに一致するコンテンツを返す
          const id = this.$route.params.id;
          if (id) {
            const filter = contents.filter((item) => {
              const skills = item.fields.skills;
              return skills.some((_item) => _item.sys.id === id);
            });
            return filter;
          }
        } else {
          // 年ごとの場合
          const filter = contents.filter(
            (item) => item.fields.created_year === this.year
          );
          return filter;
        }
      }
      return [];
    },
  },
  head() {
    return {
      title: "ポートフォリオ | RyoTa.",
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: "ポートフォリオ | RyoTa.",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.portfolio-container {
  .genre {
    display: inline-block;
    margin-top: 50px;
    @apply flex items-center;
    .genre-name {
      @apply cursor-pointer px-4 py-2 dark:text-gray-400 text-gray-300;
      font-size: 12px;
      &.selected {
        @apply text-black dark:text-white;
      }
    }
    @screen xs {
      margin-top: 20px;
    }
  }
  .title-container {
    @apply flex justify-center items-center flex-col-reverse;
    .year,
    .category {
      font-size: 100px;
      font-weight: bold;
      line-height: 90px;
      @apply sm:text-5xl;
    }
    .title {
      font-size: 40px;
      font-weight: bold;
      letter-spacing: 2px;
      @apply sm:text-2xl;
    }
    @screen xs {
      .title {
        font-size: 30px;
      }
      .year,
      .category {
        font-size: 60px;
        line-height: 50px;
        word-break: break-all;
      }
    }
  }
  .scroll-component {
    @apply fixed;
    bottom: 10px;
    left: 10px;
    @screen sm {
      transform: scale(0.8);
      transform-origin: left bottom;
    }
  }
  .category {
    font-size: 100px;
    font-weight: bold;
    line-height: 90px;
    @apply sm:text-5xl;
  }
  .top-container {
    width: 100%;
    height: 100%;
    @apply flex justify-center items-center flex-col;
    .top-icon-container {
    }
  }
  .contents-container {
    @apply flex;
    .screen {
      @apply flex justify-center items-center relative;
      width: 40%;
      min-width: 420px;
      @screen md {
        display: none;
      }
      img {
        height: 700px;
      }
      .iframe-container {
        @apply absolute;
        height: 525px;
        width: 265px;
        top: 50%;
        left: 50%;
        transform: translate(-66%, -63%) scale(0.6);
        display: inline-block;
      }
      iframe {
        width: 160%;
        height: 160%;
        border-radius: 20px;
        html {
          overflow-y: scroll;
          -ms-overflow-style: none; /* IE, Edge 対応 */
          scrollbar-width: none; /* Firefox 対応 */
          &::-webkit-scrollbar {
            /* Chrome, Safari 対応 */
            display: none;
          }
        }
      }
    }
    .text-container {
      width: 60%;
      box-sizing: border-box;
      padding: 64px;
      padding-top: 150px;
      @apply text-black dark:text-white md:w-full flex justify-center flex-col;
      @screen md {
        display: block;
      }
      @screen sm {
        padding: 70px 20px 100px;
      }
      h2 {
        font-size: 30px;
        font-weight: bold;
        @apply mb-8 sm:text-2xl sm:mt-4 sm:mb-4;
      }
      p {
        line-height: 2.5rem;
        @apply sm:text-sm sm:leading-8;
      }
    }
  }
}
.icon-container {
  width: 50px;
  height: 50px;
  display: inline-block;
  box-sizing: border-box;
  @apply m-2 ml-0 mr-3 mt-8 cursor-pointer md:w-10 md:h-10;
  .icon-wrapper {
    @apply w-full h-full;
    display: inline-block;
  }
  img {
    @apply inline-block w-full h-full;
  }
  &.github {
    margin-left: 30px;
    position: relative;
    width: 90px;
    padding-left: 40px;
    @apply border-black border-l dark:border-white;
    @screen md {
      width: 71px;
      padding-left: 30px;
      margin-left: 20px;
    }
  }
}
</style>

<style lang="scss">
/* @import "../node_modules/sal.js/dist/sal.css"; */
</style>
