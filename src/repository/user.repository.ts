import FileHelper from "../helper/file.helper";
import Comparator from "../helper/comparator";

class UserRepository {
    // data indexed by id
    public data: { [key: number]: any; } = {};

    // indexed org
    public org: { [key: number]: number[]; } = {};

    private field: any[];
    private fileHelper = new FileHelper();
    public initiated = false;

    constructor(callBack:()=>void) {
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
                this.initiateIndexes();
                if(callBack)
                    callBack();
                console.log(`Finished Loading User Data`);
            }
        );
    }

    public initiateIndexes() {
        Object.entries(this.data).forEach(([k, entry]) => {
            if (entry["organization_id"]) {
                const id = +k;
                if (!this.org[entry["organization_id"]])
                    this.org[entry["organization_id"]] = [];
                this.org[entry["organization_id"]].push(id);
            }
        });
        this.initiated = true;
    }

    public findByField(field: string, value: string): any[] {
        return Object.entries(this.data)
            .filter(([k, v]) => Comparator.equalOrContains(v[field], value))
            .map(([k, v]) => (v));
    }

    public findById(id: any): any {        
        return this.data[id];
    }

    public findbyOrg(orgId: number): any[] {
        if (!this.org[orgId])
            return [];
        return this.org[orgId].map(id => this.data[id]);
    }
}

export default UserRepository;
