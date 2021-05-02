import React from 'react';
import UserService from '../services/UserService';

export default class UserController extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};


    componentDidMount() {
    }


    takeUserInfo = async (userId, type) => {
        var message = "";
        if (Boolean(userId) && Boolean(type)) {
            const userService = new UserService();
            const obj = await userService.getUserInfo(userId, type);

            if (Boolean(obj)) {
                return obj;
            }

            else {
                message = "Error while getting data.\n";
                return message;
            }

        }
        else {
            message = "UserId or UserType is empty.\n";
            return message;
        }
    }

    takeSpecificUserInfo = async (url) => {
        var message = "";
        const userService = new UserService();
        const obj = await userService.getSpecificUserInfo(url);

        if (Boolean(obj)) {
            return obj;
        }

        else {
            message = "Error while getting data.\n";
            return message;
        }
    }

    takeDepartmentAdvisors = async (departmentName) => {
        var message = "";
        if (Boolean(departmentName)) {
            const userService = new UserService();
            const advisorList = await userService.getDepartmentAdvisors(departmentName);

            if (Boolean(advisorList)) {
                return advisorList;
            }

            else {
                message = "Error while getting data.\n";
                return message;
            }

        }
        else {
            message = "Department name is empty.\n";
            return message;
        }
    }

    submitStudentProposal = async (studentId, advisorId) => {
        if (Boolean(advisorId)) {
            const userService = new UserService();
            const resultMessage = await userService.setStudentProposal(studentId, advisorId);

            return resultMessage;

        }
        else {
            var message = "Advisor is not selected.\n";
            return message;
        }
    }

    isStudentHasAccess = async (url) => {
        const userService = new UserService();
        const accessResult = await userService.accessControl(url);
        if (accessResult) {
            return true;
        }
        else {
            return false;
        }
    }




    render() {
        return null;
    }
}

