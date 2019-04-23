import React from 'react';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';
import { Col, Row, Button } from "reactstrap";
import { getPortfolios, deletePortfolio } from '../actions';

import { Router } from '../routes';
import PortfolioCard from '../components/portfolios/PortfolioCard';

class Portfolios extends React.Component {

  static async getInitialProps() {
    let portfolios = [];

    try {
      portfolios = await getPortfolios();
    } catch (err) {
      console.error(err);
    }

    return { portfolios };
  }

  displayDeletingWarning(portfolioId, e) {
    e.stopPropagation();
    const isConfirm = confirm('Are You Sure You Want Delete This Portfolio?');

    if (isConfirm) {
      this.deletePortfolio(portfolioId);
    }
  }

  navigateToEdit(portfolioId, e) {
    e.stopPropagation();
    Router.pushRoute(`/portfolios/${portfolioId}/edit`)
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId)
    .then( () => {
      Router.pushRoute('/portfolios');
    })
    .catch(err => console.error(err));
  }

  renderPortfolios(portfolios) {

    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return portfolios.map((portfolio, index) => {
          return (
            <Col md="4" key={index}>
              <PortfolioCard portfolio={portfolio}>
                {isAuthenticated && isSiteOwner &&
                  <React.Fragment>
                    <Button color="warning" onClick={(e) => this.navigateToEdit(portfolio._id, e)}>Edit</Button>{' '}
                    <Button onClick={(e) => this.displayDeletingWarning(portfolio._id, e)} color="danger">Delete</Button>
                  </React.Fragment>
                }
              </PortfolioCard>
            </Col>
          );
      });
  }

    render() {

      const { portfolios } = this.props;
      const { isAuthenticated, isSiteOwner } = this.props.auth;

        return (
          <BaseLayout title="Netanel Sheinbin - About My Experience" {...this.props.auth}>
            <BasePage className="portfolios-page" title="Portfolios">
              {isAuthenticated && isSiteOwner &&
                <Button
                  onClick={() => Router.pushRoute("/portfolios/new")}
                  color="success"
                  className="create-port-btn"
                >
                  Create Portfolio
                </Button>
              }
              <Row>{this.renderPortfolios(portfolios)}</Row>
            </BasePage>
          </BaseLayout>
        );
    }
}

export default Portfolios;