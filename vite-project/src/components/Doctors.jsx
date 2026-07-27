import { useEffect, useState } from "react";
import Header from "./Header";
import "../css/Doctor.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
function Doctors(){
    const [view,setView] = useState(false);
    const [doctorType, setDoctorType] = useState("All");
    const [dispForm, setdispForm] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [patientType, setPatientsType] = useState("All");
    const [edit, setEdit] = useState(false);
    const [doctorTobeEdited, setDoctorTobeEdited] = useState({});
    const [availability,setAvailablity] = useState([
        {day:"Monday",isAvailable:false, startTime:null,endTime:null},
        {day:"Tuesday",isAvailable:false, startTime:null,endTime:null},
        {day:"Wednesday",isAvailable:false, startTime:null,endTime:null},
        {day:"Thursday",isAvailable:false, startTime:null,endTime:null},
        {day:"Friday",isAvailable:false, startTime:null,endTime:null},
        {day:"Saturday",isAvailable:false, startTime:null,endTime:null},
        {day:"Sunday",isAvailable:false, startTime:null,endTime:null},
    ]);
    const [doctorTobeViewed, setDoctorTobeViewed] = useState({});

    function handleView(item){
        setDoctorTobeViewed(item);
        setView(true);
    }

    function changeMenu(value) {
        setDoctorType(value);
        setEdit(true);
    }

    function dispNewDoctorsForm() {
        setdispForm(true);
    }

    function updateAvailablity(day, status){
        setAvailablity(availability.map((item) =>{
            if(item.day.toUpperCase() === day.toUpperCase()){
                return {...item, startTime:null, endTime:null,isAvailable:status}
            }
            return item;
        }));
    }

    function changeFromTime(day,value){
        setAvailablity(availability.map((item)=>{
            if(item.day == day){
                return{
                    ...item,
                    startTime: value
                }
            }
            return item;
        }));
    }
    function changeToTime(day,value){
        setAvailablity(availability.map((item)=>{
            if(item.day == day){
                return{
                    ...item,
                    endTime: value
                }
            }
            return item;
        }))
    }
    async function CreateDoctor(){
        const formData = new FormData();

        formData.append("fullName", document.getElementById("fname").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("password", document.getElementById("pwd").value);
        formData.append("phoneNo", document.getElementById("phoneNo").value);
        formData.append("dob", document.getElementById("dob").value);
        formData.append("profilePhoto", document.getElementById("profilephoto").files[0]);
        formData.append("specialization", document.getElementById("specialization").value);
        formData.append("licenseNo", document.getElementById("license").value);
        formData.append("qualification", document.getElementById("qualification").value);
        formData.append("experience", document.getElementById("exp").value);
        formData.append("consultationFee", document.getElementById("fees").value);
        formData.append("about", document.getElementById("about").value);
        formData.append("status", document.getElementById("status").value);
        formData.append("availabilitySlot", JSON.stringify(availability));
        formData.append("gender", document.querySelector('input[name="gender"]:checked').value);
        var response = await fetch("https://localhost:7286/api/doctor",{
            method: "POST",
            body: formData
        });
        if(response.status == 200){
            alert("Doctor Created Successfully");
            setdispForm(false);
            getDoctors();
        }
        else{
            alert(response.statusText)
        }
    }

    async function handleEdit(doctor) {
        console.log(doctor);
        var resp = await fetch("https://localhost:7286/api/doctor/" + doctor.id,{
            method:"PATCH",
            body:JSON.stringify(doctor),
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(resp.status == 200){
            alert("Doctor Updated Successfully");
            setView(false);
            getDoctors();
        }
        else{
            alert("Updation Failed");
        }
    }
    async function getDoctors() {
        const response = await fetch("https://localhost:7286/api/doctor",{
            method:"GET",
        });
        var resp = await response.json();
        if(response.status == 200){
            setDoctors(resp);
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

    async function handleDelete(id){
        const response = await fetch("https://localhost:7286/api/doctor/" + id,{
            method:"DELETE",
        });
        if(response.status == 204){
            alert("Doctor Deleted Successfully");
            getDoctors();
        }
    }
    useEffect(() =>{
        getDoctors();
    },[]);

    return(
        <> 
            <div style={{filter: view? "blur(10px)" : "none"}}>
                <section id="header">
                    <Header title="Doctors"/>
                </section>

                <section id="doctorsmenus">
                    <div id="displayList">
                        <ul id="dispMenu">
                            <li onClick={() => changeMenu("All")} className={doctorType === "All" ? "active" : "normal"}>&nbsp;All&nbsp;</li>
                            <li onClick={() => changeMenu("Available")} className={doctorType === "Available" ? "active" : "normal"}>&nbsp;Available&nbsp;</li>
                            <li onClick={() => changeMenu("OnLeave")} className={doctorType === "OnLeave" ? "active" : "normal"}>&nbsp;OnLeave&nbsp;</li>
                            <li onClick={() => changeMenu("InActive")} className={doctorType === "InActive" ? "active" : "normal"}>&nbsp;InActive&nbsp;</li>
                        </ul>
                    </div>

                    <div style={{ paddingTop: "18px" }}>
                        <button
                            onClick={dispNewDoctorsForm}
                            style={{
                                height: "50px",
                                width: "100px",
                                backgroundColor: "transparent",
                                borderRadius: "5px",
                                border: "2px solid slategrey",
                                cursor: "pointer"
                            }}
                        >
                            + Add Doctors
                        </button>
                    </div>
                </section>

                <section>
                    {dispForm && (
                        <div id="dispform">
                            <div style={{ overflowY:"auto", height:"80vh", padding:"5px", scrollbarWidth:"none", msOverflowStyle:"none"}}>
                                <table id="adddoctorsTable">
                                    <tbody>
                                        <tr>
                                            <td><label>Full Name</label></td>
                                            <td><input type="text" id="fname" className="txtbox"/></td>
                                            <td><label>Email</label></td>
                                            <td><input type="email" id="email" className="txtbox"/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Password</label></td>
                                                <td><input type="text" className="txtbox" id="pwd" />
                                            </td>
                                            <td>
                                                <label>Phone Number</label></td>
                                                <td>
                                                <input type="tel" maxLength="10" pattern="[0-9]{10}" className="txtbox" id="phoneNo" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="gender">Gender</label></td>
                                                <td>
                                                <input type="radio" id="male" name="gender" value="male" className="radio" />Male
                                                <input type="radio" id="female" name="gender" value="female" className="radio" />Female
                                                <input type="radio" id="others" name="gender" value="others" className="radio" />Others
                                            </td>
                                            <td>
                                                <label>Date of Birth</label></td>
                                                <td>
                                                <input type="date" id="dob"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Profile Photo</label></td>
                                                <td>
                                                <input type="file" name="image" accept="image/*" id="profilephoto" />
                                            </td>
                                            <td>
                                                <label>specialization</label></td>
                                                <td>
                                                <input type="text" className="txtbox" id="specialization" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>License Number</label></td>
                                                <td>
                                                <input type="text" placeholder="e.g. MH-2021-4821"  pattern="[A-Z]{2}-[0-9]{4}-[0-9]{4}" id="license" required className="txtbox" />
                                            </td>
                                            <td>
                                                <label>Qualification</label></td>
                                                <td>
                                                <input type="text" className="txtbox" id="qualification" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Experience</label></td>
                                                <td>
                                                <input type="numer" className="txtbox" id="exp" />
                                            </td>
                                            <td>
                                                <label>About</label></td>
                                                <td>
                                                <input type="text" className="txtbox" id="about" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Consultation Fees</label></td>
                                                <td>
                                                <input type="number" className="txtbox" id="fees" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Status</label></td>
                                                <td>
                                                <select id="status" className="txtbox">
                                                    <option value="Available">Available</option>
                                                    <option value="OnLeave">OnLeave</option>
                                                    <option value="FullyBooked">Fully Booked</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <>
                                                    <label>Weekly Availablity</label><br/>
                                                    {availability.map(item =>{
                                                        return (
                                                            <div style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "10px",
                                                                    marginBottom: "10px",
                                                                    flexWrap: "wrap"
                                                                }}
                                                            >
                                                            <label>{item.day}</label>
                                                            <span>
                                                                <button id="avlbtn" className="btn" style={{cursor:"pointer", width:"80px" , height:"25px",borderRadius:"2px", borderStyle:"none"}} onClick={() =>updateAvailablity(item.day,true)}>Available</button>
                                                            </span>
                                                            <span>
                                                                <button id="unavlbtn" className="btn" style={{cursor:"pointer", width:"80px" , height:"25px",borderRadius:"2px", borderStyle:"none"}} onClick={() =>updateAvailablity(item.day,false)}> UnAvailable </button>
                                                            </span>
                                                            {item.isAvailable === true && (
                                                                <LocalizationProvider dateAdapter={AdapterDayjs} style={{color:"white"}}>
                                                                    <span>
                                                                        <label>From</label>
                                                                        <TimePicker
                                                                            value={item.startTime}
                                                                            onChange={(value)=> changeFromTime(item.day,value)}
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
                                                                            value={item.endTime}
                                                                            onChange={(value)=> changeToTime( item.day, value)}
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
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" style={{textAlign:"center"}}>
                                                <button className="btn" onClick={() => setdispForm(false)}>Close</button>
                                                &nbsp;&nbsp;
                                                <button className ="btn" onClick={CreateDoctor}>Submit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </section>

                <section>
                    <div id="dispPatients">
                        <table id="table">
                            <thead>
                                <tr>
                                    <td>Profile</td>
                                    <td>Doctors</td>
                                    <td>Specialization</td>
                                    <td>License</td>
                                    <td>Slots</td>
                                    <td>Status</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                { doctorType == "All" && doctors.map(item =>{
                                    return(
                                        <tr key={item.id} className="trow">
                                            <td><img src={`https://localhost:7286/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
                                            <td style={{font:"caption"}}>
                                            {item.fullName}</td>
                                            <td>{item.specialization}</td>
                                            <td>{item.licenseNo}</td>
                                            <td>{checkAvailablity(item.availabilitySlot)}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button style={{backgroundColor:"transparent", border:"none", cursor:"pointer"}} onClick={() => handleView(item)}>👁️</button>
                                                <button style={{backgroundColor:"transparent", border:"none",cursor:"pointer"}} onClick={() => handleDelete(item.id)}>🗑️</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                { doctorType == "Available" && doctors.map(item =>{
                                    return item.isActive && (
                                        <tr key={item.id} className="trow">
                                            <td><img src={`https://localhost:7286/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
                                            <td style={{font:"caption"}}>
                                            {item.fullName}</td>
                                            <td>{item.specialization}</td>
                                            <td>{item.licenseNo}</td>
                                            <td>{checkAvailablity(item.availabilitySlot)}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button style={{backgroundColor:"transparent", border:"none"}} onClick={() => handleView(item)}>👁️</button>
                                                <button style={{backgroundColor:"transparent", border:"none"}} onClick={() => handleDelete(item.id)}>🗑️</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                { doctorType == "OnLeave" && doctors.map(item =>{
                                    return item.status == "OnLeave" && (
                                        <tr key={item.id} className="trow">
                                            <td><img src={`https://localhost:7286/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
                                            <td style={{font:"caption"}}>
                                            {item.fullName}</td>
                                            <td>{item.specialization}</td>
                                            <td>{item.licenseNo}</td>
                                            <td>{checkAvailablity(item.availabilitySlot)}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button style={{backgroundColor:"transparent", border:"none"}} onClick={() => handleView(item)}>👁️</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                { doctorType == "InActive" && doctors.map(item =>{
                                    return !item.isActive && (
                                        <tr key={item.id} className="trow">
                                            <td><img src={`https://localhost:7286/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
                                            <td style={{font:"caption"}}>
                                            {item.fullName}</td>
                                            <td>{item.specialization}</td>
                                            <td>{item.licenseNo}</td>
                                            <td>{checkAvailablity(item.availabilitySlot)}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button style={{backgroundColor:"transparent", border:"none"}} onClick={() => handleView(item)}>👁️</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <div>
                <section>
                    {view && (
                        <div id="docdispform">
                            <table id="viewDoctors">
                                    <tbody>
                                        <tr>
                                            <td colSpan="2" style={{ position: "relative" }}>
                                                <span
                                                    onClick={() => {
                                                        setView(false);setEdit(false);
                                                    }}
                                                    style={{
                                                        position: "absolute",
                                                        top: "10px",
                                                        right: "1px",
                                                        cursor: "pointer",
                                                        fontSize: "20px",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    ✕
                                                </span>
                                                { !edit ? (<span onClick={() => setEdit(true)} style={{position: "absolute",
                                                        top: "10px",
                                                        right: "25px",
                                                        cursor: "pointer",
                                                        fontSize: "20px",
                                                        fontWeight: "bold"}}> ✏️</span>) : 
                                                    (<span onClick={() => handleEdit(doctorTobeViewed)} style={{position: "absolute",
                                                        top: "10px",
                                                        right: "25px",
                                                        cursor: "pointer",
                                                        fontSize: "20px",
                                                        fontWeight: "bold"}}> 💾</span>) }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><span style={{color:"#00e5c4"}}>Basic Info</span></td>
                                        </tr>
                                        <tr>
                                            <td><img src={`https://localhost:7286/${doctorTobeViewed.profilePhoto}`} style={{width:"80px",height:"80px", borderRadius:"45px"}} alt={doctorTobeViewed.fullName}></img></td>
                                        </tr>
                                        <tr>
                                            <td><label>Full Name</label></td>
                                            {!edit ? <td>{doctorTobeViewed.fullName}</td> : <td><input type="text" value={doctorTobeViewed.fullName} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,fullName: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Specialization</label></td>
                                            {!edit ? <td>{doctorTobeViewed.specialization}</td> : <td><input type="text" id="eage" value={doctorTobeViewed.specialization} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,specialization: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Gender</label></td>
                                            <td>{doctorTobeViewed.gender}</td>
                                        </tr>
                                        <tr>
                                            <td><label>Birth Date</label></td>
                                            {!edit ? <td>{doctorTobeViewed.dob}</td> : <td><input type="date" value={doctorTobeViewed.dob} onChange={(e)=> setDoctorTobeViewed({...doctorTobeViewed,dob:e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><span style={{color:"#00e5c4"}}>Other Details</span></td>
                                        </tr>
                                        <tr>
                                            <td><label>Email</label></td>
                                            {!edit ? <td>{doctorTobeViewed.email}</td> : <td><input type="email" value={doctorTobeViewed.email} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,email: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Phone Number</label></td>
                                            {!edit ? <td>{doctorTobeViewed.phoneNo}</td> : <td><input type="tel" pattern="[0-9]{10}" value={doctorTobeViewed.phoneNo} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,phoneNo: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>licenseNo</label></td>
                                            {!edit ? <td>{doctorTobeViewed.licenseNo}</td> : <td><input type="text" value={doctorTobeViewed.licenseNo} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,licenseNo: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>qualification</label></td>
                                            {!edit ? <td>{doctorTobeViewed.qualification}</td> : <td><input type="text" value={doctorTobeViewed.qualification} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,qualification: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Consultation Fees</label></td>
                                            {!edit ? <td>{doctorTobeViewed.consultationFee}</td> : <td><input type="text" value={doctorTobeViewed.consultationFee} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,consultationFee: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Experience</label></td>
                                            {!edit ? <td>{doctorTobeViewed.experience}</td> : <td><input type="text" value={doctorTobeViewed.experience} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,experience: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>About</label></td>
                                            {!edit ? <td>{doctorTobeViewed.about}</td> : <td><input type="text" value={doctorTobeViewed.about} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,about: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Status</label></td>
                                            {!edit 
                                            ?   <td>{doctorTobeViewed.status}</td> 
                                            :   <td>
                                                    <select value={doctorTobeViewed.status} onChange={(e) => setDoctorTobeViewed({...doctorTobeViewed,status: e.target.value})}>
                                                        <option value="Available">Available</option>
                                                        <option value="OnLeave">OnLeave</option>
                                                        <option value="FullyBooked">Fully Booked</option>
                                                    </select>
                                                </td>
                                            }
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Weekly Availablity</label>
                                                {!edit 
                                                ? 
                                                    <>
                                                        {doctorTobeViewed.availabilitySlot.map(item =>{
                                                            return (
                                                                <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            gap: "10px",
                                                                            marginBottom: "10px",
                                                                            flexWrap: "wrap"
                                                                        }}>
                                                                    <label>{item.day}</label>
                                                                    <span>
                                                                        <button id="avlbtn" className="btn" style={{cursor:"pointer", width:"80px" , height:"25px",borderRadius:"2px", borderStyle:"none"}}>Available</button>
                                                                    </span>
                                                                    <span>
                                                                        <button id="unavlbtn" className="btn" style={{cursor:"pointer", width:"80px" , height:"25px",borderRadius:"2px", borderStyle:"none"}}> UnAvailable </button>
                                                                    </span>
                                                                    {item.isAvailable === true && (
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs} style={{color:"white"}}>
                                                                            <span>
                                                                                <label>From</label>
                                                                                <TimePicker
                                                                                    value={item.startTime ? dayjs(item.startTime) : null}
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
                                                                                    value={item.endTime ? dayjs(item.endTime) : null}
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
                                                : 
                                                    <>
                                                        {doctorTobeViewed.availabilitySlot.map(item =>{
                                                            return (
                                                                <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            gap: "10px",
                                                                            marginBottom: "10px",
                                                                            flexWrap: "wrap"
                                                                        }}>
                                                                    <label>{item.day}</label>
                                                                    <span>
                                                                        <button id="avlbtn" className="btn" style={{cursor:"pointer", width:"80px" , height:"25px",borderRadius:"2px", borderStyle:"none"}} onClick={() =>setDoctorTobeViewed({...doctorTobeViewed,availabilitySlot:doctorTobeViewed.availabilitySlot.map(obj =>{
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
                                                                        <button id="unavlbtn" className="btn" style={{cursor:"pointer", width:"80px" , height:"25px",borderRadius:"2px", borderStyle:"none"}} onClick={() =>setDoctorTobeViewed({...doctorTobeViewed,availabilitySlot:doctorTobeViewed.availabilitySlot.map(obj =>{
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
                                                                                    value={item.startTime ? dayjs(item.startTime) : null}
                                                                                    onChange={(value) =>setDoctorTobeViewed({...doctorTobeViewed,availabilitySlot:doctorTobeViewed.availabilitySlot.map(obj =>{
                                                                                        if(item.day == obj.day ){
                                                                                            return {
                                                                                                ...obj,
                                                                                                startTime:value?value.toISOString():null
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
                                                                                    value={item.endTime ? dayjs(item.endTime) : null}
                                                                                    onChange={(value) =>setDoctorTobeViewed({...doctorTobeViewed,availabilitySlot:doctorTobeViewed.availabilitySlot.map(obj =>{
                                                                                        if(item.day == obj.day ){
                                                                                            return {
                                                                                                ...obj,
                                                                                                endTime:value?value.toISOString():null
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
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}
export default Doctors;