import React from 'react';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';
import WorkCreateForm from '../components/works/WorkCreateForm';
import { createWork } from '../actions';
import { Row, Col } from 'reactstrap';

import { Router } from '../routes'; 

const INITIAL_VALUES = { title: '', url: '', gitUrl: '', imageUrl: '', description: '' };

class WorkNew extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    }

    this.saveWork = this.saveWork.bind(this);
  }

  saveWork(workData, {setSubmitting}) {
    setSubmitting(true);

    createWork(workData)
    .then(work => {
      setSubmitting(false);
      this.setState({
        error: undefined
      });
      Router.pushRoute('/works');
    })
      .catch( err => {
        const error = err.message || 'Server Error!';
        setSubmitting(false);
        this.setState({
          error: error
        });
      });
  }

    render() {
        const { error } = this.state;
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage
              className="work-create-page"
              title="Create New Work"
            >
              <Row>
                <Col md="6">
                  <WorkCreateForm
                    initialValues={INITIAL_VALUES}
                    error={error}
                    onSubmit={this.saveWork}
                  />
                </Col>
              </Row>
            </BasePage>
          </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(WorkNew);