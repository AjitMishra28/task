
"use client"

import { useState } from "react"
import { enrich } from "../lib/api"
import PromptExamples from "../components/PromptExamples"
import ResultsTable from "../components/ResultsTable"
import JsonModal from "../components/JsonModal"

export default function Page(){

  const [prompt,setPrompt] = useState("")
  const [rows,setRows] = useState([])
  const [json,setJson] = useState(null)

  const run = async ()=>{
    const res = await enrich(prompt)
    setRows(res.data.results)
  }

  return (
    <div style={{padding:40}}>
      <h1>OutMate – NLP Enrichment Demo</h1>

      <textarea rows={4} value={prompt}
        onChange={e=>setPrompt(e.target.value)}
        style={{width:"100%"}}
      />

      <button onClick={run}>Search & Enrich</button>

      <PromptExamples setPrompt={setPrompt} />

      <ResultsTable rows={rows} onView={setJson} />

      <JsonModal data={json} onClose={()=>setJson(null)} />
    </div>
  )
}
