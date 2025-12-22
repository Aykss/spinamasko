<script setup lang="ts">
    const { loggedIn } = useUserSession()

    const menuOpen = ref(false)
    const toggleMenu = () => (menuOpen.value = !menuOpen.value)

    async function logoutUser() {
       const res = await $fetch('/api/auth/logout', {
          method: 'POST',
      })

      if(res.success){
        navigateTo('/')
      }

    }
</script>

<template>
  <nav class="xl:container xl:mx-auto">
    <div class="flex flex-wrap justify-between items-center p-4 not-md:gap-2">
      <NavbarItem title="Spinamasko" route="/"/>
     <!-- Desktop Version -->
      <ul class="hidden md:flex justify-between text-lg">
        <NavbarItem title="Home" route="/"/>
        <NavbarItem v-if="!loggedIn" title="Register" route="/" />
        <NuxtLink v-else class="block py-2 px-3 text-white rounded-sm hover:bg-mugal-green" @click="logoutUser">
          Logout
        </NuxtLink>
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