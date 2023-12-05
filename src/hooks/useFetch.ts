import { useEffect, useState } from 'react'

interface Error {
  message: string
  parameters: string[] | []
}

const useFetch = (
  method: string,
  endpoint: string,
  body: any = null
): [any, boolean, Error[] | []] => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Error[] | []>([])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      // First, try to fetch data with the current token from the .env file.
      let fetchOptions: RequestInit = {
        method: method,
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MAGENTO_ADMIN_TOKEN}`,
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }),
      }

      // If there is a body (Usually when it's a POST request), add it to the fetch options.
      if (body) {
        fetchOptions.body = JSON.stringify(body)
      }

      const response = await fetch(
        `${process.env.MAGENTO_BASE_URL}/rest/V1/${endpoint}`,
        fetchOptions
      )

      const data = await response.json()

      if (data.errors) {
        setErrors(data.errors)
      } else {
        // If the response has an error message that the token is invalid, try to fetch a new token.
        if (
          data.message === "The consumer isn't authorized to access %resources."
        ) {
          const fetchNewToken = await fetch(
            `${process.env.MAGENTO_BASE_URL}/rest/V1/integration/admin/token`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: process.env.MAGENTO_ADMIN_USERNAME,
                password: process.env.MAGENTO_ADMIN_PASSWORD,
              }),
            }
          )

          const newToken = await fetchNewToken.json()

          fetchOptions = {
            method: method,
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken}`,
            }),
          }

          // Try to fetch the data again with the new token.
          const newResponse = await fetch(
            `${process.env.MAGENTO_BASE_URL}/rest/V1/${endpoint}`,
            fetchOptions
          )

          const newData = await newResponse.json()

          // If the new response has an error message, set the errors state.
          if (newData.errors) {
            setErrors(newData.errors)
          } else {
            setData(newData)
          }
        } else {
          setData(data)
        }
      }

      setLoading(false)
    }

    fetchData()
  }, [method, endpoint, body])

  return [data, loading, errors]
}

export default useFetch
