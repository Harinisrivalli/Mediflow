import { useEffect, useState } from "react";
import Header from "./Header";
import "../css/Patient.css";
import PatientDetails from "./PatientDetails";

function Patients() {
    const [patientType, setPatientsType] = useState("All");
    const [dispForm, setdispForm] = useState(false);
    const [patients, setPatients] = useState([]);
    const [view,setView] = useState(false);
    const[patientTobeViewed, setPatientTobeViewed] = useState({});
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const [edit, setEdit] = useState(false);
    const [patientTobeEdited, setPatientTobeEdited] = useState({});
    function changeMenu(value) {
        setPatientsType(value);
        setEdit(true);
    }

    function dispNewPatientForm() {
        setdispForm(true);
    }

    function closeForm() {
        setdispForm(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        createPatient();
    }

    useEffect(()=>{
        getPatients();
    },[]);

    async function createPatient() {
        const formData = new FormData();

        formData.append("fullName", document.getElementById("fname").value);
        formData.append("age", document.getElementById("age").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("phoneNo", document.getElementById("phoneNo").value);
        formData.append("city", document.getElementById("city").value);
        formData.append("gender", document.querySelector('input[name="gender"]:checked').value);
        formData.append("pincode", document.getElementById("pincode").value);
        formData.append("bloodGroup", document.getElementById("bloodgroup").value);
        formData.append("profilePhoto", document.getElementById("profilephoto").files[0]);
        formData.append("state", document.getElementById("state").value);
        try {
            const response = await fetch("https://localhost:7286/api/Patient", {
                method: "post",
                body: formData
            });
            const result = await response.json();
            if(result.status.statusCode == 200){
                alert("Patient Created Successfully");
                setdispForm(false);
                await getPatients();
            }
            else{
                alert( result.status + result.title);
            }
        } catch (err) {
            console.log(err);
        }
    }

    function handleView(item){
        setPatientTobeViewed(item);
        setView(true);
    }

    async function handleSearch(name) {
        if(name == ''){
            getPatients();
        }
        const patientToBeSearched = patients.filter(item =>
            item.fullName.toUpperCase().includes(name.toUpperCase())
        );
        setPatients(patientToBeSearched);
    }
    async function handleDelete(item){
        const response = await fetch("https://localhost:7286/api/Patient/" + item.id ,{
            method:"delete"
        });
        const res = await response.json();
        console.log(res);
        if(res.status.statusCode == 201){
            alert("Patient Deleted Successfully");
            getPatients();
        }
        else{
            console.log(response.text());
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

    async function handleEdit(item) {
        console.log(item);
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
                getPatients();
            }
            setEdit(false);
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <> 
            <div style={{filter: view? "blur(10px)" : "none"}}>
                <section id="header">
                    <Header title="Patients" onSearch = {handleSearch}/>
                </section>

                <section id="patientsmenus">
                    <div id="displayList">
                        <ul id="dispMenu">
                            <li onClick={() => changeMenu("All")} className={patientType === "All" ? "active" : "normal"}>&nbsp;All&nbsp;</li>
                            <li onClick={() => changeMenu("Active")} className={patientType === "Active" ? "active" : "normal"}>&nbsp;Active&nbsp;</li>
                            <li onClick={() => changeMenu("InActive")} className={patientType === "InActive" ? "active" : "normal"}>&nbsp;InActive&nbsp;</li>
                        </ul>
                    </div>

                    <div style={{ paddingTop: "18px" }}>
                        <button
                            onClick={dispNewPatientForm}
                            style={{
                                height: "50px",
                                width: "100px",
                                backgroundColor: "transparent",
                                borderRadius: "5px",
                                border: "2px solid slategrey",
                                cursor: "pointer"
                            }}
                        >
                            + Add Patients
                        </button>
                    </div>
                </section>

                <section>
                    {dispForm && (
                        <div id="dispform">
                            <form>
                                <table id="addpatientsTable">
                                    <tbody>
                                        <tr>
                                            <td><label>Full Name</label></td>
                                            <td><input type="text" className="txtbox" id="fname" required/></td>
                                        </tr>

                                        <tr>
                                            <td><label>Age</label></td>
                                            <td><input type="number" className="txtbox" id="age" required/></td>
                                        </tr>

                                        <tr>
                                            <td><label htmlFor="gender">Gender</label></td>
                                            <td>
                                                <input type="radio" id="male" name="gender" value="male" className="radio" />Male
                                                <input type="radio" id="female" name="gender" value="female" className="radio" />Female
                                                <input type="radio" id="others" name="gender" value="others" className="radio" />Others
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><label>Blood Group</label></td>
                                            <td>
                                                <select className="options" id="bloodgroup">
                                                    <option>select</option>
                                                    {bloodGroups.map(item => (
                                                        <option key={item} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><label>Email</label></td>
                                            <td><input type="email" className="txtbox" id="email" required/></td>
                                        </tr>

                                        <tr>
                                            <td><label>Profile Photo</label></td>
                                            <td><input type="file" name="image" accept="image/*" id="profilephoto"/></td>
                                        </tr>

                                        <tr>
                                            <td><label>Phone Number</label></td>
                                            <td><input type="tel" maxLength="10" pattern="[0-9]{10}" className="txtbox" id="phoneNo" required/></td>
                                        </tr>

                                        <tr>
                                            <td><label>City</label></td>
                                            <td><input type="text" className="txtbox" id="city" /></td>
                                        </tr>

                                        <tr>
                                            <td><label>State</label></td>
                                            <td><input type="text" className="txtbox" id="state" /></td>
                                        </tr>

                                        <tr>
                                            <td><label>PinCode</label></td>
                                            <td><input type="text" className="txtbox" id="pincode" /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button className="btn" onClick={() => setdispForm(false)}>Close</button>
                                                &nbsp;&nbsp;
                                                <button className="btn" onClick={handleSubmit}>Submit</button>
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
                                    <td>Patient</td>
                                    <td>Age</td>
                                    <td>Mail</td>
                                    <td>Last Visit</td>
                                    <td>Total Appts</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                { patientType == "All" && patients.map(item =>{
                                    return(
                                        <tr key={item.id} className="trow">
                                            <td><img src={`https://localhost:7286/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
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
                                { patientType == "Active" && patients.map(item =>{
                                    return item.isActive && (
                                        <tr key={item.id} className="trow">
                                            <td><img src={`https://localhost:7286/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
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
                                { patientType == "InActive" && patients.map(item =>{
                                    return !item.isActive && (
                                        <tr key={item.id} className="trow">
                                            <td><img src={`https://localhost:7286/${item.profilePhoto}`} style={{width:"40px",height:"40px", borderRadius:"20px"}} alt={item.fullName}/></td>
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
                                            <td><img src={`https://localhost:7286/${patientTobeViewed.profilePhoto}`} style={{width:"80px",height:"80px", borderRadius:"45px"}} alt={patientTobeViewed.fullName}></img></td>
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
    );
}

export default Patients;