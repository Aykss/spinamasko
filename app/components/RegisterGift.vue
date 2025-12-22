<script setup lang="ts">
import type { Given_Gifts } from '~~/prisma/generated/prisma/client';
import { Gift_Types } from '~~/shared/types/prisma-types';
    
    const gift = ref({
        name: "",
        type: Gift_Types.MONETARY,
        amount: undefined,
        quantity: 1
    })

    const {user} = useUserSession()
    const data: SessionUser = {...user.value as SessionUser}

    const list_gifts: Ref<(Omit<Given_Gifts, 'amount'> & { amount: number, quantityLeft: number })[]> = ref([])

    async function addGift(){
        const res = await $fetch(`/api/godparent/${data.id}/add-gift`, {
            method: 'PUT',
            body: {
                name: gift.value.name.length > 0 ? gift.value.name : undefined,
                quantity: gift.value.quantity,
                amount: gift.value.amount == undefined ? 0 : gift.value.amount,
                type: gift.value.type
            }
        })

        gift.value = {
            name: "",
            type: Gift_Types.MONETARY,
            amount: undefined,
            quantity: 1
        }

        if(res != null){
            list_gifts.value.push({
                ...res,
                amount: Number(res.amount),
                created_at: new Date(res.created_at),
                updated_at: new Date(res.updated_at),
                quantityLeft: res.quantity
            })

            list_gifts.value.sort((a,b) => b.id - a.id)
        }
    }

    async function displayGifts(){
        const res = await $fetch(`/api/godparent/${data.id}/gift`)
        list_gifts.value = res.map(item => ({
            ...item,
            amount: Number(item.amount),
            created_at: new Date(item.created_at),
            updated_at: new Date(item.updated_at),
            quantityLeft: item.quantityLeft ? item.quantityLeft : 0
        }))

        list_gifts.value.sort((a,b) => b.id - a.id)
    }

    onMounted(async() => {
        displayGifts()
    })

</script>

<template>
    <div class="w-full px-5">
        <div class="card bg-base-100 w-full border-4 border-yellow-400 shadow-2xl">
            <div class="bg-red-600 px-6 py-4">
                <p class="text-white text-2xl font-bold">Pamasko</p>
            </div>
            <div class="card-body max-h-1/2">
                <form class="grid md:grid-cols-4 gap-5" @submit.prevent="addGift">
                    <label class="fieldset">
                        <legend class="fieldset-legend">Type of Gift</legend>
                        <select v-model="gift.type" class="select select-warning w-full">
                            <option :value="Gift_Types.MONETARY">Monetary</option>
                            <option :value="Gift_Types.NON_MONETARY">Non-Monetary</option>
                        </select>
                    </label>
                    <label v-if="gift.type === Gift_Types.NON_MONETARY" class="fieldset">
                        <legend class="fieldset-legend text-md justify-start">Gift Name </legend>
                        <input type="text" v-model="gift.name" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                    </label>
                    <label v-else class="fieldset">
                        <legend class="fieldset-legend">Amount</legend>
                        <input type="number" v-model="gift.amount" min="1" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                    </label>
                    <label class="fieldset">
                        <legend class="fieldset-legend">Quantity</legend>
                        <input type="number" v-model="gift.quantity" min="1" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                    </label>
                    <button class="btn bg-green-600 text-white md:mt-10" type="submit">Add Gift</button>
                </form>
                <div class="text-center divider divider-warning"></div>
                <div v-if="list_gifts.length > 0" class="grid md:grid-cols-2 gap-7">
                    <div v-for="gift in list_gifts" :key="gift.id" class="border-4 border-yellow-400 shadow-lg rounded-lg p-5">
                        <div class="grid gap-2">
                            <div class="flex justify-between items-center gap-2">
                                <span aria-label="success" class="status status-lg" :class="gift.type === Gift_Types.MONETARY ? 'status-success' : 'bg-red-600'"></span>
                                <p class="text-2xl font-bold">{{ gift.name == null ? `₱${gift.amount}` : gift.name }}</p>
                                <img src="~/assets/icons/giftColored.svg">
                            </div>
                            <div class="flex justify-between items-center">
                                    <p>Quantity Left: </p>
                                    <p class="grow-0 font-semibold">{{ gift.quantityLeft }}</p>
                            </div>
                        </div>
                        <div class="text-center divider divider-warning"></div>
                        <button class="btn bg-red-600 text-white w-full" type="submit">Remove</button>
                    </div>
                </div>
                <div v-else>
                    <p>No Pamasko recorded yet</p>
                </div>
            </div>
        </div>
    </div>
</template>