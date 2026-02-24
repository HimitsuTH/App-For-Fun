"use client"
import withAuthenticated from "../../../hocs/with-auth-hoc";
import CreateReceipts from 'ui/components/expenses/Form'
import { MainContent } from 'ui/components/Main'



const TopUp = () => {
  return (
    <MainContent>
      <h1>ADD Receipts</h1>
      <CreateReceipts/>
    </MainContent>
  );
};

export default withAuthenticated(TopUp);