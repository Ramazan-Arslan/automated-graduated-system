import getHostAddress from './getHostAddressAGS';
import axios from 'axios';

const getRequestAGS = async (path) => {

   var address = getHostAddress();
   var returnedData = null;
   console.log(address + path)


   await axios.get(address + path)
      .then((response) => {
         returnedData = response.data;
      });
   return returnedData;


};


export default getRequestAGS;