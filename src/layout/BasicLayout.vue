<template>
  <page-navbar />
  <div class="layout">
    <aside class="left-bar">
      <a-affix :offsetTop="75">
        <div class="bar-content clear-float">
          <page-info />
          <category-navbar />
        </div>
      </a-affix>
    </aside>
    <div class="main-content">
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
    </div>
    <aside class="right-bar">
      <div class="bar-content clear-float">
        <tag-navbar />
      </div>
    </aside>
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
  display: flex;
  gap: var(--common-space);
  z-index: 1;

  .left-bar {
    display: flex;
    flex-direction: column;
    width: var(--left-bar-width);
    z-index: 2;
  }

  .main-content {
    flex: 1;
    margin: 0;
  }

  .right-bar {
    display: flex;
    flex-direction: column;
    width: var(--right-bar-width);
    z-index: 2;
    
    .bar-content {
      width: var(--right-bar-width);
      position: fixed;
      top: 75px;
      
      .tag-navbar {
        max-height: calc(100vh - 90px);
        display: flex;
        flex-direction: column;
        
        :deep(.arco-card-body) {
          flex: 1;
          overflow: auto;
        }
      }
    }
  }

  @media (max-width: 940px) {
    .right-bar {
      display: none;
    }
  }
  @media (max-width: 650px) {
    .left-bar {
      display: none;
    }
  }
}
</style>
