<template>
  <router-view>
    <template #default="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </template>
  </router-view>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>
