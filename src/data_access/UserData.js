import React from 'react';
import getDataAGS from '../server_connections/AGS/getDataAGS';
import { db, timestamp } from '../server_connections/AGS/config';

export default class UserData extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
    }

    requestUserData = async (userId, userType) => {
        var url = ('/user/' + userType + '/' + userId);
        var obj = await getDataAGS(url);
        return obj;
    }

    requestSpecificUserData = async (url) => {
        var obj = await getDataAGS(url);
        return obj;
    }


    requestAdvisorsData = async (department) => {
        var ref = db.ref('/user/advisor');
        var advisors = []
        await ref.once('value').then((advisorsSnapshot) => {
            if (Boolean(advisorsSnapshot.val())) {
                advisorsSnapshot.forEach((advisorSnapshot) => {
                    if (advisorSnapshot.child('department').val() === department) {
                        advisors.push(advisorSnapshot.exportVal());
                    }
                });
            }
        });
        return advisors;
    }

    requestProposals = async (advisorId) => {
        var ref = db.ref('/user/advisor/' + advisorId + '/studentProposals');
        var proposals = []
        return new Promise(async (resolve, reject) => {
            await ref.child('/incoming').once('value').then(async (proposalsSnapshot) => {
                if (Boolean(proposalsSnapshot.val())) {
                    proposalsSnapshot.forEach((proposal) => {
                        var studentId = proposal.key;
                        var studentUrl = ('/user/student/' + studentId);
                        this.requestSpecificUserData(studentUrl).then((student) => {
                            proposals.push(student);
                            if (proposalsSnapshot.numChildren() === proposals.length) {
                                resolve(proposals)
                            }
                        });
                    });
                }
                else {
                    resolve(proposals);
                }

            });
        }).then(res => { })
            .then(res => {
                return proposals;
            })
            .catch()
    }

    requestDecidedProposals = async (advisorId) => {
        var ref = db.ref('/user/advisor/' + advisorId + '/studentProposals');
        var proposals = []
        var child = 0;
        var count = 0;
        var date = new Date(Date(timestamp));
        date.setHours(3, 0, 0, 0);
        return new Promise(async (resolve, reject) => {
            await ref.child('/acceptedProposals/' + date.getTime()).once('value').then(async (acceptedProposals) => {
                if (Boolean(acceptedProposals.val())) {
                    child += acceptedProposals.numChildren();
                    acceptedProposals.forEach((proposal) => {
                        var studentId = proposal.key;
                        var studentUrl = ('/user/student/' + studentId);
                        this.requestSpecificUserData(studentUrl).then((student) => {
                            proposals.push(
                                {
                                    status: "Accepted",
                                    student: student
                                });
                            count++;
                        });
                    });
                }
            }).then(async() => {
                await ref.child('/rejectedProposals/' + date.getTime()).once('value').then(async (rejectedProposals) => {
                    if (Boolean(rejectedProposals.val())) {
                        child += rejectedProposals.numChildren();
                        rejectedProposals.forEach((proposal) => {
                            var studentId = proposal.key;
                            var studentUrl = ('/user/student/' + studentId);
                            this.requestSpecificUserData(studentUrl).then((student) => {
                                proposals.push(
                                    {
                                        status: "Rejected",
                                        student: student
                                    });
                                    count++;
                                    
                                if (count === child) {  
                                    resolve(proposals)
                                }
                            });
                        });
                    }
                    else
                    {
                        resolve(proposals)
                    }
                });
            });


        }).then(res => { })
            .then(res => {
                return proposals;
            })
            .catch()
    }

    adjustStudentAdvisorInfo = async (studentId, advisorId) => {
        var advisorProposalRef = db.ref('/user/advisor/' + advisorId + '/studentProposals/incoming');
        var studentProposalRef = db.ref('/user/student/' + studentId + '/advisor');
        var returnMessage = "";
        await studentProposalRef.once('value').then((status) => {
            if (!Boolean(status.val())) {
                advisorProposalRef.child(studentId).set(studentId).then(() => {
                    studentProposalRef.set(
                        {
                            advisorId: advisorId,
                            status: "Sent"
                        });
                });
                returnMessage = "Success";
            }
            else {
                returnMessage = "A proposal was sent already."
            }
        });
        return returnMessage;
    }

    adjustAdvisorProposalDecisions = (advisorId, acceptedList, rejectedList) => {
        var advisorStudentProposals = db.ref('/user/advisor/' + advisorId + '/studentProposals/');
        var returnMessage = "";
        return new Promise((resolve, reject) => {
            var count = 0;
            var date = new Date(Date(timestamp));
            date.setHours(3, 0, 0, 0);
            acceptedList.forEach(async (student) => {

                await advisorStudentProposals.child('acceptedProposals/' + date.getTime() + '/' + student.id).set(student.name + " " + student.surname).then(async () => {
                    var studentRef = db.ref('/user/student/' + student.id + '/advisor/');
                    await advisorStudentProposals.child('incoming/' + student.id).remove();
                    await studentRef.update({ status: "Accepted" });

                    count++;
                });
                if (count === rejectedList.length + acceptedList.length) {
                    returnMessage = "succesfull";
                    resolve(returnMessage)
                }

            });

            rejectedList.forEach(async (student) => {
                await advisorStudentProposals.child('rejectedProposals/' + date.getTime() + '/' + student.id).set(student.name + " " + student.surname).then(async () => {
                    var studentRef = db.ref('/user/student/' + student.id + '/advisor');
                    await advisorStudentProposals.child('incoming/' + student.id).remove();
                    await studentRef.remove();
                    count++;
                });
                if (count === rejectedList.length + acceptedList.length) {
                    returnMessage = "succesfull";
                    resolve(returnMessage)
                }
            });



        }).then(res => { })
            .then(res => {
                return returnMessage;
            })
            .catch()
    }

    isAccessible = async (url) => {
        console.log(url)
        var obj = await getDataAGS(url);
        console.log("data", (obj))
        return (!Boolean(obj));
    }


    render() {
        return null;
    }
}

