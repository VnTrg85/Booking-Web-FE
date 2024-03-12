import style from "./HomeGuestLove.module.scss";
import classname from "classnames/bind";
import useFetch from "../../hooks/useFetch";

const cx = classname.bind(style);

function HomeGuestLove() {
	const { data, loading, error } = useFetch("/api/hotels?featured=true&limit=5");
	return (
		<div className={cx("homeGuestLove")}>
			{loading ? (
				"Loading..."
			) : (
				<>
					{data &&
						data.map((item, index) => (
							<div className={cx("homeGuestLoveItem")} key={index}>
								<img src={item.photos[0]} alt="" className={cx("homeGuestLoveImg")}></img>
								<div className={cx("homeGuestLoveInfo")}>
									<span className={cx("homeGuestLoveName")}>{item.name}</span>
									<span className={cx("homeGuestLoveCity")}>{item.city}</span>
									{item.rating && (
										<span className={cx("homeGuestLoveRating")}>
											<button>{item.rating}</button>
											<span>Excellent</span>
										</span>
									)}
									<p className={cx("homeGuestLovePrice")}>
										<span>Starting from</span> {item.cheapestPrice}$
									</p>
								</div>
							</div>
						))}
				</>
			)}
		</div>
	);
}

export default HomeGuestLove;
