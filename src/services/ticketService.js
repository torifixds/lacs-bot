const Ticket = require('../models/Ticket');

async function createTicket({ guildId, channelId, creatorId, topic }) {
  return Ticket.create({
    guildId,
    channelId,
    creatorId,
    topic,
    status: 'open',
    messages: []
  });
}

async function closeTicket(channelId) {
  return Ticket.findOneAndUpdate(
    { channelId },
    { status: 'closed' },
    { new: true }
  );
}

module.exports = { createTicket, closeTicket };
