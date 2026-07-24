<script setup lang="ts">
import ChatBubble from '@/chat/ChatBubble.vue'
import type { ChatMessage } from '@/interfaces/chat-messages.interface.ts'
import { ref, watch, nextTick } from 'vue'

interface Props {
  messages: ChatMessage[]
}

// 1. NO desestructuramos, guardamos en "props"
const props = defineProps<Props>()

const chatRef = ref<HTMLDivElement | null>(null)

// 2. Observamos la longitud del array para saber exactamente cuándo hay un mensaje nuevo
watch(
  () => props.messages.length,
  async () => {
    await nextTick() // Esperamos a que Vue dibuje el nuevo mensaje en el HTML

    // Hacemos el scroll hacia abajo
    if (chatRef.value && 'scrollTo' in chatRef.value) {
      chatRef.value.scrollTo({
        top: chatRef.value.scrollHeight,
        behavior: 'smooth',
      })
    }
  },
)
</script>

<template>
  <!-- Example Message -->
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <ChatBubble v-for="message in props.messages" :key="message.id" v-bind="message" />
      <!--        :its-mine="message.itsMine"-->
      <!--        :message="message.message"-->
      <!--        :image="message.image"-->
      <!--      />-->
      <!--      <ChatBubble :its-mine="false" message="sis" image="https://yesno.wtf/assets/yes/13-c3082a998e7758be8e582276f35d1336.gif"/>-->
    </div>
  </div>
</template>

<style scoped></style>
