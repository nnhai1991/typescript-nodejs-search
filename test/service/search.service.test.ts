import * as assert from "assert";

import SearchService from "../../src/service/search.service";

import * as orgRepositoryMock from "../../src/repository/org.repository";
import * as userRepositoryMock from "../../src/repository/user.repository";
import * as ticketRepositoryMock from "../../src/repository/ticket.repository";

import { ImportMock } from "ts-mock-imports";

const orgMockManager = ImportMock.mockClass(orgRepositoryMock);
const userMockManager = ImportMock.mockClass(userRepositoryMock);
const ticketMockManager = ImportMock.mockClass(ticketRepositoryMock);

describe("SearchService Test", () => {
    const searchService = new SearchService(null);

    it("searchUserByField - return not empty", () => {
        userMockManager.mock("findByField", [{
            "_id": 1,
            "organization_id": 119
        }]);
        const result = searchService.searchUserByField("name", "Francisca Rasmussen");
        assert.equal(result.length, 1);
        assert.equal(result[0].user['organization_id'], 119);
    });

    it("searchUserByField - return empty", () => {
        userMockManager.mock("findByField", []);
        assert.equal(searchService.searchUserByField("name", "Francisca Rasmussen").length, 0);
    });


    it("searchOrgByField - return not empty", () => {
        orgMockManager.mock("findByField", [{
            "_id": 100
        }]);
        const result = searchService.searchOrgByField("name", "mock data");
        assert.equal(result.length, 1);
        assert.equal(result[0].org['_id'], 100);
    });
    it("searchOrgByField - return empty", () => {
        orgMockManager.mock("findByField", []);
        assert.equal(searchService.searchOrgByField("name", "mock data").length, 0);
    });

    it("searchUserByField - return not empty", () => {
        ticketMockManager.mock("findByField", [{
            "_id": 1,
            "subject":"Mock subject",
            "organization_id": 119
        }]);
        const result = searchService.searchTicketByField("tags", "mock data");
        assert.equal(result.length, 1);
        assert.equal(result[0].ticket['subject'], "Mock subject");
    });

    it("searchUserByField - return empty", () => {
        ticketMockManager.mock("findByField", []);
        assert.equal(searchService.searchTicketByField("tags", "mock data").length, 0);
    });
});

orgMockManager.restore();
userMockManager.restore();
ticketMockManager.restore();