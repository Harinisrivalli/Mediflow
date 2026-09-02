import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../css/DoctorProfile.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
function DoctorProfile(){
    const [doctor, setDoctor] = useState({
        availabilitySlot: [
            {day:"Monday",isAvailable:false, startTime:null,endTime:null},
            {day:"Tuesday",isAvailable:false, startTime:null,endTime:null},
            {day:"Wednesday",isAvailable:false, startTime:null,endTime:null},
            {day:"Thursday",isAvailable:false, startTime:null,endTime:null},
            {day:"Friday",isAvailable:false, startTime:null,endTime:null},
            {day:"Saturday",isAvailable:false, startTime:null,endTime:null},
            {day:"Sunday",isAvailable:false, startTime:null,endTime:null},
        ]
    });
    const [edit, setEdit] = useState(false);
    const params = useParams();
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    async function getDoctorById(id){
        console.log(id);
        const response = await fetch("https://localhost:7286/api/doctor/" + id,{
            method: "GET"
        });
        const data = await response.json();
        if(response.status == 200){
            setDoctor(data);
        }
    }

    async function handleEdit(doctor) {
        var resp = await fetch("https://localhost:7286/api/doctor/" + doctor.id,{
            method:"PATCH",
            body:JSON.stringify(doctor),
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(resp.status == 200){
            alert("Doctor Updated Successfully");
            setEdit(false);
            getDoctorById(doctor.id);
        }
        else{
            alert("Updation Failed");
        }
    }

    function checkAvailablity(availabilityItems){
        let count = 0;
        if(availabilityItems != undefined){
            for(var i=0;i<7;i++){
                if(availabilityItems[i]?.isAvailable == true){
                    count++;
                }
            }
        }
        return count;
    }

    useEffect(()=>{
        getDoctorById(params.id);
    },[])
    return(
        <>
            <div id="doctorProfile">
                {console.log(doctor)}
                <section id="header">
                    <Header title="DoctorProfile"/>
                </section>
                <section id="profilebody">
                    <section id="menus" style={{padding:"10px"}}>
                        <Link to={`/doctors`} style={{textDecoration:"none", fontSize:"25px", paddingLeft:"30px" ,top:"10px"}}>🔙</Link>
                        <label style={{paddingLeft:"20px", fontSize:"20px"}}> Doctor Profile</label> 
                        {!edit ?  <Button style={{right:"60px", position:"absolute",textTransform:"none", color:"rgb(5, 5, 26)",  background: "rgba(112, 128, 144, 0.468)"}} onClick={()=>{setEdit(true);}}> ✏️Edit Doctor</Button> : <Button style={{right:"60px", position:"absolute",textTransform:"none", color:"rgb(5, 5, 26)",  background: "rgba(112, 128, 144, 0.468)"}} onClick={() => handleEdit(doctor)}> 💾Save Doctor</Button>}
                    </section><br/>
                    <section id="profile">
                        <section>
                            <img src={`https://localhost:7286/${doctor.profilePhoto}`} style={{width:"60px",height:"60px", borderRadius:"60px", padding:"15px"}} alt="ProfilePhoto"></img>
                        </section>
                        <section style={{marginLeft:"20px"}}>
                            <label style={{fontSize:"20px",color:"#00C9A7"}}>Dr {doctor.fullName}</label><br/>
                            <label style={{fontSize:"13px"}}>{doctor.specialization} {doctor.licenseNo} {doctor.status}</label>
                        </section>
                        <section style={{marginLeft:"100px"}}>
                            <label style={{ color:"#00C9A7", fontWeight:"bold"}}>{checkAvailablity(doctor.availabilitySlot)}</label><br/>
                            <label style={{fontSize:"13px"}}>Slots Available</label>
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Full Name</label><br/>
                            {!edit ? <label>{doctor.fullName}</label> :<input type="text" value={doctor.fullName} className="txtbox" onChange={(e) => setDoctor({...doctor,fullName: e.target.value})}></input>}
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Specialization</label><br/>
                            {!edit ? <label>{doctor.specialization}</label> :<input type="text" id="eage" value={doctor.specialization} className="txtbox" onChange={(e) => setDoctor({...doctor,specialization: e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>License No</label><br/>
                            {!edit ? <label>{doctor.licenseNo}</label> :<input type="text" value={doctor.licenseNo} className="txtbox" onChange={(e) => setDoctor({...doctor,licenseNo: e.target.value})}></input>}
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Experience</label><br/>
                            {!edit ? <label>{doctor.experience}</label> :<input type="text" id="eage" value={doctor.experience} className="txtbox" onChange={(e) => setDoctor({...doctor,experience: e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Email</label><br/>
                            {!edit ? <label>{doctor.email}</label> : <input type="email" className="txtbox" value={doctor.email} onChange={(e) => setDoctor({...doctor,email: e.target.value})}></input>}
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Experience</label><br/>
                            {!edit ? <label>{doctor.experience}</label> :<input type="text" id="eage" className="txtbox" value={doctor.experience} onChange={(e) => setDoctor({...doctor,experience: e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Gender</label><br/>
                            <label>{doctor.gender}</label>
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Dob</label><br/>
                            {!edit ? <label>{doctor.dob}</label>: <input type="date" value={doctor.dob} onChange={(e)=> setDoctor({...doctor,dob:e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>Phone No</label><br/>
                            {!edit ? <label>{doctor.phoneNo}</label>: <input type="tel" pattern="[0-9]{10}" value={doctor.phoneNo} onChange={(e) => setDoctor({...doctor,phoneNo: e.target.value})}></input>}
                        </section>
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>About</label><br/>
                            {!edit ? <label>{doctor.about}</label>: <input type="text" value={doctor.about} onChange={(e) => setDoctor({...doctor,about: e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart">
                            <label style={{ color:"#00C9A7"}}>qualification</label><br/>
                            {!edit ? <label>{doctor.qualification}</label>: <input type="text" value={doctor.qualification} onChange={(e) => setDoctor({...doctor,qualification: e.target.value})}></input>}
                        </section>
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Consultation Fees</label><br/>
                            {!edit ? <label>{doctor.consultationFee}</label>: <input type="text" value={doctor.consultationFee} onChange={(e) => setDoctor({...doctor,consultationFee: e.target.value})}></input>}
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="subpart"> 
                            <label style={{ color:"#00C9A7"}}>Status</label><br/>
                            {(edit && doctor.status != "Unavailable") ? 
                                <select value={doctor.status} onChange={(e) => setDoctor({...doctor,status: e.target.value})}>
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                    <option value="OnLeave">OnLeave</option>
                                    <option value="FullyBooked">Fully Booked</option>
                                </select> : <label>{doctor.status}</label> 
                            }
                        </section>
                    </section><br/>
                    <section className="part1">
                        <section className ="weeklyavailablity">
                            <label style={{ color:"#00C9A7"}}>Weekly Availablity</label><br/>
                            {!edit 
                                ? 
                                    <>
                                        {doctor.availabilitySlot.map(item =>{
                                            return (
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    marginBottom: "10px",
                                                    flexWrap: "wrap"
                                                }} key={item.day}>
                                                        <label>{item.day}</label>
                                                        <span>
                                                            <button className="avlbtn" style={{cursor:"pointer", width:"80px" , height:"25px",borderRadius:"2px", borderStyle:"none"}}
                                                            onClick={() =>{
                                                                setDoctor({
                                                                    ...doctor,
                                                                    availabilitySlot: doctor.availabilitySlot.map((obj) =>{
                                                                        if(item.day == obj.day)
                                                                            return {...obj,isAvailable: true};
                                                                        return obj;
                                                                    })
                                                                })
                                                            }}>Available</button>
                                                        </span>
                                                        <span>
                                                            <button className="avlbtn" style={{cursor:"pointer", width:"80px" , height:"25px",borderRadius:"2px", borderStyle:"none"}} onClick={()=>{
                                                                setDoctor(
                                                                    { 
                                                                        ...doctor,
                                                                        availabilitySlot: doctor.availabilitySlot.map(obj => 
                                                                            {
                                                                                if(obj.day == item.day){ return{...obj,isAvailable:false}}
                                                                                return obj;
                                                                            })}
                                                                            )
                                                                    }}> UnAvailable </button>
                                                        </span>
                                                        {item.isAvailable === true && (
                                                            <LocalizationProvider dateAdapter={AdapterDayjs} style={{color:"white"}}>
                                                                <span>
                                                                    <label>From</label>
                                                                    <TimePicker
                                                                        value={item.startTime ? dayjs().hour(
                                                                            Number(item.startTime.split(":")[0])
                                                                        ).minute(
                                                                            Number(item.startTime.split(":")[1])
                                                                        ) : null}
                                                                        onChange={(value)=>{
                                                                            const timeString = value ? value.format('HH:mm') : ''; 
                                                                            setDoctor(
                                                                                { 
                                                                                    ...doctor,
                                                                                    availabilitySlot: doctor.availabilitySlot.map(obj => 
                                                                                        {
                                                                                            if(obj.day == item.day){ return{...obj,startTime: timeString}}
                                                                                            return obj;
                                                                                        }
                                                                                    )
                                                                                }
                                                                            )
                                                                        }}
                                                                        slotProps={{
                                                                            textField: {
                                                                            sx: {
                                                                                width: 150,
                                                                                height:10,
                                                                                "& .MuiInputBase-root": {
                                                                                color: "#fff",
                                                                                },

                                                                                "& .MuiInputBase-input": {
                                                                                color: "#fff",
                                                                                WebkitTextFillColor: "#fff",
                                                                                },

                                                                                "& .MuiPickersSectionList-root": {
                                                                                color: "#fff",
                                                                                },

                                                                                "& .MuiPickersSectionList-section": {
                                                                                color: "#fff",
                                                                                },

                                                                                "& .MuiSvgIcon-root": {
                                                                                color: "#fff",
                                                                                },
                                                                            },
                                                                            },
                                                                        }}
                                                                    />
                                                                    <label>To</label>
                                                                    <TimePicker
                                                                        value={item.endTime ? dayjs().hour(
                                                                            Number(item.endTime.split(":")[0])
                                                                        ).minute(
                                                                            Number(item.endTime.split(":")[1])
                                                                        ) : null}
                                                                        onChange={(value)=>{
                                                                            const timeString = value ? value.format('HH:mm') : ''; 
                                                                            setDoctor(
                                                                                { 
                                                                                    ...doctor,
                                                                                    availabilitySlot: doctor.availabilitySlot.map(obj => 
                                                                                        {
                                                                                            if(obj.day == item.day){ return{...obj,endTime: timeString}}
                                                                                            return obj;
                                                                                        }
                                                                                    )
                                                                                }
                                                                            )
                                                                        }}
                                                                        slotProps={{
                                                                            textField: {
                                                                            sx: {
                                                                                width: 150,
                                                                                height: 10,
                                                                                "& .MuiInputBase-root": {
                                                                                color: "#fff",
                                                                                },

                                                                                "& .MuiInputBase-input": {
                                                                                color: "#fff",
                                                                                WebkitTextFillColor: "#fff",
                                                                                },

                                                                                "& .MuiPickersSectionList-root": {
                                                                                color: "#fff",
                                                                                },

                                                                                "& .MuiPickersSectionList-section": {
                                                                                color: "#fff",
                                                                                },

                                                                                "& .MuiSvgIcon-root": {
                                                                                color: "#fff",
                                                                                },
                                                                            },
                                                                            },
                                                                        }}
                                                                    />
                                                                </span>
                                                            </LocalizationProvider>
                                                        )}
                                                    <br/>
                                                </div>
                                            );
                                        })}
                                    </>
                                : 
                                    <>
                                        {doctor.availabilitySlot.map(item =>{
                                            return (
                                                <div style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "10px",
                                                            marginBottom: "10px",
                                                            flexWrap: "wrap"
                                                        }} key={item.day}>
                                                    <label>{item.day}</label>
                                                    <span>
                                                        <button id="avlbtn" className="avlbtn" onClick={() =>setDoctor({...doctor,availabilitySlot:doctor.availabilitySlot.map(obj =>{
                                                            if(item.day == obj.day ){
                                                                return {
                                                                    ...obj,
                                                                    isAvailable: true
                                                                }
                                                            }
                                                            return obj;
                                                        })})}>Available</button>
                                                    </span>
                                                    <span>
                                                        <button id="unavlbtn" className="avlbtn" onClick={() =>setDoctor({...doctor,availabilitySlot:doctor.availabilitySlot.map(obj =>{
                                                            if(item.day == obj.day ){
                                                                return {
                                                                    ...obj,
                                                                    isAvailable: false
                                                                }
                                                            }
                                                            return obj;
                                                        })})}> UnAvailable </button>
                                                    </span>
                                                    {item.isAvailable === true && (
                                                        <LocalizationProvider dateAdapter={AdapterDayjs} style={{color:"white"}}>
                                                            <span>
                                                                <label>From</label>
                                                                <TimePicker
                                                                    value={item.startTime ? dayjs().hour(
                                                                            Number(item.startTime.split(":")[0])
                                                                        ).minute(
                                                                            Number(item.startTime.split(":")[1])
                                                                        ) : null}
                                                                    onChange={(value) =>setDoctor({...doctor,availabilitySlot:doctor.availabilitySlot.map(obj =>{
                                                                        if(item.day == obj.day ){
                                                                            return {
                                                                                ...obj,
                                                                                startTime:value ? value.format("HH:mm"):null
                                                                            }
                                                                        }
                                                                        return obj;
                                                                    })})}
                                                                    slotProps={{
                                                                        textField: {
                                                                        sx: {
                                                                            width: 150,

                                                                            "& .MuiInputBase-root": {
                                                                            color: "#fff",
                                                                            },

                                                                            "& .MuiInputBase-input": {
                                                                            color: "#fff",
                                                                            WebkitTextFillColor: "#fff",
                                                                            },

                                                                            "& .MuiPickersSectionList-root": {
                                                                            color: "#fff",
                                                                            },

                                                                            "& .MuiPickersSectionList-section": {
                                                                            color: "#fff",
                                                                            },

                                                                            "& .MuiSvgIcon-root": {
                                                                            color: "#fff",
                                                                            },
                                                                        },
                                                                        },
                                                                    }}
                                                                />
                                                                <label>To</label>
                                                                <TimePicker
                                                                    value={item.endTime ? dayjs().hour(
                                                                            Number(item.endTime.split(":")[0])
                                                                        ).minute(
                                                                            Number(item.endTime.split(":")[1])
                                                                        ) : null}
                                                                    onChange={(value) =>setDoctor({...doctor,availabilitySlot:doctor.availabilitySlot.map(obj =>{
                                                                        if(item.day == obj.day ){
                                                                            return {
                                                                                ...obj,
                                                                                endTime:value?value.format("HH:mm"):null
                                                                            }
                                                                        }
                                                                        return obj;
                                                                    })})}
                                                                    slotProps={{
                                                                        textField: {
                                                                        sx: {
                                                                            width: 150,

                                                                            "& .MuiInputBase-root": {
                                                                            color: "#fff",
                                                                            },

                                                                            "& .MuiInputBase-input": {
                                                                            color: "#fff",
                                                                            WebkitTextFillColor: "#fff",
                                                                            },

                                                                            "& .MuiPickersSectionList-root": {
                                                                            color: "#fff",
                                                                            },

                                                                            "& .MuiPickersSectionList-section": {
                                                                            color: "#fff",
                                                                            },

                                                                            "& .MuiSvgIcon-root": {
                                                                            color: "#fff",
                                                                            },
                                                                        },
                                                                        },
                                                                    }}
                                                                />
                                                            </span>
                                                        </LocalizationProvider>
                                                    )}
                                                <br/>
                                            </div>
                                            );
                                        })}
                                    </>
                                }
                        </section>
                        
                    </section><br/>
                </section>
            </div>
        </>
    );
}
export default DoctorProfile;