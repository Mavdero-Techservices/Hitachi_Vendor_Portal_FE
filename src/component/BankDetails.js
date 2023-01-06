import "../css/BankDetails.css";
import Navbar1 from "../common/navbar.js";

const BankDetails = () => {
  return (
    <div className="bank-details">
      <Navbar1 />
      <div className="frame-div">
        <div className="innerbox-with-name">
          <div className="upper-box-name">
            <div className="upload-files">Bank details</div>
            <div className="upper-box">
              <div className="bank-details-upper-row">
                <div className="bank-ac-name">
                  <div className="micr-code-swift-code">Bank A/C name*</div>
                  <input className="rectangle-input" type="text" />
                </div>
                <div className="bank-ac-name">
                  <div className="micr-code-swift-code">Bank name*</div>
                  <input className="rectangle-input1" type="text" />
                </div>
                <div className="bank-ac-name">
                  <div className="micr-code-swift-code">Bank A/C no*</div>
                  <input className="rectangle-input" type="text" />
                </div>
              </div>
              <div className="bank-details-upper-row">
                <div className="bank-ac-name">
                  <div className="micr-code-swift-code">IFSC code*</div>
                  <input className="rectangle-input1" type="text" />
                </div>
                <div className="bank-ac-name">
                  <div className="micr-code-swift-code">
                    MICR code/ Swift code
                  </div>
                  <input className="rectangle-input" type="text" />
                </div>
                <div className="bank-ac-name">
                  <div className="micr-code-swift-code">Branch address*</div>
                  <input className="rectangle-input1" type="text" />
                </div>
              </div>
            </div>
            <div className="payment-will-be-processed-base">
              **Payment will be processed based on the mentioned detail only,
              HISYS will not be responsible for the wrong detail hence bank
              detail should be entered carefully.
            </div>
          </div>
          <div className="lower-box-name">
            <div className="upload-files">Upload files</div>
            <div className="upload-your-files-here-for-ver">
              Upload your files here for verification.
            </div>
            <div className="lower-box">
              <div className="micr-code-swift-code">
                Copy of cancel Cheque/Bank detail duly certified from bank*
              </div>
              <div className="upload-section">
                <input className="select-or-drag-file" type="file" required />
                <button className="upload-file">
                  <div className="upload-files1">Upload files</div>
                </button>
                <div className="micr-code-swift-code">No file chosen</div>
              </div>
            </div>
          </div>
        </div>
        <div className="decision-buttons">
          <button className="cancel-button">
            <div className="cancel">Cancel</div>
          </button>
          <button className="cancel-button">
            <div className="cancel">Submit</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
