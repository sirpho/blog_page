<template>
  <router-view>
    <template #default="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </template>
  </router-view>
  <page-loading :loading="loading" />
</template>

<script setup lang="ts">
import PageLoading from '@/components/PageLoading'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useStoreRoutes } from '@/stores'

const storeRoutes = useStoreRoutes()

const loading = computed(() => storeRoutes.routerLoading || false)
</script>
