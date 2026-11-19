import axios from 'axios'

/**
 * Releases for this launcher live on the Mikro900ytpl fork.
 */

export const repositoryService = axios.create({
  baseURL: 'https://api.github.com/repos/Mikro900ytpl/Aerial-Launcher',
  headers: {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Aerial-Launcher',
  },
})
