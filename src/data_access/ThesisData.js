import React from 'react';
import { db } from '../server_connections/AGS/config';
import postRequestAGS from '../server_connections/AGS/postRequestAGS';

export default class FormData extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
    }


    requestThesisStatus = async (studentId) => {
        var json =
        {
            studentId: studentId
        }

        var path = ('/thesisData/requestThesisStatus');
        var obj = await postRequestAGS(path, json);
        return obj.returned;
    }

    requestThesisInfo = async (studentId) => {
        var json =
        {
            studentId: studentId
        }

        var path = ('/thesisData/requestThesisInfo');
        var obj = await postRequestAGS(path, json);
        return obj.returned;
    }

    requestThesisInputs = async (studentId) => {
        var file = null
        return new Promise(async (resolve, reject) => {

            const storageRef = db.app.storage().ref("/student/thesis/" + studentId);

            var count = 0
            await storageRef.list().then(async (result) => {

                result.items.forEach(async (pdf) => {
                    await db.app.storage().ref().child(pdf.fullPath).getDownloadURL().then((url) => {
                        count++;
                        file = new File([url], pdf.name);
                    })

                    if (count === (await storageRef.list()).items.length) {
                        resolve(file)
                    }
                });

                if (count === (await storageRef.list()).items.length) {
                    resolve(file)
                }
            });
        }).then(res => { })
            .then(res => {
                return file
            })
            .catch()
    }

    adjustThesisInputs = async (studentId, thesis) => {
        var msg = ""
        return new Promise(async (resolve, reject) => {

            db.app.storage().ref("/student/thesis/" + studentId).child(thesis.name).put(thesis).then(() => {
                msg += ("Thesis file is submitted")
                resolve(msg)
            });
        }).then(res => { })
            .then(res => {
                return msg
            })
            .catch()

    }

    adjustThesisStatus = async (studentId, status) => {
        var json =
        {
            studentId: studentId,
            status: status
        }

        var path = ('/thesisData/adjustThesisStatus');
        var obj = await postRequestAGS(path, json);
        return obj.returned;
    }

    adjustThesisInfo = async (studentId, thesis) => {
        var json =
        {
            studentId: studentId,
            thesisInfo: thesis
        }

        var path = ('/thesisData/adjustThesisInfo');
        var obj = await postRequestAGS(path, json);
        return obj.returned;
    }

    render() {
        return null;
    }
}

