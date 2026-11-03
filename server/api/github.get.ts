import { github } from '../../app/data/portfolio'

type Repo = { fork: boolean; stargazers_count: number; forks_count: number }
type User = { followers: number; public_repos: number }

// آمار زنده‌ی گیت‌هاب؛ ۳۰ دقیقه کش می‌شود تا به محدودیت نرخ (۶۰ درخواست در ساعت) نخوریم.
// اگر خطا بدهد، فرانت‌اند خودکار به github.fallbackStats برمی‌گردد.
export default defineCachedEventHandler(async (event) => {
  const token = useRuntimeConfig(event).githubToken as string
  const headers: Record<string, string> = {
    'User-Agent': 'portfolio-site',
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
  const api = `https://api.github.com/users/${github.username}`

  try {
    const [user, repos] = await Promise.all([
      $fetch<User>(api, { headers, timeout: 8000 }),
      $fetch<Repo[]>(`${api}/repos`, { headers, timeout: 8000, query: { per_page: 100, type: 'owner' } })
    ])
    const own = repos.filter((r) => !r.fork)
    return {
      stars: own.reduce((n, r) => n + r.stargazers_count, 0),
      forks: own.reduce((n, r) => n + r.forks_count, 0),
      followers: user.followers,
      repos: user.public_repos,
      updatedAt: new Date().toISOString()
    }
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'GitHub unavailable' })
  }
}, { name: 'github-stats', maxAge: 60 * 30, swr: true })
