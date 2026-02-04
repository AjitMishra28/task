const router = require("express").Router()

router.post("/", async (req,res)=>{

  try {

    const { prompt } = req.body

    if(!prompt) {
      return res.status(400).json({ error: "prompt_required" })
    }

    console.log("Prompt:", prompt)

    // SAFE MOCK RESPONSE — no external APIs
    const results = [
      {
        type: "company",
        name: "Demo AI Corp",
        industry: "AI",
        employee_count: 120,
        country: "USA",
        raw: { demo: true }
      },
      {
        name: "SaaSify",
        industry: "SaaS",
        employee_count: 300,
        country: "USA",
        raw: { demo: true }
      },
      {
        name: "FintechPro",
        industry: "Fintech",
        employee_count: 80,
        country: "UK",
        raw: { demo: true }
      }
    ]

    res.json({ results })

  } catch(e) {

    console.error("ERROR:", e)

    res.status(500).json({
      error: "server_failed",
      message: e.message
    })
  }

})

module.exports = router
