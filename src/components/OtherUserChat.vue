<script setup>
import { ref } from 'vue'
import { io } from "socket.io-client";
let message = ref()
let messageList = ref([])
const socket = io("ws://localhost:3000");
/**
 * Function to send message
 */
const sendMessage = () => {
    let { _value: msg } = message
    socket.emit('s1', { message: msg, to: 'admin', from: 'vaishali' })
    message = ''
}
socket.emit('join', 'test-chat')
// handle the event sent with socket.send()
socket.on("message", data => {
    messageList.value = data
});
socket.on("updateList", data => {
    console.log("🚀 ~ file: App.vue:24 ~ data:", data)
    messageList.value = data
});

socket.on("disconnecting", () => {
    console.log('disconnected'); // the Set contains at least the socket ID
});
</script>
<template>
    <main class="w-screen h-screen bg-primary-very-light text-zinc-50 font-sans antialiased flex">
        <nav class="bg-slate-700 w-1/4 h-screen drop-shadow-xl">
            <!-- User info -->
            <section id="user" class="p-5 grid grid-cols-8">
                <div class="rounded-full w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 mr-1"></div>
                <div class="col-span-6">
                    <p class="font-semibold">Vaishali</p>
                    <p class="text-slate-500">Intern</p>
                </div>
                <!-- <div class="self-center" @click="() => createNewChat()"><i class="fa-solid fa-plus"></i></div> -->
            </section>
            <!-- Search -->
            <section class="w-full h-10 p-3 ">
                <input placeholder="Search" class="rounded-lg w-full p-2 text-gray-500" />
            </section>
            <!-- Chat list -->
            <section id="w-full h-full">
                <div class="mt-10 px-5">
                    <div class="flex items-center">
                        <div class="rounded-full w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                        <router-link to="/"  target="_blank">
                            <p class="self-center basis-3/4">Tanishq</p>
                        </router-link>
                        <!-- <span class="self-center">19:12</span> -->
                    </div>
                    <p class="truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, recusandae quod
                        ipsum
                        iusto aliquam saepe
                        ullam excepturi quasi quae numquam, fugit enim nihil repudiandae, eum odio! Perspiciatis
                        necessitatibus
                        saepe aut!</p>
                </div>
            </section>
        </nav>
        <section id="chat-window" class="w-3/4 float-right">
            <!-- Header -->
            <section id="user" class="p-5 flex w-full shadow-lg">
                <div class="rounded-full w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                <div class="col-span-6">
                    <p class="font-semibold text-zinc-500">Tanishq </p>
                    <p class="text-slate-400 float-right ">Online</p>
                </div>
            </section>
            <!-- Message -->
            <section class="overflow-y-auto h-3/4">
                <template v-if="messageList.length">
                    <div class="col-span-6 p-3" v-for="messages in messageList">
                        <div class="text-zinc-500 bg-slate-700 p-5 rounded-md text-gray-50 w-1/2 "
                            :class="messages.from !== 'admin' ? 'ml-auto' : ''">
                            <div class="text-white">
                                {{ messages?.message }}
                            </div>
                            <div class="-m-1 text-sm float-right">12:13</div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="col-span-6 p-3">
                        <div class="text-zinc-500 bg-slate-700 p-5 rounded-md text-gray-50 w-1/2">
                            <div>No Messages</div>
                            <div class="-m-1 text-sm float-right">12:13</div>
                        </div>
                    </div>
                </template>
            </section>
            <!-- Send Message -->
            <section class="w-full mt-5">
                <div class="ml-auto w-3/4 flex flex-row ">
                    <input v-model="message" class="w-3/4 p-3 text-slate-500 drop-shadow-2xl rounded-lg bg-neutral-300"
                        placeholder="Type Message.." />
                    <button class="rounded-full bg-slate-600 drop-shadow-2xl p-3 ml-2"
                        @click="() => sendMessage()">Send</button>
                </div>
            </section>
        </section>
    </main>
</template> 