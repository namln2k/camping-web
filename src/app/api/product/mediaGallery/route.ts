import useQuery from '@/hooks/useQuery'
import { gql } from '@apollo/client'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const productUid = request.nextUrl.searchParams.get('sku')

  const [product, productError] = await useQuery(gql`
    query {
      products(filter: { uid: { eq: "${productUid}" } }) {
        items {
          id
          uid
          media_gallery {
            url
            label
            position
          }
        }
      }
    }
  `)

  return Response.json({
    success: true,
    data: 'Hello World',
  })
}
