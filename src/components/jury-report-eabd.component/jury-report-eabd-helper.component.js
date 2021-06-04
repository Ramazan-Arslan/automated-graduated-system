import FormController from '../../controllers/FormController'
import UserController from '../../controllers/UserController'

const helpers = {

    getFormData: async function (studentId, formId) {
        const formController = new FormController()

        var formObject = await formController.takeFormData(studentId, formId)
        return formObject
    },

    setFormData: async function (studentId, form) {
        var hasEmptyInput = this.hasEmptyInput(form);
        if (!hasEmptyInput) {
            const formController = new FormController()

           const isSet = await formController.coordinateFormData(studentId, form)
           if (true) {
                alert("Thesis defence exam jury report form is published.")
                window.location.reload(true);
            }

        }
    },

    isFormAccessible: async function (studentId, formId) {
        const formController = new FormController()
        var formStatus = await formController.takeFormStatus(studentId, formId);
        return formStatus;
    },

    isFormTJAccepted: async function (studentId) {
        const userController = new UserController()
        var formTJStatus = await userController.takeSpecificUserInfo("/user/student/" + studentId + "/forms/Form_TJ/status");
        return (formTJStatus === "Accepted");
    },


    hasEmptyInput: function (form) {
        var emptyInputMessage = "";

        if (!Boolean(form.examResult)) {
            emptyInputMessage += "Exam result & "
        }
        if (!Boolean(form.examType)) {
            emptyInputMessage += "Exam type & "
        }
        if (!Boolean(form.examDate)) {
            emptyInputMessage += "Exam date & "
        }

        if (Boolean(emptyInputMessage)) {
            emptyInputMessage = emptyInputMessage.replace(/&\s*$/, "");
            emptyInputMessage += "empty."
            alert(emptyInputMessage)
            return true
        }
        else {
            return false
        }
    },
};

export default helpers;