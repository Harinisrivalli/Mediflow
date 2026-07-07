import "../css/Header.css";
import search from "../img/search.svg";
import notify from "../img/notify.svg";
function Header(props){
    return(
        <>
            <div id="headers">
                <div><span id="title">{props.title}</span></div>
                <div style={{border:"2px solid slategrey", borderRadius:"5px"}}><input type="text" id="searchPatient" style={{ width: 130, height: 20 ,marginLeft: "20px" }} placeholder="Search"/>
                <img src={search} alt="search" style={{height:20, width:20, padding:"3px"}} onClick = {() => {   console.log(document.getElementById("searchPatient").value);props.onSearch(document.getElementById("searchPatient").value)}}></img></div>
                <div><img src={notify} alt="notification" style={{ width: 130, height: 30 ,marginLeft: "40px", padding:"3px"}}></img></div>
                <div>
                    <button style={{height:"50px", width:"100px", backgroundColor:"transparent", borderRadius:"5px", border:"2px solid slategrey"}}>
                       + New Appointment
                    </button>
                </div>
            </div>
        </>
    );
}
export default Header;