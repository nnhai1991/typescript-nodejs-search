
import fs from "fs";

import FileHelper from "../helper/file.helper";

class TicketRepository {
    // data indexed by id
    public data: { [key: string]: any; } = {};

    // indexed assignee
    public assigned: { [key: number]: string[] } = {};

    // indexed submitted user
    public submited: { [key: number]: string[]; } = {};

    // indexed org
    public org: { [key: number]: string[]; } = {};

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
        return Object.entries(this.data).forEach(([id, entry]) => {
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

    public findById(id: string): any {
        return this.data[id];
    }

    public findByAssignedTo(userId: number): any[] {
        if (!this.submited[userId])
            return [];
        return this.submited[userId].map(id => this.data[id]);
    }

    public findBySubmittedBy(userId: number): any[] {
        if (!this.assigned[userId])
            return [];
        return this.assigned[userId].map(id => this.data[id]);
    }

    public findbyOrg(orgId: number): any[] {
        if (!this.org[orgId])
            return [];
        return this.org[orgId].map(id => this.data[id]);
    }
}

export default TicketRepository;
