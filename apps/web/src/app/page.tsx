'use client';

import withAuthenticated from "../hocs/with-auth-hoc";
import { useAppSelector } from "ui/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { getWallet } from "ui/utils/requests/profile";
import { MainContent } from 'ui/components/Main'
import { BarChartComponent, BarChartMonthComponent } from 'ui/components/expenses/BarChart'
import styled from "styled-components";

/* ─── Layout ──────────────────────────────── */
const PageHeader = styled.div`
  margin-bottom: 2rem;
`
const Greeting = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary, #6366f1);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
`
const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  letter-spacing: -0.03em;
  line-height: 1.2;
`
const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted, #94a3b8);
  margin-top: 0.3rem;
`

/* ─── Stat Cards ──────────────────────────── */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const StatCard = styled.div<{ $gradient: string }>`
  background: var(--bg-surface, #fff);
  border-radius: 16px;
  padding: 1.4rem 1.6rem;
  border: 1px solid var(--border, #e8ecf4);
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -20px; right: -20px;
    width: 80px; height: 80px;
    border-radius: 50%;
    background: ${p => p.$gradient};
    opacity: 0.08;
  }
`
const StatIcon = styled.div`
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
`
const StatLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
`
const StatValue = styled.p<{ $color?: string }>`
  font-size: 1.9rem;
  font-weight: 700;
  color: ${p => p.$color || 'var(--text-primary, #0f172a)'};
  letter-spacing: -0.04em;
  line-height: 1;
`
const StatSub = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted, #94a3b8);
  margin-left: 0.3rem;
`
const StatBadge = styled.span<{ $color: string }>`
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  background: ${p => p.$color}18;
  color: ${p => p.$color};
`

/* ─── Charts ──────────────────────────────── */
const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`
const ChartCard = styled.div`
  background: var(--bg-surface, #fff);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border, #e8ecf4);
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
`
const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`
const ChartTitle = styled.h2`
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
`
const ChartBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--primary, #6366f1);
  background: var(--primary-light, #eef2ff);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
`

function Home() {
  const user = useAppSelector(state => state.user)
  const { data } = useQuery({
    queryKey: ['wallet'],
    queryFn: () => getWallet(user?.data?.id)
  })

  const today = new Date().toLocaleDateString('th-TH', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
  const userName = user?.data?.email?.split('@')[0] || 'ผู้ใช้'

  return (
    <MainContent>
      <PageHeader>
        <Greeting>👋 ยินดีต้อนรับกลับ</Greeting>
        <PageTitle>{userName}</PageTitle>
        <PageSubtitle>{today}</PageSubtitle>
      </PageHeader>

      <StatsGrid>
        <StatCard $gradient="#6366f1">
          <StatIcon>💰</StatIcon>
          <StatLabel>ยอดคงเหลือ</StatLabel>
          <StatValue>
            {data?.wallet?.balance ?? '—'}
            <StatSub>{data?.wallet?.currency}</StatSub>
          </StatValue>
          <StatBadge $color="#6366f1">Wallet</StatBadge>
        </StatCard>

        <StatCard $gradient="#10b981">
          <StatIcon>📈</StatIcon>
          <StatLabel>สถานะบัญชี</StatLabel>
          <StatValue $color="#10b981" style={{ fontSize: '1.2rem', paddingTop: '0.3rem' }}>
            Active
          </StatValue>
          <StatBadge $color="#10b981">ปกติ</StatBadge>
        </StatCard>

        <StatCard $gradient="#f59e0b">
          <StatIcon>📅</StatIcon>
          <StatLabel>เดือนนี้</StatLabel>
          <StatValue $color="#f59e0b" style={{ fontSize: '1.2rem', paddingTop: '0.3rem' }}>
            —
          </StatValue>
          <StatBadge $color="#f59e0b">รายจ่าย</StatBadge>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartHeader>
            <ChartTitle>รายจ่ายรายเดือน</ChartTitle>
            <ChartBadge>Monthly</ChartBadge>
          </ChartHeader>
          <BarChartMonthComponent />
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <ChartTitle>รายจ่ายตามหมวดหมู่</ChartTitle>
            <ChartBadge>By Category</ChartBadge>
          </ChartHeader>
          <BarChartComponent />
        </ChartCard>
      </ChartsGrid>
    </MainContent>
  );
}

export default withAuthenticated(Home)
