import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import { clearUserAction, setUserAction } from '../../store/actions/user.action'
import { cleanUser, setUser } from '../../store/slices/user.slice'
// import Router from 'next/router'
import Swal from 'sweetalert2'

interface TypeUser {
    username: string
    email: string
}

const host = "http://localhost"
const port = 8000

export const getProfile = async (dispatch?:any) => {
    try {
        const data:any = await axios.get(`${host}:${port}/profile`, {
            withCredentials: true, 
        })
        Swal.close()
        console.log(',<><<><><><><><><><><><><><<<><>m')
        console.log(data)
        if (!data.data.user) {
            dispatch(cleanUser())
            // Router.push('/login')
            // } else {
            //     if (data.user.redirect_path && Router.route !== data.user.redirect_path) {
            //     Router.push(data.user.redirect_path)
            // }
        }

        dispatch(setUser(data))
        return data

    } catch (error : any) {
        Swal.close()
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