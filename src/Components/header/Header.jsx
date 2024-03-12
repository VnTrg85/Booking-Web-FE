import { format } from "date-fns";
import style from "./Header.module.scss";
import classname from "classnames/bind";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPlane, faCar, faTaxi, faPerson, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Children, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext.jsx";
import { AuthContext } from "../../context/AuthContext";
const cx = classname.bind(style);

function Header({ type }) {
	const [destination, setDestination] = useState("");
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	]);
	const [openOption, setOpenOption] = useState(false);
	const [option, setOption] = useState({
		adult: 1,
		children: 0,
		room: 1,
	});
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const handleOption = (name, operation) => {
		setOption(prev => {
			return { ...prev, [name]: operation === "i" ? option[name] + 1 : option[name] - 1 };
		});
	};
	const { dispatch } = useContext(SearchContext);

	const handleSearch = () => {
		dispatch({ type: "NEW_SEARCH", payload: { destination, date, option } });
		navigate("/hotels", { state: { destination, date, option } });
	};
	return (
		<div className={cx("header")}>
			<div className={cx("headerContainer", type === "list" && "listMode")}>
				<div className={cx("headerList")}>
					<div className={cx("headerListItem")}>
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className={cx("headerListItem", "active")}>
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>
					<div className={cx("headerListItem")}>
						<FontAwesomeIcon icon={faCar} />
						<span>Car ntals</span>
					</div>
					<div className={cx("headerListItem")}>
						<FontAwesomeIcon icon={faBed} />
						<span>Actractions</span>
					</div>
					<div className={cx("headerListItem")}>
						<FontAwesomeIcon icon={faTaxi} />
						<span>Airport taxis</span>
					</div>
				</div>
				{type !== "list" && (
					<>
						<h1 className={cx("headerTitle")}> A lifetime of discounts? It's genius</h1>
						<p className={cx("headerDesc")}>
							Get rewarded for your travels - unclock instant savings of 10% or more with a free Tbooking account
						</p>
						{!user && <button className={cx("headerBtn")}>Sign in / Register </button>}
						<div className={cx("headerSearch")}>
							<div className={cx("headerSearchItem")}>
								<FontAwesomeIcon icon={faBed} className={cx("headerIcon")} />
								<input
									type="text"
									placeholder="Where are you going?"
									className={cx("headerSearchInput")}
									onChange={e => setDestination(e.target.value)}
								></input>
							</div>
							<div className={cx("headerSearchItem")}>
								<FontAwesomeIcon icon={faCalendarDays} className={cx("headerIcon")} />
								<span
									onClick={() => {
										setOpenDate(!openDate);
									}}
									className={cx("headerSearchText")}
								>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
								{openDate && (
									<DateRange
										editableDateInputs={true}
										onChange={item => setDate([item.selection])}
										moveRangeOnFirstSelection={false}
										ranges={date}
										className={cx("date")}
										minDate={new Date()}
									/>
								)}
								;
							</div>
							<div className={cx("headerSearchItem")}>
								<FontAwesomeIcon icon={faPerson} className={cx("headerIcon")} />
								<span
									onClick={() => {
										setOpenOption(!openOption);
									}}
									className={cx("headerSearchText")}
								>{`${option.adult} adult ${option.children} children ${option.room} room`}</span>
								{openOption && (
									<div className={cx("option")}>
										<div className={cx("optionItem")}>
											<span className={cx("optionText")}>Adult</span>
											<div className={cx("optionCounter")}>
												<button
													disabled={option.adult <= 1 ? true : false}
													className={cx("optionCounterBtn")}
													onClick={() => {
														handleOption("adult", "d");
													}}
												>
													-
												</button>
												<span className={cx("optionCounterNumber")}>{option.adult}</span>
												<button
													className={cx("optionCounterBtn")}
													onClick={() => {
														handleOption("adult", "i");
													}}
												>
													+
												</button>
											</div>
										</div>
										<div className={cx("optionItem")}>
											<span className={cx("optionText")}>Children</span>
											<div className={cx("optionCounter")}>
												<button
													disabled={option.children <= 0 ? true : false}
													className={cx("optionCounterBtn")}
													onClick={() => {
														handleOption("children", "d");
													}}
												>
													-
												</button>
												<span className={cx("optionCounterNumber")}>{option.children}</span>
												<button
													className={cx("optionCounterBtn")}
													onClick={() => {
														handleOption("children", "i");
													}}
												>
													+
												</button>
											</div>
										</div>
										<div className={cx("optionItem")}>
											<span className={cx("optionText")}>Room</span>
											<div className={cx("optionCounter")}>
												<button
													disabled={option.room <= 1 ? true : false}
													className={cx("optionCounterBtn")}
													onClick={() => {
														handleOption("room", "d");
													}}
												>
													-
												</button>
												<span className={cx("optionCounterNumber")}>{option.room}</span>
												<button
													className={cx("optionCounterBtn")}
													onClick={() => {
														handleOption("room", "i");
													}}
												>
													+
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className={cx("headerSearchItem")}>
								<button className={cx("headerBtn")} onClick={handleSearch}>
									Search
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
