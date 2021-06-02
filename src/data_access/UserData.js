import React from 'react';
import getRequestAGS from '../server_connections/AGS/getRequestAGS';
import postRequestAGS from '../server_connections/AGS/postRequestAGS';

export default class UserData extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
    }

    requestUserData = async (userId, userType) => {
        var json = 
        {
            userId : userId,
            userType : userType
        }
        
        var path = ('/userData/requestUserData');
        var obj = await postRequestAGS(path,json);
        return obj.returned;
    }

    requestSpecificUserData = async (url) => {
        var json = 
        {
            url : url
        }
        
        var path = ('/userData/requestSpecificUserData');
        var obj = await postRequestAGS(path,json);
        return obj.returned;
    }

    isAccessible = async (url) => {
        var json = 
        {
            url : url
        }
        getRequestAGS()
        var path = ('/userData/isAccessible');
        var obj = await postRequestAGS(path,json);
        return obj.returned;
    }


    render() {
        return null;
    }
}

