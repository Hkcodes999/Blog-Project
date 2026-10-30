import React from 'react';
import logoblue from '../../assets/logo-blue.png'
import { Link } from 'react-router-dom';

const Logo = ({width="300px"}) => {
    return (
      <div>
        <Link to={"/"}>
          <img src={logoblue} alt="" style={{ width }} />
        </Link>
      </div>
    );
}

export default Logo;
