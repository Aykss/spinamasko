<script setup lang="ts">
import { Gift_Types } from '~~/shared/types/prisma-types';
    
    const gift = ref({
        name: "",
        type: Gift_Types.MONETARY,
        amount: undefined,
        quantity: 1
    })

    const {user} = useUserSession()
    const data: SessionUser = {...user.value as SessionUser}

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
    }

</script>

<template>
    <div class="w-full px-5">
        <div class="card bg-base-100 w-full border-4 border-yellow-400 shadow-2xl">
            <div class="bg-red-600 px-6 py-4">
                <p class="text-white text-2xl font-bold">Pamasko</p>
            </div>
            <div class="card-body">
                <form class="grid grid-cols-4 gap-5" @submit.prevent="addGift">
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
                <div>

                </div>
            </div>
        </div>
    </div>
</template>