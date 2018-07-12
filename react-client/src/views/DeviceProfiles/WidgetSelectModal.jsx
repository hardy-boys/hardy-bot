import React from 'react';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


import widgetNames from 'variables/widgetNames.js';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class WidgetSelectModal extends React.Component {
  state = {
    widget: '',
  };

  handleChange = (event) => {
    this.setState(
      { widget: event.target.value },
      () => {
        this.props.select(this.state.widget, this.props.profileIndex, this.props.widgetIndex || null);
      },
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              {'Select a Widget'}
            </Typography><br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="widget-native-simple">Widget</InputLabel>
              <Select
                native
                value={this.state.widget}
                onChange={this.handleChange.bind(this)}
                inputProps={{
                  name: 'widget',
                  id: 'widget-native-simple',
                }}
              >
                <option value="" />
                {widgetNames.map((widget, index) => {
                    return (
                      <option key={index} value={widget}>{widget}</option>
                    );
                  })
                }
              </Select>
            </FormControl>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(WidgetSelectModal);
