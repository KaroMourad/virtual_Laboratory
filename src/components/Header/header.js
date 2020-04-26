import {Link} from "gatsby"
import React from "react"
import {HEADER_WIDTH} from "../layout";
import "./header.css"

const Header = ({siteTitle}) =>
{
    const list = ["bouncingball-Столкновение мяча и автомобиля", "ballsmovement-Вывод формулы пути при равномерном движении"];
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
                <Link
                    key={item.split("-")[0]}
                    to={`/${item.split("-")[0]}/`}
                    style={styles.linkStyle}
                    activeStyle={styles.activeLink}
                >
                    {item.split("-")[1]}
                </Link>
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
        boxShadow: "rgb(255, 255, 255) -1px 0px 0px 1px",
        borderRight: "5px solid #5ea501",
    },
    linkStyle: {
        transition: "all 0.2s",
        display: "block",
        color: `#bed7f6`,
        textDecoration: `none`,
        boxShadow: "0 1px 0 #fff",
        borderRadius: "2px",
        paddingBottom: "0.3rem",
        margin: "10px 10px 10px 0",
        paddingTop: "0.3rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        // whiteSpace: "nowrap",
    }
};

