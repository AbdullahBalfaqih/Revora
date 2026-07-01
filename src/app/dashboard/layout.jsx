export const metadata = {
  title: 'RevenueFlow OS | Dashboard',
  description: 'MVP Dashboard for Casper Hackathon',
};

export default function DashboardLayout({ children }) {
  return (
    <div style={{ background: '#040405', minHeight: '100vh', color: '#fff', fontFamily: "'Manrope', -apple-system, sans-serif" }}>
      {children}
    </div>
  );
}
