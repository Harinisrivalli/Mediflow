import { useParams } from "react-router-dom";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "../css/AppointmentView.css";
import { finddifference, allocateMinutes } from "../common/common";
function AppointmentView(){
    const params = useParams();
    const id = params.id;
    const [edit, setEdit] = useState(false);
    const [appointment, setAppointment] = useState({});
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [seldoctorAvailSlot, setseldoctorAvailSlot] = useState([]);
    const [selPatientAvailSlot, setselPatientAvailSlot ] = useState([]);
    async function getAppointmentById(id) {
        var response = await fetch("https://localhost:7286/api/appointment/" + id);
        var result = await response.json();
        if(response.status == 200){
            setAppointment(result.message);
        }
        else{
            setAppointment({});
        }
    }

    async function handleEdit() {
        var data = {
            id : appointment.id,
            patientId : appointment.patient?.id,
            doctorId : appointment.doctor?.id,
            appointmentDate : appointment.appointmentDate,
            consultationType: appointment.consultationType,
            selectedSlots: appointment.selectedSlots,
            reason : appointment.reason,
            notes: appointment.notes,
            status: parseInt(appointment.status,10),
        }
        var response = await fetch("https://localhost:7286/api/appointment/" + id,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        var result = await response.json();
        if(response.status == 200){
            alert("Updated Successfully");
        }
        else{
            alert("Updation Failed");
        }
        setEdit(false);
        getAppointmentById(id);
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

    useEffect(()=>{
        getAppointmentById(id);
        getDoctors();
        getPatients();
    },[]);
    return(
        <>
            <div id="patientProfile">
                <section id="header">
                    <Header title="Appointment"/>
                </section>
                <section id="profilebody">
                    <section id="menus" style={{padding:"10px"}}>
                        <Link to={`/appointments`} style={{textDecoration:"none", fontSize:"25px", paddingLeft:"30px" ,top:"10px"}}>🔙</Link>
                        <label style={{paddingLeft:"20px", fontSize:"20px"}}> Appointment Details</label> 
                        {!edit ?  <Button style={{right:"60px", position:"absolute",textTransform:"none", color:"rgb(5, 5, 26)",  background: "rgba(112, 128, 144, 0.468)"}} onClick={()=>{setEdit(true);}}> ✏️Edit Appoinment</Button> : <Button style={{right:"60px", position:"absolute",textTransform:"none", color:"rgb(5, 5, 26)",  background: "rgba(112, 128, 144, 0.468)"}} onClick={handleEdit}> 💾Save Appointment</Button>}
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Doctor</label><br/>
                            <label>{appointment.doctor?.fullName}</label>
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Patient</label><br/>
                            <label>{appointment.patient?.fullName}</label>
                        </section>
                    </section><br/>
                </section>
                <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Appointment Date</label><br/>
                            <label>{appointment.appointmentDate}</label>
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Status</label><br/>
                            {!edit ? 
                                <label>{appointment.status == 1 ? "Booked" : appointment.status == 2 ? "Cancelled" : "Completed"}</label> :
                                <select value={appointment.status} className="drpdwn" onChange={(e) => {setAppointment({...appointment,status: e.target.value})}}>
                                    <option value={1}>Booked</option>
                                    <option value={2}>Cancelled</option>
                                    <option value={3}>Completed</option>
                                </select>
                            }
                        </section>
                </section><br/>

                <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Consultation Type</label><br/>
                            {!edit ? <label>{appointment.consultationType}</label> : 
                                <select value={appointment.consultationType} className="drpdwn" onChange={(e) => {setAppointment({...appointment,consultationType: e.target.value})}}>
                                    <option value="InPerson">InPerson</option>
                                    <option value="OnLine">OnLine</option>
                                </select>
                            }
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Selected Slots</label><br/>
                            <label>{appointment.selectedSlots}</label>
                        </section>
                </section><br/>
                <section className="part1">
                        
                </section><br/>
            </div>
        </>
    );
}
export default AppointmentView;