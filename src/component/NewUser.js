import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewUser.css";
import template from "../img/newuser.png";
import Logo from "../img/logo.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NewUser = () => {
  const navigate = useNavigate();
  const onYesButtonClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onNoButtonClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <div>
      <Row>
        <Col>
          <div className="template">
            <div className="logo">
              <img className="hitachi-logo-icon center" alt="" src={Logo} />
              <div className="container-fluid text-Qa">
                <h3>Already Registered with HSI?</h3>
              </div>
              <div className="redirect-button">
                <button className="redirectButton Yes" onClick={onYesButtonClick}>yes</button>
                <button className="redirectButton No" onClick={onNoButtonClick}>No</button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewUser;
