
export default function JsonModal({data,onClose}:any){
  if(!data) return null
  return (
    <div style={{position:"fixed", inset:0, background:"#0008"}}>
      <div style={{background:"white", padding:20}}>
        <button onClick={onClose}>Close</button>
        <pre>{JSON.stringify(data,null,2)}</pre>
      </div>
    </div>
  )
}
