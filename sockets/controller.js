import TicketControl from "../models/ticket-control.js";

const ticketControl = new TicketControl();

export const socketController = (socket) => {
  socket.on("next-ticket", (_, callback) => {
    // generates a new ticket
    const nextTicket = ticketControl.nextTicket();
    callback(nextTicket);
  });

  socket.on("last-ticket", (_, callback) => {
    const lastTicket = ticketControl.lastTicket;
    callback(lastTicket);
  });

  socket.on("assign-ticket", ({ currentDesktop }, callback) => {
    if (!currentDesktop) {
      return callback({
        ok: false,
        msg: "the desktop is mandatory",
      });
    }

    const ticket = ticketControl.assignTicket(currentDesktop);
    if (!ticket) {
      callback({
        ok: false,
        msg: "there is no more tickets",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};
