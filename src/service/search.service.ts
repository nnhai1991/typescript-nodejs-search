import UserRepository from "../repository/user.repository";
import TicketRepository from "../repository/ticket.repository";
import OrgRepository from "../repository/org.repository";
import UserDTO from "../model/user.dto"
import TicketDTO from "../model/ticket.dto";
import OrgDTO from "../model/org.dto";

class SearchService {
    public userRepo: UserRepository;
    public ticketRepo: TicketRepository;
    public orgRepo: OrgRepository;

    constructor() {
        this.userRepo = new UserRepository();
        this.ticketRepo = new TicketRepository();
        this.orgRepo = new OrgRepository();
    }

    public searchUserByField(field: string, value: string): UserDTO[] {
        let dtoList = [];
        const result = this.userRepo.findByField(field, value);
        for (let user of result) {
            const dto = new UserDTO();
            dto.user = user;
            dto.assignedTickets = this.ticketRepo.findByAssignedTo(dto.user._id);
            dto.submittedTickets = this.ticketRepo.findBySubmittedBy(dto.user._id);
            dto.org = this.orgRepo.findById(dto.user.organization_id);
            dtoList.push(dto);
        }
        return dtoList;
    }

    public searchTicketByField(field: string, value: string): TicketDTO[] {
        let dtoList = [];
        const result = this.ticketRepo.findByField(field, value);
        for(let ticket of result){
            const dto = new TicketDTO();
            dto.ticket = ticket;
            dto.assignee = this.userRepo.findById(dto.ticket.assignee_id);
            dto.submittedBy = this.userRepo.findById(dto.ticket.submitter_id);
            dto.org = this.orgRepo.findById(dto.ticket.organization_id);
            dtoList.push(dto);
        }
        return dtoList;
    }

    public searchOrgByField(field: string, value: string): OrgDTO[] {
        let dtoList = [];
        
        let result = this.orgRepo.findByField(field, value);
        for (let org of result) {
            const dto = new OrgDTO();
            dto.org = org;
            dto.tickets = this.ticketRepo.findbyOrg(dto.org._id);            
            dto.users = this.userRepo.findbyOrg(dto.org._id);
            dtoList.push(dto);
        }
        return dtoList;
    }
}

export default SearchService;