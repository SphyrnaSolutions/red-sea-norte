import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()

  // Redirect to homepage or referer
  const referer = request.headers.get('referer')
  const redirectUrl = referer || '/'

  redirect(redirectUrl)
}
