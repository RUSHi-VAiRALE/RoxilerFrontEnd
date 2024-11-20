import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from './BarChart';
import PieChart from './PieChart';
import { Pie } from 'recharts';




const creatIns = (contact) =>{
  return(
        <tr>
          <td>{contact.id}</td>
          <td>{contact.title}</td>
          <td>{contact.price}</td>
          <td>{contact.description}</td>
          <td>{contact.category}</td>
          <td><img style={{
      height:"20px",
      width:"20px"
    }} src={contact.image}/></td>
          <td>{String(contact.sold)}</td>
          <td>{contact.dateOfSale}</td>
        </tr>
  )
}

const createOption = (item) =>{
  return(
    <option id="optId" value={Number(item)}>{item}</option>
  )
}

const createMon = (item,num)=>{
  num = num + 1;
  return(
    <option value={num}>{item}</option>
  )
}

function App() {
  let num = 0;
  const [arr,setarr] = useState([]);
  const [data,setData] = useState([]);
  const [mon,setMon] = useState("March")
  const [pieData,setPieData] = useState([]);
  const [pageno,setpageno] = useState(Number(1));
  const [totalSale,setTotalSale] = useState(1);
  const [soldItem,setsoldItem] = useState(1);
  const [notSoldItem,setnotSoldItem] = useState(1);
  const [searchText,setSearchText] = useState("");
  const pageArr = [1,2,3,4,5,6]
  const monArr = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  useEffect(()=>{
    // fetch("http://localhost:5000/inDb")
    // .then(res => res.json())
    // .then(data=>setarr(data))
    // .catch(err => console.log(err))

    (async () =>{
      const res = await axios.get("http://localhost:5000/getByMonth/"+Number(3))
      setarr(res.data.products)
      console.log(res.data.products)
      setTotalSale(res.data.totSale)
      setsoldItem(res.data.soItem)
      setnotSoldItem(res.data.notSItem)
      setpageno(Number(1));
      setMon(monArr[Number(3)-1])

      try {
      const res1 = await axios.get("http://localhost:5000/getBarChart/"+Number(3))
      console.log(res1)
      setData(res1.data)
    } catch (error) {
      console.log(error)
    }
    try {
      const res2 = await axios.get("http://localhost:5000/getPieChart/"+Number(3))
      console.log(res2)
      setPieData(res2.data)
    } catch (error) {
      console.log(error)
    }

    })();

    // const res = axios.get("http://localhost:5000/getByMonth/"+Number(3))
    //   setarr(res.data.products)
    //   console.log(res.data.products)
    //   setTotalSale(res.data.totSale)
    //   setsoldItem(res.data.soItem)
    //   setnotSoldItem(res.data.notSItem)
    //   setpageno(Number(1));
    //   setMon(monArr[Number(3)-1])
    // console.log(arr)
  },[])

  // async function postData(){
  //   const data = {
  //     pro : arr1
  //   }
  //   console.log(arr1)
  //   try {
  //     const res = await axios.post("http://localhost:5000/inDb",data)
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleChange = (e) =>{
    fetch("http://localhost:5000/inDb")
    .then(res => res.json())
    .then(data=>setarr(data))
    .catch(err => console.log(err))
    setpageno(e.target.value)
  }
  
  async function handleMon(e){
    try {
      const res = await axios.get("http://localhost:5000/getByMonth/"+e.target.value)
      setarr(res.data.products)
      console.log(res.data.products)
      setTotalSale(res.data.totSale)
      setsoldItem(res.data.soItem)
      setnotSoldItem(res.data.notSItem)
      setpageno(Number(1));
      setMon(monArr[Number(e.target.value)-1])
    } catch (error) {
      console.log(error)
    }
    try {
      const res1 = await axios.get("http://localhost:5000/getBarChart/"+e.target.value)
      console.log(res1)
      setData(res1.data)
    } catch (error) {
      console.log(error)
    }
    try {
      const res2 = await axios.get("http://localhost:5000/getPieChart/"+e.target.value)
      console.log(res2)
      setPieData(res2.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () =>{
    fetch("http://localhost:5000/inDb")
    .then(res => res.json())
    .then(data=>setarr(data))
    .catch(err => console.log(err))
    if((pageno>=1) && (pageno<6)){
      let o = Number(pageno) +Number(1)
      setpageno(Number(o))
    }

  }

  const handleClick1 = () =>{
    fetch("http://localhost:5000/inDb")
    .then(res => res.json())
    .then(data=>setarr(data))
    .catch(err => console.log(err))
    if((pageno !== 1) && (pageno <= 6)){
      let a= Number(pageno) - Number(1)
      setpageno(a)
    }
  }

  const handleInput = (e) =>{
    console.log(e.target.value)
    setSearchText(e.target.value);
    console.log("DATA"+searchText)
  }

  async function handleSearch(){
    // console.log(searchText)
    if (searchText !== "") {
      const res = await axios.get("http://localhost:5000/getSearchResult/"+searchText)
      setarr(res.data)
    }
  }

  const limit = 10;
  let startInd = ((pageno - 1) * limit)
  let endInd = (pageno * limit)

  return (
    <div className='div1'>

    <div className='div2'>
      <div style={{display:"flex"}}>
      <input onChange={handleInput} class="form-control"  type='search' placeholder='Search transaction'/>
      <button onClick={handleSearch} style={{width:"150px",marginLeft:"10px"}} type="button" class="btn btn-dark">Search</button>
    </div>

    <div style={{display:"inline-block"}}>
      <select class="form-select" onChange={handleMon} name='Select Month'>
      <option value={3} selected>March</option>
        {
          monArr.map(createMon)
        }
      </select>
    </div>
    </div>

    <div style={{
      width:"100%",
      height:"auto",
      margin:"auto",
      overflow:"scroll"
    }}>
      <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Id</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Description</th>
          <th scope='col'>Category</th>
          <th scope='col'>Image</th>
          <th scope='col'>Sold</th>
          <th scope='col'>Date Of Sale</th>
        </tr>
      </thead>
      <tbody>
        {
          arr.slice(startInd,endInd).map(creatIns)
        }
      </tbody>
      </table>
    </div>


    <div className='navButton'>
      <div style={{
        width:"50%"
      }}>
        <label>
          Page No : {pageno}
        </label>
        <select style={{width:"100px"}} class="form-select" onChange={handleChange}>
          {
            pageArr.map(createOption)
          }
        </select>
      </div>
      <div style={{
        width:"50%",
        padding:"3px",
        marginLeft:"600px"
      }}>
        <button class="btn btn-dark btn-sm" onClick={handleClick1} style={{
          display:"inline-block",
          width:"100px"
        }}>Prev</button>
        <h3 style={{
          display:"inline-block"
        }}> - </h3>
        <button class="btn btn-dark btn-sm" onClick={handleClick} style={{
          display:"inline-block",
          width:"100px"
        }}>Next</button>
      </div>


    </div>
    <div className='div3'>
      <h3>Statistics - {mon}</h3>
      <p>(Selected month name from dropdown)</p>
      <div  style={{margin:"auto",
      width:"200px",
      height:"auto"}}>
      <h6>Total Sale : {totalSale}</h6>
      <h6>Sold Items : {soldItem}</h6>
      <h6>Not Sold Items : {notSoldItem}</h6>
      </div>
    </div>


    <div style={{
      width:"80%",
      margin:"auto",
      padding:"10px"}}>
      <h1>Bar ChartStats - {mon}</h1>
      <p>(Selected month name from dropdown)</p>
      <Chart data={data}/>
    </div>
    
    <div style={{
      width:"80%",
      height:"400px",
      margin:"auto",
      padding:"10px"}}>
      <h1>Pie ChartStats - {mon}</h1>
      <p>(Selected month name from dropdown)</p>
      <PieChart data={pieData}/>
    </div>
    </div>
  );
}

export default App;
