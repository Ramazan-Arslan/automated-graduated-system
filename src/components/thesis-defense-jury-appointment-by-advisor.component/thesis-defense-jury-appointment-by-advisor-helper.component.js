
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
import FormController from '../../controllers/FormController'
import UserController from '../../controllers/UserController'

const helpers = {
    getStudentData: async function (studentId) {
        const userController = new UserController()
        const obj = await userController.takeUserInfo(studentId, "student")
        if (Boolean(obj.name)) {
            return obj
        } else {
            return { name: 'Error', surname: 'Error' }
        }
    },

    getAdvisorData: async function (studentId) {
        const userController = new UserController()

        var url = 'user/student/' + studentId + '/advisor';
        var advisorObject = await userController.takeSpecificUserInfo(url)

        if (Boolean(advisorObject) && advisorObject.status === "Accepted") {
            var advisorUrl = 'user/advisor/' + advisorObject.advisorId;
            var advisorInfo = await userController.takeSpecificUserInfo(advisorUrl)

            return advisorInfo;
        }
        else {
            return null;
        }
    },

    getThesisName: async function (studentId) {
        const userController = new UserController()
        var url = ("/user/student/" + studentId + "/forms/Form_TD/thesisName")
        var thesisName = await userController.takeSpecificUserInfo(url)
        console.log(thesisName)
        return thesisName
    },

    getFormData: async function (studentId, formId) {
        const formController = new FormController()

        var formObject = await formController.takeFormData(studentId, formId)
        return formObject
    },

    setFormData: async function (studentId, form) {

        if (Boolean(form.juryList) && (Object.values(form.juryList).length > 0)) {
            const formController = new FormController()

            const isSet = await formController.coordinateFormData(studentId, form)
            if (isSet) {
                alert("The form is published successfully")
                window.location.reload(true);
            }

        }
        else {
            alert("Thesis Name cannot be empty")
        }

    },

    isFormAccessible: async function (studentId, formId) {
        const formController = new FormController()
        var formStatus = await formController.takeFormStatus(studentId, formId);
        return formStatus;
    },

    hasEmptyInput: function (state) {
        var emptyInputMessage = "";

        if (!Boolean(state.name)) {
            emptyInputMessage += "Jury name and surname & "
        }
        if (!Boolean(state.institute)) {
            emptyInputMessage += "Institute name & "
        }
        if (!Boolean(state.department)) {
            emptyInputMessage += "Department name & "
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

    hasInvalidInput: function (state) {
        var invalidInputMessage = "";

        if (!state.institute.match("^[a-zA-Z ]*$")) {
            invalidInputMessage += "Institute name & "
        }
        if (!state.department.match("^[a-zA-Z ]*$")) {
            invalidInputMessage += "Department name & "
        }

        if (Boolean(invalidInputMessage)) {
            invalidInputMessage = invalidInputMessage.replace(/&\s*$/, "");
            invalidInputMessage += "wrong."
            alert(invalidInputMessage)
            return true
        }
        else {
            return false
        }
    }


};

export default helpers;