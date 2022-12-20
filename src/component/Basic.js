import "../css/Basic.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import uploa from "../img/upload.png";
import Navbar1 from "../common/navbar.js";

const Basic = () => {
  const navigate = useNavigate();

  const onNextButtonClick = useCallback(() => {
    navigate("/commu");
  }, [navigate]);

  return (
    <div className="vendor-det">
      <Navbar1 />
      <div className="form-div">
        <div className="label-div1">
          <label className="country-label">Company Name*</label>
          <input className="company-input" type="text" required />
        </div>
        <div className="label-div1">
          <label className="country-label">Address line - 1*</label>
          <input className="address1-input" type="text" required />
        </div>

        <div className="label-div1">
          <label className="country-label">Address line - 2</label>
          <input className="address2-input1" type="text" required />
        </div>
        <div class="image-upload">
          <label for="file-input">
            <img src={uploa} alt="" />
          </label>

          <input id="file-input" type="file" />
        </div>

        <div className="frame-div3">
          <div className="label-div1">
            <label className="country-label">Country*</label>
            <select className="cousta-input2">
              <option value="">Select a Country</option>
            </select>
          </div>
          <div className="label-div1">
            <label className="country-label">State*</label>
            <select className="cousta-input2">
              <option value=""> Select a State</option>
            </select>
          </div>
        </div>
        <div className="frame-div3">
          <div className="label-div1">
            <label className="country-label">City*</label>
            <select className="cousta-input2">
              <option value="">Select a City</option>
            </select>
          </div>
          <div className="label-div1">
            <label className="country-label">Pincode*</label>
            <input className="cousta-input2" type="text" required />
          </div>
        </div>
      </div>
      <div className="basicinformation-div9">
        <label className="basic-information-label">Basic information</label>
      </div>
      <div className="button-div10">
        <div className="buttonrow-div11">
          <button className="buttonstyle" value="cancel">
            <div className="cancel-div">Cancel</div>
          </button>
          <button className="buttonstyle" value="save">
            <div className="cancel-div">Save</div>
          </button>
          <button
            className="buttonstyle"
            value="next"
            onClick={onNextButtonClick}
          >
            <div className="cancel-div">Next</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basic;
