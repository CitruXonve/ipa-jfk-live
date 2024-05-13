import React from "react";
import {
  Container,
  AppBar,
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import IpaForm from "./IpaForm";
import '../styles/IpaMain.scss';

function CopyrightSection() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright&nbsp;
      <Copyright fontSize="inherit" />
      &nbsp;2021-
      {new Date().getFullYear()}
      &nbsp;
      <Link color="inherit" href="https://github.com/b1f6c1c4/">
        b1f6c1c4
      </Link>
      &nbsp;&amp;&nbsp;
      <Link color="inherit" href="https://github.com/CitruXonve/">
        CitruXonve
      </Link>
      .
    </Typography>
  );
}

function Footer() {
  return (
    <Container maxWidth="sm" component="footer">
      <Grid container spacing={2} justifyContent="space-evenly">
        <Grid item key="footer.title">
          <Typography variant="subtitle1" color="textPrimary" gutterBottom>
            IPA-JFK Live
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            display="block"
            gutterBottom
          >
            This is free software, licensed under AGPL-v3.0-only. See the source
            code for copying conditions. You can obtain the source code from
            GitHub:
            <br />
            <a href="https://github.com/b1f6c1c4/IPA-JFK">b1f6c1c4/IPA-JFK</a>
            <br />
            <a href="https://github.com/CitruXonve/ipa-jfk-live">
              CitruXonve/ipa-jfk-live
            </a>
          </Typography>
        </Grid>
      </Grid>
      <Box mt={2}>
        <CopyrightSection />
      </Box>
    </Container>
  );
}

function Header() {
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
        >
          b1f6c1c4/IPA-JFK (Live)
        </Typography>
        <nav>
          <Link
            variant="button"
            color="inherit"
            href="https://github.com/b1f6c1c4/IPA-JFK"
            target="_blank"
            rel="noopener"
          >
            Github Repo
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

function IpaMain() {
  return (
    <React.Fragment>
      <CssBaseline />
      <style></style>
      <Header />
      <Container maxWidth="sm" component="main" className="heroContent">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          IPA-JFK
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          International Phonetic Alphabet (IPA)
          <br />
          Narrow transcription of English words in New York City accent
        </Typography>
      </Container>
      <Container maxWidth="sm" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Card>
            <CardHeader
              title="Show Me IPA NOW!"
            />
            <CardContent>
              <div>
                <IpaForm
                  format="unicode"
                  outputPhonetic={true}
                  showAdv={false}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default IpaMain;
