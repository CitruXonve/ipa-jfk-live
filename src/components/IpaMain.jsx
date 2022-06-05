import React from 'react';
import { Container, AppBar, Card, CardContent, CardHeader, CssBaseline, Link, Toolbar, Typography, Grid, Box, makeStyles } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { Copyright } from '@material-ui/icons';
import IpaForm from './IpaForm';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: pink[500],
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? pink[200] : pink[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

function CopyrightSection() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright&nbsp;<Copyright fontSize="inherit"/>&nbsp;2021-
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

function IpaMain() {
  const classes = useStyles.apply(this);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" display={{ xs: 'none', sm: 'block' }} color="primary" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            b1f6c1c4/IPA-JFK (Live)
          </Typography>
          <nav>
            <Link variant="button" color="inherit" href="https://github.com/b1f6c1c4/IPA-JFK" className={classes.link} target="_blank" rel="noopener">
              Github Repo
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          IPA-JFK
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
          International Phonetic Alphabet (IPA)<br/>Narrow transcription of English words in New York City accent
        </Typography>
      </Container>
      <Container maxWidth="sm" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Card>
            <CardHeader title="Show Me IPA NOW!" className={classes.cardHeader}/>
            <CardContent>
              <div className={classes.cardPricing}>
                <IpaForm format="unicode" outputPhonetic={true} showAdv={false}/>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>
      <Container maxWidth="sm" component="footer" className={classes.footer}>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item key="footer.title">
            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
              IPA-JFK Live
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
              This is free software, licensed under AGPL-v3.0-only.
              See the source code for copying conditions.
              You can obtain the source code from GitHub:<br/>
              <a href="https://github.com/b1f6c1c4/IPA-JFK">b1f6c1c4/IPA-JFK</a><br/>
              <a href="https://github.com/CitruXonve/ipa-jfk-live">CitruXonve/ipa-jfk-live</a>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <CopyrightSection />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default IpaMain;
