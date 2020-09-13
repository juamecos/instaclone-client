import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/png/instaclone.png";

import "./Header.scss";
import RightHeader from "./RightHeader";
import Search from "./Search";

const Header = () => {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header-logo">
            <Link to="/" alt="Link to home page">
              <Image src={Logo} alt="Instaclone" />
            </Link>
          </Grid.Column>
          <Grid.Column width={10} className="header-search">
            <Search />
          </Grid.Column>
          <Grid.Column width={3} className="header-options">
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
