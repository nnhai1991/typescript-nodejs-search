import * as assert from "assert";
import OrgRepository from "../../src/repository/org.repository";

import { ImportMock } from "ts-mock-imports";
import * as fileHelperModule from "../../src/helper/file.helper";

const mockManager = ImportMock.mockClass(fileHelperModule);

describe("Org Repository Test", () => {
    const orgRepository = new OrgRepository();
    orgRepository.data = {
        101: {
            "_id": 101,
            "url": "http://initech.tokoin.io.com/api/v2/organizations/101.json",
            "external_id": "9270ed79-35eb-4a38-a46f-35725197ea8d",
            "name": "Enthaze",
            "domain_names": [
              "kage.com",
              "ecratic.com",
              "endipin.com",
              "zentix.com"
            ],
            "created_at": "2016-05-21T11:10:28 -10:00",
            "details": "MegaCorp",
            "shared_tickets": false,
            "tags": [
              "Fulton",
              "West",
              "Rodriguez",
              "Farley"
            ]
          },
          102: {
            "_id": 102,
            "url": "http://initech.tokoin.io.com/api/v2/organizations/102.json",
            "external_id": "7cd6b8d4-2999-4ff2-8cfd-44d05b449226",
            "name": "Nutralab",
            "domain_names": [
              "trollery.com",
              "datagen.com",
              "bluegrain.com",
              "dadabase.com"
            ],
            "created_at": "2016-04-07T08:21:44 -10:00",
            "details": "Non profit",
            "shared_tickets": false,
            "tags": [
              "Cherry",
              "Collier",
              "Fuentes",
              "Trevino"
            ]
          }
    };

    it("find by field - return value", () => {
        assert.equal(orgRepository.findByField("name", "Enthaze").length, 1);
    });

    it("find by id - return value", () => {
        assert.equal(orgRepository.findById(101).name, "Enthaze");
    });

    it("find by id - return empty", () => {
        assert.equal(orgRepository.findById(311), null);
    });
});

mockManager.restore();
