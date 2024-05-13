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
} from '@material-ui/core';
import axios from 'axios';
import '../styles/IpaForm.scss';

const db = require('../../lib/db');

interface IpaFormProps {
  format: 'unicode' | 'latex' | 'raw',
  outputPhonetic: boolean,
  showAdv: boolean,
}

interface IpaFormStates {
  format: string,
  isPhonetic: boolean,
  showAdv: boolean,
  cmuDict?: string,
  formData: { [id: string]: string },
}

class IpaForm extends React.Component<IpaFormProps, IpaFormStates> {
  constructor(props: IpaFormProps) {
    super(props);
    this.state = {
      format: props.format,
      isPhonetic: props.outputPhonetic,
      showAdv: props.showAdv,
      cmuDict: undefined,
      formData: {},
    };
  }

  handleToggleAdv = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
    });
  };

  handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatType = event.target.value;

    if (formatType && typeof formatType === 'string') {
      this.setState({
        ...this.state,
        format: formatType,
      });
    }
  };

  handlePhoneticChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    this.setState({
      ...this.state,
      isPhonetic: checked,
    });
  };

  handleFormChange = (fieldName: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFormData = this.state.formData ?? {};
      newFormData[fieldName] = event.target.value;
      this.setState({ formData: newFormData });
    };
  };

  loadCmuDict = () => {
    axios.get('/assets/cmudict.txt').then(({ data, status, statusText }) => {
      if (status !== 200 || !data) {
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

  displayIpa = (format: string, phonemic: boolean) => {
    const group: React.DetailedHTMLProps<any, any>[] = [];
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
          group.push(<li key={`res-grp-${count}`}><span>{db.display.latexEncode(ir)}</span></li>);
          break;
        default:
          group.push(<li key={`res-grp-${count}`}><span>{JSON.stringify(ir, null, 2)}</span></li>);
          break;
      }
      count += 1;
    }
    return group;
  };

  render() {
    return (
      <React.Fragment>
        <form id="_frm" noValidate onSubmit={(e) => { e.preventDefault(); } }>
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
                <ul id="_results">
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
