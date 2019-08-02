import * as assert from "assert";
import UserRepository from "../../src/repository/user.repository";

import { ImportMock } from "ts-mock-imports";
import * as fileHelperModule from "../../src/helper/file.helper";

const mockManager = ImportMock.mockClass(fileHelperModule);

describe("User Repository Test", () => {
    const userRepository = new UserRepository();
    userRepository.data = {
        1: {
            "_id": 1,
            "url": "http://initech.tokoin.io.com/api/v2/users/1.json",
            "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
            "name": "Francisca Rasmussen",
            "alias": "Miss Coffey",
            "created_at": "2016-04-15T05:19:46 -10:00",
            "active": true,
            "verified": true,
            "shared": false,
            "locale": "en-AU",
            "timezone": "Sri Lanka",
            "last_login_at": "2013-08-04T01:03:27 -10:00",
            "email": "coffeyrasmussen@flotonic.com",
            "phone": "8335-422-718",
            "signature": "Don't Worry Be Happy!",
            "organization_id": 119,
            "tags": [
                "Springville",
                "Sutton",
                "Hartsville/Hartley",
                "Diaperville"
            ],
            "suspended": true,
            "role": "admin"
        },
        2:
        {
            "_id": 2,
            "url": "http://initech.tokoin.io.com/api/v2/users/2.json",
            "external_id": "c9995ea4-ff72-46e0-ab77-dfe0ae1ef6c2",
            "name": "Cross Barlow",
            "alias": "Miss Joni",
            "created_at": "2016-06-23T10:31:39 -10:00",
            "active": true,
            "verified": true,
            "shared": false,
            "locale": "zh-CN",
            "timezone": "Armenia",
            "last_login_at": "2012-04-12T04:03:28 -10:00",
            "email": "jonibarlow@flotonic.com",
            "phone": "9575-552-585",
            "signature": "Don't Worry Be Happy!",
            "organization_id": 106,
            "tags": [
                "Foxworth",
                "Woodlands",
                "Herlong",
                "Henrietta"
            ],
            "suspended": false,
            "role": "admin"
        }
    };

    it("find by field - return value", function () {
        assert.equal(userRepository.findByField("name", "Francisca Rasmussen").length, 1);
    });

    it("find by id - return value", function () {
        assert.equal(userRepository.findById(1).name, "Francisca Rasmussen");
    });

    it("find by id - return empty", function () {
        assert.equal(userRepository.findById(3), null);
    });

});

mockManager.restore();
