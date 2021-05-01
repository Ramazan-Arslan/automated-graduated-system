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


    render() {
        return null;
    }
}

