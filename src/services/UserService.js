import React from 'react';
import UserData from '../data_access/UserData';

export default class UserService extends React.Component {

    constructor(props) {
        super(props);
    }

    state =
        {
        };



    componentDidMount() {
        //this.authentication();
    }



    getUserInfo = async (userId, userType) => {
        const userData = new UserData();
        const obj = await userData.requestUserData(userId, userType);
        return obj;
    }

    getDepartmentAdvisors= async(departmentName) =>
    {
        const userData = new UserData();
        const obj = await userData.requestAdvisorsData(departmentName);
        return obj;
    }


    render() {
        return null;
    }
}

