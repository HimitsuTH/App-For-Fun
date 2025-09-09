"use client"
import withAuthenticated from "../../hocs/with-auth-hoc";
// import { State } from 'ui/store'
// import {  useSelector } from 'react-redux'
import { useAppSelector } from "ui/store/hooks";

const TestPage = () => {
  const { data } = useAppSelector(state => state.user)
  const user = data
  console.log('user---> web test ---->', data)
  return (
    <div>
      <h1>LOG TEST ROUTER</h1>
      <h2>Username: {user?.username}</h2>
      <h2>Status: {user?.status}</h2>
      <h2>Role: {user?.roles?.name}</h2>
    </div>
  );
};

export default withAuthenticated(TestPage);