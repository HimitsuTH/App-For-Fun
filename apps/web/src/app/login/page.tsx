"use client"
import axios from "axios";
import { useEffect } from 'react';
import { setUser } from "ui/store/slices/user.slice";
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from "ui/store/hooks";


 const Login = () => {
  const { data } = useAppSelector(state => state.user)
  console.log('user---> web test ---->', data)
  const user = data
  const dispatch = useAppDispatch()
  const router = useRouter()

  console.log('-------LOGIN router------',router)

  useEffect(() => {
    axios.get('/api/profile')
      .then((res) => {
        router.push('/')
      })
      .catch((err:any) => {
        console.log(err)
      })
  }, [user, router]); 



  const onSubmit = async (e:any) => {
    try {
      e.preventDefault()
      const test = await axios.post('http://localhost:8000/auth/login', {
        "username": "admin2@test.com",
        "password": "1234"
      }, {
        withCredentials: true,
      }).then((data:any) => {
        console.log('test--------------->', data)
        return data
      })
      dispatch(setUser(test))


    } catch(err) {
      console.log('------------------=')
      console.log(err);
      console.log('------------------=')
    }
  }

  const onLogout = async () => {
    try {
      await axios.post('http://localhost:8000/auth/logout',{},{ 
        withCredentials: true, 
      });
      console.log('Logout successful');
    } catch(err){
      console.error('Logout error:', err);
    }
  };

  console.log('user-->',user)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ marginBottom: '20px' }}>Login/Logout Test</h2>
        <form onSubmit={onSubmit} style={{ marginBottom: '15px' }}>
            <button
                type="submit"
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
                Login
            </button>
        </form>


        {/* FOR REMOVE USER WHEN CAN NOT LOGIN */}
        {/* <button
            onClick={onLogout}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#da190b'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
        >
            Logout
        </button> */}

        <button onClick={()=> router.push('/test')}>
          Navigate to Test
        </button>
    </div>
  );
};

export default Login;
