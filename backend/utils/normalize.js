exports.normalizeResults = (entityType, rows) => {

  return rows.slice(0,3).map(r => ({

    type: entityType,

    name: r.name || r.company_name,
    domain: r.domain,
    industry: r.industry,
    employee_count: r.employee_count,
    revenue: r.revenue,
    country: r.country,
    founded_year: r.founded_year,

    linkedin_url: r.linkedin_url,
    website: r.website,

    tech_stack: r.tech_stack,
    key_contacts: r.key_contacts,

    raw: r
  }))
}
