<script setup>
import { ref } from 'vue';

defineProps({
  /** Article items */
  items: {
    type: Array,
    required: true,
  },
  /** Whether is timeline or not */
  isTimeline: Boolean,
});

const scrollContainer = ref(null);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft -= 300;
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += 300;
  }
};
</script>

<template>
  <div class="article-wrapper">
    <div v-if="!items.length">Nothing in here.</div>

    <template v-if="items.length > 0 && items.every(item => item.info.category && item.info.category.includes('电影推荐'))">
      <div class="movie-carousel-container">
        <button class="carousel-control prev" @click="scrollLeft">&lt;</button>
        <div ref="scrollContainer" class="movie-carousel">
          <div
            v-for="{ info, path } in items"
            :key="path"
            class="movie-poster-item"
            @click="$router.push(path)"
          >
            <img v-if="info.cover" :src="'/' + info.cover" :alt="info.title" class="movie-poster" />
            <div v-else class="no-poster">No Poster Available</div>
            <header class="title">{{ info.title }}</header>
          </div>
        </div>
        <button class="carousel-control next" @click="scrollRight">&gt;</button>
      </div>
    </template>

    <template v-else>
      <article
        v-for="{ info, path } in items"
        :key="path"
        class="article"
        @click="$router.push(path)"
      >
        <header class="title">
          {{
            (isTimeline ? `${new Date(info.date).toLocaleDateString()}: ` : '') +
            info.title
          }}
        </header>

        <hr />

        <div class="article-info">
          <span v-if="info.author" class="author">Author: {{ info.author }}</span>

          <span v-if="info.date && !isTimeline" class="date"
            >Date: {{ new Date(info.date).toLocaleDateString() }}</span
          >

          <span v-if="info.category" class="category"
            >Category: {{ info.category.join(', ') }}</span
          >

          <span v-if="info.tag" class="tag">Tag: {{ info.tag.join(', ') }}</span>
        </div>

        <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
      </article>
    </template>
  </div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/mixins';

.article-wrapper {
  @include mixins.content-wrapper;
  padding-top: calc(var(--navbar-height) + 1rem) !important;
  text-align: center;
}

.article {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.4rem;
  color: var(--vp-c-text);
  text-align: start;

  @media (max-width: 419px) {
    border-radius: 0;
  }

  &:hover {
    cursor: pointer;
  }

  .title {
    position: relative;
    display: inline-block;
    font-size: 1.28rem;
    line-height: 2rem;

    &::after {
      content: '';
      position: absolute;
      inset-inline-start: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: var(--vp-c-accent-bg);
      visibility: hidden;
      transition: transform var(--vp-t-transform);
      transform: scaleX(0);
    }

    &:hover::after {
      visibility: visible;
    }
  }

  .article-info {
    display: flex;
    flex-shrink: 0;

    > span {
      margin-inline-end: 0.5em;
      line-height: 1.8;
    }
  }

  .excerpt {
    h1 {
      display: none;
    }

    h2 {
      font-size: 1.2em;
    }

    h3 {
      font-size: 1.15em;
    }
  }
}

.movie-carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  padding: 1rem 0;
}

.movie-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
  padding-bottom: 1rem;
  scrollbar-width: none; /* remove scroll bar for Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.movie-carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.movie-poster-item {
  flex: 0 0 auto;
  width: 200px; /* Adjust as needed */
  margin-right: 1rem;
  scroll-snap-align: start;
  text-align: center;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  .movie-poster {
    width: 100%;
    height: auto;
    border-radius: 0.4rem;
    box-shadow: var(--vp-shadow-1);
    margin-bottom: 0.5rem;
  }

  .no-poster {
    background-color: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px; /* Adjust to match poster aspect ratio */
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 1rem;
    line-height: 1.4;

    &::after {
      display: none; /* Remove the underline effect for carousel titles */
    }
  }
}

.carousel-control {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 0.5rem;
  z-index: 10;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &.prev {
    order: -1;
  }
}
</style>