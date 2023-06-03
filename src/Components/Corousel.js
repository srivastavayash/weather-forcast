import React from 'react'
import { useState, useEffect } from 'react';
import Card from './Card';
import './Card.css'
const Corousel = (props) => {
  const [forcast, setForcast] = useState([]);
  // const [list,setList]=useState(null);
  const [time, setTime] = useState(null);
  // const [standard, setStandard] = useState(null);
  const [arrdt,SetArrdt]=useState([]);
  // const[arr,setArr]=useState([]);
  const name = props.data;
  // console.log(name);
  let cont = document.querySelector('.Cards-container');
  // console.log(cont);
  const prevbtnhandler = () => {
    let width = cont.clientWidth;
    cont.scrollLeft = cont.scrollLeft - width;
  }
  const nextbtnhandler = () => {
    let width = cont.clientWidth;
    cont.scrollLeft = cont.scrollLeft + width;
  }
  useEffect(() => {
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
      let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api}`;
      try {
        let res = await fetch(url);
        let data = await res.json();
        // console.log("data", data); 
        setForcast(data.list);
        setTime(data.list[0].dt_txt.slice(11, 19));
        SetArrdt(forcast.map((obj)=>{return obj.dt_txt.slice(11,19)}));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [name,time])
  // console.log(arr);
  // console.log(standard);

  console.log(forcast);
  console.log(arrdt);
  return (
    <div className='Courousel-container'>
      <button className='prev' onClick={prevbtnhandler}><p>&lt;</p></button>
      <button className='next' onClick={nextbtnhandler}><p>&gt;</p></button>
      <div className='Cards-container'>
        <Card key='1' cardno='1' data={arrdt[0]}  />
        <Card key='2' cardno='2' data={arrdt[1]} />
        <Card key='3' cardno='3' data={arrdt[2]} />
        <Card key='4' cardno='4' data={arrdt[3]} />
        <Card key='5' cardno='5' data={arrdt[4]} />
        <Card key='6' cardno='6' data={arrdt[5]} />
        <Card key='7' cardno='7' data={arrdt[6]} />
        <Card key='8' cardno='7' data={arrdt[7]} />
      </div>
    </div>
  )
}

export default Corousel;