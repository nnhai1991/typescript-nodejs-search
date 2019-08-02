import readline from "readline";

import UserRepository from "./repository/user.repository";

const userrepo = new UserRepository();
const EXIT = "exit";

class Main {
    private rl: any;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    public run() {
        console.log("hehe");
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
                        this.handle1();
                        break;
                    case "2":
                        this.handle2();
                        break;
                    default:
                        this.handleDefault();
                }
            }
        });
    }

    private handle1() {
        this.ask("handle 1? ");

    }

    private handle2() {
        this.ask("handle 2? ");

    }

    private handleDefault() {
        console.log("Feature not implemented. Start over.");
        this.startOver();
    }

    private startOver() {
        this.ask("Begin program (1/2/exit)? ");
    }

}

new Main().run();
