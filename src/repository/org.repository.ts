

import FileHelper from "../helper/file.helper";
import Comparator from "../helper/comparator";

class OrgRepository {
    public data: { [key: number]: any; } = {};
    private field: any[];
    private fileHelper = new FileHelper();
    public initiated = false;

    constructor(callBack:()=>void) {
        this.fileHelper.readDataFile("organizations.json",
            (err, content) => {
                if (err) { throw err; }
                const json: [] = JSON.parse(content);
                for (const entry of json) {
                    const id = entry["_id"];
                    if (id) {
                        this.data[id] = entry;
                    }
                }                
                console.log(`Finished Loading Organizations Data`);
                this.initiated = true;
                if(callBack)
                    callBack();
            }
        );
    }

    public findByField(field: string, value: string): any[] {
        return Object.entries(this.data)
            .filter(([k, v]) => Comparator.equalOrContains(v[field], value))
            .map(([k, v]) => (v));
    }

    public findById(id: number): any {
        return this.data[id];
    }
}

export default OrgRepository;
