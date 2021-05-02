import React from 'react';
import getDataAGS from '../server_connections/AGS/getDataAGS';
import { db } from '../server_connections/AGS/config';

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

    adjustStudentAdvisorInfo = async (studentId, advisorId) => {
        var advisorProposalRef = db.ref('/user/advisor/' + advisorId + '/studentProposals');
        var studentProposalRef = db.ref('/user/student/' + studentId + '/advisor');
        var returnMessage = "";
        await studentProposalRef.once('value').then((status) => {
            if (!Boolean(status.val())) {
                advisorProposalRef.set({
                    studentId: studentId
                }).then(() => {
                    studentProposalRef.set(
                        {
                            advisorId: advisorId,
                            status: "Sent"
                        });
                });
                returnMessage = "Proposal is sent";
            }
            else {
                returnMessage = "A proposal was sent already."
            }
        });
        return returnMessage;
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

