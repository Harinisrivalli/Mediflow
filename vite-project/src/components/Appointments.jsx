import { useEffect, useState } from "react";
import Header from "../components/Header.jsx"
import "../css/Appointments.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
function Appointments(){
    const [appointments,setAppointments] = useState([]);
    const [appointmentType, setAppointmentType] = useState("All");
    const [consultationType, setConsultationType] = useState("InPerson");
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState({});
    const [selectedPatient, setSelectedPatient] = useState({});
    const [AppointmentDate,setAppointmentDate] = useState(new Date());
    const Weekday = ["Sunday","Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday"];
    const [selectedslot, setSelectedSlot] = useState("");
    const [total , setTotal] = useState(0);
    const [confirmed , setConfirmed] = useState(0);
    const [booked, setBooked] = useState(0);
    const [cancelled , setCancelled] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [today, setToday] = useState(0);
    const [seldoctorAvailSlot, setseldoctorAvailSlot] = useState([]);
    const [selPatientAvailSlot, setselPatientAvailSlot ] = useState([]);
    var availablityArray = []; 
    function changeMenu(value){
        setAppointmentType(value);
    }

    function changeConsultation(value){
        setConsultationType(value);
    }

    function updateSelectedDoctor(item){
        setSelectedDoctor(item);
    }

    function updateSelectedPatient(item){
        setSelectedPatient(item);
    }

    const [dispForm, setdispForm] = useState(false);
    function dispNewAppointmentForm() {
        setdispForm(true);
    }

    function finddifference(startTime, endTime){
        var diff = 0;
        var start = startTime.split(':');
        var end = endTime.split(':');

        if(Number(end[0]) > Number(start[0]) ||
            (Number(end[0]) === Number(start[0]) && Number(end[1]) >= Number(start[1]))){
            diff = Number(end[0]) - Number(start[0]);
        }
        else{
            diff = 24 - Number(start[0]) + Number(end[0]);
        }

        diff = (diff - 1) * 60 + (60 - Number(start[1])) + Number(end[1]);

        return diff;
    }

    function allocateMinutes(minutes, startTime, endTime){
        var start = startTime.split(':');
        var end = endTime.split(':');
        var time = [];
        var hr = Number(start[0]);

        while(minutes != 0 && minutes >= 60){
            minutes = minutes - 60;

            if(minutes > 0){
                hr = hr + 1;

                if(hr == 24){
                    hr = 0;
                }

                time.push(hr + ":" + start[1]);
            }

            if(minutes == 0){
                hr = hr + 1;
                time.push(hr + ":" + start[1]);
            }
        }

        if(minutes < 60 && minutes > 0){        
            if((60 - start[1]) < minutes){
                hr = hr + 1;

                if(hr == 24){
                    hr = 0;
                }
                time.push(hr + ":" + start[1] + "-" + (hr + 1) + ":" + (minutes - (60 - Number(start[1]))));
            }
        }
        return time;
    }

    async function getDoctors() {
        var onLeave = 0, Available = 0,fullyBooked = 0 , total =0, UnAvailable=0;
        const response = await fetch("https://localhost:7286/api/doctor",{
            method:"GET",
        });
        var resp = await response.json();
        if(response.status == 200){
            setDoctors(resp);
        }
    }

    async function getPatients() {
        try{
            var active = 0, inactive = 0,total = 0,newadmission = 0;
            const response = await fetch("https://localhost:7286/api/Patient");
            const data = await response.json();
            if(data.status.statusCode == 200){
                setPatients(data.data);
            }
            else{
                alert(data.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async function handleSubmit() {
        var requestbody = {
            patientId : selectedPatient.id,
            doctorId : selectedDoctor.id,
            appointmentDate : AppointmentDate,
            consultationType: consultationType,
            selectedSlots: selectedslot,
            reason : document.getElementById("reason").value,
            notes: document.getElementById("notes").value,
            status: 1,
        }
        var response = await fetch("https://localhost:7286/api/appointment",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(requestbody)
        });
        console.log(response);
        if(response.status == 200){
            alert("Appointment Booked");
        }
        else{
            console.log("Booking Failed");
        }
        setdispForm(false);
        getAppointments();
    }
    async function getAppointments() {
        var total = 0, confirmed = 0, booked = 0 , cancelled = 0, today = 0, completed = 0;
        var response = await fetch("https://localhost:7286/api/appointment",{
            method:"GET",
        });
        if(response.status == 200){
            var data = await response.json();
            console.log(data.message);
            data.message.forEach((item) => {
                total++;
                if(item.status == 1){
                    booked++;
                }
                if(item.status == 2){
                    confirmed++;
                }
                else if(item.status == 4){
                    cancelled++;
                }
                else if(item.status == 3){
                    completed++;
                }
                const today = new Date();
                const date = new Date(item.appointmentDate);
                if(today.getFullYear() == date.getFullYear() && 
                    today.getMonth() == date.getMonth() 
                    && today.getDate() == date.getDate())
                {
                    today++;
                }
            });
            setConfirmed(confirmed);
            setCancelled(cancelled);
            setBooked(booked);
            setCompleted(completed);
            setAppointments(data.message);
            setToday(today);
            setTotal(total);
        }
    }

    async function fetchAvailableSlots(date) {
        var avail = [];
        var resp = await fetch("https://localhost:7286/api/appointment/doctor/" + selectedDoctor.id + "?date="+ date);
        if(resp.status == 200){
            console.log(resp.message);
        }
    }

    async function fetchPatientAvailableSlots(date) {
        var avail = [];
        var resp = await fetch("https://localhost:7286/api/appointment/patient/" + selectedPatient.id + "?date="+ date);
        if(resp.status == 200){
            console.log(resp.message);
        }
    }

    async function handleDelete(id) {
        var response = await fetch("https://localhost:7286/api/appointment/" + id,{
            method:"DELETE",
        });
        
    }

    function handleClose(){
        setdispForm(false);
    }

    useEffect(() =>{
        getDoctors();
        getPatients();
        getAppointments();
    },[])
    return(
        <>
            <div>
                <section id="header">
                    <Header title = "Appointments"></Header>
                </section>
                <section id="appointmentmenus">
                    <div id="displayOrder">
                        <ul id="dispMenu">
                            <li onClick={() => {changeMenu("All")} } className={appointmentType === "All" ? "active" : "normal"}>&nbsp;All&nbsp;</li>
                            <li onClick={() => {changeMenu("Today")}} className={appointmentType === "Today" ? "active" : "normal"}>&nbsp;Today&nbsp;</li>
                            <li onClick={() => {changeMenu("Booked")}} className={appointmentType === "Booked" ? "active" : "normal"}>&nbsp;Booked&nbsp;</li>
                            <li onClick={() => {changeMenu("Cancelled")}} className={appointmentType === "Cancelled" ? "active" : "normal"}>&nbsp;Cancelled&nbsp;</li>
                            <li onClick={() => {changeMenu("Completed")}} className={appointmentType === "Completed" ? "active" : "normal"}>&nbsp;Completed&nbsp;</li>
                        </ul>
                    </div>
                    <div id="bookapp" style={{paddingTop:"18px"}}>
                        <button style={{height:"50px", width:"100px", backgroundColor:"rgba(112, 128, 144, 0.468)", color:"rgb(5, 5, 26)", borderRadius:"5px", border:"2px solid slategrey", cursor:"pointer"}}
                        onClick={dispNewAppointmentForm}>
                        + Book Appointment
                        </button>
                    </div>
                </section>
                <section id="dispsubhead">
                    <div className = "slot">
                        <label style={{color:"#00C9A7"}}>Total</label><br/>
                        <span style={{color:"rgba(234, 238, 243, 0.47)", fontSize:"25px"}}>{total}</span>
                    </div>
                    <div className ="slot">
                        <label style={{color:"#00C9A7"}}>Today</label><br/>
                        <span style={{color:"rgba(234, 238, 243, 0.47)", fontSize:"25px"}}>{today}</span>
                    </div>
                    <div className = "slot">
                        <label style={{color:"#00C9A7"}}>Booked</label><br/>
                        <span style={{color:"rgba(234, 238, 243, 0.47)", fontSize:"25px"}}>{booked}</span>
                    </div>
                    <div className = "slot">
                        <label style={{color:"#00C9A7"}}>Cancelled</label><br/>
                        <span style={{color:"rgba(234, 238, 243, 0.47)", fontSize:"25px"}}>{cancelled}</span>
                    </div>
                </section>
                <section>
                    <div id="dispAppointments">
                        <table id="table">
                            <thead>
                                <tr>
                                    <td>Id</td>
                                    <td>Patient</td>
                                    <td>Doctor</td>
                                    <td>Specialization</td>
                                    <td>Date & Time</td>
                                    <td>Status</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                { appointmentType == "All" && appointments.map(item =>{
                                    return (
                                        <tr key= {item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.patient.fullName}</td>
                                            <td>{item.doctor.fullName}</td>
                                            <td>{item.doctor.specialization}</td>
                                            <td>{item.appointmentDate} & {item.selectedSlots}</td>
                                            <td>{item.status == 1 ? "Booked" : item.status == 2 ? "Cancelled" : "Completed"}</td>
                                            <td>
                                                <Link to={`/appointments/${item.id}`} style={{backgroundColor:"transparent", border:"none", textDecoration:"none"}}> 👁️ </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                                { (appointmentType == "Today") && appointments.map(item =>{
                                    const date = new Date(item.appointmentDate);
                                    const today = new Date();
                                    if(today.getFullYear() == date.getFullYear() && 
                                        today.getMonth() == date.getMonth() 
                                        && today.getDate() == date.getDate())
                                    {
                                        <tr key= {item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.patient.fullName}</td>
                                            <td>{item.doctor.fullName}</td>
                                            <td>{item.doctor.specialization}</td>
                                            <td>{item.appointmentDate} & {item.selectedSlots}</td>
                                            <td>Confirmed</td>
                                            <td>
                                                <Link to={`/appointments/${item.id}`} style={{backgroundColor:"transparent", border:"none", textDecoration:"none"}}> 👁️ </Link>
                                            </td>
                                        </tr>
                                    }
                                })}
                                { appointmentType == "Booked" && appointments.map(item =>{
                                    if(item.status == 1){
                                        return <tr key= {item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.patient.fullName}</td>
                                            <td>{item.doctor.fullName}</td>
                                            <td>{item.doctor.specialization}</td>
                                            <td>{item.appointmentDate} & {item.selectedSlots}</td>
                                            <td>Booked</td>
                                            <td>
                                                <Link to={`/appointments/${item.id}`} style={{backgroundColor:"transparent", border:"none", textDecoration:"none"}}> 👁️ </Link>
                                            </td>
                                        </tr>
                                    }
                                })}
                                { appointmentType == "Cancelled" && appointments.map(item =>{
                                    if(item.status == 4){
                                        <tr key= {item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.patient.fullName}</td>
                                            <td>{item.doctor.fullName}</td>
                                            <td>{item.doctor.specialization}</td>
                                            <td>{item.appointmentDate} & {item.selectedSlots}</td>
                                            <td>Cancelled</td>
                                            <td>
                                                <Link to={`/appointments/${item.id}`} style={{backgroundColor:"transparent", border:"none", textDecoration:"none"}}> 👁️ </Link>
                                            </td>
                                        </tr>
                                    }
                                })}
                                { appointmentType == "Completed" && appointments.map(item =>{
                                    if(item.status == 4){
                                        <tr key= {item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.patient.fullName}</td>
                                            <td>{item.doctor.fullName}</td>
                                            <td>{item.doctor.specialization}</td>
                                            <td>{item.appointmentDate} & {item.selectedSlots}</td>
                                            <td>Completed</td>
                                            <td>
                                                <Link to={`/appointments/${item.id}`} style={{backgroundColor:"transparent", border:"none", textDecoration:"none"}}> 👁️ </Link>
                                            </td>
                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    {dispForm && (
                        <div id="dispform">
                            <div style={{ border:"0.5px solid slategray",borderRadius:"10px" , overflowY:"auto", height:"80vh", width:"50vw", padding:"15px", scrollbarWidth:"none", msOverflowStyle:"none", backgroundColor:"rgba(0, 0, 0, 0.5)"}}>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faCalendarPlus}
                                        style={{ color: "#5da9ff", fontSize: "20px" }}
                                    /> &nbsp;
                                    <label>Book New Appointments</label>
                                    <hr style={{color:"slategray"}}/>
                                </div>
                                <h5>Patient & Doctor</h5>
                                <div style={{display:"flex"}}>
                                    <div style={{width:"50vh"}}>
                                        <label>Patient</label><br/>
                                        <select className="drpdwn" onChange={(e) => { patients.map(obj =>{
                                            obj.id == e.target.value ? setSelectedPatient(obj) : null
                                        })}}>
                                            <option>Select Patient</option>
                                            {patients.map(item =>
                                                <option key={item.id} value={item.id}>{item.fullName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label>Doctor</label><br/>
                                        <select className="drpdwn" onChange={(e) => { doctors.map(obj =>{
                                            obj.id == e.target.value ? setSelectedDoctor(obj) : null
                                        })} }>
                                            <option>Select Doctor</option>
                                            {doctors.map(item =>
                                                <option value={item.id} key={item.id}>{item.fullName}</option>
                                            )}
                                        </select>
                                    </div><br/>
                                </div>
                                <hr/>
                                <h5>Date & Time</h5>
                                <div style={{display:"flex"}}>
                                    <div style={{width:"50vh"}}>
                                        <label>Appointment Date</label><br/>
                                        <input type="date" className="drpdwn" id="apptdate" onChange={(e) => {
                                            setAppointmentDate(new Date(e.target.value));
                                            fetchAvailableSlots(e.target.value);
                                            fetchPatientAvailableSlots(e.target.value);
                                        }}></input>
                                    </div>
                                    <div>
                                        <label>Consultation Type</label><br/>
                                        <ul id="dispConsultation">
                                            <li onClick={() => {changeConsultation("InPerson")} } className={consultationType === "InPerson" ? "active" : "normal"}>&nbsp;InPerson&nbsp;</li>
                                            <li onClick={() => {changeConsultation("OnLine")} } className={consultationType === "OnLine" ? "active" : "normal"}>&nbsp;OnLine&nbsp;</li>
                                        </ul>
                                    </div><br/>
                                </div>
                                <h5>Select Time Slots</h5>
                                <div style={{display:"flex" ,gap:"20px"}}>
                                    {
                                       (selectedDoctor.availabilitySlot != undefined) && 
                                       selectedDoctor.availabilitySlot.map((obj) => {                                        
                                        const day = AppointmentDate.getDay();
                                        if(Weekday[day] == obj.day && obj.isAvailable == true){
                                            var resInMinutes = finddifference(obj.startTime, obj.endTime);
                                            var availablityArray = allocateMinutes(resInMinutes,obj.startTime, obj.endTime);
                                            return availablityArray.map(time =>{
                                                return <button key={time} onClick={() => setSelectedSlot(time)} className={selectedslot === time ? "active" : "btn" }>{time}</button>
                                            })
                                        }
                                    })}
                                </div>
                                <hr/>
                                <h5>Visit Details</h5>
                                <div>
                                    <div>
                                        <label>Reason for Visit</label><br/>
                                        <textarea className="txtarea" id="reason" placeholder="eg : Chest Pain Checkup, Routine, Consultation"></textarea>
                                    </div>
                                    <div>
                                        <label>Additional Notes</label><br/>
                                        <textarea className="txtarea" id="notes" placeholder="Any Extra information that doctor should know"></textarea>
                                    </div>
                                </div><br/>
                                <div style={{display:"flex" ,gap:"20px"}}>
                                    <button className="btn" onClick={handleSubmit}>Book Appointment</button>
                                    <button className="btn" onClick={handleClose}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
export default Appointments;