import Realm from "realm";

const FeedingScheduleSchema = {
    name: "FeedingSchedule",
    properties: {
        name: "string",
        time: "date"
    }
}

const FeedingTimeSchema = {
    name: "FeedingTime",
    properties: {
        name: "string",
        time: "date"
    }
}

const ChildrenSchema = {
    name: "Children",
    properties: {
        name: "string",
        photo: "string",
        date_of_birth: "string",
        feedingShedule: {
            type: "list",
            objectType: "FeedingSchedule"
        },
        feedingTime: {
            type: "list",
            objectType: "FeedingTime"
        }
    },
    primaryKey: "ChildID",
};

const schemaList = [UsersSchema, CitiesSchema];

export default new Realm({schema: schemaList});