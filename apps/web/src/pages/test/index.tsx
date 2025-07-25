import  withAuthenticated from "../../hocs/hoc";

 const Test = () => {
  return (
    <div>
        <h1>LOG TEST ROUTER</h1>
    </div>
  );
}

export default withAuthenticated(Test)
