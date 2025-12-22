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
      <div class="flex items-center justify-center">
        <img src="~/assets/icons/sparkleColored.svg" class="w-7 h-7 md:w-10 md:h-10"/>
        <NavbarItem custom_class="font-bold" title="Spinamasko" route="/"/>
        <img src="~/assets/icons/christmasTree.svg" class="w-7 h-7 md:w-10 md:h-10" />
      </div>
     <!-- Desktop Version -->
      <ul class="hidden md:flex justify-between text-lg">
        <NavbarItem title="Home" route="/"/>
        <NavbarItem v-if="!loggedIn" title="Register" route="/" />
        <NuxtLink v-else class="block py-2 px-3 text-white rounded-sm hover:bg-mugal-green" @click="logoutUser">
          Logout
        </NuxtLink>
      </ul>

      <!-- Mobile Button -->
       <button class="md:hidden flex items-center" @click="toggleMenu" >
          <img src="~/assets/icons/hamburgerMenu.svg" alt="Menu" class="w-7 h-7" />
        </button>
        <ul :class="menuOpen ? 'block' : 'hidden'" class="md:hidden w-full">
          <NavbarItem title="Home" route="/"/>
          <NavbarItem v-if="!loggedIn" title="Register" route="/" />
        </ul>
    </div>
  </nav>
  
</template>