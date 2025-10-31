import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import { clearUserAction, setUserAction } from '../../store/actions/user.action'
import { cleanCategory, setCategory } from '../../store/slices/category.slice'
import Swal from 'sweetalert2'

const host = "http://localhost"
const port = 8000

export const getCategory= async (dispatch?:any) => {
    try {
        console.log('><<><><><><><><><>START GET CATEGORY<><><><<<>1<><><><>')

        const data = await axios.get(`${host}:${port}/categories`, {
            withCredentials: true, 
        })

        if (!data) {
            dispatch(cleanCategory())
            throw new Error('No Category data received');
        }

        dispatch(setCategory(data.data))
        Swal.close()
        return data.data

    } catch (error : any) {
        Swal.close()
        console.log('----------------_ERORORORORO_------------------')
        dispatch(cleanCategory())
        console.error('Category fetch error:', error);
    }
};


export const useQueryCategory = (queryKey: any[], dispatch: any, options?: {
  refetchOnMount?: boolean,
  refetchInterval?: number | false,
  refetchOnReconnect?: boolean,
  refetchOnWindowFocus?: boolean,
  staleTime?: number,
  cacheTime?: number,
}) => {
    return useQuery({
        queryKey,
        queryFn: () => getCategory(dispatch),
        refetchOnMount: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
    })
}
