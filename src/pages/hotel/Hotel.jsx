import style from "./Hotel.module.scss";
import classname from "classnames/bind";
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import MailList from "../../Components/mailList/MailList";
import Footer from "../../Components/footer/Footer";
import useFetch from "../../hooks/useFetch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCircleXmark, faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import Reserve from "../../Components/reserve/Reserve";
import { AuthContext } from "../../context/AuthContext";

const cx = classname.bind(style);

function Hotel() {
	const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const location = useLocation();
	const path = location.pathname.split("/")[2];

	const { data, loading, error, reFetch } = useFetch(`/api/hotels/find/${path}`);

	const { date, option } = useContext(SearchContext);
	const { user } = useContext(AuthContext);
	console.log(date);
	const navigate = useNavigate();

	const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
	function dayDifferent(date1, date2) {
		const timeDiff = Math.abs(date2.getTime() - date1.getTime());
		const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
		return diffDays;
	}
	const days = dayDifferent(date[0].startDate, date[0].endDate);
	const handleOpen = i => {
		setSlideNumber(i);
		setOpen(true);
	};

	const handleMove = direction => {
		let newSlideNumber;
		if (direction === "L") {
			newSlideNumber = slideNumber == 0 ? 5 : slideNumber - 1;
		} else {
			newSlideNumber = slideNumber == 5 ? 0 : slideNumber + 1;
		}
		setSlideNumber(newSlideNumber);
	};
	const handleClick = () => {
		if (user) {
			setOpenModal(true);
		} else {
			navigate("/login");
		}
	};
	return (
		<div>
			<Navbar></Navbar>
			<Header type="list"></Header>
			{loading ? (
				"Loading..."
			) : (
				<>
					<div className={cx("hotelContainer")}>
						{open && (
							<div className={cx("slider")}>
								<FontAwesomeIcon icon={faCircleXmark} className={cx("close")} onClick={() => setOpen(false)} />
								<FontAwesomeIcon icon={faCircleLeft} className={cx("arrow")} onClick={() => handleMove("L")} />
								<div className={cx("sliderWrapper")}>
									<img src={data.photos[slideNumber]} alt="" className={cx("sliderImg")}></img>
								</div>
								<FontAwesomeIcon icon={faCircleRight} className={cx("arrow")} onClick={() => handleMove("R")} />
							</div>
						)}
						<div className={cx("hotelWrapper")}>
							<button className={cx("bookNow")}>Reserve for book now </button>
							<h1 className={cx("hotelTitle")}>{data.name}</h1>
							<div className={cx("hotelAddress")}>
								<FontAwesomeIcon icon={faLocationDot} />
								<span>{data.address}</span>
							</div>
							<span className={cx("hotelDistance")}>Excellent location - {data.distance}m from center</span>
							<span className={cx("hotelPriceHighlight")}>
								Book a stay over {data.cheapestPrice}$ at this property and get free airport taxi
							</span>
							<div className={cx("hotelImages")}>
								{data.photos?.map((photo, i) => (
									<div className={cx("hotelImgWrapper")} key={i}>
										<img onClick={() => handleOpen(i)} className={cx("hotelImg")} src={photo}></img>
									</div>
								))}
							</div>
							<div className={cx("hotelDetails")}>
								<div className={cx("hotelDetailsTexts")}>
									<h1 className={cx("hotelTitle")}>Stay in the heart of Hoi An</h1>
									<p className={cx("hotelDesc")}>{data.desc}</p>
								</div>
								<div className={cx("hotelDetailsPrice")}>
									<h1>Perfect for an {days}-night stay!</h1>
									<span>Top location: Highly rated by recent guests (8.1)</span>
									<h2>
										<b>{days * data.cheapestPrice * option.room}$</b> ({days} nights)
									</h2>
									<button onClick={handleClick}>Reserve for book now!</button>
								</div>
							</div>
						</div>
						<MailList></MailList>
						<Footer></Footer>
					</div>
				</>
			)}
			{openModal && <Reserve setOpen={setOpenModal} hotelId={path}></Reserve>}
		</div>
	);
}

export default Hotel;
