"use client"
import withAuthenticated from "../../../hocs/with-auth-hoc";
// import { State } from 'ui/store'
// import {  useSelector } from 'react-redux'
import { useAppSelector } from "ui/store/hooks";
import CreateReceipts from 'ui/components/expenses/Form'
import { MainContent } from 'ui/components/Main'



const TopUp = () => {
  const { data } = useAppSelector(state => state.user)
  const user = data
  console.log('user---> web test ---->', data)
  return (
    <MainContent>
      <h1>LOG TEST ADD Receipts</h1>
      <CreateReceipts/>
    </MainContent>
  );
};

export default withAuthenticated(TopUp);