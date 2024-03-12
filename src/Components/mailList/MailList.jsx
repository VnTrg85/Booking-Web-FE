import style from "./MailList.module.scss";
import classname from "classnames/bind";

const cx = classname.bind(style);

function MailList() {
	return (
		<div className={cx("mail")}>
			<h1 className={cx("mailTitle")}>Save time, save money!</h1>
			<h1 className={cx("mailDesc")}>Sign up and we'll send the best deals to you</h1>
			<div className={cx("mailInputContainer")}>
				<input className={cx("emailInput")} placeholder="Your email address"></input>
				<button className={cx("emailBtn")}>Subscribe</button>
			</div>
		</div>
	);
}

export default MailList;
