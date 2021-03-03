import Link from "next/link";

const NavigationMenu = () => {
  return (
    <div className="menu">
      <h3>New Cases - Daily</h3>
      <Link href="/cases-by-county">
        <a>by county</a>
      </Link>
      <h3>Deaths</h3>
      <Link href="/deaths-by-state">
        <a>by state</a>
      </Link>
      <style jsx>
        {`
          .menu {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
};

export default NavigationMenu;
