<script setup lang="ts">
    const unique_id = ref("")
    const loginState = ref(1)

    const registerData = ref({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    let err = ref("")
    let congrats = ref("")

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

    async function handleRegister(){
        if(registerData.value.password !== registerData.value.confirmPassword){
            err.value = "Password and Confirm Password not matching"
        }

        if(err.value.length < 1){
            try {
                const res = await $fetch("/api/auth/signup", {
                    method: "POST",
                    body: {
                    email: registerData.value.email,
                    password: registerData.value.password,
                    name: registerData.value.name
                    },
                });

                if(res.success){
                    congrats.value = `${res.godparent.name}! Successfully created your account!`
                }

            } catch (e) {
                const apiErr = e as AuthError;
                err.value = apiErr.statusMessage
            }
        }
    }

</script>

<template>
    <div class="w-full max-w-3xl">
        <div class="w-full flex flex-col items-center gap-5 mt-5">
            <p class="text-5xl text-red-800 font-bold">Spinamasko</p>
            <p>Spin and win a Pamasko!</p>
        </div>

        <form class="w-full flex place-self-center justify-center gap-5 px-5 max-w-3xl" @submit.prevent="handleFormSubmit">
            <input type="text" v-model="unique_id" placeholder="Type ninong/ninang id" class="input border-green-600 btn-block input-success"/>
            <button class="btn bg-green-600 text-white btn-wide" type="submit">Submit</button>
        </form>

        <div class="text-center divider divider-warning px-5"><p class="text-sm">Are you a godparent?</p></div>

        <div v-if="loginState == 1" class="w-full place-self-center max-w-3xl px-5 grid grid-cols-2 gap-5 py-3">
            <button class="btn bg-green-600 text-white" @click="loginState = 2">Login</button>
            <button class="btn bg-red-600 text-white" @click="loginState = 3">Register</button>
        </div>

        <div class="w-full px-5">
            <div class="card bg-base-100 w-full border-4 border-yellow-400 shadow-2xl">
                <div class="card-body">
                    <div class="flex flex-col items-center flex-wrap">
                        <div class="p-5 bg-red-600 rounded-full">
                            <img src="~/assets/icons/gift.svg" class="w-10">
                        </div>
                        <p class="text-2xl text-red-800 font-bold">Become a Ninong/Ninang!</p>
                        <p>Register and share your blessings this Christmas season</p>
                        <form class="w-full grid gap-5" @submit.prevent="handleRegister">
                            <label class="fieldset">
                                <legend class="fieldset-legend">Ninong/Ninang Name</legend>
                                <input type="text" v-model="registerData.name" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                            </label>

                            <label class="fieldset">
                                <legend class="fieldset-legend">Email Address</legend>
                                <input type="email" v-model="registerData.email" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                            </label>

                            <label class="fieldset">
                                <legend class="fieldset-legend">Password</legend>
                                <input type="password" v-model="registerData.password" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                            </label>

                            <label class="fieldset">
                                <legend class="fieldset-legend">Confirm Password</legend>
                                <input type="password" v-model="registerData.confirmPassword" class="input border-2 border-warning input-warning w-full" placeholder="Type here" required/>
                            </label>

                            <div v-if="err.length > 0" role="alert" class="alert alert-error">
                                <span>{{ err }}</span>
                            </div>

                            <div v-if="congrats.length > 0" role="alert" class="alert alert-success">
                                <span>{{ congrats }}</span>
                            </div>

                            <div>
                                <button class="btn bg-green-600 text-white btn-block" type="submit">Register as Godparent</button>
                                <div class="divider divider-warning"></div>
                                <button class="btn bg-red-600 text-white btn-block" @click="loginState = 2">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>