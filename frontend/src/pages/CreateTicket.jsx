import React, { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const mapPriority = (n) => {
  if(n=== '1') return 'Low'
  if(n=== '2') return 'Medium'
  if(n=== '3') return 'High'
  return null
}

export default function CreateTicket({ onDone }){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('2')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const validate = () => {
    const e = {}
    if(!title.trim()) e.title = 'Title is required'
    if(!['1','2','3'].includes(priority)) e.priority = 'Priority must be 1,2 or 3'
    setErrors(e)
    return Object.keys(e).length===0
  }

  const submit = async (ev) => {
    ev && ev.preventDefault()
    if(!validate()) return
    setSubmitting(true)
    setMessage(null)
    try{
      const payload = {
        title: title.trim(),
        description: description.trim(),
        priority: mapPriority(priority)
      }
      const res = await fetch(`${API}/tickets`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      })
      if(!res.ok){
        const err = await res.json()
        throw new Error(err.message || 'Failed')
      }
      const data = await res.json()
      setMessage('Ticket created')
      setTitle('')
      setDescription('')
      setPriority('2')
      if(onDone) setTimeout(()=>onDone(), 600)
    }catch(err){
      setMessage('Error: '+err.message)
    }finally{setSubmitting(false)}
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="field">
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} />
        {errors.title && <div className="field-error">{errors.title}</div>}
      </div>

      <div className="field">
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} />
      </div>

      <div className="field">
        <label>Priority (1=Low, 2=Medium, 3=High)</label>
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value="1">1 - Low</option>
          <option value="2">2 - Medium</option>
          <option value="3">3 - High</option>
        </select>
        {errors.priority && <div className="field-error">{errors.priority}</div>}
      </div>

      <div className="actions">
        <button type="submit" disabled={submitting}>{submitting? 'Creating...':'Create Ticket'}</button>
        <button type="button" className="muted" onClick={()=>{ if(onDone) onDone() }}>Cancel</button>
      </div>

      {message && <div className="message">{message}</div>}
    </form>
  )
}
