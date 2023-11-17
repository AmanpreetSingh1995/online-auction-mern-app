import React from 'react';
import logo from "../../assets/images/logo.png";
import  "./Navigation.css" ;

export default function 
() {
  return (
    <>
<div className='Navigation-container'>
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
    </>
  )
}
