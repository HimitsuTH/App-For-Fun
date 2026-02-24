"use client"
import withAuthenticated from "../../../hocs/with-auth-hoc";
import CreateCategory from 'ui/components/category/Form'
import { MainContent } from 'ui/components/Main'



const TopUp = () => {
  return (
    <MainContent>
      <h1>ADD Category</h1>
      <CreateCategory/>
    </MainContent>
  );
};

export default withAuthenticated(TopUp);