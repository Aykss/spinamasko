<script setup lang="ts">
    const unique_id = ref("")

    async function handleFormSubmit () {
        const res = await $fetch('/api/godparent/search', {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            method: 'POST',
            body: {
                query: unique_id.value
            },
        })

        if(res.godparent != null){
            navigateTo(`/godparent/${res.godparent.unique_id}`)
        }
    }
</script>

<template>
    <div class="w-full">
        <div class="w-full flex flex-col items-center gap-5 mt-5">
            <p class="text-5xl text-red-800 font-bold">Spinamasko</p>
            <p>Spin and win a Pamasko!</p>
        </div>

        <form class="w-full bg-red-200 flex justify-center gap-5 px-5" @submit.prevent="handleFormSubmit">
            <input type="text" v-model="unique_id" placeholder="Type ninong/ninang id" class="input border-green-600 btn-block input-warning"/>
            <button class="btn bg-green-600 text-white btn-wide" type="submit">Submit</button>
        </form>
  </div>
</template>