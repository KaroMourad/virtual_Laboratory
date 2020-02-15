import { Link } from "gatsby"
import React from "react"

const Header = ({ siteTitle }) => 
(
  <header style={{width: 300, background: `rebeccapurple`}}>
    <div style={{ margin: `0 auto`, padding: `1.45rem 1.0875rem`}}>
      <h1 style={{ margin: 0 }}>
        <Link to="/" style={{color: `white`,textDecoration: `none`}}>
          {siteTitle}
        </Link>
      </h1>
	  <div styles={styles.listCont}>
		  <ul>
			  <li>1</li>
		  </ul>
	  </div>
    </div>
  </header>
);

export default Header;

const styles = {
	listCont: {
		marginTop: 50,
		color: "white",
		height: "calc(100vh - 190px)"
	}
}