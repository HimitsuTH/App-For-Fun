// import { getProfile } from 'ui/utils/requests/profile'
import { useQueryProfile } from 'ui/utils/requests/profile'
import { useAppDispatch , useAppSelector } from 'ui/store/hooks'
import { Container } from 'ui/components/Container'
// import { State } from 'ui/store'

const withAuthenticated = (
  Component: any,
) => {
  const ComponentWithAuthenticated = (props: any) => {
    try {
      const { data: user } = useAppSelector((state) => state.user)
      const dispatch = useAppDispatch()
      console.log('=----------------------------------------->')
      useQueryProfile(['profile', user], user, dispatch)
      // const user= getProfile() 
      console.log('=----------------------------------------->',user)

      if (!user) {
        return <div>Loading. . .</div>
      }

      return (
        <Container>
          <Component {...props} />
        </Container>
      )
    } catch (err) {
      console.error(err)
      return null // Return null or an error component on failure
    }
  }

  // Correct: The withAuthenticated function must return the ComponentWithAuthenticated
  return ComponentWithAuthenticated
}

export default withAuthenticated