import React from 'react'
import Card from './Card';
import './Card.css'
const Corousel = () => {
    
    let cont = document.querySelector('.Cards-container');
    console.log(cont);
    const prevbtnhandler = () => {
        let width = cont.clientWidth;
        cont.scrollLeft = cont.scrollLeft - width;
    }
    const nextbtnhandler = () => {
        let width = cont.clientWidth;
        cont.scrollLeft = cont.scrollLeft + width;
    }
    return (
        <div className='Courousel-container'>
            <button className='prev' onClick={prevbtnhandler}><p>&lt;</p></button>
            <button className='next' onClick={nextbtnhandler}><p>&gt;</p></button>
            <div className='Cards-container'>
  <Card key='1' cardno='1' />
  <Card key='2' cardno='2' />
  <Card key='3' cardno='3' />
  <Card key='4' cardno='4' />
  <Card key='5' cardno='5' />
  <Card key='6' cardno='6' />
  <Card key='7' cardno='7' />
</div>
        </div>
    )
}

export default Corousel;