import { NextRequest } from 'next/server'
import { getPlaiceholder } from 'plaiceholder'

const getImagePath = (type: string) => {
  return `${process.env.BASE_URL}/images/placeholder/${type}.jpg`
}

export async function GET(request: NextRequest) {
  const imageType = request.nextUrl.searchParams.get('type')

  if (!imageType) {
    return Response.json({
      success: false,
      message: 'Missing image type',
    })
  }

  const buffer = await fetch(getImagePath(imageType)).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  )

  const { base64 } = await getPlaiceholder(buffer)

  return Response.json({
    success: true,
    data: base64,
  })
}
