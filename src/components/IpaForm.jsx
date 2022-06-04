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
import axios from 'axios';
import db from '../../lib/db';

class IpaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: props.format,
      isPhonetic: props.outputPhonetic,
      showAdv: props.showAdv,
      cmuDict: undefined,
      formData: {},
    };
  }

  handleToggleAdv = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
    });
  };

  handleFormatChange = (event) => {
    const formatType = event.target.value;

    if (formatType && typeof formatType === 'string') {
      this.setState({
        ...this.state,
        format: formatType,
      });
    }
  };

  handlePhoneticChange = (event) => {
    const checked = event.target.checked;

    this.setState({
      ...this.state,
      isPhonetic: checked,
    });
  };

  handleFormChange = (fieldName) => {
    return (event) => {
      const newFormData = this.state.formData ?? {};
      newFormData[fieldName] = event.target.value;
      this.setState({ formData: newFormData });
    };
  };

  loadCmuDict = () => {
    axios.get('/data/cmudict.txt').then(({ data, status, statusText }) => {
      if (status !== 200 || statusText !== 'OK' || !data) {
        console.error('Failed to retrieve cmudict', status, statusText);
      }
      console.log('Retrieve cmudict successfully');
      this.setState({ cmuDict: data });
      db.load(data);
      db.cache();
    });
  };

  componentDidMount() {
    this.loadCmuDict();
  }

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
              onChange={this.handleFormChange('ph')}
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
              onChange={this.handleFormChange('ae')}
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
              onChange={this.handleFormChange('syllable')}
            />
          </Grid>
      </Grid>
    );
  };

  displayIpa = (format, phonemic) => {
    const group = [];
    const word = this.state.formData?.word || '';
    // const ph = this.state.formData?.ph || '';
    const ae = this.state.formData?.ae || '';
    const syllable = this.state.formData?.syllable || '';
    if (!word) {
      return group;
    }

    // const phss = ph ? [ph] : db.query(word);
    const phss = db.query(word) ?? [];
    let count = 0;
    for (let phs of phss) {
      const ir = db.process(phs, word, !phonemic, {
        aeHint: ae,
        syllableHint: syllable,
      });

      switch (format) {
        case 'unicode':
          group.push(<li key={`res-grp-${count}`}>{db.display.utf8Encode(ir)}</li>);
          break;
        case 'latex':
          group.push(<li key={`res-grp-${count}`}><pre>{db.display.latexEncode(ir)}</pre></li>);
          break;
        default:
          group.push(<li key={`res-grp-${count}`}><pre>{JSON.stringify(ir, null, 2)}</pre></li>);
          break;
      }
      count += 1;
    }
    return group;
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
                onChange={this.handleFormChange('word')}
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

            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">Result(s)</FormLabel>
              <Typography variant="h6" color="textPrimary" component="div">
                <ul id="_results" className={classes.results}>
                  {this.displayIpa(this.state.format, this.state.isPhonetic ?? false)}
                </ul>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default IpaForm;
