import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Locations from '@/components/Locations.vue'
import CharacterDetails from '@/components/CharacterDetails.vue'
import { locations, characters } from '../test-data'
import flushPromises from 'flush-promises'
import '../setup-fetch-interceptor'

describe('Locations.vue', () => {
  it('renders locations when passed as props', () => {
    const wrapper = shallowMount(Locations, {
      propsData: { locations }
    })

    expect(wrapper.element.querySelectorAll('.location-list li').length).to.equal(locations.length)
    expect(wrapper.element.querySelector('.location-list').textContent.replace(/→/g, '').trim())
      .to.equal(locations.map(x => x.name).join('  '))
  })

  it('renders the residents of a location', async () => {
    const wrapper = shallowMount(Locations, {
      propsData: { locations }
    })

    await wrapper.find('.location-list li:nth-child(2)').trigger('click')
    await flushPromises()
    expect(wrapper.element.querySelectorAll('.character-list').length).to.equal(1)
  })
})

describe('CharacterDetails.vue', () => {
  it('renders character details when passed as props', () => {
    const character = characters[0]
    const wrapper = shallowMount(CharacterDetails, {
      propsData: { characterDetails: character }
    })

    expect(wrapper.text()).to.include(character.name)
    expect(wrapper.text()).to.include(character.status)
    expect(wrapper.text()).to.include(character.species)
    expect(wrapper.text()).to.include(character.gender)
    expect(wrapper.text()).to.include(character.type)
  })
})
