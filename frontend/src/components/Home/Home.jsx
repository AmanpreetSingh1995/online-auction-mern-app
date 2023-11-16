import React from 'react';
import "./Home.css" ;
import logo from "../../assets/images/logo.png";

export default function Home() {
  return (
    <div >
      <div className='cont'>
          <div className="nav">
            <nav>
              <div className='logo'>
                <img src={logo} alt="" />
              </div>
              <div>
                <span>My Biddings</span>
              </div>
              <div>
                <span>Auction Products</span>
              </div>
              <div>
                <span>My Products</span>
              </div>
              <div>
                <span>Add Product</span>
              </div>
            </nav>
          </div>
      </div>
    </div>
  )
}
