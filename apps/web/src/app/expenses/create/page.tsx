"use client"
import withAuthenticated from "../../../hocs/with-auth-hoc";
import CreateReceipts from 'ui/components/expenses/Form'
import { MainContent } from 'ui/components/Main'

const CreateExpensePage = () => {
  return (
    <MainContent>
      <CreateReceipts />
    </MainContent>
  );
};

export default withAuthenticated(CreateExpensePage);
