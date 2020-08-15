import { TEndPoint } from './interfaces'

export const Client = {
  SYRINSCAPE_API_URL: (): string =>
    'https://cors-anywhere.herokuapp.com/https://www.syrinscape.com/online/frontend-api',
  SYRINSCAPE_TOKEN: (): string => game.settings.get('syrinscape', 'Token'),

  getData: async (endpoint: TEndPoint, suffix?: number | string): Promise<Record<string, string>[]> => {
    const token = Client.SYRINSCAPE_TOKEN()
    if (token === '') {
      const errorMessage = 'No syrinscape token found, please go to module settings and insert your token'
      alert(errorMessage)
      return Promise.reject(new Error(errorMessage))
    }

    let url = `${Client.SYRINSCAPE_API_URL()}/${endpoint}/${suffix || ''}`
    if (url.match(/\/$/)) {
      url += `?auth_token=${token}`
    } else {
      url += `&auth_token=${token}`
    }

    const response = await fetch(url, {
      method: 'GET',
      // mode: 'no-cors', // no-cors, *cors, same-origin
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    return response.json()
  },

  patchData: async (body: Record<string, string | number | boolean>): Promise<boolean> => {
    await fetch(`${Client.SYRINSCAPE_API_URL()}/state/global/`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${Client.SYRINSCAPE_TOKEN()}`,
      },
      body: JSON.stringify(body),
    })
    return true
  },

  stopAll: async (): Promise<boolean> => {
    return Client.patchData({ stopped: true })
  },

  setVolume: async (target: number): Promise<boolean> => {
    return Client.patchData({ volume: target })
  },
}
