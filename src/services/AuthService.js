import React from 'react';
import postRequestOBS from '../server_connections/OBS/postRequestOBS';
import { db } from '../server_connections/AGS/config';
import getDataAGS from '../server_connections/AGS/getDataAGS';

export default class AuthService extends React.Component {

    constructor(props) {
        super(props);
    }

    state ={ };

    componentDidMount() {
    }

    loginRequest = async (email, password) => {
        var json =
        {
            email: email,
            password: password
        }
        var obj = await postRequestOBS("/login", json);
        return obj;
    }

    controlFirstLogin = async (user) => {
        var url = ('/user/' + user.type + '/' + user.id);
        var obj = await getDataAGS(url);
        return !Boolean(obj?.id);
    }

    createUser = async (user, email) => {
        var url = ('/user/' + user.type + '/' + user.id);
        var ref = db.ref(url);
        switch (user.type) {
            case "advisor":
                await ref.set(
                    {
                        name: user.name,
                        surname: user.surname,
                        id: user.id,
                        email: email,
                        type: user.type,
                        department: user.department,
                        experience:user.experience                      
                    }
                );
                break;

            case "student":
                await ref.set(
                    {
                        name: user.name,
                        surname: user.surname,
                        id: user.id,
                        email: email,
                        type: user.type,
                        department: user.department,                      
                    }
                );
                break;

            case "officer":
                await ref.set(
                    {
                        name: user.name,
                        surname: user.surname,
                        id: user.id,
                        email: email,
                        type: user.type,                     
                    }
                );
            default:
                break;
        }        
       
    }

    authentication = async (email, password) => {
        var obj = await this.loginRequest(email, password);
        if (Boolean(obj.id)) {
            var isFirstLogin = await this.controlFirstLogin(obj, email);
            if (isFirstLogin) {
                await this.createUser(obj, email);
            }
        }
        return obj;
    }


    render() {
        return null;
    }
}

