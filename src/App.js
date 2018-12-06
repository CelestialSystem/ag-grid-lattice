import React, { Component } from 'react';
// Material-UI
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import httpHelper from './helper/httpHelper';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

// Material icons
import DayIcon from '@material-ui/icons/WbSunnyOutlined';
import NightIcon from '@material-ui/icons/Brightness3Outlined';

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
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4
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
        gridClass: 'ag-theme-balham',
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

    if (this.state.gridClass === 'ag-theme-balham') {
      this.setState({ gridClass: 'ag-theme-balham-dark' });
    } else {
      this.setState({ gridClass: 'ag-theme-balham' });
    }

    updateTheme(!nightMode);
  }

  render() {
    const { classes, nightMode } = this.props;
    const { columnDefs, rowData, showPagination, gridClass } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
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
          <Grid
            item
            xs={12}
            className={gridClass}
            style={{
            height: window.innerHeight-100,
            margin: '20px 50px',
          }}>
            <AgGridReact
                animateRows
                enableSorting
                enableFilter
                enableColResize
                rowDragManaged={!showPagination}
                rowSelection='multiple'
                pagination={showPagination}
                paginationAutoPageSize={showPagination}
                columnDefs={columnDefs}
                rowData={rowData}>
            </AgGridReact>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
