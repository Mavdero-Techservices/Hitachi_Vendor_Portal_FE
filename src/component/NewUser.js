import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewUser.css";
import template from "../img/newuser.png";
import Logo from "../img/logo.png";

const NewUser = () => {
  const navigate = useNavigate();

  const onYesButtonClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onNoButtonClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <div className="new-user-div">
      <img className="template" alt="" src={template} />
      <div className="form" />
      <button className="yes-button" onClick={onYesButtonClick} />
      <div className="yes-div">Yes</div>
      <button className="no-button" onClick={onNoButtonClick}>
        <div className="noButton" />
        <div className="no-div">No</div>
      </button>
      <div className="already-registered-with-hsi">
        Already Registered with HSI ?
      </div>
      <img className="hitachi-logo-icon" alt="" src={Logo} />
    </div>
  );
};

export default NewUser;
