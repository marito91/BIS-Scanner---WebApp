import HamburgerMenu from "./HamburgerMenu";

// Migrated from src/components/Footer.jsx. The original wrapped its content in
// an auth() check; that gate is now proxy.ts (the only way the (protected)
// layout rendering this is reached), so the check is gone and HamburgerMenu
// always renders. The old commented-out .footer markup is kept for reference.

export default function Footer({ logout }: { logout: () => void }) {
  return (
    <>
      {/* <div className="footer">
        <Link to="/devices">
          <img src={devices} alt="" />
        </Link>
        <Link to="/books">
          <img src={book} alt="" />
        </Link>
        <Link to="/home">
          <img src={home} alt="" />
        </Link>
        <Link to="/home">
          <img src={signout} alt="" onClick={() => logout()} />
        </Link>
      </div> */}
      <HamburgerMenu logout={logout} />
    </>
  );
}
