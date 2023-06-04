import React from 'react'
import { useState, useEffect } from 'react';
import Card from './Card';
import './Card.css'
const Corousel = (props) => {
  const [forcast, setForcast] = useState([]);
  // const [list,setList]=useState(null);
  const [time, setTime] = useState(null);
  // const [standard, setStandard] = useState(null);
  const [arrdt, SetArrdt] = useState([]);
  const [temp,setTemp]=useState([]);
  const[desc,setDesc]=useState([]);
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
        SetArrdt(forcast.map((obj) => { return obj.dt_txt.slice(11, 19) }));
        setTemp(forcast.map((obj) => { return obj.main.feels_like }));
        setDesc(forcast.map((obj) => { return obj.weather[0].description }));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [name, time])
  // console.log(arr);
  // console.log(standard);

  console.log(forcast);
  console.log(arrdt);
  console.log(temp);
  console.log(desc);
  return (
    <div className='Courousel-container'>
      <button className='prev' onClick={prevbtnhandler}><p>&lt;</p></button>
      <button className='next' onClick={nextbtnhandler}><p>&gt;</p></button>
      <div className='Cards-container'>
        <Card key='1' cardno='1' data={arrdt[0]} temp={temp[0]} desc={desc[0]} />
        <Card key='2' cardno='2' data={arrdt[1]} temp={temp[1]}  desc={desc[1]}/>
        <Card key='3' cardno='3' data={arrdt[2]} temp={temp[2]}  desc={desc[2]}/>
        <Card key='4' cardno='4' data={arrdt[3]} temp={temp[3]}  desc={desc[3]}/>
        <Card key='5' cardno='5' data={arrdt[4]} temp={temp[4]}  desc={desc[4]}/>
        <Card key='6' cardno='6' data={arrdt[5]} temp={temp[5]}  desc={desc[5]}/>
        <Card key='7' cardno='7' data={arrdt[6]} temp={temp[6]}  desc={desc[6]}/>
        <Card key='8' cardno='7' data={arrdt[7]} temp={temp[7]}  desc={desc[7]}/>
      </div>
    </div>
  )
}

export default Corousel;