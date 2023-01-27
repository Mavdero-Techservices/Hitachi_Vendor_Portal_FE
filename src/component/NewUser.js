import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewUser.css";
import template from "../img/userBg.jpg";
import Logo from "../img/logo.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
const NewUser = () => {
  const navigate = useNavigate();
  const onYesButtonClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onNoButtonClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (

    <div >
      <Image className="userBackground" src={template} fluid />
      <div class="content">
        <img className="hitachi-logo-icon center" alt="" src={Logo} />
        <h3 className="userTitle">Already Registered with HSI?</h3>
        <div className="agreebtn">
          <button type="button" className="btn btn-md m-1 redirectButton Yes" onClick={onYesButtonClick}>yes</button>
          <br />
          <button type="button" className="btn btn-md m-1 redirectButton No" onClick={onNoButtonClick}>No</button>
        </div>
      </div>

    </div>
  );
};

export default NewUser;
