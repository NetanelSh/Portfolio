import React from 'react';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';

class userBlogs extends React.Component {

    render() {
        return (
            <BaseLayout {...this.props.auth}
                headerType={'landing'}
                className="blog-listing-page"
                title="Netanel Sheinbin - Read Some News">
                <div className="masthead" style={{ "backgroundImage": "url('/static/images/home-bg.jpg')" }}>
                    <div className="overlay"></div>
                    <Container>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    <h1>Fresh Blogs</h1>
                                    <span className="subheading">Programming, Travelling...</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <BasePage className="blog-body">
                    <Row>
                        <Col md="10" lg="8" className="mx-auto">
                            {
                                this.renderBlogs(blogs)
                            }
                            <div className="clearfix">
                                <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
                            </div>
                        </Col>
                    </Row>

                    <footer>
                        <Container>
                            <Row>
                                <div className="col-lg-8 col-md-10 mx-auto">
                                    <ul className="list-inline text-center">
                                        <li className="list-inline-item">
                                            <a target="_blank" href="https://www.facebook.com/groups/217273012433804/?jazoest=26510012195869511271971084598756511378108122691091131211141201017010910474116557610010645897511574116115668565119119586510012177701165586491061151219048557183120488290847377451207611983109114112118697610912011183109109521091159581">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fas fa-circle fa-stack-2x"></i>
                                                    <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a target="_blank" href="https://github.com/Jerga99">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fas fa-circle fa-stack-2x"></i>
                                                    <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="copyright text-muted">Copyright &copy; Filip Jerga 2018</p>
                                </div>
                            </Row>
                        </Container>
                    </footer>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(userBlogs);