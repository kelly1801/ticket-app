// html references

const newTicketBtn = document.querySelector("#lblNuevoTicket");
const btnCreate = document.querySelector("button");

const socket = io();
socket.on("connect", () => {
  btnCreate.disabled = false;
});

socket.on("disconnect", () => {
  btnCreate.disabled = true;
});

socket.emit("last-ticket", null, (lastTicket) => {
    newTicketBtn.innerText = `Ticket ${lastTicket}`
  })
btnCreate.addEventListener("click", () => {
 
    

  socket.emit("next-ticket", null, (ticket) => {
    newTicketBtn.innerText = ticket
  })
    
})
