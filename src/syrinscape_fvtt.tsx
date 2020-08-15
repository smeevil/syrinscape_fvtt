import SyrinscapeApp from './classes/syrinscape'
import { registerSettings } from './module/settings'

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */

Hooks.once('init', async function () {
  // Assign custom classes and constants here
  // Register custom module settings
  registerSettings()

  // Preload Handlebars templates
  // await preloadTemplates()

  // Register custom sheets (if any)
})

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
// Hooks.once('setup', function () {
// Do anything after initialization but before
// ready
// })

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
// Hooks.once('ready', function () {
// Syrinscape.getSoundSetListBySubCategory('pathfinder')
//   .then((data) => {
//     console.log('GOT DATA', data)
//   })
//   .catch((err) => console.error('syrinscape', err))
// Do anything once the module is ready
// })

Hooks.on('renderSidebarTab', (app: unknown, html: JQuery, _data: unknown): void => {
  if (!(app instanceof PlaylistDirectory)) return

  if (!game.user.isGM) return
  const mapperButton = $(`<button class="open-syrinscape"><i class="fas fa-dragon"></i>Syrinscape</button>`)
  html.find('.directory-footer').append(mapperButton)

  mapperButton.on('click', (event) => {
    event.preventDefault()
    const syrinscapeInstance = new SyrinscapeApp()
    syrinscapeInstance.render(true)
  })
})
