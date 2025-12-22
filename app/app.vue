<script setup lang="ts">
</script>

<template>
  <div class="w-full h-screen bg-yellow-50 flex flex-col items-center overflow-auto">
    <div class="w-full xl:flex xl:justify-center bg-red-600 border-b-4 border-yellow-400">
        <NavBar />
    </div>
     <div class="w-full flex flex-col justify-center items-center max-w-384 z-10 min-h-fit gap-10 pb-10">
        <NuxtPage/>
    </div>
    <!-- <div class="w-full xl:flex xl:justify-center bg-red-600 border-t-4 border-yellow-400 p-5">
      <p class=" text-white/70">Maligayang Pasko at Manigong Bagong Taon!!</p>
    </div> -->
    <footer class="footer sm:footer-horizontal footer-center bg-red-600 text-base-content border-t-4 border-yellow-400 p-4">
    <aside class="flex">
      <img src="~/assets/icons/christmasTree.svg" class="w-7 h-7 md:w-10 md:h-10" />
      <p class="text-white/70 md:text-lg">Maligayang Pasko at Manigong Bagong Taon!!</p>
      <img src="~/assets/icons/christmasTree.svg" class="w-7 h-7 md:w-10 md:h-10" />
    </aside>
  </footer>
  </div>
</template>
