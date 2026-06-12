const express = require('express');
const router = express.Router();

const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketStatus,
    updateTicketPriority,
    deleteTicket
} = require('../controllers/ticketController');

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id/status', updateTicketStatus);
router.put('/:id/priority', updateTicketPriority);
router.delete('/:id', deleteTicket);

module.exports = router;