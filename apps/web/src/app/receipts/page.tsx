"use client"
import withAuthenticated from "../../hocs/with-auth-hoc";
// import { State } from 'ui/store'
// import {  useSelector } from 'react-redux'
import { useAppSelector } from "ui/store/hooks";
import CreateReceipts from 'ui/components/receipts/Form'



const TopUp = () => {
  const { data } = useAppSelector(state => state.user)
  const user = data
  console.log('user---> web test ---->', data)
  return (
    <div style={{backgroundColor:'#fff', width: '100%'}}>
      <h1>LOG TEST ADD Receipts</h1>
      <h2>Username: {user?.username}</h2>
      <h2>Role: {user?.roles?.name}</h2>
      <CreateReceipts/>
      
    </div>
  );
};

export default withAuthenticated(TopUp);