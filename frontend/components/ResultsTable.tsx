export default function ResultsTable({rows,onView}:any){

  if(!rows.length) return <p>No results</p>

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Domain</th>
          <th>Industry</th>
          <th>Employees</th>
          <th>Revenue</th>
          <th>Country</th>
          <th>LinkedIn</th>
          <th>JSON</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((r:any,i:number)=>(
          <tr key={i}>
            <td>{r.name}</td>
            <td>{r.domain}</td>
            <td>{r.industry}</td>
            <td>{r.employee_count}</td>
            <td>{r.revenue}</td>
            <td>{r.country}</td>
            <td>
              <a href={r.linkedin_url} target="_blank">
                Link
              </a>
            </td>
            <td>
              <button onClick={()=>onView(r.raw)}>
                View JSON
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
