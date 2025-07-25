
const withAuthenticated = (
  Component: any,
) => {
  const ComponentWithAuthenticated = (props: any) => {

    const user = undefined

    if (!user) return <div>loding. . .</div>

    return (
      <div>
        <div>TEST HOCS...</div>
        <Component {...props} />
      </div>
    )
  }
  return ComponentWithAuthenticated
}

export default withAuthenticated
