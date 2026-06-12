const db = require('../config/db');

const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const VALID_STATUSES = ['Open', 'In Progress', 'Closed'];

const validatePriority = (value) => {
    if (!value) return null;
    const formatted = String(value).trim();
    return VALID_PRIORITIES.includes(formatted) ? formatted : null;
};

const validateStatus = (value) => {
    if (!value) return null;
    const formatted = String(value).trim();
    return VALID_STATUSES.includes(formatted) ? formatted : null;
};

exports.createTicket = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const ticketPriority = validatePriority(priority);
        const ticketStatus = status ? validateStatus(status) : 'Open';

        if (!ticketPriority) {
            return res.status(400).json({
                message: 'Invalid priority. Valid values are: Low, Medium, High, Critical.'
            });
        }

        if (status && !ticketStatus) {
            return res.status(400).json({
                message: 'Invalid status. Valid values are: Open, In Progress, Closed.'
            });
        }

        const result = await db.query(
            `INSERT INTO Tickets
            (title, description, priority, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [title, description, ticketPriority, ticketStatus]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const { status, priority, title, description } = req.query;

        let query = 'SELECT * FROM Tickets WHERE 1=1';
        const values = [];

        if (status) {
            const ticketStatus = validateStatus(status);
            if (!ticketStatus) {
                return res.status(400).json({
                    message: 'Invalid status. Valid values are: Open, In Progress, Closed.'
                });
            }
            values.push(ticketStatus);
            query += ` AND status=$${values.length}`;
        }

        if (priority) {
            const ticketPriority = validatePriority(priority);
            if (!ticketPriority) {
                return res.status(400).json({
                    message: 'Invalid priority. Valid values are: Low, Medium, High, Critical.'
                });
            }
            values.push(ticketPriority);
            query += ` AND priority=$${values.length}`;
        }

        if (title) {
            values.push(`%${String(title).trim()}%`);
            query += ` AND title ILIKE $${values.length}`;
        }

        if (description) {
            values.push(`%${String(description).trim()}%`);
            query += ` AND description ILIKE $${values.length}`;
        }

        const result = await db.query(query, values);
        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'SELECT * FROM Tickets WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Ticket not found'
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const ticketStatus = validateStatus(status);

        if (!ticketStatus) {
            return res.status(400).json({
                message: 'Invalid status. Valid values are: Open, In Progress, Closed.'
            });
        }

        const result = await db.query(
            `UPDATE Tickets
             SET status=$1
             WHERE id=$2
             RETURNING *`,
            [ticketStatus, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Ticket not found'
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTicketPriority = async (req, res) => {
    try {
        const { id } = req.params;
        const { priority } = req.body;
        const ticketPriority = validatePriority(priority);

        if (!ticketPriority) {
            return res.status(400).json({
                message: 'Invalid priority. Valid values are: Low, Medium, High, Critical.'
            });
        }

        const result = await db.query(
            `UPDATE Tickets
             SET priority=$1
             WHERE id=$2
             RETURNING *`,
            [ticketPriority, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Ticket not found'
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'DELETE FROM Tickets WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Ticket not found'
            });
        }

        res.json({
            message: 'Ticket deleted successfully',
            ticket: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};