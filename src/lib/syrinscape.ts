import { Client } from './client'
import { IMood, ISoundSet, TCategory, TSubCategory } from './interfaces'

export const Syrinscape = {
  getSoundSets: async (): Promise<ISoundSet[]> => {
    const data: unknown = await Client.getData('soundsets')
    return data as ISoundSet[]
  },

  getSoundSetsFixture: async (): Promise<ISoundSet[]> => {
    const data: unknown = await Client.getData('soundsets')
    return data as ISoundSet[]
  },

  getSoundSetListByCategory: async (category: TCategory): Promise<ISoundSet[]> => {
    const soundSets = await Syrinscape.getSoundSetsFixture()
    return soundSets.filter((set) => set.category === category && !set.is_private && !set.is_rejected)
  },

  getSoundSetListBySubCategory: async (subcategory: TSubCategory): Promise<ISoundSet[]> => {
    const soundSets = await Syrinscape.getSoundSetsFixture()
    return soundSets.filter((set) => set.subcategory === subcategory && !set.is_private && !set.is_rejected)
  },

  getMoods: async (id: string): Promise<IMood[]> => {
    const data: unknown = await Client.getData('moods', `?soundset__uuid=${id}`)
    return data as IMood[]
  },

  playMood: async (id: number): Promise<boolean> => {
    await Client.getData('moods', `${id}/play/`)
    return true
  },

  setVolume: async (target: number): Promise<boolean> => Client.setVolume(target),

  stopAll: async (): Promise<boolean> => Client.stopAll(),
}
