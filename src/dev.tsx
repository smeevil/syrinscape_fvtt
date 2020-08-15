import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import parchment from 'url:~/src/assets/parchment.jpg'

import data from '../static/fixtures/soundsets.json'
import { App } from './components/App'
import Styles from './dev.module.scss'
import { ISoundSet } from './lib/interfaces'

// @ts-ignore
window.game = { settings: { get: (_a, _b): string => process.env.SYRINSCAPE_TOKEN } }

render(
  <StrictMode>
    <div className={Styles.wrapper} style={{ background: `url(${parchment})` }}>
      <App soundSetData={data as ISoundSet[]} />
    </div>
  </StrictMode>,
  document.getElementById('root')
)
