const searchParams = new URLSearchParams( window.location.search )

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('The desktop is mandatory')
}

//refernces 

const lblDesktop = document.querySelector('h1')
const btnAssign = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')

const currentDesktop = searchParams.get('escritorio')
lblDesktop.innerText = currentDesktop
divAlert.style.display = 'none'
const socket = io();
socket.on("connect", () => {
  btnAssign.disabled = false;
});

socket.on("disconnect", () => {
  btnAssign.disabled = true;
});

// socket.emit("last-ticket", null, (lastTicket) => {
//     newTicketBtn.innerText = `Ticket ${lastTicket}`
//   })
btnAssign.addEventListener("click", () => {
 
    socket.emit("assign-ticket", {currentDesktop} , ({ok, ticket, msg}) => {

        if(!ok) {
                    
lblTicket.innerText = 'Nadie.'

            return divAlert.style.display = ''
        }
        
lblTicket.innerText = `Ticket ${ticket.number}`

    })
    


    
})
