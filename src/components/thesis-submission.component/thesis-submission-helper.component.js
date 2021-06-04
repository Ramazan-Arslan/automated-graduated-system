import FormController from '../../controllers/FormController'
import ThesisController from '../../controllers/ThesisController'


const helpers = {


    getFormData: async function (studentId, formId) {
        const formController = new FormController()
        var formObject = await formController.takeFormData(studentId, formId)
        return formObject
    },

    getThesisStatus: async function (studentId) {

        const thesisController = new ThesisController()
        var thesisStatus = await thesisController.takeThesisStatus(studentId)
        return thesisStatus
    },

    getThesisData: async function (studentId) {

        const thesisController = new ThesisController()
        var thesisObject = await thesisController.takeThesisData(studentId)
        return thesisObject
    },

    setThesisFile: async function (studentId, thesisFile) {

        if (Boolean(thesisFile)) {
            alert("Please wait until get second alert.")
            const thesisController = new ThesisController()
            var isSubmitted = await thesisController.coordinateThesisData(studentId, thesisFile)
          
            if (isSubmitted) {
                await thesisController.coordinateThesisStatus(studentId,"Submitted")
                alert("Thesis file is submitted")
                window.location.reload(true);
            }
            else
            {
                alert("Error occured while uploading")
                window.location.reload(true);
            }
        }
        else {
            alert("Thesis File cannot be empty")
        }

    },


};

export default helpers;