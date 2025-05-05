import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'villbrygg',
  api: {
    projectId: '8pq05gnc',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
