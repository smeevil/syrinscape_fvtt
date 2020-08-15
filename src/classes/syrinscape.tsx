import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import { App } from '../components/App'

export default class SyrinscapeApp extends Application {
  static get defaultOptions(): ApplicationOptions {
    const options = super.defaultOptions
    mergeObject(options, {
      classes: ['syrinscapeconfig'],
      template: 'modules/syrinscape_fvtt/templates/syrinscape.html',
      width: '380',
      height: '640',
      resizable: true,
      minimizable: true,
      title: 'Syrinscape',
    })
    return options
  }

  async _render(force = false, options = {}): Promise<void> {
    // Stuff Before rendering
    await super._render(force, options)
    const mountPoint = $(`#${this.id}`).find('#mountPoint')[0] as HTMLDivElement

    render(
      <StrictMode>
        <App />
      </StrictMode>,
      mountPoint
    )
  }
}
