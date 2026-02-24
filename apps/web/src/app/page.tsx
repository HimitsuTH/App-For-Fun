'use client';

import withAuthenticated from "../hocs/with-auth-hoc";
import { useAppSelector } from "ui/store/hooks";
import { useRouter } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";

import { getWallet } from "ui/utils/requests/profile";

import { MainContent } from 'ui/components/Main'

import styled from "styled-components";
import { BarChartComponent, BarChartMonthComponent } from 'ui/components/expenses/BarChart'

const BalanceContainer = styled.div`
  padding: 3rem;
  background-color: #f3f3f3;
  border-radius: 100%;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

function Home() {
  const router = useRouter()
  const user = useAppSelector(state => state.user)

   const { data } = useQuery({
        queryKey: ['wallet'],
        queryFn: () => getWallet(user?.data?.id)
    })


  return (
    <MainContent>
        <button onClick={()=> router.push('/login')}>
          Navigate to Test
        </button>
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <h1>HOME</h1>

        <BalanceContainer><p>{data?.wallet?.balance || '-'}</p><p style={{ marginLeft: '0.25em'}}>{data?.wallet?.currency}</p></BalanceContainer>

        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%'}}>
          <BarChartMonthComponent/>
          <BarChartComponent/>
        </div>
      </section>
    
    </MainContent>
  );
}

export default withAuthenticated(Home)
