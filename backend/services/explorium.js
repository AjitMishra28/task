const axios = require("axios")

function mapFiltersToExplorium(filters) {

  // Translate Gemini filters → Explorium schema
  // Adjust keys once you see their API docs

  const mapped = {}

  if (filters.industry)
    mapped.industries = filters.industry

  if (filters.countries)
    mapped.countries = filters.countries

  if (filters.employee_count_min || filters.employee_count_max)
    mapped.employee_range = {
      min: filters.employee_count_min || 0,
      max: filters.employee_count_max || 999999
    }

  if (filters.job_titles)
    mapped.titles = filters.job_titles

  if (filters.keywords)
    mapped.keywords = filters.keywords

  if (filters.revenue_min || filters.revenue_max)
    mapped.revenue_range = {
      min: filters.revenue_min || 0,
      max: filters.revenue_max || 999999999
    }

  return mapped
}


function mockData() {
  return [
    {
      name: "Fallback AI Corp",
      domain: "fallback.ai",
      industry: "AI",
      employee_count: 150,
      revenue: "25M",
      country: "USA",
      linkedin_url: "https://linkedin.com/company/fallback",
      tech_stack: ["AWS","Python"]
    },
    {
      name: "CloudScale",
      domain: "cloudscale.io",
      industry: "SaaS",
      employee_count: 300,
      revenue: "60M",
      country: "USA"
    },
    {
      name: "Finlytics",
      domain: "finlytics.com",
      industry: "Fintech",
      employee_count: 90,
      revenue: "12M",
      country: "UK"
    }
  ]
}


exports.searchExplorium = async (entityType, filters) => {

  const mappedFilters = mapFiltersToExplorium(filters)

  const endpoint =
    entityType === "prospect"
      ? "/prospects/search"
      : "/companies/search"

  try {

    const res = await axios.post(
      process.env.EXPLORIUM_BASE_URL + endpoint,
      {
        filters: mappedFilters,
        limit: 3,
        enrich: true
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPLORIUM_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    return res.data.results.slice(0,3)

  } catch (e) {

    console.error("Explorium failed:", e.response?.data || e.message)

    if (process.env.USE_MOCK_IF_FAIL === "true") {
      console.log("Using fallback mock data")
      return mockData()
    }

    throw e
  }
}
