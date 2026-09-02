import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../css/PatientProfile.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
function PatientProfile(){
    const [patient, setPatient] = useState({});
    const [edit, setEdit] = useState(false);
    const params = useParams();
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    async function getPatientsById(id){
        const response = await fetch("https://localhost:7286/api/Patient/" + id,{
            method: "GET"
        });
        const data = await response.json();
        if(data.status.statusCode == 200){
            setPatient(data.data);
        }
    }

    async function handleEdit(item) {
        try{
            const response = await fetch(
                "https://localhost:7286/api/Patient/" + item.id,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(item)
                }
            );
            if(response.status == 200){
                alert("Updated Successfully");
                getPatientsById(item.id);
            }
            setEdit(false);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getPatientsById(params.id);
    },[])
    return(
        <>
            <div id="patientProfile">
                <section id="header">
                    <Header title="PatientProfile"/>
                </section>
                <section id="profilebody">
                    <section id="menus" style={{padding:"10px"}}>
                        <Link to={`/patients`} style={{textDecoration:"none", fontSize:"25px", paddingLeft:"30px" ,top:"10px"}}>🔙</Link>
                        <label style={{paddingLeft:"20px", fontSize:"20px"}}> Patient Profile</label> 
                        {!edit ?  <Button style={{right:"60px", position:"absolute",textTransform:"none", color:"rgb(5, 5, 26)",  background: "rgba(112, 128, 144, 0.468)"}} onClick={()=>{setEdit(true);}}> ✏️Edit Patient</Button> : <Button style={{right:"60px", position:"absolute",textTransform:"none", color:"rgb(5, 5, 26)",  background: "rgba(112, 128, 144, 0.468)"}} onClick={() => handleEdit(patient)}> 💾Save Patient</Button>}
                    </section><br/>
                    <section id="profile">
                        <section>
                            <img src={`https://localhost:7286/${patient.profilePhoto}`} style={{width:"60px",height:"60px", borderRadius:"60px", padding:"15px"}} alt="ProfilePhoto"></img>
                        </section>
                        <section style={{marginLeft:"20px"}}>
                            <label style={{fontSize:"20px",color:"#00C9A7"}}>{patient.fullName}</label><br/>
                            <label style={{fontSize:"13px"}}>Patient Id :{patient.id}  Joined :{patient.createdAt} Status:{patient.isActive? "active":"inactive"}</label>
                        </section>
                        <section style={{marginLeft:"100px"}}>
                            <label style={{ color:"#00C9A7", fontWeight:"bold"}}>1</label><br/>
                            <label style={{fontSize:"13px"}}>Total Appoinments</label>
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Full Name</label><br/>
                            {!edit ? <label>{patient.fullName}</label> :<input type="text" value={patient.fullName} className="txtbox" onChange={(e) => setPatient({...patient,fullName: e.target.value})}></input>}
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Age/ DOB</label><br/>
                            {!edit ? <label>{patient.age}</label> :<input type="text" id="eage" value={patient.age} className="txtbox" onChange={(e) => setPatient({...patient,age: e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Gender</label><br/>
                            <label>{patient.gender}</label>
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Blood Group</label><br/>
                            <label>{patient.bloodGroup}</label>
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Email</label><br/>
                            {!edit ? <label>{patient.email}</label> : <input type="email" value={patient.email} className="txtbox" onChange={(e) => setPatient({...patient,email: e.target.value})}></input>}
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Phone Number</label><br/>
                            {!edit ? <label>{patient.phoneNo}</label> : <input type="tel" pattern="[0-9]{10}" value={patient.phoneNo} className="txtbox" onChange={(e) => setPatient({...patient,phoneNo: e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>City</label><br/>
                            {!edit ? <label>{patient.city}</label> : <input type="text" value={patient.city} className="txtbox" onChange={(e) => setPatient({...patient,city: e.target.value})}></input>}
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>State</label><br/>
                            {!edit ? <label>{patient.state}</label> : <input type="text" value={patient.state} className="txtbox" onChange={(e) => setPatient({...patient,state: e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>PinCode</label><br/>
                            <label>{patient.pincode}</label>
                        </section>
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Blood Group</label><br/>
                            {!edit ? <label>{patient.bloodGroup}</label> : <select className="options" id="bloodgroup" value={patient.bloodGroup} className="txtbox">
                                <option>select</option>
                                {bloodGroups.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>}
                        </section>
                    </section><br/>
                </section>
            </div>
        </>
    );
}
export default PatientProfile;