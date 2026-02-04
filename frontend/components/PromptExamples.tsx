
export default function PromptExamples({setPrompt}:any){

  const examples = [
    "Find SaaS companies in US with 50-500 employees",
    "VP Sales in fintech startups Europe",
    "AI companies India"
  ]

  return (
    <div>
      {examples.map((e,i)=>(
        <button key={i} onClick={()=>setPrompt(e)}>
          {e}
        </button>
      ))}
    </div>
  )
}
