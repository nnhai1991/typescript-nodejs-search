
import fs from "fs";

import FileHelper from "../helper/file.helper";

class UserRepository {
    public data: { [key: number]: any; } = {};
    private field: any[];
    private fileHelper = new FileHelper();

    constructor() {
        this.fileHelper.readDataFile("users.json",
            (err, content) => {
                if (err) { throw err; }
                const json: [] = JSON.parse(content);
                for (const entry of json) {
                    const id = entry["_id"];
                    if (id) {
                        this.data[id] = entry;
                    }
                }
                console.log(`Finished Loading User Data`);
            }
        );
    }

    public findByField(field: string, value: string): any[] {
        return Object.entries(this.data).filter(([k, v]) => v[field] == value).map(([k, v]) => (v));
    }

    public findById(id: number): any {
        return this.data[id];
    }
}

export default UserRepository;
