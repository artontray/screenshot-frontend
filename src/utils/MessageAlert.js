import React, { useEffect, useState } from 'react';
import appStyles from "../App.module.css";

const MessageAlert = ({ variant, children }) => {

  const [alert, setAlert] = useState(true);
      
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, []);     
    
  return (

    alert && 
      <div id="MessageAlert" className={`alert alert-${variant} ${appStyles.MessageAlert}`}>{children}</div>
      
  )
}

export default MessageAlert;