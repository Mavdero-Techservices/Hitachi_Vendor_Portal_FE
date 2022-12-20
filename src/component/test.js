import React from 'react';
import auth from '../auth/auth-helper';
import { withRouter } from "react-router-dom";
export class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
}
  logout()
  {
    auth.clearJWT(() => this.props.history.push('/'));
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <p>hello</p>
        <buuton onClick={this.logout} >Logout</buuton>
        </div>
     )
  }
}
export default Test;