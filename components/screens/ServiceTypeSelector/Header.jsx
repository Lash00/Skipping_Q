export default function Header({
  linksItemas = ["Features", "how it work", "pricing"],
}) {
  return (
    <header className="container main-shadow border-15 mt-2">
      {
        //
      }
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa-solid fa-bars-staggered toggel"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse me-0" id="navbarNav">
            <ul className="navbar-nav justify-content-end w-100">
              {linksItemas.map((link, i) => (
                <li className="nav-item ms-0 ms-md-5 text-start" key={i}>
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
