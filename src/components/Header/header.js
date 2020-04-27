import {Link} from "gatsby"
import React from "react"
import "./header.css"
import {style} from "typestyle";

const Header = ({siteTitle}) =>
{
    const list = ["bouncingball-Столкновение мяча и автомобиля", "ballsmovement-Вывод формулы пути при равномерном движении"];
    const renderList = getList(list);
    const [open, setOpen] = React.useState("open");
    const [hover, setHover] = React.useState(false);

    const resizeW = () =>
    {

        if (window.innerWidth >= 1040)
        {
            setOpen("open");
        } else
        {
            setOpen("");
        }
    }

    React.useEffect(() =>
    {
        resizeW();
        if (window)
        {
            window.addEventListener("resize", resizeW);
        } else
        {
            setOpen("open");
        }
        return () =>
        {
            window.removeEventListener("resize", resizeW);
        }
    }, []);


    return (
        <header className="headerClass" style={{transform: `translateX(${open ? 0 : -99}%)`}}>
            <div style={styles.headerDiv}>
                <h1 style={{margin: 0}}>
                    <Link to="/" style={{color: `#bed7f6`, textDecoration: `none`, fontSize: "1.5rem"}}>
                        {siteTitle}
                    </Link>
                </h1>
                <div className="burgerContainer"
                     style={hover ? {right: open ? "1em" : "-2.9em"} : (open ? {right: 0} : {})}
                     onMouseOver={() => setHover(true)}
                     onMouseLeave={() => setHover(false)}
                     onClick={() => setOpen(state => state === "" ? "open" : "")}>
                    <div className={`burger burger-arrow ${open}`}>
                        <div className="burger-lines"/>
                    </div>
                </div>
                <ul className="listCont">
                    {renderList}
                </ul>
            </div>
            <footer className={styles.footer}>
                © {new Date().getFullYear()}
            </footer>
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
        margin: "10px 0",
        paddingTop: "0.3rem",
        paddingLeft: "10px",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    footer: style({
        position: "absolute",
        bottom: 0,
        transform: "translateX(-50%)",
        color: "white",
        left: "50%"
    })
};

