import { getProfile } from 'ui/utils/requests/profile'

const withAuthenticated = (
  Component: any,
) => {
  const ComponentWithAuthenticated = (props: any) => {
    try {
      console.log('=----------------------------------------->')
      const user = getProfile() // Ensure this is a synchronous function or handle it with React hooks (e.g., useState, useEffect)
      console.log('=----------------------------------------->')

      if (!user) {
        return <div>Loading. . .</div>
      }

      return (
        <div>
          <div>TEST HOCS...</div>
          <Component {...props} />
        </div>
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