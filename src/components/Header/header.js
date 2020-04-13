import {Link} from "gatsby"
import React from "react"
import {HEADER_WIDTH} from "../layout";
import "./header.css"

const Header = ({siteTitle}) =>
{
    const list = ["page-2", "page-3"];
    const renderList = getList(list);
    return (
        <header style={{width: HEADER_WIDTH, minWidth: HEADER_WIDTH, background: `#3c5a8c`}}>
            <div style={styles.headerDiv}>
                <h1 style={{margin: 0}}>
                    <Link to="/" style={{color: `#bed7f6`, textDecoration: `none`, fontSize: "1.5rem"}}>
                        {siteTitle}
                    </Link>
                </h1>
                <ul className="listCont">
                    {renderList}
                </ul>
            </div>
        </header>
    );

    function getList(list)
    {
        return list.map(item =>
        {
            return (
                <li key={item}>
                    <Link
                        to={`/${item}`}
                        style={styles.linkStyle}
                        activeStyle={styles.activeLink}
                    >
                        {item}
                    </Link>
                </li>
            );
        });
    }
};

export default Header;


const styles = {
    headerDiv: {
        margin: "0px auto",
        padding: "1.2rem 0.75rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    activeLink: {
        color: "white",
    },
    linkStyle: {
        color: `#bed7f6`,
        textDecoration: `none`
    }
};

