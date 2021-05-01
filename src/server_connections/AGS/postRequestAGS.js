import getHostAddress from './getHostAddressAGS';
import axios from 'axios';

const postRequestAGS = async (path, json) => {

   var address = getHostAddress();
   var returnedData = null;
   console.log(address + path)


   await axios.post(address + path, json)
      .then((response) => {
         returnedData = response.data;
      });
   return returnedData;


};


export default postRequestAGS;