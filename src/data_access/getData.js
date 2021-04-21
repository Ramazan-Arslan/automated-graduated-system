import { db } from './config';

const getData = async (url) => {
    var ref = db.ref(url);
    var obj = null;
    await ref.once('value').then(snapshot => {
        if (Boolean(snapshot.val())) {
            obj = snapshot.exportVal();
        }
    })
    return obj;
}

export default getData;