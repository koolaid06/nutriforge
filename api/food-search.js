export default async function handler(req, res) {
  const { query } = req.query
  if (!query) return res.status(400).json({ error: 'query required' })

  const apiKey = process.env.VITE_USDA_API_KEY ?? 'DEMO_KEY'

  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&dataType=Foundation,SR%20Legacy,Branded&pageSize=25&api_key=${apiKey}`
    )
    const data = await response.json()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from USDA' })
  }
}