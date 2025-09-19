'use client'
import { useQueryProfile } from 'ui/utils/requests/profile'
import { useEffect } from 'react'
import { useAppDispatch , useAppSelector } from 'ui/store/hooks'
import { Container } from 'ui/components/Container'
import LoadingPage from 'ui/common/LoadingPage'

import { useRouter } from 'next/navigation'



const withAuthenticated = (
  Component: any,
) => {
  
  const ComponentWithAuthenticated = (props: any) => {
      const { data: user } = useAppSelector((state) => state.user)
      const dispatch = useAppDispatch()
      const router = useRouter()
      console.log('---user-------ComponentWithAuthenticated-----with-->',user)
      console.log('=-------------------1---------------------->')
      const { isError } = useQueryProfile(['profile', user], user, dispatch)

      console.log('isError--->',isError)

      useEffect(() => {
        if (isError) {
          router.replace('/login');
        }
      }, [isError, router]);

      if (!user) {
        return <LoadingPage/>
      }


      console.log('=-------------------2---------------------->')

      return (
        <Container>
          <Component {...props} />
        </Container>
      )
  }

  return ComponentWithAuthenticated
}

export default withAuthenticated