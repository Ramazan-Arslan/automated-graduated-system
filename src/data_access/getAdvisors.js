import { db } from './config';

const getAdvisors = async(department) => {
    var ref = db.ref('/user/advisor');
    var advisors=[]

    await ref.once('value').then( (advisorsSnapshot) => {
        if (Boolean(advisorsSnapshot.val())) {       
            advisorsSnapshot.forEach( (advisorSnapshot) =>
            {
                if(advisorSnapshot.child('department').val() == department)
                {
                    advisors.push(advisorSnapshot.exportVal());
                }
            });           
        }
    });
    return advisors;

}
export default getAdvisors;