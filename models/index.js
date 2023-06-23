import Realm from "realm";

// Declare Schema
class ChildrenSchema extends Realm.Object {}
ChildrenSchema.schema = {
    name: "Children",
    properties: {
        owner: "string",
        name: "string",
        photo: "string",
        date_of_birth: "date"
    },
    //primaryKey: "ChildID",
};

// Create realm
let realm = new Realm({schema: [ChildrenSchema], schemaVersion: 1});

// Export the realm
export default realm;