import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const PAGE_SIZE_OPTIONS = [5, 10, 15]

export default function TicketList({ reloadFlag=0, onCreateClick }){
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [error, setError] = useState(null)
  const [resolvingIds, setResolvingIds] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0])

  const load = async () => {
    setLoading(true)
    try{
      const params = new URLSearchParams()
      if(statusFilter) params.set('status', statusFilter)
      const res = await fetch(`${API}/tickets${params.toString()?'?'+params.toString():''}`)
      const data = await res.json()
      setTickets(data)
      setPage(1)
    }catch(err){
      setError(err.message)
    }finally{setLoading(false)}
  }

  useEffect(()=>{ load() }, [reloadFlag, statusFilter])

  const pageCount = Math.max(1, Math.ceil(tickets.length / pageSize))
  const pageTickets = tickets.slice((page - 1) * pageSize, page * pageSize)

  const setPageSafe = (value) => {
    if(value < 1) value = 1
    if(value > pageCount) value = pageCount
    setPage(value)
  }

  return (
    <div>
      <div className="controls">
        <div className="control-group">
          <label>Filter by status:</label>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="control-group">
          <label>Page size:</label>
          <select value={pageSize} onChange={e=>{ setPageSize(Number(e.target.value)); setPage(1)}}>
            {PAGE_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={onCreateClick}>New Ticket</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results-meta">
        <p>{tickets.length} ticket{tickets.length === 1 ? '' : 's'} total</p>
        <p>Page {page} of {pageCount}</p>
      </div>

      {!loading && pageTickets.length > 0 && (
        <div className="table-wrapper">
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageTickets.map(t => (
                <tr key={t.id} className={t.status === 'Closed' ? 'row-closed' : ''}>
                  <td>{t.title}</td>
                  <td>{t.priority}</td>
                  <td>{t.status}</td>
                  <td>{new Date(t.created_at).toLocaleString()}</td>
                  <td>{t.description}</td>
                  <td>
                    {t.status !== 'Closed' ? (
                      <button
                        className="small"
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
                    ) : (
                      <span className="status-label">Closed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tickets.length===0 && <p>No tickets found.</p>}

      {!loading && tickets.length > pageSize && (
        <div className="pagination">
          <button onClick={()=>setPageSafe(page - 1)} disabled={page === 1}>Previous</button>
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              className={page === index + 1 ? 'active' : ''}
              onClick={()=>setPageSafe(index + 1)}
            >{index + 1}</button>
          ))}
          <button onClick={()=>setPageSafe(page + 1)} disabled={page === pageCount}>Next</button>
        </div>
      )}
    </div>
  )
}
