const axios = require("axios")

exports.parsePrompt = async (prompt) => {

  const system = `
Convert B2B search prompt into strict JSON.

Return ONLY JSON.

Fields allowed:
entity_type
filters.industry
filters.employee_count_min
filters.employee_count_max
filters.countries
filters.job_titles
filters.keywords
filters.revenue_min
filters.revenue_max
`

  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{
        parts: [{
          text: system + "\nPrompt: " + prompt
        }]
      }]
    }
  )

  const text = res.data.candidates[0].content.parts[0].text

  const start = text.indexOf("{")
  const end = text.lastIndexOf("}") + 1

  return JSON.parse(text.slice(start,end))
}
