import getHostAddress from '../data_access/getHostAddress';

const postRequest = async (json,path) => {
    var address = getHostAddress();
 
    await fetch(address+path, {
        method: 'POST',
        mode: 'cors', // defaults to same-origin
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
    });
};


export default postRequest;