import './select.scss'

import debounce from 'debounce'
import Select from 'mytabworks-react-select'
import React, { useCallback, useEffect, useState } from 'react'
// @ts-ignore // there are no typings for this library
import ReactImageAppear from 'react-image-appear'
import logo from 'url:~/src/assets/syrinscape_banner.png'

import { IMood, ISoundSet } from '../../lib/interfaces'
import { Syrinscape } from '../../lib/syrinscape'
import { IProps } from './interfaces'
import Styles from './styles.module.scss'

export const App: React.FC<IProps> = ({ soundSetData }): JSX.Element => {
  const [soundSets, setSoundSets] = useState<ISoundSet[]>([])
  const [moods, setMoods] = useState<IMood[]>([])
  const [selectedSoundSet, setSelectedSoundSet] = useState<ISoundSet>()
  const [selectedMood, setSelectedMood] = useState<IMood>()

  const [playingSoundSet, setPlayingSoundSet] = useState<ISoundSet>()
  const [playingMood, setPlayingMood] = useState<IMood>()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const getSoundSets = useCallback(async () => {
    const data = await Syrinscape.getSoundSetListBySubCategory('pathfinder')
    setSoundSets(data)
  }, [])

  const getMoods = useCallback(async () => {
    if (!selectedSoundSet) return
    const data = await Syrinscape.getMoods(selectedSoundSet.uuid)
    setMoods(data)
  }, [selectedSoundSet])

  useEffect(() => {
    if (soundSetData) {
      setSoundSets(soundSetData)
      return
    }
    getSoundSets().catch((err) => console.error('Syrinscape could not get sound set because: ', err))
  }, [getSoundSets, soundSetData])

  useEffect(() => {
    getMoods().catch((err) => console.error('Syrinscape could not get moods set because: ', err))
  }, [selectedSoundSet, getMoods])

  const handleSelectedSoundSet = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedSoundSet(soundSets[parseInt(event.target.value, 10)])
  }

  const handleSelectedMood = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedMood(moods[parseInt(event.target.value, 10)])
  }

  const play = (): void => {
    if (!selectedMood) return
    Syrinscape.playMood(selectedMood.pk).catch((err) => console.error('syrinscape could not play mood because ', err))
    setPlayingSoundSet(selectedSoundSet)
    setPlayingMood(selectedMood)
    setIsPlaying(true)
  }

  const stop = (): void => {
    Syrinscape.stopAll().catch((err) => console.error('syrinscape could not stop because ', err))
    setIsPlaying(false)
  }

  const handleVolume = (value: string): void => {
    let target = parseInt(value, 10)
    if (target > 0) target /= 100.0
    Syrinscape.setVolume(target).catch((err) => console.error('syrinscape could not set volume because ', err))
  }

  const handleVolumeDebounced = debounce(handleVolume, 500)

  const maybeRenderSoundSets = (): JSX.Element | null => {
    if (!soundSets.length) return null
    return (
      <div className={Styles.soundSetSelector}>
        <label>Sound set</label>
        <Select
          id="soundSetSelector"
          name="soundSetSelect"
          placeholder="Choose a sound set"
          onChange={handleSelectedSoundSet}
          searchSpeed={150}
        >
          {soundSets.map((soundSet, index) => {
            return { label: soundSet.name, value: index.toString() }
          })}
        </Select>
      </div>
    )
  }

  const maybeRenderMoods = (): JSX.Element | null => {
    if (!moods.length) return null

    return (
      <div className={Styles.moodSelector}>
        <label htmlFor="moodSelector">Mood</label>

        <Select
          id="soundSetSelector"
          name="soundSetSelect"
          placeholder="Choose one"
          onChange={handleSelectedMood}
          searchSpeed={150}
        >
          {moods.map((mood, index) => {
            return { label: mood.name, value: index.toString() }
          })}
        </Select>
      </div>
    )
  }

  const maybeRenderThumbnail = (): JSX.Element | null => {
    if (!selectedSoundSet) return null
    return (
      <div className={Styles.artworkWrapper}>
        <div className={Styles.infoWrapper}>
          <div className={Styles.soundSetInfo}>{playingSoundSet && playingSoundSet.name}</div>
          <div className={Styles.moodInfo}>{playingMood && playingMood.name}</div>
          <input
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="110"
            defaultValue={100}
            onChange={(event) => handleVolumeDebounced(event.target.value)}
          />
        </div>
        <ReactImageAppear
          alt="artwork"
          animation="fadeIn"
          animationDuration="0.3s"
          className={Styles.artworkContainer}
          id="thumbnail"
          key={`artwork-${selectedSoundSet.uuid}`}
          showLoader
          src={selectedSoundSet.online_player_artwork_url || selectedSoundSet.artwork_url}
        />
      </div>
    )
  }

  if (!soundSets.length) {
    return (
      <div className={Styles.splash}>
        <h2>Loading...</h2>
        <img src={logo} alt="logo" />
      </div>
    )
  }

  return (
    <section className={Styles.root}>
      <header>
        <h1>Syrinscape</h1>
      </header>
      <div className={Styles.content}>
        {maybeRenderSoundSets()}
        {maybeRenderMoods()}
        <div className={Styles.buttonContainer}>
          <button
            id="stop"
            type="button"
            className={`fas fa-stop ${Styles.actionButton}`}
            onClick={stop}
            disabled={!isPlaying}
          >
            Stop
          </button>
          <button id="play" type="button" className={`fas fa-play ${Styles.actionButton}`} onClick={play}>
            Play
          </button>
        </div>
        {maybeRenderThumbnail()}
      </div>
    </section>
  )
}
