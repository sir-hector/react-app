import React from "react";
import {Link} from "react-router-dom";

class Card extends React.Component {

    render() {
        return (
            <div className={"carousel-card"}  style={{ backgroundImage: `url(${require("../../images/animals/1.jpeg")})` }}>
                <p className={"pet-name"}>Krzysiek</p>

                <Link to="blog-posts/1128" >
                <button className={"btn btn-primary"}>Zobacz</button>
            </Link>
            </div>
        )
    }
}

export default Card;