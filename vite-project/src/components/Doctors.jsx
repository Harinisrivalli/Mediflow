import { useState } from "react";
import Header from "./Header";
import "../css/Doctor.css";
function Doctors(){
    const [view,setView] = useState(false);
    const [doctorType, setDoctorType] = useState("All");
    const [dispForm, setdispForm] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [patientType, setPatientsType] = useState("All");
    const [edit, setEdit] = useState(false);
    const [doctorTobeEdited, setDoctorTobeEdited] = useState({});

    function changeMenu(value) {
        setDoctorType(value);
        setEdit(true);
    }

    function dispNewDoctorsForm() {
        setdispForm(true);
    }

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
                            <form>
                                <table id="adddoctorsTable">
                                    <tbody>
                                        <tr>
                                            <td><label>Full Name</label></td>
                                            <td><input type="text" className="txtbox"/></td>
                                            <td><label>Email</label></td>
                                            <td><input type="email" className="txtbox"/></td>
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
                                                <label>Departments</label></td>
                                                <td>
                                                <input type="text" className="txtbox" id="dept" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Consultation Fees</label></td>
                                                <td>
                                                <input type="number" className="txtbox" id="fees" />
                                            </td>
                                            <td>
                                                <label>About</label></td>
                                                <td>
                                                <input type="text" className="txtbox" id="about" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Status</label></td>
                                                <td>
                                                <select id="status" className="txtbox">
                                                    <option value="Available">Available</option>
                                                    <option value="Available">OnLeave</option>
                                                    <option value="Available">Fully Booked</option>
                                                </select>
                                            </td>
                                            <td>
                                                <label>Weekly Availablity</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" style={{textAlign:"center"}}>
                                                <button className="btn" onClick={() => setdispForm(false)}>Close</button>
                                                &nbsp;&nbsp;
                                                <button className ="btn" onClick="">Submit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
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
                                        <tr key={item._id} className="trow">
                                            <td><img src={`http://localhost:3000/uploads/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
                                            <td style={{font:"caption"}}>
                                            {item.fullName}</td>
                                            <td>{item.age}</td>
                                            <td>{item.email}</td>
                                            <td>NA</td>
                                            <td>1</td>
                                            <td>
                                                <button style={{backgroundColor:"transparent", border:"none"}} onClick={() => handleView(item)}>👁️</button>
                                                <button style={{backgroundColor:"transparent", border:"none"}} onClick={() => handleDelete(item)}>🗑️</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                { doctorType == "Available" && doctors.map(item =>{
                                    return item.isActive && (
                                        <tr key={item._id} className="trow">
                                            <td><img src={`http://localhost:3000/uploads/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
                                            <td style={{font:"caption"}}>
                                            {item.fullName}</td>
                                            <td>{item.age}</td>
                                            <td>{item.email}</td>
                                            <td>NA</td>
                                            <td>1</td>
                                            <td>
                                                <button style={{backgroundColor:"transparent", border:"none"}} onClick={() => handleView(item)}>👁️</button>
                                                <button style={{backgroundColor:"transparent", border:"none"}} onClick={() => handleDelete(item)}>🗑️</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                { doctorType == "OnLeave" && doctors.map(item =>{
                                    return !item.isActive && (
                                        <tr key={item._id} className="trow">
                                            <td><img src={`http://localhost:3000/uploads/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
                                            <td style={{font:"caption"}}>
                                            {item.fullName}</td>
                                            <td>{item.age}</td>
                                            <td>{item.email}</td>
                                            <td>NA</td>
                                            <td>1</td>
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
                        <div id="dispform">
                                <table id="viewPatients">
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
                                                        right: "10px",
                                                        cursor: "pointer",
                                                        fontSize: "20px",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    ✕
                                                </span>
                                                { !edit ? (<span onClick={() => setEdit(true)} style={{position: "absolute",
                                                        top: "10px",
                                                        right: "35px",
                                                        cursor: "pointer",
                                                        fontSize: "20px",
                                                        fontWeight: "bold"}}> ✏️</span>) : 
                                                    (<span onClick={() => handleEdit(patientTobeViewed)} style={{position: "absolute",
                                                        top: "10px",
                                                        right: "35px",
                                                        cursor: "pointer",
                                                        fontSize: "20px",
                                                        fontWeight: "bold"}}> 💾</span>) }

                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><span style={{color:"#00e5c4"}}>Basic Info</span></td>
                                        </tr>
                                        <tr>
                                            <td><img src={`http://localhost:3000/uploads/${patientTobeViewed.profilePhoto}`} style={{width:"80px",height:"80px", borderRadius:"45px"}} alt={patientTobeViewed.fullName}></img></td>
                                        </tr>
                                        <tr>
                                            <td><label>Full Name</label></td>
                                            {!edit ? <td>{patientTobeViewed.fullName}</td> : <td><input type="text" value={patientTobeViewed.fullName} onChange={(e) => setPatientTobeViewed({...patientTobeViewed,fullName: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Age</label></td>
                                            {!edit ? <td>{patientTobeViewed.age}</td> : <td><input type="text" id="eage" value={patientTobeViewed.age} onChange={(e) => setPatientTobeViewed({...patientTobeViewed,age: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Gender</label></td>
                                            <td>{patientTobeViewed.gender}</td>
                                        </tr>
                                        <tr>
                                            <td><label>Blood Group</label></td>
                                            <td>{patientTobeViewed.bloodGroup}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><span style={{color:"#00e5c4"}}>Contact & Address</span></td>
                                        </tr>
                                        <tr>
                                            <td><label>Email</label></td>
                                            {!edit ? <td>{patientTobeViewed.email}</td> : <td><input type="email" value={patientTobeViewed.email} onChange={(e) => setPatientTobeViewed({...patientTobeViewed,email: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>Phone Number</label></td>
                                            {!edit ? <td>{patientTobeViewed.phoneNo}</td> : <td><input type="tel" pattern="[0-9]{10}" value={patientTobeViewed.phoneNo} onChange={(e) => setPatientTobeViewed({...patientTobeViewed,phoneNo: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>City</label></td>
                                            {!edit ? <td>{patientTobeViewed.city}</td> : <td><input type="text" value={patientTobeViewed.city} onChange={(e) => setPatientTobeViewed({...patientTobeViewed,city: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>State</label></td>
                                            {!edit ? <td>{patientTobeViewed.state}</td> : <td><input type="text" value={patientTobeViewed.state} onChange={(e) => setPatientTobeViewed({...patientTobeViewed,state: e.target.value})}></input></td>}
                                        </tr>
                                        <tr>
                                            <td><label>PinCode</label></td>
                                            {!edit ? <td>{patientTobeViewed.pincode}</td> : <td><input type="text" value={patientTobeViewed.pincode} onChange={(e) => setPatientTobeViewed({...patientTobeViewed,pincode: e.target.value})}></input></td>}
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