import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export class DB {

    static initChildren() {
        return new Promise((resolve, reject) => {
            // db.transaction((tx) => {
            //     tx.executeSql(
            //         `DROP TABLE schedule;
            //         commit;`, [],
            //         () => {
            //             console.log('database droppped successfully')
            //         },
            //         (error) => {
            //             console.log('Error creating table children: ', error)
            //         }
            //     );
            // })
            // db.transaction((tx) => {
            //     tx.executeSql(
            //         `DROP TABLE children;
            //         commit;`, [],
            //         () => {
            //             console.log('database droppped successfully')
            //         },
            //         (error) => {
            //             console.log('Error creating table children: ', error)
            //         }
            //     );
            // })
            // db.transaction((tx) => {
            //     tx.executeSql(
            //         `DROP TABLE tasks;
            //         commit;`, [],
            //         () => {
            //             console.log('database droppped successfully')
            //         },
            //         (error) => {
            //             console.log('Error creating table children: ', error)
            //         }
            //     );
            // })

            db.transaction((tx) => {
                tx.executeSql(
                    "create table if not exists children (childrenID INTEGER PRIMARY KEY AUTOINCREMENT, userId text, name text, dob date, gender text, photo blob); commit;", [],
                    () => {
                        resolve()
                        //console.log('Table children created successfully')
                    },
                    (error) => {
                        console.log('Error creating table children: ', error)
                        reject()
                    }
                );
            })
        })
    }

    static initSchedule() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "create table if not exists schedule (scheduleId INTEGER PRIMARY KEY AUTOINCREMENT, userId text, childId text, type text, name text, time date); commit;", [],
                    () => {
                        //console.log('Table schedule created successfully')
                        resolve()
                    },
                    (error) => {
                        console.log('Error creating table schedule: ', error)
                        reject()
                    }
                );
            })
        })
    }

    static initTask() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "create table if not exists tasks (recordId INTEGER PRIMARY KEY AUTOINCREMENT, userId text, type text, name text, time date); commit;", [],
                    () => {
                        //console.log('Table tasks created successfully')
                        resolve()
                    },
                    (error) => {
                        console.log('Error creating table tasks: ', error)
                        reject()
                    }
                );
            })
        })
    }

    static getChild({ userId }) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql("select * from children where userId=?",
                    [userId],
                    (_, result) => {
                        resolve(result.rows._array)
                    },
                    (_, error) => reject(error)
                    );
            });
        });
    }

    static getSchedule({ userId, childId }) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                // console.log('{ userId, childId }')
                // console.log({ userId, childId })
                tx.executeSql("select * from schedule where userId=? and childId=?",
                    [userId, childId],
                    (_, result) => {
                        resolve(result.rows._array)

                    },
                    (_, error) => {
                        reject(error)
                    }
                )
            });
        });
    }

    static getRecords({ userId }) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql("select * from records where userId=?",
                    [userId],
                    (_, error) => reject(error),
                    (_, result) => {
                        resolve(result.rows._array)
                    });
            });
        });
    }

    static createChild({ userId, name, dob, gender, photo }) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "Insert into children (userId, name, dob, gender, photo) values (?, ?, ?, ?, ?); commit;",
                    [userId, name, dob, gender, photo],
                    (_, result) => {
                        resolve(result.insertId)
                    },
                    (error) => reject(error)
                );
            });
        });
    }

    static createSchedule({ userId, childId, type, name, time }) {
        { userId, childId, type, name, time }
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "Insert into schedule (userId, childId, type, name, time) values (?, ?, ?, ?, ?); commit;",
                    [userId, childId, type, name, time],
                    (tx, result) => {
                        tx.executeSql(
                            "SELECT max(scheduleId) as scheduleId from schedule where userId=? and childId=? ",
                            [userId, childId],
                            (_, result) => {
                                resolve(result.rows._array)
                            },
                            (error) => {
                                reject(error)
                            }
                        );
                    },
                    (error) => {
                        console.log('error')
                        reject(error)
                    }
                );
            });
        });
    }

    static editSchedule({ userId, childId, scheduleId, name, time }) {
        { userId, childId, scheduleId, name, time }
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "Update schedule set name = ? , time = ? where userId = ?  and childId = ? and scheduleId = ?; commit;",
                    [name, time, userId, childId, scheduleId],
                    (tx, result) => {
                        tx.executeSql(
                            "SELECT * from schedule where userId=? and childId=? ",
                            [userId, childId],
                            (_, result) => {
                                resolve(result.rows._array)
                            },
                            (error) => {
                                reject(error)
                            }
                        );
                    },
                );
            });
        });
    }

    static createRecord({ userIdVal, recordType, recordName, recordTime }) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "Insert into records (userId, type, name, time) values (?, ?, ?, ?, ?);",
                    [userIdVal, childId, recordType, recordName, recordTime],
                    (_, result) => {
                        resolve(result.insertId)
                    },
                    (error) => reject(error)
                );
            });
        });
    }

    static removeChild(userIdVal, childrenID) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'DELETE FROM children where userId=? and childrenID=?',
                    [userIdVal, childrenID],
                    resolve(),
                    (_, error) => reject(error),
                );
            });
        });
    }

    static removeSchedule({userIdVal, childId, scheduleId, type}) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'DELETE FROM schedule where userId=? and childId = ? and scheduleId=? and type=?',
                    [userIdVal, childId, scheduleId, type],
                    resolve(),
                    (_, error) => reject(error),
                );
            });
        });
    }

    static removeChild(userIdVal, recordId) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'DELETE FROM children where userId=? and recordId=?',
                    [userIdVal, recordId],
                    resolve(),
                    (_, error) => reject(error),
                );
            });
        });
    }
}