import React from 'react';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';
import { Col, Row, Button } from "reactstrap";
import { getWorks, deleteWork } from '../actions';

import { Router } from '../routes';
import WorkCard from '../components/works/WorkCard';

class Works extends React.Component {

  static async getInitialProps() {
    let works = [];

    try {
      works = await getWorks();
    } catch (err) {
      console.error(err);
    }

    return { works };
  }

  displayDeletingWarning(workId, e) {
    e.stopPropagation();
    const isConfirm = confirm('Are You Sure You Want Delete This Work?');

    if (isConfirm) {
      this.deleteWork(workId);
    }
  }

  navigateToEdit(workId, e) {
    e.stopPropagation();
    Router.pushRoute(`/works/${workId}/edit`)
  }

  deleteWork(workId) {
    deleteWork(workId)
    .then( () => {
      Router.pushRoute('/works');
    })
    .catch(err => console.error(err));
  }

  renderWorks(works) {

    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return works.map((work, index) => {
          return (
            <Col md="4" key={index}>
              <WorkCard work={work}>
                {isAuthenticated && isSiteOwner &&
                  <React.Fragment>
                    <Button color="warning" onClick={(e) => this.navigateToEdit(work._id, e)}>Edit</Button>{' '}
                    <Button onClick={(e) => this.displayDeletingWarning(work._id, e)} color="danger">Delete</Button>
                  </React.Fragment>
                }
              </WorkCard>
            </Col>
          );
      });
  }

    render() {

      const { works } = this.props;
      const { isAuthenticated, isSiteOwner } = this.props.auth;

        return (
          <BaseLayout {...this.props.auth}>
            <BasePage className="works-page" title="Works">
              {isAuthenticated && isSiteOwner &&
                <Button
                  onClick={() => Router.pushRoute("/workNew")}
                  color="success"
                  className="create-work-btn"
                >
                  Create Work
                </Button>
              }
              <Row>{this.renderWorks(works)}</Row>
            </BasePage>
          </BaseLayout>
        );
    }
}

export default Works;