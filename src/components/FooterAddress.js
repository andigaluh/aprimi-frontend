import React from "react"

const FooterAddress = () => {
    return (
      <div className="col-xl-3 col-lg-4 col-sm-6">
        <div className="f-widget-title">
          <h4>Aprimi</h4>
        </div>
        <div className="sigle-address">
          <div className="address-icon">
            <i className="fas fa-home"></i>
          </div>
          <p>
            GoWork Pondok Indah Office Tower, Tower 2, 15th Floor Jl. Sultan
            Iskandar Muda Kavling VTA, Jakarta 12310
          </p>
        </div>
        <div className="sigle-address">
          <div className="address-icon">
            <i className="far fa-envelope-open"></i>
          </div>
          <p>info[at]aprimi.org</p>
        </div>
      </div>
    );
}

export default FooterAddress