<script setup lang="ts">
import type { Godchildren } from '~~/prisma/generated/prisma/client'
import type { SessionUser } from '~~/shared/types/server-types'

    const inaanak = ref({
        name: "",
        totalChances: 1,
        usedChances: 0
    })

    const {user} = useUserSession()
    const data: SessionUser = {...user.value as SessionUser}

    const list_inaanak: Ref<Godchildren[]> = ref([])

    async function displayInaanak(){
        if(user != null){
            
            const res = await $fetch(`/api/godparent/${data.id}/inaanak`)
            list_inaanak.value = res.map(item => ({
                ...item,
                created_at: new Date(item.created_at),
                updated_at: new Date(item.updated_at)
            }))

            list_inaanak.value.sort((a,b) => b.id - a.id)
        }
        
    }

    async function addInaanak(){
        const res = await $fetch(`/api/godparent/${data.id}/add-inaanak`, {
            method: 'PUT',
            body: {
                name: inaanak.value.name,
                total_chances: inaanak.value.totalChances
            }
        })

        if(res != null){
            list_inaanak.value.push({
                ...res,
                created_at: new Date(res.created_at),
                updated_at: new Date(res.updated_at)
            })
        }

        list_inaanak.value.sort((a,b) => b.id - a.id)

        inaanak.value = {
            name: "",
            totalChances: 1,
            usedChances: 0
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
                <p class="text-white text-2xl font-bold">{{ 'Inaanak ni ' + Godparent_Pronouns_Label[data.pronouns as Godparent_Pronouns] + ' ' + data.name}}</p>
            </div>
            <div class="card-body">
                <form class="grid grid-cols-3 gap-5" @submit.prevent="addInaanak">
                    <label class="fieldset">
                        <legend class="fieldset-legend text-md">Inaanak Name</legend>
                        <input type="text" v-model="inaanak.name" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                    </label>
                    <label class="fieldset">
                        <legend class="fieldset-legend">Total Chances to spin</legend>
                        <input type="number" v-model="inaanak.totalChances" min="1" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                    </label>
                    <button class="btn bg-green-600 text-white md:mt-10" type="submit">Add Inaanak</button>
                </form>
                <div class="text-center divider divider-warning"></div>
                <div v-if="list_inaanak.length > 0" class="grid grid-cols-2 gap-7">
                    <div v-for="anak in list_inaanak" class="border-4 border-yellow-400 shadow-lg rounded-lg p-5">
                        <div class="grid gap-2">
                            <div class="flex justify-between items-center">
                                <p class="text-2xl font-bold">{{ anak.name }}</p>
                                <img src="~/assets/icons/giftColored.svg">
                            </div>
                            <div class="flex justify-between items-center">
                                <p>Pamasko Chances: </p>
                                <!-- <div>
                                    <button className="btn btn-circle w-5 h-5 bg-red-600">
                                        <img src="~/assets/icons/minusButton.svg" class="w-5">
                                    </button>
                                    <p>{{ anak.total_chances }}</p>
                                    <button className="btn btn-circle w-5 h-5 bg-red-600">
                                        <img src="~/assets/icons/addButton.svg" class="w-5">
                                    </button>
                                </div> -->
                                <p class="grow-0 font-semibold">{{ anak.total_chances }}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <p>Pamasko Chances Used: </p>
                                <p class="grow-0 font-semibold">{{ anak.used_chances }}</p>
                            </div>
                        </div>
                        <div class="text-center divider divider-warning"></div>
                        <div class="grid grid-cols-2 gap-5">
                            <button class="btn bg-red-600 text-white" type="submit">Remove</button>
                            <button class="btn bg-green-600 text-white" type="submit">View</button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>No Inaanak recorded yet</p>
                </div>
            </div>
        </div>
    </div>
</template>