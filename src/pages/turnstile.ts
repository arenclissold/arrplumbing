export const post = async ({ request }) => {
  const data = await request.json()
  const token = data.turnstile

  const body = {
    secret: import.meta.env.TURNSTILE_SECRET,
    response: token,
  }

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: body,
		method: 'POST',
	});
  console.log(result.success)

  return new Response(JSON.stringify(result.success), { status: 200 })
}
