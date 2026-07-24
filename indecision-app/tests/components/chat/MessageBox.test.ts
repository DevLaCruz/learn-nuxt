import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageBox from '@/chat/MessageBox.vue'

describe('<MessageBox.vue>', () => {
  const wrapper = mount(MessageBox)

  test('renders input and button elements correctly', () => {
    expect(wrapper.html()).matchSnapshot()
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button svg').exists()).toBe(true)

    console.log(wrapper.find('button').attributes('class'))
  })

  test('emits "send-message" event with when button is clicked', async () => {
    const message = 'Hello, World'
    await wrapper.find('input[type="text"]').setValue(message)
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message])

    expect((wrapper.vm as any).message).toBe('')
  })

  test('emits "send-message" event when key.press.enter is triggered', async () => {
    const message = 'Hello, World'

    const input = wrapper.find('input[type="text"]')
    await input.setValue(message)
    await input.trigger('keypress.enter')
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message])
    expect((wrapper.vm as any).message).toBe('')
  })
})
