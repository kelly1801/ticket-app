import path from "path";
import fs from "fs";
import * as data from "../db/data.json" assert { type: "json" };
import { __dirname } from "../utils/dirname.js";

export class Ticket {
  constructor(number, desktop) {
    (this.number = number), (this.desktop = desktop);
  }
}
export default class TicketControl {
  constructor() {
    this.lastTicket = 0;
    this.today = new Date().getDate();
    this.pendingTickets = [];
    this.lastFourTickes = [];

    this.init();
  }

  get toJson() {
    return {
      lastTicket: this.lastTicket,
      today: this.today,
      pendingTickets: this.pendingTickets,
      lastFourTickes: this.lastFourTickes,
    };
  }

  init() {
    const { lastTicket, today, pendingTickets, lastFourTickets } = data;
    // if we are on the same dday just equal the data
    // else is another date we need to re initialize the new data
    if (today === this.today) {
      this.pendingTickets = pendingTickets;
      this.lastTicket = lastTicket;
      this.lastFourTickes = lastFourTickets;
    } else {
      this.saveDB();
    }
  }
  saveDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  nextTicket() {
    this.lastTicket += 1;
    const ticket = new Ticket(this.lastTicket, null);
    this.pendingTickets.push(ticket);

    this.saveDB();
    return `Ticket ${ticket.number}`;
  }

  assignTicket(desktop) {
    if (!this.pendingTickets.length) {
      return null;
    }

    const ticket = this.pendingTickets.shifth(); // this.pendingTicket[0]

    ticket.desktop = desktop;

    this.lastFourTickes.unshift(ticket);

    if (this.lastFourTickes.length > 4) {
      this.lastFourTickes.splice(-1, 1);
    }
    this.saveDB();

    return ticket;
  }
}
