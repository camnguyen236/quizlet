import "./Input.scss";
function Input({type,id,placeholder,label,onChange,value}) {
    return ( 
        <label htmlFor={id}>
            <div>
                <input  name={id} value={value}onChange={onChange} className="input" type={type} id={id} placeholder={placeholder} spellCheck="false"/>
                <span className="input-line" style={{width: "100%"}}></span>
            </div>
            <span className="input-label">{label}</span>
        </label>
     );
}

export default Input;