export const metadata = {
  title: 'RevenueFlow OS | Investor',
  description: 'Investor Dashboard for Revenue Assets',
};

export default function InvestorLayout({ children }) {
  return (
    <div style={{ background: '#040405', minHeight: '100vh', color: '#fff', fontFamily: "'Manrope', -apple-system, sans-serif" }}>
      {children}
    </div>
  );
}
