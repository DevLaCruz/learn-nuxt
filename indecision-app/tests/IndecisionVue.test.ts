import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IndecisionVue from '../src/views/IndecisionVue.vue'

describe('IndecisionVue.vue', () => {
  const wrapper = mount(IndecisionVue)

  const mockMessages = {
    template: '<div data-testid="mock-messages">Mock CHat Messages</div>',
  }

  test('renders the correct elements', () => {
    expect(wrapper.html()).matchSnapshot()

    // expect(wrapper.find('h1').exists()).toBe(true)
    // expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    // expect(wrapper.find('button').exists()).toBe(true)
    // expect(wrapper.find('button svg').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'MessageBox' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ChatMessages' }).exists()).toBe(true)
  })

  test('calls onMessage when sending a message', async () => {
    //simule the personalized event
    const messageBoxComponent = wrapper.findComponent({ name: 'MessageBox' })

    messageBoxComponent.vm.$emit('sendMessage', 'Hello, World')

    await new Promise((resolve) => setTimeout(resolve, 110))
    expect(wrapper.html()).toMatchSnapshot()
  })
})
