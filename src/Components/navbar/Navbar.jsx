import style from "./Navbar.module.scss";
import classname from "classnames/bind";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
const cx = classname.bind(style);

function Navbar() {
	const { user } = useContext(AuthContext);
	const [logout, setLogout] = useState(false);
	const handleLogout = () => {
		localStorage.clear("user");
		window.location.reload(true);
	};
	return (
		<div className={cx("navbar")}>
			<div className={cx("navContainer")}>
				<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
					<span className={cx("logo")}>Tbooking</span>
				</Link>
				<div className={cx("navItem")}>
					{user ? (
						<>
							<div
								onClick={() => {
									setLogout(!logout);
								}}
								className={cx("textProfile")}
							>
								{user.username}
								{logout && (
									<div className={cx("profile")}>
										<div onClick={handleLogout} className={cx("profileItem")}>
											Logout
										</div>
									</div>
								)}
							</div>
						</>
					) : (
						<>
							<button className={cx("navButton")}>Register</button>
							<Link to="/login" style={{ fontSize: 12 }}>
								<button className={cx("navButton")}>Login</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
