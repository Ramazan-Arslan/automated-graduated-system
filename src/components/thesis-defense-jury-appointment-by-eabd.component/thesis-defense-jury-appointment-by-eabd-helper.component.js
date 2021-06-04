import FormController from '../../controllers/FormController'

const helpers = {

    getFormData: async function (studentId, formId) {
        const formController = new FormController()

        var formObject = await formController.takeFormData(studentId, formId)
        return formObject
    },


    isFormAccessible: async function (studentId, formId) {
        const formController = new FormController()
        var formStatus = await formController.takeFormStatus(studentId, formId);
        return formStatus;
    },

    setFormStatus: async function (studentId, formId, status) {
        const formController = new FormController()

        var isSet = await formController.coordinateFormStatus(studentId, formId, status)

        if (isSet) {

            alert("Thesis Defense Jury Appointment Form " + status.toLowerCase())
            window.location.reload(true);
        }

    },

};

export default helpers;