import React from 'react';
import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Checkbox,
  Switch,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

class IPAForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: props.format,
      isPhonetic: props.outputPhonetic,
      showAdv: props.showAdv,
      // cmuPath: require("../../data/cmudict.txt"),
      // cmu: undefined,
    };
    // this.func = require("../func");
    this.generateResult = (format, phonetic) => {
      console.log(this.state);
      this.func.updateByOption(
        typeof format === 'string' ? format : this.state.format,
        typeof phonetic === 'boolean' ? phonetic : this.state.isPhonetic,
      );
    };
  }

  handleToggleAdv = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
    });
  };

  handleWordChange = () => {
    // const word = event.target.value;
    this.generateResult();
  };

  handleFormatChange = (event) => {
    const formatType = event.target.value;

    if (formatType && typeof formatType === 'string') {
      this.setState({
        ...this.state,
        format: formatType,
      });
      // this.state.format = formatType;
      // this.forceUpdate();
      this.generateResult(formatType, undefined);
    } else {
      this.generateResult();
    }
  };

  handlePhoneticChange = (event) => {
    const checked = event.target.checked;
    console.log(checked);

    this.setState({
      ...this.state,
      isPhonetic: checked,
    });
    // this.state.isPhonetic = checked;
    // this.forceUpdate();
    this.generateResult(undefined, checked);
  };

  // loadCmu = () => {
  //   console.log('cmu-path', this.state.cmuPath, typeof(this.state.cmuPath));
  //   if (!this.state.cmu) {
  //     axios.get(this.state.cmuPath, (err, data) => {
  //       console.log('Read CMU file:', JSON.stringify(data));
  //       if (err) {
  //         console.error('Failed to load CMU file', err.message);
  //         return;
  //       }
  //       this.setState({cmu: data});
  //     });
  //   };
  // }

  // componentDidMount() {
  //   this.loadCmu();
  // }

  // componentDidUpdate() {
  //   this.loadCmu();
  // }

  Advanced = () => {
    return (
      <Grid container spacing={2}>
          <Grid item>
            <FormControlLabel
              control={(
                <Checkbox
                  name="phonetic"
                  id="_phonetic"
                  checked={this.state.isPhonetic}
                  onChange={this.handlePhoneticChange}
                />
              )}
              label="Phonetic (narrow) transcription"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              name="ph"
              id="_ph"
              label="Reference Phonemes"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              name="ae"
              id="_ae"
              label="/&aelig;/-raising Hints"
              variant="outlined"
              color="secondary"
              fullWidth
            >
              <span>/&aelig;/-raising Hints</span>
            </TextField>
          </Grid>
          <Grid item sm={12}>
            <TextField
              name="syllable"
              id="_syllable"
              label="Syllabification Hints"
              color="secondary"
              variant="outlined"
              fullWidth
            />
          </Grid>
      </Grid>
    );
  };

  // const IPAForm = () => {
  render() {
    const useStyles = makeStyles((theme) => ({
      '@global': {
        ul: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      results: {
        'font-size': '12px',
        height: '4rem',
      },
    }));

    const classes = useStyles.apply;

    return (
      <React.Fragment>
        <Typography>{this.state.cmu}</Typography>
        <form id="_frm" className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="word"
                id="_word"
                label="Enter any word"
                variant="outlined"
                color="secondary"
                required
                fullWidth
                autoFocus
                onChange={this.handleWordChange}
              />
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="Format"
                  name="format"
                  value={this.state.format}
                  onChange={this.handleFormatChange}
                >
                  <FormControlLabel
                    id="_unicode"
                    value="unicode"
                    control={<Radio />}
                    label="Unicode"
                  />
                  <FormControlLabel
                    id="_latex"
                    value="latex"
                    control={<Radio />}
                    label="LaTeX/tipa"
                  />
                  <FormControlLabel
                    id="_raw"
                    value="raw"
                    control={<Radio />}
                    label="JSON/Raw"
                  />
                </RadioGroup>
              </FormControl>
              <FormControlLabel
                control={(
                  <Switch
                    name="showAdv"
                    color="secondary"
                    checked={this.state.showAdv}
                    onChange={this.handleToggleAdv}
                  />
                )}
                label="Advanced Settings"
              />
              {this.state.showAdv ? <this.Advanced /> : null}
            </Grid>

            {/* <Grid item sm={12} sm={6}>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">Result(s)</FormLabel>
              <Typography variant="h6" color="textPrimary" component="div">
                <ul id="_results" className={classes.results}></ul>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default IPAForm;
