import "../css/Menu.css"
import logo from "../img/image.png"
import { Link, useLocation } from "react-router-dom";
function Menu(){
    const location = useLocation();
    return (
        <div className="menu">
            <div id="mediflow">
                <img src={logo} height={25} width={25}></img>
                <label style={{color: "white",fontSize:"large"}}>Medi</label>
                <label style={{color: "#00C9A7" ,fontSize:"large"}}>Flow</label>
            </div>
            <div id="menuoptions">
                <span>MAIN</span>
                <ul className="ullist">
                    <Link to="/" className={location.pathname === "/" ? "active-nav-link" : "nav-link"}><li>☰ Dashboard</li></Link>
                    <Link to={`\appointments`} className={location.pathname === "/appointments" ? "active-nav-link" : "nav-link"}><li>🗒 Appointments</li></Link>
                    <Link to={`\patients`} className={location.pathname === "/patients" ? "active-nav-link" : "nav-link"}><li>𖨆 Patients</li></Link>
                    <Link to={`\doctors`} className={location.pathname === "/doctors" ? "active-nav-link" : "nav-link"}><li>ꨄ︎ Doctors</li></Link>
                </ul>
                <span>BILLING</span>
                <ul className="ullist">
                    <Link to={`\invoices`} className={location.pathname === "/invoices" ? "active-nav-link" : "nav-link"}><li>✉ Invoices</li></Link>
                    <Link to={`\prescriptions`} className={location.pathname === "/prescriptions" ? "active-nav-link" : "nav-link"}><li>🕮 Prescriptions</li></Link>
                </ul>
                <label>System</label>
                <ul className="ullist">
                    <Link to={`\settings`} className={location.pathname === "/settings" ? "active-nav-link" : "nav-link"}><li>🌣 Settings</li></Link>
                </ul>
            </div>
        </div>
    );
}
export default Menu;