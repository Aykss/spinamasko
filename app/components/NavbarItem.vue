<script setup lang="ts">
const props = defineProps<{
  title: string,
  img?: string,
  route: string
}>()
</script>

<template>
  <template v-if="props.img">
    <img :src="props.img" alt="Flowbite Logo" class="block p-2 rounded-sm hover:bg-mugal-green" />
  </template>
  <template v-else>
    <NuxtLink :to="props.route" class="block py-2 px-3 text-white rounded-sm hover:bg-mugal-green">
      {{ props.title }}
    </NuxtLink>
  </template>
</template>