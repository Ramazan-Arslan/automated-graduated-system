import React from 'react';
import AuthService from '../services/AuthService';

export default class OBSController extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
    }


    authentication = async (email, password) => {
        var message = "";
        if (Boolean(email) && Boolean(password)) {
            const authService = new AuthService();
            const obj = await authService.authentication(email, password);

            if (Boolean(obj.id)) {
                return obj;
            }

            else {
                var splittedResponse = obj.split("-");
                if (splittedResponse[0] === "fail") {
                    message = splittedResponse[1];
                    return message;
                }
            }

        }
        else {
            if (!Boolean(email)) {
                message += "Email is empty.\n";
            }
            if (!Boolean(password)) {
                message += "Password is empty.\n";
            }
            return message;
        }
    }


    render() {
        return null;
    }
}

