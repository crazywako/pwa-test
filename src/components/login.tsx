import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/login';
import axios from '../libs/axios';
import { RootState } from '../reducers/reducers';
import { FullLogo } from '../resources/svg/hausvise-logo';
import './login.scss';

interface ILoginProps {
  location: any;

  dispatch(arg0: any): void;

  addLoginToken(arg0: string): void;
}

export class Login extends React.Component<ILoginProps, any> {
  public componentDidMount() {
    const search = this.props.location.search;
    const urlParams = new URLSearchParams(search);
    let token: string = urlParams.get('token') || '';
    if (token.length === 0) {
      token = localStorage.getItem('token') || '';
    }
    if (token.length > 0) {
      localStorage.setItem('token', token);
      axios.defaults.headers = { Authorization: `Bearer ${token}` };

      axios({
        method: 'GET',
        url: '/serviceman/auth/verify',
      })
        .then(verified => {
          console.log(verified);
          return this.props.addLoginToken(token);
        })
        .catch(err => {
          console.error(err);
          return this.props.addLoginToken('');
        });

    }
  }

  public render() {
    return (
      <div className={'container is-fluid'}>
        <div className={'columns has-margin-top-50'}>
          <div className={'column is-6 is-offset-3 has-text-centered has-text-white'}>
            <FullLogo/>
            <br/>
            Checking for login...
            <br/>
            <br/>
            <span className="icon is-large">
            <i className="fas fa-spinner fa-spin fa-3x"/>
          </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    login: state.login,
  };
};
const mapDispatchToProps = (dispatch: any) => bindActionCreators(
  {
    addLoginToken: (token: string) => {
      return actions.addLoginToken(token);
    },
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
