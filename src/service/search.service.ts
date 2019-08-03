import UserRepository from "../repository/user.repository";
import TicketRepository from "../repository/ticket.repository";
import OrgRepository from "../repository/org.repository";
import UserDTO from "../model/user.dto"
import TicketDTO from "../model/ticket.dto";
import OrgDTO from "../model/org.dto";

class SearchService{
    public userRepo: UserRepository;
    public ticketRepo: TicketRepository;
    public orgRepo: OrgRepository;

    constructor(){
        this.userRepo = new UserRepository();
        this.ticketRepo = new TicketRepository();
        this.orgRepo = new OrgRepository();        
    }

    public searchUserByField(field: string, value: string): UserDTO {
        const dto = new UserDTO();
        dto.user = this.userRepo.findByField(field,value);
        if(dto.user){
            dto.assignedTickets = this.ticketRepo.findByAssignedTo(dto.user._id);
            dto.submittedTickets = this.ticketRepo.findBySubmittedBy(dto.user._id);
            dto.org = this.orgRepo.findById(dto.user.organization_id);
        }
        return dto;
    }

    public searchTicketByField(field: string, value: string): TicketDTO {
        const dto = new TicketDTO();
        dto.ticket = this.ticketRepo.findByField(field,value);
        if(dto.ticket){
            dto.assignee = this.userRepo.findById(dto.ticket.assignee_id);
            dto.submittedBy = this.userRepo.findById(dto.ticket.submitter_id);
            dto.org = this.orgRepo.findById(dto.ticket.organization_id);
        }
        return dto;
    }

    public searchOrgByField(field: string, value: string): OrgDTO {
        const dto = new OrgDTO();
        dto.org = this.orgRepo.findByField(field,value);
        if(dto.org){
            dto.tickets = this.ticketRepo.findbyOrg(dto.org._id);
            dto.users = this.userRepo.findbyOrg(dto.org._id);
        }
        return dto;
    }
}

export default SearchService;