<script setup lang="ts">
    const { loggedIn } = useUserSession()

    const menuOpen = ref(false)
    const toggleMenu = () => (menuOpen.value = !menuOpen.value)
</script>

<template>
  <nav class="xl:container xl:mx-auto">
    <div class="flex flex-wrap justify-between items-center p-4 not-md:gap-2">
      <NavbarItem title="Spinamasko" route="/"/>
     <!-- Desktop Version -->
      <ul class="hidden md:flex justify-between text-lg">
        <NavbarItem title="Home" route="/"/>
        <NavbarItem v-if="!loggedIn" title="Register" route="/" />
      </ul>

      <!-- Mobile Button -->
       <button class="md:hidden" @click="toggleMenu" >
          <!-- <img :src="navbarIcon" alt="Logo" class="w-6 h-6" /> -->
           Menu
        </button>
        <ul :class="menuOpen ? 'block' : 'hidden'" class="md:hidden w-full">
          <NavbarItem title="Home" route="/"/>
          <NavbarItem v-if="!loggedIn" title="Register" route="/" />
        </ul>
    </div>
  </nav>
  
</template>