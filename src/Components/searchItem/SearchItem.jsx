import style from "./SearchItem.module.scss";
import classname from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classname.bind(style);

function SearchItem({ item }) {
	return (
		<div className={cx("searchItem")}>
			<img className={cx("siImg")} src={item.photos[0]}></img>
			<div className={cx("siDesc")}>
				<h1 className={cx("siTitle")}>{item.name}</h1>
				<span className={cx("siDistance")}>{item.distance}m from center</span>
				<span className={cx("siTaxiOp")}>Free airport taxi</span>
				<span className={cx("siSubTitle")}>Studio Apartment with Air Conditioning</span>
				<span className={cx("siFeatures")}>{item.desc}</span>
				<span className={cx("siCancelOp")}>Free cancellation</span>
				<span className={cx("siCancelOpTitle")}>You can cancel later. So lock in this great price today</span>
			</div>
			<div className={cx("siDetails")}>
				{item.rating && (
					<div className={cx("siRating")}>
						<span>Excellent</span>
						<button>{item.rating}</button>
					</div>
				)}
				<div className={cx("siDetailsText")}>
					<span className={cx("siPrice")}>${item.cheapestPrice}</span>
					<span className={cx("siTaxOp")}>Includes taxes and fees</span>
					<Link to={`/hotels/${item._id}`}>
						<button className={cx("siCheckButton")}>See availability</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SearchItem;
