import style from "./Featured.module.scss";
import classname from "classnames/bind";
import useFetch from "../../hooks/useFetch";

const cx = classname.bind(style);
function Featured() {
	const { data, loading, error } = useFetch("/api/hotels/countByCity?cities=Berlin,Madrid,London");
	return (
		<div className={cx("featured")}>
			{loading ? (
				"Loading..."
			) : (
				<>
					<div className={cx("featuredItem")}>
						<img
							alt=""
							src="https://q-xx.bstatic.com/xdata/images/city/170x136/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o="
							className={cx("featuredImg")}
						></img>
						<div className={cx("featuredTitles")}>
							<h1>Berlin</h1>
							<h2>{data[0]} properties</h2>
						</div>
					</div>
					<div className={cx("featuredItem")}>
						<img
							alt=""
							src="https://r-xx.bstatic.com/xdata/images/city/170x136/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o="
							className={cx("featuredImg")}
						></img>
						<div className={cx("featuredTitles")}>
							<h1>Madrid</h1>
							<h2>{data[1]} properties</h2>
						</div>
					</div>
					<div className={cx("featuredItem")}>
						<img
							alt=""
							src="https://q-xx.bstatic.com/xdata/images/city/170x136/688956.jpg?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o="
							className={cx("featuredImg")}
						></img>
						<div className={cx("featuredTitles")}>
							<h1>London</h1>
							<h2>{data[2]} properties</h2>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Featured;
