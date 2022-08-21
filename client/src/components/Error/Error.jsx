import "./Error.scss";
function Error({message,style}) {
    return ( 
        <div className="error-message-wrapper" style={style}>
            <span>
                <ul className="error-message" >
                    <li className="message">{message}</li>
                </ul>
            </span>
        </div>
     );
}

export default Error;