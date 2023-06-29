<template>
  <page-navbar />
  <div class="layout">
    <router-view v-slot="{ Component }">
      <div class="main-content">
        <component :is="Component" />
      </div>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import pageNavbar from '@/components/PageNavbar'
</script>

<style lang="less" scoped>
.layout {
  max-width: var(--page-max-width);
  padding-top: 25px;
  margin: var(--navbar-height) auto 0;

  .main-content {
    width: 100%;
  }
}
</style>
