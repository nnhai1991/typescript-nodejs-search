import readline from "readline";

import SearchService from "./service/search.service";

const EXIT = "exit";

class Main {
    private rl: any;
    private service: SearchService;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.log("Initiating repositories");
        this.service = new SearchService(() => this.startOver());
    }

    public run() {
        this.startOver();
    }

    private ask(question) {
        this.rl.question(question, (answer) => {
            if (answer === EXIT) {
                this.rl.close();
            } else {
                switch (answer) {
                    case "1":
                        this.beginUser();
                        break;
                    case "2":
                        this.beginTicket();
                        break;
                    case "3":
                        this.beginOrg();
                        break;
                    default:
                        this.handleDefault();
                }
            }
        });
    }

    private beginUser() {
        this.askAndSearch((field, value) => {
            const dtoList = this.service.searchUserByField(field, value);
            console.log(`Found ${dtoList.length} records`);
            for (let dto of dtoList) {
                console.log(dto.user);
                console.log("Org:");
                console.log(dto.org ? dto.org.name : "No Org Found");
                console.log("Assigned Tickets:");
                console.log(dto.assignedTickets.map(t => t.subject));
                console.log("Submitted Tickets:");
                console.log(dto.submittedTickets.map(t => t.subject));
            }
            this.startOver();
        });
    }


    private beginTicket() {
        this.askAndSearch((field, value) => {
            const dtoList = this.service.searchTicketByField(field, value);
            console.log(`Found ${dtoList.length} records`);
            for (let dto of dtoList) {
                console.log(dto.ticket);
                console.log("Org:")
                console.log(dto.org ? dto.org.name : "Not found");
                console.log("Assignee:")
                console.log(dto.assignee ? dto.assignee.name : "Not found");
                console.log("Submitted By:")
                console.log(dto.submittedBy ? dto.submittedBy.name : "Not found");
            }
            this.startOver();
        });

    }

    private beginOrg() {
        this.askAndSearch((field, value) => {
            const dtoList = this.service.searchOrgByField(field, value);
            console.log(`Found ${dtoList.length} records`);
            for (let dto of dtoList) {
                console.log(dto.org);
                console.log("Tickets:");
                console.log(dto.tickets ? dto.tickets.map(t => t.subject) : "No tickets found");
                console.log("Users:");
                console.log(dto.users ? dto.users.map(t => t.name) : "No users found");
            }
            this.startOver();
        });
    }

    private askAndSearch(callback: (field: string, value: string) => void) {
        this.rl.question("Enter field ", (field) => {
            this.rl.question("Enter value ", (value) => {
                callback(field, value);
            });
        });
    }

    private handleDefault() {
        console.log("Feature not implemented. Start over.");
        this.startOver();
    }

    private startOver() {
        this.ask("Begin program (1 user/2 ticket/3 org/exit)? ");
    }
}

const app = new Main();
