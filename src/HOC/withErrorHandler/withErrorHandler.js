import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapedComponents, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({ error: error });
            })
        }
        componentWillUnmount() {
            console.log('will unmount', this.reqInterceptors, this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <React.Fragment>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapedComponents {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler;