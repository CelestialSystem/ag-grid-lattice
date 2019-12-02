import React, { Component } from 'react';
// Material-UI
import { AppBar, IconButton, Grid, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import httpHelper from './helper/httpHelper';

// Material icons
import DayIcon from '@material-ui/icons/WbSunnyOutlined';
import NightIcon from '@material-ui/icons/Brightness3Outlined';
// import LatticeAgGgrid from './components/LatticeAgGrid.jsx';
import LatticeAgGgrid from '@latticejs/ag-grid';
import '@latticejs/ag-grid/styles/lattice-ag-grid-style.css';

import 'typeface-roboto';

// Custom Style
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.primary[theme.palette.type],
    color: theme.palette.primary.contrastText
  },
  widget: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4)
  },
  link: {
    color: theme.palette.text.secondary
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.handleNightModeChange = this.handleNightModeChange.bind(this);
    this.gotData = this.gotData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);

    this.state = {
        columnDefs: [
            { headerName: "Name", field: "name", pinned: true, filter: "agTextColumnFilter", rowDrag: true, checkboxSelection: true },
            { headerName: "Native Name", field: "nativeName", filter: "agTextColumnFilter" },
            { headerName: "Capital", field: "capital", filter: "agTextColumnFilter" },
            { headerName: "Population", field: "population", filter: "agNumberColumnFilter" },
            { headerName: "Region Info",
                children: [
                  { headerName: "Region", field: "region", filter: "agTextColumnFilter" },
                  { headerName: "Sub-Region", field: "subregion", filter: "agTextColumnFilter" },
                  { headerName: "Area", field: "area", filter: "agNumberColumnFilter" }
                ],
            }
        ],
        rowData: [],
        showPagination: false,
    }
  }

  componentDidMount() {
    const httpObj = {
      url: '/all?fields=name;capital;currencies;region;subregion;area;nativeName;languages;timezones;population',
      method: 'get',
    };
    httpHelper(httpObj, this.gotData);
  }

  /**
   * HTTP Response.
   * @param  {Object} data [HTTP Response Object.]
  */
  gotData({ data }) {
    this.setState({ rowData: data });
  }

  /**
   * Pagination Management. But this is not working, Ag-Grid is not working in tandem with state change of React.
   * @return {[type]} [description]
   */
  handlePagination() {
    this.setState({ showPagination: !this.state.showPagination });
  }

  /**
   * Handle night mode change.
  */
  handleNightModeChange() {
    const { updateTheme, nightMode } = this.props;
    updateTheme(!nightMode);
  }

  render() {
    const { classes, nightMode } = this.props;
    const { columnDefs, rowData, showPagination } = this.state;
    return (
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="subtitle1" color="inherit" className={classes.flex}>
              AG-Grid
            </Typography>
            <Tooltip title="Toggle Night Mode" enterDelay={300}>
              <IconButton onClick={this.handleNightModeChange} color="inherit">
                {nightMode ? <DayIcon /> : <NightIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Grid container>
          <LatticeAgGgrid
            animateRows
            enableSorting
            enableFilter
            enableColResize
            rowDragManaged={!showPagination}
            pagination={showPagination}
            paginationAutoPageSize={showPagination}
            columnDefs={columnDefs}
            rowData={rowData}
            rowSelection="multiple"
          >
          </LatticeAgGgrid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
