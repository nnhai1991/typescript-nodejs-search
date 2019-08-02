
import fs from "fs";

import FileHelper from "../helper/file.helper";

class UserRepository {
    private data: { [key: string]: any; } = {};
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
        return this.data.filter((key, val) => val[field] === value).map((key, val) => val);
    }
}

export default UserRepository;
