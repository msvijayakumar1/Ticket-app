import { Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../constant'
import { DataState } from '../context/Provider'

const BookingTicket = () => {
  const toast = useToast();
  const [total,setTotal] = useState();
  const [convenFee,SetconvenFee] = useState();
  const [subtotal,Setsubtotal] = useState();
  const [tdate,setDate]=useState();
  const [pop,setPop]=useState(false)
  const {user,selectedMovie,cinemas,setCinemas,location, seats,setSeats,row,setRow,setMovietime,movieTime}=DataState();
  console.log(user);

  
  const seatsfun =(newseat)=>{
  if(newseat){
    if(seats.includes(newseat)){
      toast({
        title:`Seat No: ${newseat} was already Selected`,
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    }else{
      seats.push(newseat)
    setSeats([...seats])
    setTotal(seats.length*220)
    SetconvenFee(seats.length*30)
    Setsubtotal(seats.length*220+seats.length*30)
    }
   
 
  }
}
 const sendTicket=async()=>{
   console.log(user);
   let email = user.email;
   let movieName=selectedMovie.movieName;
   let pic= selectedMovie.poster;
   let date= tdate;
   let time = movieTime;
   let cinema=cinemas;
   let place=location;
   let seat = seats;
   let srow = row;
   if(!date && !time){
    toast({
      title:"Select data and Movie time",
      status:"warning",
      duration:3000,
      isClosable:true,
      position:"top"
  });
   }else if(!cinema){
    toast({
      title:"Select Cinema to Book Tickets",
      status:"warning",
      duration:3000,
      isClosable:true,
      position:"top"
  });
   }else if(!cinema){
    toast({
      title:"Select Cinema to Book Tickets",
      status:"warning",
      duration:3000,
      isClosable:true,
      position:"top"
  });
   }else if(!srow){
    toast({
      title:"Select row and seats",
      status:"warning",
      duration:3000,
      isClosable:true,
      position:"top"
  });
   }else if(seats<=0){
    toast({
      title:"Select seats",
      status:"warning",
      duration:3000,
      isClosable:true,
      position:"top"
  });
   }
   else{
    try {
      const config = {
        headers:{"Content-type":"application/json",},
      }
      const {data} = await axios.post(`${BASE_URL}postticket`,{email,movieName,pic,date,time,cinema,place,seat,srow},config);
      console.log(data);
      setPop(true);
      setSeats([]);
      setDate();
      Setsubtotal();
      SetconvenFee();
      setTotal();
      setCinemas();
      setRow();
      setDate();
    } catch (error) {
      
    }
   }


  
 }



  return<>
  
  
  <div className='booking-page'>
  <div  className="back">
   <Link to="/home">
 <Button bg="#1cb61c" color="white" 
           _hover={{
             background:"#50ce50",
             color:"white",
           }}
    >back</Button>
  </Link>
 </div>
   <div className='booking-head'>
     <div className='movie-booking-del'>
       <div className='part-1'><h1>{selectedMovie.movieName}</h1> &nbsp; {selectedMovie.type}</div>
       <div><span className='heart'><i class="fa-solid fa-heart"></i>&nbsp;85%</span>
       <div className='duration'>
       <i class="fa-solid fa-clock-rotate-left"></i>&nbsp;
         {selectedMovie.duration}&nbsp;.&nbsp;{selectedMovie.categori}</div>
       </div>
     </div>
     <div className='getbooking-data'>

       <label>Cinemas :</label>&nbsp;
       <select onChange={(e)=>setCinemas(e.target.value)}>
         <option>Select Cinema</option>
         <option>INOX</option>
         <option>PVR</option>
         <option>Cinepolis</option>
         <option>AGS</option>
         <option>Luxe</option>
       </select> &nbsp;
       <label>Date :</label>&nbsp;
       <input type="date" onChange={(e)=>setDate(e.target.value)} className='pl-4' />&nbsp;
       <label>Movie time :</label>&nbsp;
       <select onChange={(e)=>setMovietime(e.target.value)}>
       <option>Select Movie Time</option>
         <option>9:00 AM</option>
         <option>12:30 PM</option>
         <option>4:00 PM</option>
         <option>7:00 PM</option>
         <option>10:00 PM</option>
       </select>
     </div>
     
   </div>
   <div className='booking-info'>
     <ul>
       <li>
         <div className='seat'></div>
         <small>Available</small>
       </li>
       <li>
         <div className='seat sold'></div>
         <small>Sold</small>
       </li>
     </ul>
   </div>
   <div className='seat-booking'>
     <label> Select Row:</label>&nbsp;
       <select onChange={(e)=>setRow(e.target.value)}>
       <option>Select row</option>
         <option>A</option>
         <option>B</option>
         <option>C</option>
         <option>D</option>
         <option>E</option>
         <option>F</option>
       </select> &nbsp;
       <label>Seat No:</label>&nbsp;
       <select onChange={(e)=>seatsfun(e.target.value)}>
       <option>Select Seat No</option>
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
         <option>6</option>
         <option>7</option>
         <option>8</option>
       </select>
     </div>
   
     <div className='main'>
     <div className="container">
    
      <div className="screen"></div>

      <div className="row">
        <div className='seat r'>F</div>
        <div className="seat">1</div>
        <div className="seat">2</div>
        <div className="seat">3</div>
        <div className="seat">4</div>
        <div className="seat">5</div>
        <div className="seat">6</div>
        <div className="seat">7</div>
        <div className="seat">8</div>
      </div>
      <div className="row">
      <div className='seat r'>E</div>
        <div className="seat">1</div>
        <div className="seat">2</div>
        <div className="seat">3</div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
        <div className="seat">6</div>
        <div className="seat">7</div>
        <div className="seat">8</div>
      </div>
      <div class="row">
      <div className='seat r'>D</div>
        <div className="seat">1</div>
        <div className="seat">2</div>
        <div className="seat">3</div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
      </div>
      <div className="row">
      <div className='seat r'>C</div>
        <div className="seat">1</div>
        <div className="seat">2</div>
        <div className="seat">3</div>
        <div className="seat">4</div>
        <div className="seat">5</div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
      </div>
      <div className="row">
      <div className='seat r'>B</div>
        <div className="seat">1</div>
        <div className="seat">2</div>
        <div className="seat">3</div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
        <div className="seat">6</div>
        <div className="seat">7</div>
        <div className="seat">8</div>
      </div>
      <div className="row">
      <div className='seat r'>A</div>
        <div className="seat">1</div>
        <div className="seat">2</div>
        <div className="seat">3</div>
        <div className="seat">4</div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
        <div className="seat occupied"></div>
        <div className="seat">5</div>
      </div>
      <br></br>
      <div>2D ELITE-Rs. 220.78</div>
    </div>
     <div className='summary-card'>
       <p>Booking Summary</p>
       <div className='seat-info'>
         <table>
           <tr>
             <td>
             <p>ELITE - {
           seats.map((e,i)=>{
             return <span key={i} className="text-muted">{row+e},</span>
           })
         }<span>({seats.length} Tickects)</span>
         
         </p>
         <p className='badge bg-primary mt-2'>Screen 1</p>
             </td>
             <td className='al-1'>
               Rs.{total}
             </td>
           </tr><br></br>
           <tr>
             <td ><p> Convenience fees</p></td>
             <td className='al-1'>
               Rs.{convenFee}
             </td>
           </tr>
           <br></br>
           <tr>
             <td><hr></hr></td>
             <td><hr></hr></td>
           </tr>
           <tr>
             <td><h2>Sub total</h2></td>
             <td className='al-1'>
               Rs.{subtotal}
             </td>
           </tr>
         </table>
         
         <div className='bs-1'>
        <button className='btn btn-primary' onClick={()=>sendTicket()}><i className="fa-solid fa-ticket"></i> &nbsp;Book Tickects</button>
         </div>
       </div>
     </div>
     </div>
     <div className={pop?'booking-succ-pop':"disable"}>
       <h1>Ticket Booked Successfully</h1>
       <Link to="/tickets"><button className='btn btn-primary'>View Tickects</button></Link>
     </div>
   </div>
  
  </>
}
export default BookingTicket;
