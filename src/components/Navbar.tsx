export const Navbar = () => {
  return (
    <nav className="h-14 flex items-center justify-between px-6 shrink-0" style={{ backgroundColor: '#0d0d2b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <span className="text-base font-bold tracking-tight text-foreground">✨ Fable</span>
      <span className="text-sm text-primary hidden sm:block">Every great product starts with a story.</span>
    </nav>
  );
};
