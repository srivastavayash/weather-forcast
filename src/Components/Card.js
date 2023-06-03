import React from 'react'
import { useState, useEffect } from 'react';
import './Card.css'
const Card = (props) => {
  const std = props.data;
  let [val, setVal] = useState(null);
  useEffect(() => {
    const fun = async () => {

      if (std[0] === "0") {
        setVal("AM");
      }
      else {
        setVal("PM");
      }
    };
    fun();
  }, [std])

  return (
    <div className='single-card'><h3>{props.data} {val} </h3>
    </div>
  )
}

export default Card