import React from 'react';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';
import { Link } from '../routes';
import { Col, Row, Card, CardHeader, CardBody, CardText, CardTitle, Button } from "reactstrap";
import { getPortfolios, deletePortfolio } from '../actions';

import { Router } from '../routes';

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

  displayDeletingWarning(portfolioId) {
      const isConfirm = confirm('Are You Sure You Want Delete This Portfolio?');

      if (isConfirm) {
        this.deletePortfolio(portfolioId);
      }
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
                <React.Fragment>
                  <span>
                    <Card className="portfolio-card">
                      <CardHeader className="portfolio-card-header">
                        {portfolio.position}
                      </CardHeader>
                      <CardBody>
                        <p className="portfolio-card-city">
                          {portfolio.location}
                        </p>
                        <CardTitle className="portfolio-card-title">
                          {portfolio.title}
                        </CardTitle>
                        <CardText className="portfolio-card-text">
                          {portfolio.description}
                        </CardText>
                        <div className="readMore">
                          {isAuthenticated && isSiteOwner &&
                            <React.Fragment>
                              <Button color="warning" onClick={ () => Router.pushRoute(`/portfolios/${portfolio._id}/edit`)}>Edit</Button>{' '}
                              <Button onClick={ () => this.displayDeletingWarning(portfolio._id)} color="danger">Delete</Button>
                            </React.Fragment>
                          }
                        </div>
                      </CardBody>
                    </Card>
                  </span>
                </React.Fragment>
              </Col>
            );
        });
    }

    render() {

      const { portfolios } = this.props;
      const { isAuthenticated, isSiteOwner } = this.props.auth;

        return (
          <BaseLayout {...this.props.auth}>
            <BasePage className="portfolios-page" title="Portfolios">
              {isAuthenticated && isSiteOwner &&
                <Button
                  onClick={() => Router.pushRoute("/portfolioNew")}
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