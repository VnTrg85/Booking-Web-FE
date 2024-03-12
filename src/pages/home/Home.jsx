import style from "./Home.module.scss";
import classname from "classnames/bind";
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import Featured from "../../Components/featured/Featured";
import Propertylist from "../../Components/propertyList/PropertyList";
import HomeGuestLove from "../../Components/HomeGuestLove/HomeGuestLove";
import MailList from "../../Components/mailList/MailList";
import Footer from "../../Components/footer/Footer";

const cx = classname.bind(style);
function Home() {
	return (
		<div>
			<Navbar></Navbar>
			<Header></Header>
			<div className={cx("homeContainer")}>
				<Featured></Featured>
				<h1 className={cx("homeTitle")}>Browse by property type</h1>
				<Propertylist></Propertylist>
				<h1 className={cx("homeTitle")}>Homes guests love</h1>
				<HomeGuestLove></HomeGuestLove>
				<MailList></MailList>
				<Footer></Footer>
			</div>
		</div>
	);
}

export default Home;
