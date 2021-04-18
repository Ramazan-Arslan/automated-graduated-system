import AdvisorInformation from '../components/advisor-information.component/advisor-information.component'
import StudentInformation from '../components/student-information.component/student-information.component'
import GeneralOperation from '../components/general-operations.component/general-operations.component.js'
import Forms from '../components/forms.component/forms.component.js'
import Thesis from '../components/thesis.component/thesis.component.js'
import Lessons from '../components/lessons.component/lessons.component.js'
import Help from '../components/help.component/help.component.js'
import Settings from '../components/settings.component/settings.component.js'
const Routes = [
  {
    name: 'Student Information',
    path: '/studentinformation',
    component: StudentInformation,
  },
  {
    name: 'General Operation',
    path: '/generaloperation',
    component: GeneralOperation,
  },
  {
    name: 'Advisor Operation',
    path: '/advisorinformation',
    component: AdvisorInformation,
  },
  {
    name: 'Forms',
    path: '/forms',
    component: Forms,
  },
  {
    name: 'Thesis',
    path: '/thesis',
    component: Thesis,
  },
  {
    name: 'Lessons',
    path: '/lessons',
    component: Lessons,
  },
  {
    name: 'Help',
    path: '/help',
    component: Help,
  },
  {
    name: 'Settings',
    path: '/settings',
    component: Settings,
  },
]

export default Routes
