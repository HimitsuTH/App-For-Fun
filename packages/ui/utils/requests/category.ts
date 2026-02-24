import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import { clearUserAction, setUserAction } from '../../store/actions/user.action'
import { cleanCategory, setCategory } from '../../store/slices/category.slice'
import Swal from 'sweetalert2'
import Alert, { LoadingAlert } from 'ui/common/Alert'

const host = "http://localhost"
const port = 8000


export const createCategory = async (data: any, user:any, dispatch: any, router: any) => {
    try {
        LoadingAlert()
        const response = await axios.post('http://localhost:8000/categories', {
            "name": data.name,
            "description": data.description,
        }, {
            withCredentials: true,
        });

        console.log('test--response-createCategory->',response)

        // dispatch(setUser(response.data));
        Swal.close()
        router.replace('/category');
    } catch (err: any){
        console.log('error---login-request--->',err)
        Alert({
            data: err?.response
        })
        // Swal.close()
    }
}

export const deleteCategorise = async (data: any) => {
    try {
        LoadingAlert()
        const response = await axios.post('http://localhost:8000/categories/delete', {
            items: data
        }, {
            withCredentials: true,
        });

        console.log('test--response-createCategory->',response)

        Swal.close()
        


    } catch (err: any){
        console.log('error---login-request--->',err)
        Alert({
            data: err?.response
        })
        // Swal.close()
    }
}

export const getCategory = async (dispatch?:any) => {
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
