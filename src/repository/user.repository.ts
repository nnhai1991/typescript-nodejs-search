
class UserRepository {
    private data: any[];

    constructor() {
        this.data = [];
    }

    public init(): any {
        console.log("Init UserRepository");
    }

    public findByField(field: string, value: string): any[] {
        return [];
    }
}

export default UserRepository;
