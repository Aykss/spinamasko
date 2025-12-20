<script setup lang="ts">
</script>

<template>
  <div class="w-full h-screen bg-yellow-50 flex flex-col items-center">
    <div class="w-full xl:flex xl:justify-center bg-red-600 sticky top-0 z-40">
        <Navbar />
    </div>
     <div class="w-full flex justify-center max-w-384 z-10">
        <NuxtPage/>
    </div>
    <div class="w-full xl:flex xl:justify-center bg-red-600">
      <p>working</p>
    </div>
  </div>
</template>
