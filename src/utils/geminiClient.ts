export async function fetchGeminiWithRetry(payload: any, maxRetries = 3, isJsonExpected = false): Promise<any> {
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || atob("QVEuQWI4Uk42SnUtaE04c2d5aHNGOHYweXJYUHliTGwwc2g0NUNhTEhGQ0dXQnVvUzZUUHc=");
  
  if (isJsonExpected) {
    payload.generationConfig = {
      ...payload.generationConfig,
      responseMimeType: "application/json"
    };
  }

  let res;
  let retries = maxRetries;
  let delay = 1000;
  
  while (retries > 0) {
    try {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) break;
      if (res.status !== 503 && res.status !== 429) {
        throw new Error(`API returned ${res.status}`);
      }
    } catch (err) {
      if (retries === 1) throw err;
    }
    retries--;
    await new Promise(r => setTimeout(r, delay));
    delay *= 2;
  }
  
  if (!res || !res.ok) {
    throw new Error(`API returned ${res?.status}`);
  }
  
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
  if (isJsonExpected) {
    try {
      return JSON.parse(text);
    } catch (e) {
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanText);
    }
  }
  
  return text;
}
