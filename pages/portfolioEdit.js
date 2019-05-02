import React from 'react';

import { Router } from '../routes';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { updatePortfolio, getPortfolioById } from "../actions";
import { Row, Col } from 'reactstrap';

class PortfolioEdit extends React.Component {

    static async getInitialProps({req, query}) {
        let portfolio = {};

        try {
            portfolio = await getPortfolioById(query.id);
        } catch (error) {
            console.error(error);
        }

        return {portfolio};
    }

    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        }
        this.updatePortfolio = this.updatePortfolio.bind(this);
    }

    updatePortfolio(portfolioData, { setSubmitting }) {
        setSubmitting(true);

        updatePortfolio(portfolioData)
            .then(portfolio => {
                setSubmitting(false);
                this.setState({
                    error: undefined
                });
                Router.pushRoute('/portfolios');
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
        const { portfolio } = this.props;

        return (
          <BaseLayout {...this.props.auth}>
            <BasePage
              className="portfolio-create-page"
              title="Update Portfolio"
            >
              <Row>
                <Col md="6">
                  <PortfolioCreateForm
                    initialValues={portfolio}
                    error={error}
                    onSubmit={this.updatePortfolio}
                  />
                </Col>
              </Row>
            </BasePage>
          </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(PortfolioEdit);