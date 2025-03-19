import { Link } from "react-router";
import bannerImg from "../../assets/header.png"

const Banner = () => {
    return (
        <div className="section__container header__container">
            <div className="header__content z-30">
            <h4 className="uppercase">UP TO 20% Discount on</h4>
            <h1>Girl's Fashion</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus est libero optio amet autem pariatur praesentium, quae magni nihil fugit, repudiandae, nam ducimus asperiores quia nesciunt atque temporibus! Dicta, vel.</p>
            <button className="btn"><Link to={"/shop"} >EXPLOR NOW</Link></button>
            </div>
            <div className="header__image">
                <img src={bannerImg} alt="banner imges" />
            </div>
        </div>
    );
};

export default Banner;