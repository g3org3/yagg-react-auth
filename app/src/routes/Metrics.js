// deps
import React from 'react';

import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
} from 'material-ui/Table'
import * as request from '../utils/request'
import { flattenMessages } from '../utils/'

export default class Metrics extends React.Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.getTableRows = this.getTableRows.bind(this);
    this.getData();
    this.state = {
      info: {}
    }
  }

  getData() {
    request.get('/api/firebase').then(res => {
      this.setState({
        info: flattenMessages(res.data.info)
      })
    }).catch(err => {
      console.log('err', err.message)
    })
  }

  getTableRows() {
    return Object.keys(this.state.info).map(key => (
      <TableRow key={key}>
        <TableRowColumn>{key}</TableRowColumn>
        <TableRowColumn>{this.state.info[key].toUpperCase()}</TableRowColumn>
      </TableRow>
    ))
  }

  render() {
    const rows = this.getTableRows();
    return <div>
      <h1>Metrics</h1>
       <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Key</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </div>
  }
}