import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function TicketList({ reloadFlag=0, onCreateClick }){
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [error, setError] = useState(null)
  const [resolvingIds, setResolvingIds] = useState([])

  const load = async () => {
    setLoading(true)
    try{
      const params = new URLSearchParams()
      if(statusFilter) params.set('status', statusFilter)
      const res = await fetch(`${API}/tickets${params.toString()?'?'+params.toString():''}`)
      const data = await res.json()
      setTickets(data)
    }catch(err){
      setError(err.message)
    }finally{setLoading(false)}
  }

  useEffect(()=>{ load() }, [reloadFlag, statusFilter])

  return (
    <div>
      <div className="controls">
        <div>
          <label>Filter by status:</label>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div>
          <button onClick={onCreateClick}>New Ticket</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {tickets.map(t => (
          <div key={t.id} className="card">
            <h3>{t.title}</h3>
            <p className="meta"><strong>Priority:</strong> {t.priority} <span className="sep"/> <strong>Status:</strong> {t.status}</p>
            <p className="date">{new Date(t.created_at).toLocaleString()}</p>
            <p className="desc">{t.description}</p>
            <div style={{marginTop:10,display:'flex',gap:8}}>
              {t.status !== 'Closed' && (
                <button
                  onClick={async ()=>{
                    try{
                      setResolvingIds(prev=>[...prev,t.id])
                      const res = await fetch(`${API}/tickets/${t.id}/status`, {
                        method: 'PUT',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({ status: 'Closed' })
                      })
                      if (!res.ok) {
                        const err = await res.json().catch(()=>({message:res.statusText}))
                        throw new Error(err.message || 'Failed')
                      }
                      await load()
                    }catch(err){
                      setError(err.message)
                    }finally{
                      setResolvingIds(prev=>prev.filter(id=>id!==t.id))
                    }
                  }}
                  disabled={resolvingIds.includes(t.id)}
                >{resolvingIds.includes(t.id)?'Resolving...':'Resolve'}</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!loading && tickets.length===0 && <p>No tickets found.</p>}
    </div>
  )
}
