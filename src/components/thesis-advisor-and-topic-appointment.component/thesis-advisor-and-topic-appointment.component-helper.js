
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

        if(Boolean(advisorObject) && advisorObject.status === "Accepted")
        {
            var advisorUrl = 'user/advisor/' + advisorObject.advisorId;
            var advisorInfo = await userController.takeSpecificUserInfo(advisorUrl)

            return advisorInfo;
        }
        else
        {
            return null;
        } 
    },

    getFormData: async function (studentId, formId) {
        const formController = new FormController()

        var formObject = await formController.takeFormData(studentId, formId)
        return formObject
    },

    setFormData: async function (studentId, form) {

        if(Boolean(form.thesisName))
        {   
            if(this.validateThesisName(form.thesisName))
            {
                const formController = new FormController()

                const isSet = await formController.coordinateFormData(studentId, form)
                if(isSet)
                {
                    alert("Thesis Topic selected succesfully")
                    window.location.reload(true);
                }
                
            }
            else
            {
                alert("Thesis name contains invalid characters")
            }
           
        }
        else
        {
            alert("Thesis Name cannot be empty")
        }
      
    },

    validateThesisName(thesisName)
    {
        
        if(thesisName.match("^[a-zA-Z0-9 ]*$"))
        {
            return true
        }
        return false
    },

    isFormAccessible: async function (studentId, formId) {
        const formController = new FormController()      
        var formStatus = await formController.takeFormStatus(studentId, formId);
        return formStatus;
    }


};

export default helpers;