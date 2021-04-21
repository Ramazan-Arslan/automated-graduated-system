import AdvisorInformation from '../components/advisor-information.component/advisor-information.component'
import StudentInformation from '../components/student-information.component/student-information.component'
import GeneralOperation from '../components/general-operations.component/general-operations.component.js'
import Forms from '../components/forms.component/forms.component.js'
import Thesis from '../components/thesis.component/thesis.component.js'
import Lessons from '../components/lessons.component/lessons.component.js'
import Help from '../components/help.component/help.component.js'
import Settings from '../components/settings.component/settings.component.js'
import Homepage from '../components/homepage.component/homepage.component.js'
import Notification from '../components/notification.component/notification.component'
const Routes = [
  {
    key: 1,
    name: 'Student Information',
    path: '/studentinformation',
    component: StudentInformation,
  },
  {
    key: 2,
    name: 'General Operation',
    path: '/generaloperation',
    component: GeneralOperation,
  },
  {
    key: 3,
    name: 'Advisor Operation',
    path: '/advisorinformation',
    component: AdvisorInformation,
  },
  {
    key: 4,
    name: 'Forms',
    path: '/forms',
    component: Forms,
  },
  {
    key: 5,
    name: 'Thesis',
    path: '/thesis',
    component: Thesis,
  },
  {
    key: 6,
    name: 'Lessons',
    path: '/lessons',
    component: Lessons,
  },
  {
    key: 7,
    name: 'Help',
    path: '/help',
    component: Help,
  },
  {
    key: 8,
    name: 'Settings',
    path: '/settings',
    component: Settings,
  },
  {
    key: 9,
    name: 'Homapage',
    path: '/homepage',
    component: Homepage,
  },
  {
    key: 10,
    name: 'Notification',
    path: '/notification',
    component: Notification,
  },
]

export default Routes
