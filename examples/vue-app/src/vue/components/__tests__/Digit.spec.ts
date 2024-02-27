import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Digit from '../Digit.vue'

describe('Digit component', () => {
  it('renders properly', () => {
    const wrapper = mount(Digit, { props: { value: 5 } })
    // expect(wrapper.text()).toContain('Hello Vitest')
  })
})
