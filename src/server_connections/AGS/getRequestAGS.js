import getHostAddress from './getHostAddressAGS';
import axios from 'axios';

const getRequestAGS = async (path) => {

   var address = getHostAddress();
   var returnedData = null;

   await axios.get(address + path)
      .then((response) => {
         returnedData = response.data;
      });
   return returnedData;


};


export default getRequestAGS;