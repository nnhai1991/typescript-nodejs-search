import readline from "readline";

import UserRepository from "./repository/user.repository";
import SearchService from "./service/search.service";

const userrepo = new UserRepository();
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
            console.log(`${answer}`);

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
                const userdto = this.service.searchUserByField(field,value)
                console.log(userdto);
            });
        });
    }

    private beginTicket() {
        this.ask("handle 2? ");

    }

    private beginOrg() {
        this.ask("handle 2? ");

    }

    private askForFieldValue(){

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
