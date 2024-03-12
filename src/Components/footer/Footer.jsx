import style from "./Footer.module.scss";
import classname from "classnames/bind";

const cx = classname.bind(style);
function Footer() {
	return (
		<div className={cx("footer")}>
			<div className={cx("fLists")}>
				<ul className={cx("fList")}>
					<li className={cx("fListItem")}>Countries</li>
					<li className={cx("fListItem")}>Regions</li>
					<li className={cx("fListItem")}>Cities</li>
					<li className={cx("fListItem")}>Districts</li>
					<li className={cx("fListItem")}>Airports</li>
					<li className={cx("fListItem")}>Hotels</li>
				</ul>
				<ul className={cx("fList")}>
					<li className={cx("fListItem")}>Countries</li>
					<li className={cx("fListItem")}>Regions</li>
					<li className={cx("fListItem")}>Cities</li>
					<li className={cx("fListItem")}>Districts</li>
					<li className={cx("fListItem")}>Airports</li>
					<li className={cx("fListItem")}>Hotels</li>
				</ul>
				<ul className={cx("fList")}>
					<li className={cx("fListItem")}>Countries</li>
					<li className={cx("fListItem")}>Regions</li>
					<li className={cx("fListItem")}>Cities</li>
					<li className={cx("fListItem")}>Districts</li>
					<li className={cx("fListItem")}>Airports</li>
					<li className={cx("fListItem")}>Hotels</li>
				</ul>
			</div>
			<div className={cx("fText")}>Copyright @ 2024 Tbooking</div>
		</div>
	);
}

export default Footer;
