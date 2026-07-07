import { useRouteError } from "react-router-dom";
function errorPage(){
    const err = useRouteError();
    return(
        <>
            <h1>Ooops....</h1>
            <label>Status : {err.status}</label><br/>
            <label>Status : {err.statusText}</label>
        </>
    );
}
export default errorPage;