import React, { Component } from 'react';
// Material-UI
import { Grid } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';
// import 'ag-grid-community/dist/styles/ag-theme-material-dark.css';
import '../styles/ag-theme-material.css';
import '../styles/ag-theme-material-dark.css';
import { withTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

class LatticeAgGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridClass: 'ag-theme-material',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.theme) !== JSON.stringify(this.props.theme)) {
      if (nextProps.theme.palette.type === 'light') {
        this.setState({ gridClass: 'ag-theme-material' });
      } else if (nextProps.theme.palette.type === 'dark'){
        this.setState({ gridClass: 'ag-theme-material-dark' });
      }
    }
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props.theme.typography.fontFamily);
    return (
      <Grid
        item
        xs={12}
        className={this.state.gridClass}
        style={{
          height: window.innerHeight-100,
          margin: '20px 20px',
        }}
      >
        <AgGridReact
            {...this.props}
        >
        </AgGridReact>
      </Grid>
    );
  }
}

export default withTheme(LatticeAgGrid);