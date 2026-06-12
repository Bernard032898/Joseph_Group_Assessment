import React, { useState } from 'react'
import TicketList from './pages/TicketList'
import CreateTicket from './pages/CreateTicket'

export default function App(){
  const [route, setRoute] = useState('list')
  const [reloadFlag, setReloadFlag] = useState(0)

  const navigate = (r) => setRoute(r)
  const refresh = () => setReloadFlag(f => f+1)

  return (
    <div className="app">
      <header className="header">
        <h1>Ticket Dashboard</h1>
        <nav>
          <button className={route==='list'? 'active':''} onClick={()=>navigate('list')}>Tickets</button>
          <button className={route==='create'? 'active':''} onClick={()=>navigate('create')}>Create Ticket</button>
        </nav>
      </header>
      <main className="main">
        {route === 'list' && <TicketList reloadFlag={reloadFlag} onCreateClick={()=>navigate('create')} />}
        {route === 'create' && <CreateTicket onDone={()=>{ refresh(); navigate('list') }} />}
      </main>
    </div>
  )
}
