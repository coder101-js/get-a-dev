
export async function botProtection(req) {
  const ua = req.headers.get('user-agent') || '';
  if (/bot|crawl|spider|curl|wget|python|go-http/i.test(ua)) {
    return new Response(JSON.stringify({ message: 'Access denied for bots.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null; 
}
