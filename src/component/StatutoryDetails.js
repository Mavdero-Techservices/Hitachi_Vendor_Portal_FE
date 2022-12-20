import "../css/StatutoryDetails.css";
import information from "../img/information.jpg";
import Navbar1 from "../common/navbar.js";

const StatutoryDetails = () => {
  return (
    <div className="statutory-details">
      <Navbar1 />
      <h2 className="statutory-details-name">Statutory details</h2>
      <div className="statutory-box">
        <div className="inner-box-with-name">
          <form className="inner-box">
            <div className="staframe-div">
              <div className="msme-status-box">
                <div className="msme-radio-button">
                  <label className="msme-status-name">MSME status*</label>
                  <div className="radio-buttons">
                    <div className="registered-radio">
                      <div className="button-space">
                        <input className="button" type="radio" required />
                      </div>
                      <div className="registered">
                        <div className="unregistered">Registered</div>
                      </div>
                    </div>
                    <div className="registered-radio">
                      <div className="button-space">
                        <input className="button" type="radio" required />
                      </div>
                      <div className="registered">
                        <div className="unregistered">Unregistered</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="msme-no">
                  <div className="msme-no1">MSME no*</div>
                </div>
                <div className="tax-box">
                  <input className="statutory-input" type="text" required />
                  <img className="img" src={information} alt="" />
                </div>
                <label className="msme-status-name">MSME type*</label>
                <div className="msme-no">
                  <div className="radio-buttons">
                    <div className="registered-radio">
                      <div className="button-space">
                        <input className="button" type="radio" required />
                      </div>
                      <div className="registered">
                        <div className="unregistered">Micro</div>
                      </div>
                    </div>
                    <div className="registered-radio">
                      <div className="button-space">
                        <input className="button" type="radio" required />
                      </div>
                      <div className="registered">
                        <div className="unregistered">Small</div>
                      </div>
                    </div>
                    <div className="registered-radio">
                      <div className="button-space">
                        <input className="button" type="radio" required />
                      </div>
                      <div className="registered">
                        <div className="unregistered">Macro</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tan-no">
                  <div className="tan-box">
                    <div className="msme-no1">TAN no*</div>
                    <div className="tax-box">
                      <input
                        className="statutory-input"
                        type="text"
                        maxLength={10}
                        minLength={10}
                        required
                      />
                      <img className="img" src={information} alt="" />
                    </div>
                  </div>
                  <div className="upload-tan-box">
                    <label for="fileupload">Upload TAN</label>
                    <input type="file" required />
                  </div>
                </div>
                <div className="tax-residency-certificate">
                  <div className="tax-residency-certi-box">
                    <div className="msme-no1">Tax Residency Certificate*</div>
                    <div className="tax-box">
                      <input className="statutory-input" type="text" />
                    </div>
                  </div>
                  <div className="frame-input">
                    <label for="fileupload">Upload TRC</label>
                    <input type="file" required />
                  </div>
                </div>
              </div>
              <div className="msme-box">
                <div className="frame-input">
                  <label for="fileupload">Upload MSME</label>
                  <input type="file" required />
                </div>
              </div>
              <div className="vendor-gst-type-box">
                <div className="msme-radio-button">
                  <label className="msme-status-name">Vendor GST type*</label>
                  <div className="radio-buttons">
                    <div className="registered-radio">
                      <div className="button-space">
                        <input className="button" type="radio" />
                      </div>
                      <div className="registered">
                        <pre className="registered2">Registered</pre>
                      </div>
                    </div>
                    <div className="registered-radio">
                      <div className="button-space">
                        <input className="button" type="radio" />
                      </div>
                      <div className="registered">
                        <div className="unregistered">Unregistered</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tax-residency-certificate">
                  <div className="tax-residency-certi-box">
                    <div className="msme-no1">GST no*</div>
                    <div className="tax-box">
                      <input
                        className="statutory-input"
                        type="text"
                        maxLength={15}
                        minLength={15}
                        required
                      />
                      <img className="img" src={information} alt="" />
                    </div>
                  </div>
                  <div className="frame-input">
                    <label for="fileupload">Upload GST</label>
                    <input type="file" id="fileupload" required />
                  </div>
                </div>
                <div className="tax-residency-certificate">
                  <div className="tax-residency-certi-box">
                    <div className="msme-no1">PAN no*</div>
                    <div className="tax-box">
                      <input
                        className="statutory-input"
                        type="text"
                        maxLength={10}
                        minLength={10}
                        required
                      />
                      <img className="img" src={information} alt="" />
                    </div>
                  </div>
                  <div className="frame-input">
                    <label for="fileupload">Upload PAN</label>
                    <input type="file" required />
                  </div>
                </div>
                <div className="tax-residency-certi-box">
                  <div className="msme-no1">CIN no*</div>
                  <div className="tax-box">
                    <input
                      className="statutory-input"
                      type="text"
                      maxLength={21}
                      minLength={21}
                      required
                    />
                    <img className="img" src={information} alt="" />
                  </div>
                </div>
                <div className="tan-no">
                  <div className="tan-box">
                    <div className="msme-no1">Form 10F*</div>
                    <div className="tax-box">
                      <input className="statutory-input" type="text" required />
                    </div>
                  </div>

                  <div className="frame-input2">
                    <label for="fileupload">Upload Form 10F</label>
                    <input type="file" required />
                  </div>
                </div>
                <div className="tax-residency-certificate">
                  <div className="tax-residency-certi-box">
                    <div className="msme-no1">No PE declaration*</div>
                    <input className="rectangle-input5" type="text" required />
                  </div>
                  <div className="frame-input">
                    <label for="fileupload">Upload NPD</label>
                    <input type="file" required />
                  </div>
                </div>
              </div>
              <blockquote className="note-if-the-vendor-is-not-reg">
                <p className="note-if-the">
                  NOTE: If the vendor is not registered with the above
                  compliance, they can mention it as “Non-Registered” in that
                  column and they will upload the discloser for the same on the
                  document upload option.
                </p>
              </blockquote>
            </div>
          </form>
        </div>
      </div>
      <div className="decision-buttons">
        <button className="cancel-button">
          <div className="cancel">Cancel</div>
        </button>
        <button className="cancel-button">
          <div className="cancel">Save</div>
        </button>
        <button className="cancel-button">
          <div className="cancel">Next</div>
        </button>
      </div>
    </div>
  );
};

export default StatutoryDetails;
