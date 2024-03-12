import style from "./Login.module.scss";
import classname from "classnames/bind";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const cx = classname.bind(style);

function Login() {
	const [credentials, setCredentials] = useState({
		username: undefined,
		password: undefined,
	});
	const { loading, error, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleChange = e => {
		setCredentials(prev => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};
	const handleClick = async e => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post("/api/auth/login", credentials);
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
			navigate("/");
		} catch (error) {
			dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
		}
	};
	return (
		<div className={cx("login")}>
			<div className={cx("lContainer")}>
				<h1>LOGIN</h1>
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS57cxS-wC2GujcEE-N_c5epmqhydszCHIk1Q&usqp=CAU"></img>
				<input type="text" placeholder="username" id="username" onChange={handleChange}></input>
				<input type="password" placeholder="password" id="password" onChange={handleChange}></input>
				<button disabled={loading} className={cx("lButton")} onClick={handleClick}>
					LOG IN
				</button>
				{error && <span>{error.message}</span>}
			</div>
		</div>
	);
}

export default Login;
