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
        this.service = new SearchService();
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
        this.rl.question("Enter field ", (field) => {
            this.rl.question("Enter value ", (value) => {
                const dtoList = this.service.searchUserByField(field, value);
                console.log(`Found ${dtoList.length} records`);
                for (let dto of dtoList) {
                    console.log(dto.user);
                    console.log("Org:");
                    console.log(dto.org ? dto.org : "No Org Found");
                    console.log("Assigned Tickets:");
                    console.log(dto.assignedTickets.map(t => t.subject));
                    console.log("Submitted Tickets:");
                    console.log(dto.submittedTickets.map(t => t.subject));
                }
                this.startOver();
            });
        });
    }


    private beginTicket() {
        this.rl.question("Enter field ", (field) => {
            this.rl.question("Enter value ", (value) => {
                const dtoList = this.service.searchTicketByField(field, value);
                console.log(`Found ${dtoList.length} records`);
                for (let dto of dtoList) {
                    console.log(dto);
                }
                this.startOver();
            });
        });

    }

    private beginOrg() {
        this.rl.question("Enter field ", (field) => {
            this.rl.question("Enter value ", (value) => {
                const dtoList = this.service.searchOrgByField(field, value);
                console.log(`Found ${dtoList.length} records`);
                for (let dto of dtoList) {
                    console.log(dto.org);
                    console.log("Tickets:");
                    console.log(dto.tickets?dto.tickets.map(t => t.subject):"No tickets found");
                    console.log("Users:");
                    console.log(dto.users?dto.users.map(t => t.name):"No users found");
                }
                this.startOver();
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

new Main().run();
