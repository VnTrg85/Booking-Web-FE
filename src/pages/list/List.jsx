import style from "./List.module.scss";
import classname from "classnames/bind";
import { DateRange } from "react-date-range";
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import SearchItem from "../../Components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const cx = classname.bind(style);

function List() {
	const location = useLocation();
	const [info, setInfo] = useState({ destination: location.state.destination, date: location.state.date, option: location.state.option });
	const [destination, setDestination] = useState(info.destination);
	const [date, setDate] = useState(info.date);
	const [openDate, setOpenDate] = useState(false);
	const [option, setOption] = useState(info.option);
	const [min, setMin] = useState(undefined);
	const [max, setMax] = useState(undefined);
	const { data, loading, error, reFetch } = useFetch(`/api/hotels?city=${destination}${min ? `&min=${min}` : ""}${max ? `&max=${max}` : ""}  `);

	const handleClick = () => {
		reFetch();
	};
	const handleOption = (name, value) => {
		setOption(prev => {
			return { ...prev, [name]: value };
		});
	};
	return (
		<div className={cx("list")}>
			<Navbar></Navbar>
			<Header type="list"></Header>
			<div className={cx("listContainer")}>
				<div className={cx("listWrapper")}>
					<div className={cx("listSearch")}>
						<h1 className={cx("lsTitle")}>Search</h1>
						<div className={cx("lsItem")}>
							<label>Destination</label>
							<input placeholder={destination} type="text" onChange={e => setDestination(e.target.value)}></input>
						</div>
						<div className={cx("lsItem")}>
							<label>Checkin-date</label>
							<span
								onClick={() => {
									setOpenDate(!openDate);
								}}
							>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}</span>
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
						</div>
						<div className={cx("lsItem")}>
							<label>Option</label>
							<div className={cx("lsOptions")}>
								<div className={cx("lsOptionItem")}>
									<span className={cx("lsOptionText")}>
										Min price <small>per night</small>
									</span>
									<input
										type="number"
										className={cx("lsOptionInput")}
										min="1"
										onChange={e => setMin(e.target.value)}
										placeholder="1"
									></input>
								</div>
								<div className={cx("lsOptionItem")}>
									<span className={cx("lsOptionText")}>
										Max price <small>per night</small>
									</span>
									<input
										type="number"
										className={cx("lsOptionInput")}
										min="100"
										onChange={e => setMax(e.target.value)}
										placeholder="100"
									></input>
								</div>
								<div className={cx("lsOptionItem")}>
									<span className={cx("lsOptionText")}>Adult</span>
									<input
										type="number"
										min={1}
										className={cx("lsOptionInput")}
										placeholder={option.adult}
										onChange={e => handleOption("adult", e.target.value)}
									></input>
								</div>
								<div className={cx("lsOptionItem")}>
									<span className={cx("lsOptionText")}>Children</span>
									<input
										type="number"
										min={0}
										className={cx("lsOptionInput")}
										placeholder={option.children}
										onChange={e => handleOption("children", e.target.value)}
									></input>
								</div>
								<div className={cx("lsOptionItem")}>
									<span className={cx("lsOptionText")}>Room</span>
									<input
										type="number"
										min={1}
										className={cx("lsOptionInput")}
										placeholder={option.room}
										onChange={e => handleOption("room", e.target.value)}
									></input>
								</div>
							</div>
						</div>
						<button className={cx("")} onClick={handleClick}>
							Search
						</button>
					</div>
					<div className={cx("listResult")}>
						{loading ? "Loading..." : <>{data && data.map(item => <SearchItem item={item} key={item._id}></SearchItem>)}</>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default List;
