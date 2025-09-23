import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import { clearUserAction, setUserAction } from '../../store/actions/user.action'
import { cleanUser, setUser } from '../../store/slices/user.slice'
import Swal from 'sweetalert2'

const host = "http://localhost"
const port = 8000

    // const router = useRouter()
export const getProfile = async (dispatch?:any) => {
    try {
        console.log('><<><><><><><><><>START GET PROFILE<><><><<<>1<><><><>')

        const data = await axios.get(`${host}:${port}/profile`, {
            withCredentials: true, 
        })

         console.log('><<><><><><><><><>START GET PROFILE<><><><<<2><><><><>')
        // Swal.close()
        console.log('DATA----------------->',data)
        if (!data) {
            dispatch(cleanUser())
            throw new Error('No user data received');
            // } else {
            //     if (data.user.redirect_path && Router.route !== data.user.redirect_path) {
            //     Router.push(data.user.redirect_path)
            // }
        }

        dispatch(setUser(data.data))
        Swal.close()
        return data.data

    } catch (error : any) {
        Swal.close()
        console.log('----------------_ERORORORORO_------------------')
        // router.replace('/login')
        console.log('--------------1-----2-3-4-5-----------')
        dispatch(cleanUser())
        console.error('Profile fetch error:', error);
        
    }
    // return new Promise((resolve, reject) => {
    //     axios.get('http://localhost:8000/profile', {
    //         withCredentials: true, 
    //     }).then(({ data }) => {
    //         console.log('Profile fetch successful:', data);
    //         setUserAction(dispatch,{...data})
    //         resolve(data);
    //     }).catch((err) => {
    //         console.error('Profile fetch error:', err.response ? err.response.data : err.message);
    //         reject(err);
    //     });
    // });
    
};


export const useQueryProfile = (queryKey: any[], user: any | null, dispatch: any, options?: {
  refetchOnMount?: boolean,
  refetchInterval?: number | false,
  refetchOnReconnect?: boolean,
  refetchOnWindowFocus?: boolean,
  staleTime?: number,
  cacheTime?: number,
}) => {
    return useQuery({
        queryKey,
        queryFn: () => getProfile(dispatch),
        refetchOnMount: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
    })
}