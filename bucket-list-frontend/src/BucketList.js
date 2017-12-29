import React, { Component } from 'react';
import ListItem from './ListItem';
const API = '/api/todos';

class BucketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentWillMount() {
    this.getList();
  }
  getList() {
    fetch(API)
      .then(res => {
        if (!res.ok) {
          if (res.status >= 400 && res.status < 500) {
            res.json().then(data => {
              let err = { errorMessage: data.message };
              throw err;
            });
          } else {
            let err = { errorMessage: 'We had a problem. Please try again' };
            throw err;
          }
        }
        return res.json();
      })
      .then(list => this.setState({ list }));
  }

  render() {
    const list = this.state.list.map(i => <ListItem key={i._id} {...i} />);
    return (
      <div>
        <h1>Bucket List</h1>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default BucketList;
