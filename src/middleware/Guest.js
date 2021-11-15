import { Redirect, useHistory } from 'react-router'
import { useRecoilValue } from 'recoil'
import { authenticatedUser} from  '../store'

export default function Guest(props) {
    const auth = useRecoilValue(authenticatedUser)
    const history = useHistory()

   if(auth.check){
    if(history.location.pathname === '/login' || '/register'){
        history.push('/dashboard')
       
    }
   }



  

    return props.render
}
