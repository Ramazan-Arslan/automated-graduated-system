
import UserController from '../../controllers/UserController'
const helpers = {

    getStudentsInfo : async function (advisorId) {
        const userController = new UserController()
        const studentList = await userController.takeStudentProposals(advisorId)
        if (Array.isArray(studentList)) {
            return studentList;
        } else {
            return []
        }
    },
    submitProposalDecisions: async function (advisorId, acceptedList, rejectedList) {
        const userController = new UserController()
        const result = await userController.submitProposalDecisions(advisorId, acceptedList, rejectedList)
        if (result.length > 0) {
            return("Succesfull")
           
        }
        else {
            return("Fail")
        }
    },
    getPreviewData: async function (advisorId) {
        const userController = new UserController()
        const proposals = await userController.takeDecidedProposals(advisorId);

        if (Array.isArray(proposals)) {
            return proposals;
        } else {
            return []
        }
    }
}
export default helpers;
