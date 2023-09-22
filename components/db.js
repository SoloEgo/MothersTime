import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export class DB {

    static wipeDB() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `DROP TABLE schedule;
                    commit;`, [],
                    () => {
                        console.log('database droppped successfully')
                    },
                    (error) => {
                        console.log('Error creating table children: ', error)
                    }
                );
            })
            db.transaction((tx) => {
                tx.executeSql(
                    `DROP TABLE children;
                    commit;`, [],
                    () => {
                        console.log('database droppped successfully')
                    },
                    (error) => {
                        console.log('Error creating table children: ', error)
                    }
                );
            })
            db.transaction((tx) => {
                tx.executeSql(
                    `DROP TABLE tasks;
                    commit;`, [],
                    () => {
                        console.log('database droppped successfully')
                    },
                    (error) => {
                        console.log('Error creating table children: ', error)
                    }
                );
            })
        })
    }

    static initChildren() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "create table if not exists children (childrenID INTEGER PRIMARY KEY AUTOINCREMENT, userId text, name text, dob date, gender text, photo blob); commit;", [],
                    () => {
                        resolve()
                        console.log('Table children created successfully')
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
                        console.log('Table schedule created successfully')
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
                    "create table if not exists tasks (recordId INTEGER PRIMARY KEY AUTOINCREMENT, userId text, childId text, type text, scheduleId integer, name text, dateTime date, dateTimeEnd date, attr1 text); commit;", [],
                    () => {
                        console.log('Table tasks created successfully')
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
                tx.executeSql("select * from children where userId = ?",
                    [userId],
                    (_, result) => {
                        resolve(result.rows._array)
                    },
                    (_, error) => {
                        console.log(error)
                        reject(error)
                    }
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
                tx.executeSql("select * from tasks where userId=?",
                    [userId],
                    (_, result) => {
                        console.log('load records success')
                        resolve(result.rows._array)
                    }),
                    (_, error) => {
                        console.log('load records error')
                        reject(error)
                    }
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
                        console.log('create child success')
                        resolve(result.insertId)
                    },
                    (error) => {
                        console.log('create child error')
                        console.log(error)
                        reject(error)
                    }
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
                                console.log('success create schedule')
                                resolve(result.rows._array)
                            },
                            (error) => {
                                console.log('error create schedule 2')
                                reject(error)
                            }
                        );
                    },
                    (error) => {
                        console.log('error create schedule')
                        reject(error)
                    }
                );
            });
        });
    }

    static createRecord({ userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1 }) {
        console.log('add record [db.js] =>', { userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1 })
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "Insert into tasks (userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1) values (?, ?, ?, ?, ?, ?, ?, ?); commit;",
                    [userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1],
                    (tx, result) => {
                        tx.executeSql(
                            "SELECT max(recordId) as recordId from tasks where userId=? and childId=? ",
                            [userId, childId],
                            (_, result) => {
                                resolve(result.rows._array)
                            },
                            (error) => {
                                reject(error)
                            }
                        );
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

    static removeSchedule({ userIdVal, childId, scheduleId, type }) {
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

    static removeRecord({userId, recordId}) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'DELETE FROM tasks where userId = ? and recordId = ?; commit;',
                    [userId, recordId],
                    (id, result) => {
                        console.log('Deleting record success')
                        console.log({userId, recordId})
                        resolve()
                    },
                    (_, error) => {
                        console.error('Error deleting record')
                        console.log(error)
                        reject(error)
                    },
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

    static editRecord({ userId, childId, scheduleId, name, dateTime, dateTimeEnd, attr1, recordId }) {
        { userId, childId, scheduleId, name, dateTime, dateTimeEnd, recordId }
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "Update tasks set name = ?, dateTime = ?, dateTimeEnd = ?,attr1 = ?, scheduleId = ? where userId = ?  and childId = ? and recordId = ?; commit;",
                    [name, dateTime, dateTimeEnd, attr1, scheduleId, userId, childId, recordId],
                    (tx, result) => {
                        tx.executeSql(
                            "SELECT * from tasks where userId=? and childId=? ",
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

    static editChild({ userId, childrenID, name, dob, gender, photo }) {
        { userId, childrenID, name, dob, gender, photo }
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE children SET name = ?, dob = ?, gender = ?, photo = ? where userId = ? and childrenID = ?; commit;",
                    [name, dob, gender, photo, userId, childrenID],
                    (tx, result) => {
                        tx.executeSql(
                            "SELECT * from children where userId=? and childrenID=? ",
                            [userId, childrenID],
                            (_, result) => {
                                resolve(result.rows._array)
                            },
                            (error) => {
                                console.log(error)
                                reject(error)
                            }
                        );
                    },
                    (error) => {
                        console.log(error)
                        reject(error)
                    }
                );
            });
        });
    }

}