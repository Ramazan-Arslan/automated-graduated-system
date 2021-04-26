import getHostAddress from '../data_access/getHostAddress';
import axios from 'axios';

const postRequest = async (path, json) => {

   var address = getHostAddress();
   var returnedData = null;
   console.log(address + path)


   await axios.post(address + path, json)
      .then((response) => {
         returnedData = response.data;
      });
   return returnedData;


};


export default postRequest;