"use client"
import withAuthenticated from "../../hocs/with-auth-hoc";
// import { State } from 'ui/store'
// import {  useSelector } from 'react-redux'
import { useAppSelector } from "ui/store/hooks";
import { MainContent } from 'ui/components/Main'

const Category = () => {
  const { data } = useAppSelector(state => state.user)
  const user = data
  console.log('user---> web test ---->', data)
  return (
    <MainContent>
      <h1>LOG TEST category</h1>
      <h2>Username: {user?.username}</h2>
      <h2>Role: {user?.roles?.name}</h2>
    </MainContent>
  );
};

export default withAuthenticated(Category);