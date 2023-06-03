import React from 'react'
import './Card.css'
const Card = (props) => {
  return (
    <div className='single-card'><h3>{props.data} {props.std}</h3>
    </div>
  )
}

export default Card