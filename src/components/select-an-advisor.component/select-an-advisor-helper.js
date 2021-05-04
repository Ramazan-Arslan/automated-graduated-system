

import UserController from '../../controllers/UserController'
const helpers = {
 getStudentData : async function(userId, userType) {
    const userController = new UserController()
    const obj = await userController.takeUserInfo(userId, userType)
    if (Boolean(obj.name)) {
      return obj
    } else {
      return { name: 'Error', surname: 'Error' }
    }
  },
   getAdvisorsInfo: async function(userDepartment) {
    const userController = new UserController()
    const advisorsList = await userController.takeDepartmentAdvisors(
      userDepartment
    )
    if (Array.isArray(advisorsList)) {
      return advisorsList
    } else {
      return []
    }
  },
  
  selectAnAdvisor: async function(studentId, selectedAdvisorId) {
  
    const userController = new UserController()
    const resultMessage = await userController.submitStudentProposal(
      studentId,
      selectedAdvisorId
    )
    return resultMessage;
  },
    
  getPreviewData: async function (studentObject) {
    const userController = new UserController()
    var advisorId = studentObject?.advisor?.advisorId
    var advisorObject = null
    if (Boolean(advisorId)) {
      var url = 'user/advisor/' + advisorId
      advisorObject = await userController.takeSpecificUserInfo(url)
    }
    return advisorObject
  }
};

export default helpers;