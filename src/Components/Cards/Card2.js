import React from "react";
import {Link} from "react-router-dom";

class Card2 extends React.Component {

    render() {
        return (
            <div className={"carousel-card"}  style={{ backgroundImage: `url(${require("../../images/animals/2.jpeg")})` }}>
                <p className={"pet-name"}>Krzysiek</p>
                <Link to="blog-posts/1128" >
                    <button className={"btn btn-primary"}>Zobacz</button>
                </Link>

            </div>
        )
    }
}

export default Card2;