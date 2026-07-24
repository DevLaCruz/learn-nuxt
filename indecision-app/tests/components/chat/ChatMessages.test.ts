import ChatMessages from '@/chat/ChatMessages.vue'
import type { ChatMessage } from '@/interfaces/chat-messages.interface'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

const messages: ChatMessage[] = [
  { id: 1, message: 'Hello', itsMine: true },
  { id: 2, message: 'Hi there!', itsMine: false, image: 'https://example.com/avatar.jpg' },
]
const wrapper = mount(ChatMessages, {
  props: { messages },
})

describe('ChatMessages.vue', () => {
  test('renders the correct messages', () => {
    const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' })
    expect(chatBubbles).toHaveLength(messages.length)

    console.log(chatBubbles.length)
  })

  test('scrolls down to the botton after messages are updated', async () => {
    const scrollToSpy = vi.fn()
    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement
    chatRef.scrollTo = scrollToSpy

    await wrapper.setProps({
      messages: [...messages, { id: 3, message: 'How are you?', itsMine: true }],
    })

    await new Promise((resolve) => setTimeout(resolve, 110))

    expect(scrollToSpy).toHaveBeenCalledTimes(1)
    expect(scrollToSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: expect.any(Number),
    })
  })
})
