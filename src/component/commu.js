import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/commu.css";

import Navbar1 from "../common/navbar.js";

const VendorDetail2 = () => {
  const navigate = useNavigate();

  const onNextClick = useCallback(() => {
    navigate("/statutory");
  }, [navigate]);

  return (
    <div className="vendor-detail-2">
      <Navbar1 />
      <div className="communication-details">
        <div className="comframe-div">
          <div className="comframe-div">
            <label className="communication-details2">
              Communication details
            </label>
          </div>
        </div>
      </div>
      <form className="communform">
        <label className="finance-spoc">Finance Spoc</label>
        <div className="finace-spoc">
          <div className="finance-spoc1">
            <label className="contact-name">Contact name*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="comframe-div1">
            <label className="contact-name">Designation*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Phone no*</label>
            <input className="contact-input" type="tel" required />
          </div>
          <div className="finance-spoc1">
            <div className="email">Email*</div>
            <input className="email-input" type="email" />
          </div>
        </div>
        <label className="finance-spoc">Operation Spoc</label>
        <div className="operation-spoc1">
          <div className="finance-spoc1">
            <label className="contact-name">Contact name*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Designation*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Phone no*</label>
            <input className="contact-input" type="tel" required />
          </div>
          <div className="finance-spoc1">
            <div className="email1">email*</div>
            <input className="email-input1" type="email" />
          </div>
        </div>
        <label className="finance-spoc">Collection Spoc</label>
        <div className="finace-spoc">
          <div className="finance-spoc1">
            <label className="contact-name">Contact name*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Designation*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Phone no*</label>
            <input className="contact-input" type="tel" required />
          </div>
          <div className="finance-spoc1">
            <div className="email">Email*</div>
            <input className="email-input1" type="email" />
          </div>
        </div>
        <label className="finance-spoc">Management Spoc</label>
        <div className="finace-spoc">
          <div className="finance-spoc1">
            <label className="contact-name">Contact name*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Designation*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Phone no*</label>
            <input className="contact-input" type="tel" required />
          </div>
          <div className="finance-spoc1">
            <div className="email">Email*</div>
            <input className="communemail-input3" type="email" />
          </div>
        </div>
        <label className="finance-spoc">Others</label>
        <div className="finace-spoc">
          <div className="finance-spoc1">
            <label className="contact-name">Contact name*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Designation*</label>
            <input className="contact-input" type="text" required />
          </div>
          <div className="finance-spoc1">
            <label className="contact-name">Phone no*</label>
            <input className="contact-input" type="tel" required />
          </div>
          <div className="finance-spoc1">
            <div className="email">Email*</div>
            <input className="email-input4" type="email" />
          </div>
        </div>
      </form>
      <div className="combuttons">
        <button className="comcancel">
          <div className="comcancel1">Cancel</div>
        </button>
        <button className="comcancel">
          <div className="comcancel1">Save</div>
        </button>
        <button className="comcancel" onClick={onNextClick}>
          <div className="comcancel1">Next</div>
        </button>
      </div>
    </div>
  );
};

export default VendorDetail2;
