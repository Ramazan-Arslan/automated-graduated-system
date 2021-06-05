
import FormController from '../../controllers/FormController'

const helpers = {

    getFormData: async function (studentId, formId) {
        const formController = new FormController()
        var formObject = await formController.takeFormData(studentId, formId)
        if (!Boolean(formObject)) {
            return null
        }
        return formObject
    },

    setFormStatus: async function (studentId, formId, status) {
        const formController = new FormController()

        var isSet = await formController.coordinateFormStatus(studentId, formId, status)

        if (isSet) {

            alert("Thesis Advisor and Topic Appointmet " + status.toLowerCase())
            window.location.reload(true);
        }

    },


};

export default helpers;