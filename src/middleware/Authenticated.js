import { useHistory } from 'react-router'
import { useRecoilValue } from 'recoil'
import { authenticatedUser} from  '../store'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Authenticated(props) {
    const auth = useRecoilValue(authenticatedUser)
    const history = useHistory()
   if(auth.check === false) {
       history.push('/login')
   }

    return props.render
}
