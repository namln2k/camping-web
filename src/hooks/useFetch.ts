import { useEffect, useState } from 'react'

export default function useFetch(url: string, options?: RequestInit) {
  const [data, setData] = useState<any>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Param url can be a relative path or an absolute path. If it's a relative path, we'll prepend the base url.
        let targetUrl
        if (url.includes('http') || url.includes('https')) {
          targetUrl = url
        } else {
          targetUrl = `${process.env.BASE_URL}/api/${url}`
        }

        const response = await fetch(targetUrl, options)
        const data = await response.json()

        setData(data)
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [options, url])

  return { data, error, loading }
}
