import {Link} from "gatsby"
import React from "react"
import {style} from "typestyle"
import {HEADER_WIDTH} from "./layout";

const Header = ({siteTitle}) =>
{
    const list = ["page-2", "page-3"];

    return (
        <header style={{width: HEADER_WIDTH, minWidth: HEADER_WIDTH, background: `#3c5a8c`}}>
            <div style={styles.headerDiv}>
                <h1 style={{margin: 0}}>
                    <Link to="/" style={{color: `#bed7f6`, textDecoration: `none`, fontSize: "1.5rem"}}>
                        {siteTitle}
                    </Link>
                </h1>
                <ul className={styles.listCont}>
                    {getList(list)}
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
    listCont: style({
        margin: "50px 0 20px 0",
        color: "white",
        flex: 1,
        overflow: "auto",
        "$nest": {
            "& > li": {
                boxShadow: "0 1px 0 #fff",
                borderRadius: 2,
                paddingBottom: "0.5rem",
                margin: "10px 10px 10px 0",
                paddingLeft: 10,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            },
            "& > li:hover": {
                boxShadow: "0px 0px 5px 0px #ffffff"
            },
            "& > li > a": {
                display: "block"
            }
        }
    }),
    activeLink: {
        color: "white",
    },
    linkStyle: {
        color: `#bed7f6`,
        textDecoration: `none`
    }
};

