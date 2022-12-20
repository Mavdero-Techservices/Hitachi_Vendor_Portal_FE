/* eslint-disable jsx-a11y/alt-text */
import Logo1 from "../img/logo1.png";
import "../css/navbar.css"

function App() {
  return (
    <div className="App">
      <nav className="nav">
        <img className="img1" src={Logo1} alt=""/>
        <ul>
          <li>
            <a href="/basic">Vendor Details</a>
          </li>
          <li>
            <a href="/statutory">Statutory Details</a>
          </li>
          <li>
            <a href="/Compliance Details">Compliance Details</a>
          </li>
          <li>
            <a href="/bank">Bank Details</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
