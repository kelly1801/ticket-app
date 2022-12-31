import TicketControl from "../models/ticket-control.js";

const ticketControl = new TicketControl();

export const socketController = (socket) => {
  socket.on("next-ticket", (payload, callback) => {
    // generates a new ticket
    const nextTicket = ticketControl.nextTicket();
    callback(nextTicket);
  });

  socket.on("last-ticket", (payload, callback) => {
    const lastTicket = ticketControl.lastTicket
    callback(lastTicket)
  })
};
