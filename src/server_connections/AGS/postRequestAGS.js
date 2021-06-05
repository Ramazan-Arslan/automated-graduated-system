import getHostAddress from './getHostAddressAGS';
import axios from 'axios';

const postRequestAGS = async (path, json) => {

   var address = getHostAddress();
   var returnedData = null;

   await axios.post(address + path, json)
      .then((response) => {
         returnedData = response.data;
      });
   return returnedData;


};


export default postRequestAGS;