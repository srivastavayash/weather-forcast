import React from 'react'
import Card from './Card';
import './Card.css'
const Corousel = (props) => {
    const name=props.data;
    console.log(name);
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
    const getData = async () => {
        const api = process.env.REACT_APP_API_KEY;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api}`;
        try {
          let res = await fetch(url);
          let data = await res.json();
          let lat = data.coord.lat;
          let lon = data.coord.lon;
          getDatafor7days(lat, lon);
        } catch (error) {
          console.log(error);
        }
      };
      const getDatafor7days = async (lat, lon) => {
        const api = process.env.REACT_APP_API_KEY;
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`;
        try {
          let res = await fetch(url);
          let data = await res.json();
          console.log("data", data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
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