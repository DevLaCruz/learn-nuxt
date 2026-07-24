import { ref } from 'vue'
import type { ChatMessage } from '@/interfaces/chat-messages.interface.ts'
import type { YesNoResponse } from '@/interfaces/yes-no-response'
import { sleep } from '@/helpers/sleep'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([
    // {
    //   id: new Date().getTime(),
    //   message: 'Hello',
    //   itsMine: true,
    // },
    // {
    //   id: new Date().getTime() + 1,
    //   message: 'SiS',
    //   itsMine: false,
    //   image: 'https://yesno.wtf/assets/yes/13-c3082a998e7758be8e582276f35d1336.gif',
    // },
  ])

  const getHerResponse = async () => {
    const answer = await fetch('https://yesno.wtf/api')
    const data = (await answer.json()) as YesNoResponse

    return data
  }

  const onMessage = async (text: string) => {
    if (text.length === 0) return

    messages.value.push({
      id: new Date().getTime(),
      itsMine: true,
      message: text,
    })

    // Evaluate if finish with "?"
    if (!text.endsWith('?')) return

    await sleep(1.5)
    const { answer, image } = await getHerResponse()

    messages.value.push({
      id: new Date().getTime(),
      itsMine: false,
      message: answer,
      image,
    })
  }
  return {
    messages,
    onMessage,
  }
}
