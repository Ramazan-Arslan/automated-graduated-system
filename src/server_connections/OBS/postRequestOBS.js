import getHostAddress from './getHostAddressOBS';
import axios from 'axios';

const postRequestOBS = async (path, json) => {

   var address = getHostAddress();
   var returnedData = null;
   console.log(address + path)


   await axios.post(address + path, json)
      .then((response) => {
         returnedData = response.data;
      });
   return returnedData;
};


export default postRequestOBS;