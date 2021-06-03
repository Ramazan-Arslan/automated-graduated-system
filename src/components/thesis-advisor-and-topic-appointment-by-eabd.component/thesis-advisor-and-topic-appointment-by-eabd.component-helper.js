
import FormController from '../../controllers/FormController'

const helpers = {

    getFormData: async function (studentId, formId) {
        const formController = new FormController()
        console.log(studentId)
        var formObject = await formController.takeFormData(studentId, formId)
        if(!Boolean(formObject))
        {
            return null
        }
        return formObject
    },

    setFormStatus: async function (studentId, formId, status) {
        const formController = new FormController()

        var isSet = await formController.coordinateFormStatus(studentId, formId, status)

        if(isSet)
        {
            
            alert("Thesis Advisor and Topic Appointmet for student "+ status.toLowerCase())
            window.location.reload(true);
        }
    
    },


};

export default helpers;