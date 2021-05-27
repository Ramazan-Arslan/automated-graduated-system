import ThesisSubmission from '../components/thesis-submission.component/thesis-submission.component'
import SelectAdvisor from '../components/select-an-advisor.component/select-an-advisor.component'
import ThesisAdvisorAndTopicAppointment from '../components/thesis-advisor-and-topic-appointment.component/thesis-advisor-and-topic-appointment.component.js'
import Forms from '../components/forms.component/forms.component.js'
import ThesisAdvisorAndTopicAppointmentByEabd from '../components/thesis-advisor-and-topic-appointment-by-eabd.component/thesis-advisor-and-topic-appointment-by-eabd.component.js'
import StudentApproval from '../components/student-approval.component/student-approval.component.js'
import Help from '../components/help.component/help.component.js'
import Settings from '../components/settings.component/settings.component.js'
import Homepage from '../components/homepage.component/homepage.component.js'
import Notification from '../components/notification.component/notification.component'
import JuryAppointmentByAdvisor from '../components/thesis-defense-jury-appointment-by-advisor.component/thesis-defense-jury-appointment-by-advisor.component'
import JuryReportByEABD from '../components/jury-report-eabd.component/jury-report-eabd.component'
const Routes = [
  {
    key: 1,
    name: 'Select Advisor' /*Student Information*/,
    usertype: 'student',
    path: '/selectadvisor',
    component: SelectAdvisor,
  },
  {
    key: 2,
    name: 'Thesis Advisor and Topic Appointment',
    path: '/thesisadvisorandtopicappointment',
    usertype: 'student',
    component: ThesisAdvisorAndTopicAppointment,
  },
  {
    key: 3,
    name: 'Thesis Submission',
    path: '/thesissubmission',
    usertype: 'student',
    component: ThesisSubmission,
  },

  {
    key: 10,
    name: 'Student Approval',
    usertype: 'advisor',
    path: '/studentapproval',
    component: StudentApproval,
  },
  {
    key: 11,
    name: 'Jury Appointment',
    usertype: 'advisor',
    path: '/juryappointmentbyadvisor',
    component: JuryAppointmentByAdvisor,
  },

  {
    key: 20,
    name: 'Thesis Advisor and Topic Appointment',
    usertype: 'eabd',
    path: '/thesisadvisorandtopicappointmentbyeabd',
    component: ThesisAdvisorAndTopicAppointmentByEabd,
  },
  {
    key: 21,
    name: 'Thesis Defense Exam Jury Report',
    usertype: 'eabd',
    path: '/thesisdefenseexamjuryreport',
    component: JuryReportByEABD,
  },
  {
    key: 40,
    name: 'Forms',
    usertype: 'alltype',
    path: '/forms',
    component: Forms,
  },
  {
    key: 41,
    name: 'Help',
    usertype: 'alltype',
    path: '/help',
    component: Help,
  },
  {
    key: 42,
    name: 'Settings',
    path: '/settings',
    usertype: 'alltype',
    component: Settings,
  },
]

export default Routes
