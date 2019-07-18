import React from 'react';
import './loading.styles.css';

const Loading = (props) => {
  return (
    <div className="wrapper">
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default Loading;
