export const registerSettings = (): void => {
  game.settings.register('syrinscape', 'Token', {
    name: 'Your Syrinscape Token',
    hint: 'You can find your token at https://www.syrinscape.com/online/cp/',
    scope: 'client',
    config: true,
    default: '',
    type: String,
  })
}
