import React from 'react';

import { Router } from '../routes';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';
import WorkCreateForm from '../components/works/WorkCreateForm';
import { updateWork, getWorkById } from "../actions";
import { Row, Col } from 'reactstrap';

class WorkEdit extends React.Component {

  static async getInitialProps({req, query}) {
    let work = {};

    try {
      work = await getWorkById(query.id);
    } catch (error) {
      console.error(error);
    }

    return {work};
  }

  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    }
    this.updateWork = this.updateWork.bind(this);
  }

  updateWork(workData, { setSubmitting }) {
    setSubmitting(true);

    updateWork(workData)
    .then(work => {
      setSubmitting(false);
      this.setState({
        error: undefined
      });
      Router.pushRoute('/works');
    })
    .catch(err => {
      const error = err.message || 'Server Error!';
      setSubmitting(false);
      this.setState({
        error: error
      });
    });
  }

  render() {

    const { error } = this.state;
    const { work } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="work-create-page"
          title="Update Work"
        >
          <Row>
            <Col md="6">
              <WorkCreateForm
                initialValues={work}
                error={error}
                onSubmit={this.updateWork}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(WorkEdit);