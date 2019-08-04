import * as assert from "assert";
import TicketRepository from "../../src/repository/ticket.repository";

import { ImportMock } from "ts-mock-imports";
import * as fileHelperModule from "../../src/helper/file.helper";

const mockManager = ImportMock.mockClass(fileHelperModule);

describe("Ticket Repository Test", () => {
    const ticketRepository = new TicketRepository(null);
    ticketRepository.data = {
        "436bf9b0-1147-4c0a-8439-6f79833bff5b":
        {
            "_id": "436bf9b0-1147-4c0a-8439-6f79833bff5b",
            "url": "http://initech.tokoin.io.com/api/v2/tickets/436bf9b0-1147-4c0a-8439-6f79833bff5b.json",
            "external_id": "9210cdc9-4bee-485f-a078-35396cd74063",
            "created_at": "2016-04-28T11:19:34 -10:00",
            "type": "incident",
            "subject": "A Catastrophe in Korea (North)",
            "description": "Nostrud ad sit velit cupidatat laboris ipsum nisi amet laboris ex exercitation amet et proident. Ipsum fugiat aute dolore tempor nostrud velit ipsum.",
            "priority": "high",
            "status": "pending",
            "submitter_id": 38,
            "assignee_id": 24,
            "organization_id": 116,
            "tags": [
                "Ohio",
                "Pennsylvania",
                "American Samoa",
                "Northern Mariana Islands"
            ],
            "has_incidents": false,
            "due_at": "2016-07-31T02:37:50 -10:00",
            "via": "web"
        }, 
        "1a227508-9f39-427c-8f57-1b72f3fab87c": {
            "_id": "1a227508-9f39-427c-8f57-1b72f3fab87c",
            "url": "http://initech.tokoin.io.com/api/v2/tickets/1a227508-9f39-427c-8f57-1b72f3fab87c.json",
            "external_id": "3e5ca820-cd1f-4a02-a18f-11b18e7bb49a",
            "created_at": "2016-04-14T08:32:31 -10:00",
            "type": "incident",
            "subject": "A Catastrophe in Micronesia",
            "description": "Aliquip excepteur fugiat ex minim ea aute eu labore. Sunt eiusmod esse eu non commodo est veniam consequat.",
            "priority": "low",
            "status": "hold",
            "submitter_id": 71,
            "assignee_id": 38,
            "organization_id": 112,
            "tags": [
                "Puerto Rico",
                "Idaho",
                "Oklahoma",
                "Louisiana"
            ],
            "has_incidents": false,
            "due_at": "2016-08-15T05:37:32 -10:00",
            "via": "chat"
        }
    };

    ticketRepository.initiateIndexes();

    it("find by field - return value", () => {
        assert.equal(ticketRepository.findByField("subject", "A Catastrophe in Micronesia").length, 1);
    });

    it("find by id - return value", () => {
        assert.equal(ticketRepository.findById("436bf9b0-1147-4c0a-8439-6f79833bff5b").subject, "A Catastrophe in Korea (North)");
    });

    it("find by id - return empty", () => {
        assert.equal(ticketRepository.findById("1231231323"), null);
    });

    it("find by org - return array", () => {
        assert.equal(ticketRepository.findbyOrg(116).length, 1);
    });

    it("find by org - return empty", () => {
        assert.equal(ticketRepository.findbyOrg(999).length, 0);
    });

});

mockManager.restore();
