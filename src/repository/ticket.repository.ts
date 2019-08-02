
import fs from "fs";

import FileHelper from "../helper/file.helper";

class TicketRepository {
    // data indexed by id
    public data: { [key: number]: any; } = {};

    // indexed assignee
    public assigned: { [key: number]: number[] } = {};

    // indexed submitted user
    public submited: { [key: number]: number[]; } = {};

    // indexed org
    public org: { [key: number]: number[]; } = {};

    private field: any[];

    private fileHelper = new FileHelper();

    constructor() {
        this.fileHelper.readDataFile("tickets.json",
            (err, content) => {
                if (err) { throw err; }
                const json: [] = JSON.parse(content);
                for (const entry of json) {
                    const id = entry["_id"];
                    if (id) {
                        this.data[id] = entry;
                    }
                }
                this.initiateIndexes();
                console.log(`Finished Loading Organizations Data`);
            }
        );
    }

    public initiateIndexes() {
        return Object.entries(this.data).forEach(([k, entry]) => {
            const id = +k;
            if (!this.submited[entry["submitter_id"]])
                this.submited[entry["submitter_id"]] = [];
            this.submited[entry["submitter_id"]].push(id);

            if (!this.assigned[entry["assignee_id"]])
                this.assigned[entry["assignee_id"]] = [];
            this.assigned[entry["assignee_id"]].push(id);

            if (!this.org[entry["organization_id"]])
                this.org[entry["organization_id"]] = [];
            this.org[entry["organization_id"]].push(id);
        });
    }

    public findByField(field: string, value: string): any[] {
        return Object.entries(this.data).filter(([k, v]) => v[field] == value).map(([k, v]) => (v));
    }

    public findById(id: number): any {
        return this.data[id];
    }

    public findByAssignedTo(userId: number): any[] {
        return this.submited[userId].map(id => this.data[id]);
    }

    public findBySubmittedBy(userId: number): any[] {
        return this.assigned[userId].map(id => this.data[id]);
    }

    public findbyOrg(orgId: number): any[] {
        return this.org[orgId].map(id => this.data[id]);
    }
}

export default TicketRepository;
