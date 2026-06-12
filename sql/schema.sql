-- Create Tickets table

CREATE TABLE Tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) NOT NULL CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('Open', 'In Progress', 'Closed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);