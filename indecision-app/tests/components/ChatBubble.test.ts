import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatBubble from '@/chat/ChatBubble.vue'

describe('ChatBubble.vue', () => {
  test('renders the correct message', () => {
    const message = 'Hello, this is a test message!'
    const wrapper = mount(ChatBubble, {
      props: { message, itsMine: true },
    })

    expect(wrapper.find('.bg-blue-200').exists()).toBe(true)
    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy()
    expect(wrapper.find('.bg-blue-200').text()).toContain(message)
    expect(wrapper.find('.bg-blue-300').exists()).toBeFalsy()
  })

  test('renders received message correctly', () => {
    const message = 'hello'
    const wrapper = mount(ChatBubble, {
      props: { message, itsMine: false },
    })

    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-300').text()).toContain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBe(false)

    expect(wrapper.find('img').exists()).toBe(false)
  })

  test('renders received message correctly', () => {
    const message = 'hello'
    const image = 'https://example.com/avatar.jpg'
    const wrapper = mount(ChatBubble, {
      props: { message, itsMine: false, image },
    })

    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-300').text()).toContain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBe(false)

    expect(wrapper.find('img').attributes('src')).toBe(image)
  })
})
