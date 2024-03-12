import style from "./Reserve.module.scss";
import classname from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";

const cx = classname.bind(style);

function Reserve({ setOpen, hotelId }) {
	const [selectedRooms, setSelectedRooms] = useState([]);
	const { data, loading, error, reFetch } = useFetch(`/api/hotels/room/${hotelId}`);
	const { date } = useContext(SearchContext);
	const navigate = useNavigate();
	const getDateRange = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const dateTemp = new Date(start.getTime());
		const dates = [];

		while (dateTemp <= end) {
			dates.push(new Date(dateTemp).getTime());
			dateTemp.setDate(dateTemp.getDate() + 1);
		}
		return dates;
	};
	const allDates = getDateRange(date[0].startDate, date[0].endDate);
	const isAvailable = roomNumber => {
		const isFound = roomNumber.unavailableDates.some(item => allDates.includes(new Date(item).getTime()));
		return !isFound;
	};
	const handleSelect = e => {
		const checked = e.target.checked;
		const value = e.target.value;
		setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value));
	};
	const handleClick = async () => {
		try {
			await Promise.all(
				selectedRooms.map(roomId => {
					const res = axios.put(`/api/rooms/availablity/${roomId}`, { dates: allDates });
					return res.data;
				}),
			);
			setSelectedRooms([]);
			setOpen(false);
			navigate("/");
		} catch (error) {}
	};
	return (
		<div className={cx("reserve")}>
			<div className={cx("rContainer")}>
				<FontAwesomeIcon icon={faCircleXmark} className={cx("rClose")} onClick={() => setOpen(false)}></FontAwesomeIcon>
				<span>Select your rooms: </span>
				{loading
					? "...Loading"
					: data.map((item, index) => {
							return (
								<div className={cx("rItem")} key={index}>
									<div className={cx("rInfo")}>
										<div className={cx("rTitle")}>Title: {item.title}</div>
										<div className={cx("rDesc")}>Desc: {item.desc}</div>
										<div className={cx("rMax")}>
											Max people: <b>{item.maxPeople}</b>
										</div>
										<div className={cx("rPrice")}>Price: {item.price}</div>
									</div>
									<div className={cx("rSelectRoom")}>
										{item.roomNumbers.map((roomNumber, index) => {
											return (
												<div className={cx("room")} key={index}>
													<label>{roomNumber.number}</label>
													<input
														disabled={!isAvailable(roomNumber)}
														type="checkbox"
														value={roomNumber._id}
														onChange={handleSelect}
													></input>
												</div>
											);
										})}
									</div>
								</div>
							);
					  })}
				<button className={cx("rButton")} onClick={handleClick} disabled={selectedRooms.length > 0 ? false : true}>
					Reserve now
				</button>
			</div>
		</div>
	);
}

export default Reserve;
