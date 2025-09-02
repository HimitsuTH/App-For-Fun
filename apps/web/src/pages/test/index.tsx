import withAuthenticated from "../../hocs/hoc";

const TestPage = () => {
  return (
    <div>
      <h1>LOG TEST ROUTER</h1>
    </div>
  );
};

export default withAuthenticated(TestPage);