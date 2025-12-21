<script setup lang="ts">
import type { Godchildren } from '~~/prisma/generated/prisma/client'
import type { SessionUser } from '~~/shared/types/server-types'

    const inaanak = ref({
        name: "",
        totalChances: 1,
        usedChances: 0
    })

    const {user} = useUserSession()

    const list_inaanak: Ref<Godchildren[]> = ref([])

    async function displayInaanak(){
        if(user != null){
            const data: SessionUser = {...user.value as SessionUser}
            const res = await $fetch(`/api/godparent/${data.id}/inaanak`)
            list_inaanak.value = res.map(item => ({
                ...item,
                created_at: new Date(item.created_at),
                updated_at: new Date(item.updated_at)
            }))
        }
    }
    
    onMounted(async() => {
        displayInaanak()
    })
</script>

<template>
    <div class="w-full px-5">
        <div class="card bg-base-100 w-full border-4 border-yellow-400 shadow-2xl">
            <div class="bg-red-600 px-6 py-4">
                <p class="text-white text-2xl font-bold">Inaanak</p>
            </div>
            <div class="card-body">
                <form class="grid grid-cols-3 gap-5">
                    <label class="fieldset">
                        <legend class="fieldset-legend">Inaanak Name</legend>
                        <input type="text" v-model="inaanak.name" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                    </label>
                    <label class="fieldset">
                        <legend class="fieldset-legend">Total Chances to spin</legend>
                        <input type="number" v-model="inaanak.totalChances" min="1" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                    </label>
                    <button class="btn bg-green-600 text-white md:mt-10" type="submit">Add Inaanak</button>
                </form>
                <div class="text-center divider divider-warning"></div>
                <div v-if="list_inaanak.length > 0">
                    
                </div>
                <div v-else>
                    <p>No Inaanak recorded yet</p>
                </div>
            </div>
        </div>
    </div>
</template>