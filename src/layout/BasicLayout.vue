<template>
  <page-navbar />
  <div class="layout">
    <router-view v-slot="{ Component }">
      <aside class="left-bar">
        <a-affix :offsetTop="75">
          <div class="bar-content clear-float">
            <page-info />
            <category-navbar />
          </div>
        </a-affix>
      </aside>
      <div class="main-content">
        <component :is="Component" />
      </div>
      <aside class="right-bar">
        <a-affix :offsetTop="75">
          <div class="bar-content clear-float">
            <tag-navbar />
          </div>
        </a-affix>
      </aside>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import pageNavbar from "@/components/PageNavbar";
import CategoryNavbar from "@/components/CategoryNavbar";
import PageInfo from "@/components/PageInfo";
import TagNavbar from "@/components/TagNavbar";
</script>

<style lang="less" scoped>
.layout {
  max-width: var(--page-max-width);
  margin: var(--navbar-height) auto 0;
  padding-top: 25px;

  .left-bar {
    display: flex;
    flex-direction: column;
    width: var(--left-bar-width);
    float: left;
  }

  .main-content {
    float: left;
    width: calc(100% - var(--left-bar-width) - var(--right-bar-width) - var(--common-space) -
    var(--common-space));
    margin: 0 var(--common-space);
  }

  .right-bar {
    display: flex;
    flex-direction: column;
    width: var(--right-bar-width);
    float: right;
  }

  @media (max-width: 940px) {
    .right-bar {
      display: none;
    }

    .main-content {
      width: calc(100% - var(--left-bar-width) - var(--common-space) - var(--common-space));
    }
  }
}
</style>
