import { useState } from "react";
import Header from "../components/Header.jsx"
import "../css/Appointments.css"
function Appointments(){
    const [appointments,setAppointments] = useState("");
    function changeMenu(value){
        setAppointments(value);
    }
    return(
        <>
            <div>
                <section id="header">
                    <Header title = "Appointments"></Header>
                </section>
                <section id="appointmentmenus">
                    <div id="displayOrder">
                        <ul id="dispMenu">
                            <li onClick={() => {changeMenu("All")} } className={appointments === "All" ? "active" : "normal"}>&nbsp;All&nbsp;</li>
                            <li onClick={() => {changeMenu("Today")}} className={appointments === "Today" ? "active" : "normal"}>&nbsp;Today&nbsp;</li>
                            <li onClick={() => {changeMenu("Confirmed")}} className={appointments === "Confirmed" ? "active" : "normal"}>&nbsp;Confirmed&nbsp;</li>
                            <li onClick={() => {changeMenu("Pending")}} className={appointments === "Pending" ? "active" : "normal"}>&nbsp;Pending&nbsp;</li>
                        </ul>
                    </div>
                    <div id="bookapp" style={{paddingTop:"18px"}}>
                        <button style={{height:"50px", width:"100px", backgroundColor:"transparent", borderRadius:"5px", border:"2px solid slategrey"}}>
                        + Book Appointment
                        </button>
                    </div>
                </section>
                <section>
                    
                </section>
            </div>
        </>
    );
}
export default Appointments;