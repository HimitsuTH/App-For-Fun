import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import { clearUserAction, setUserAction } from '../../store/actions/user.action'
import { cleanUser, setUser } from '../../store/slices/user.slice'
import Swal from 'sweetalert2'

const host = "http://localhost"
const port = 8000

export const getProfile = async (dispatch?:any) => {
    // const router = useRouter()
    try {
        console.log('><<><><><><><><><>START GET PROFILE<><><><<<>1<><><><>')

        const data = await axios.get(`${host}:${port}/profile`, {
            withCredentials: true, 
        })

         console.log('><<><><><><><><><>START GET PROFILE<><><><<<2><><><><>')
        // Swal.close()
        console.log('DATA----------------->',data)
        if (!data.data) {
            dispatch(cleanUser())
            // throw new Error('No user data received');

            return null
            // } else {
            //     if (data.user.redirect_path && Router.route !== data.user.redirect_path) {
            //     Router.push(data.user.redirect_path)
            // }
        }

        dispatch(setUser(data.data))

        console.log('----data.data---[][][][][][][][][][][][][][][-->',data.data)
        Swal.close()
        return data.data 

    } catch (error : any) {
        Swal.close()
        console.log('----------------_ERORORORORO_------------------')
        // router.replace('/login')
        console.log('--------------1-----2-3-4-5-----------')
        dispatch(cleanUser())
        console.error('Profile fetch error:', error);
        throw new Error(error.message || 'Failed to fetch wallet data'); 
        
    }
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



// export const getWallet = async (user_id:any) => {
//     try {
//         console.log('><<><><><><><><><>START GET WALLET<><><><<<>1<><><><>',user_id)

//         const data = await axios.post(`${host}:${port}/wallet`,{
//             "user_id": user_id
//         }, {
//             withCredentials: true, 
//         })

//         console.log('><<><><><><><><><>START GET WALLET<><><><<<2><><><><>')
//         console.log('DATA----WALLET------------->',data)
//         if (!data.data) {
//             // throw new Error('No user data received');
//             return null
//         }

//         console.log('----data.data---[][][][][][][][][][][][]WALLET[][][-->',data.data)
//         Swal.close()
//         return data.data 

//     } catch (error : any) {
//         Swal.close()
//         console.log('----------------_ERORORORORO_------------------')
//         console.log('--------------1-----2-3-4-5-----------')
//         console.error('WALLET fetch error:', error);
//         throw new Error(error.message || 'Failed to fetch wallet data'); 
        
//     }
    
// };

export const getWallet = async (user_id:any) => {
    try {
        console.log('><<><><><><><><><>START GET WALLET<><><><<<>1<><><><>',user_id)

        const data = await axios.post(`${host}:${port}/wallet`,{
            "user_id": user_id
        }, {
            withCredentials: true, 
        })

        console.log('><<><><><><><><><>START GET WALLET<><><><<<2><><><><>')
        
        if (!data.data) {
            Swal.close();
            // It's generally better to let non-2xx statuses be handled by the catch block, 
            // but if a 200 response has empty body, returning null is acceptable.
            return null
        }

        console.log('----data.data---[][][][][][][][][][][][]WALLET[][][-->',data.data)
        // If Swal.close() is a synchronous operation and you're not concerned about it failing, keep it here.
        Swal.close() 
        return data.data 

    } catch (error : any) {
        // --- 🚀 FIX IS HERE 🚀 ---
        
        Swal.close() // Close the loading spinner/alert
        console.error('WALLET fetch error:', error);
        
        // This is the CRUCIAL line: Throwing the error tells the query to FAIL
        throw new Error(error.message || 'Failed to fetch wallet data'); 
    }
};