import React from 'react';
import Typed from 'react-typed';

import BaseLayout from "../components/layouts/BaseLayout";
import { Container, Row, Col } from 'reactstrap';

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFlipping: false
        };
        this.roles = ["Developer", "Team Player", "Front End", "Angular", "React.js", "ES9", "SCSS", "Back End", "PHP", "PHP Laravel", "Node.js", "Express", "Next.js", "MongoDB"];
    }

    componentDidMount() {
        this.animateCard();
    }

    componentWillUnmount() {
        this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
    }

    animateCard() {
        this.cardAnimationInterval = setInterval( () => {
            this.setState({
                isFlipping: !this.state.isFlipping
            });
        }, 7000);
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;
        const { isFlipping } = this.state;
        return (
            <BaseLayout className={`cover ${isFlipping ? 'cover-1' : 'cover-2'}`} {...this.props.auth} headerType="index" title="Netanel Sheinbin Portfolio">
                <div className="main-section">
                    <div className="background-image">
                        <img alt="welcome picture" src="/static/images/background-index.png" />
                    </div>

                    <Container>
                        <Row>
                            <Col md="6">
                                <div className="hero-section">
                                    <div className={`flipper ${isFlipping ? 'isFlipping' : ''}` }>
                                        <div className="front">
                                            <div className="hero-section-content">
                                                <h2> Full Stack Web Developer </h2>
                                                <div className="hero-section-content-intro">
                                                    Have a Look At My Portfolio & Job History
                                                </div>
                                            </div>
                                            <img className="image" src="/static/images/section-1.png" alt="section image"/>
                                            <div className="shadow-custom">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>
                                        <div className="back">
                                            <div className="hero-section-content">
                                                <h2> Get Your Imagine Done </h2>
                                                <div className="hero-section-content-intro">
                                                    Professional & Top Quality in Web Development
                                                </div>
                                            </div>
                                            <img className="image" src="/static/images/section-2.png" alt="section image"/>
                                            <div className="shadow-custom shadow-custom-2">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6" className="hero-welcome-wrapper">
                                <div className="hero-welcome-text">
                                    <h1>
                                        {isAuthenticated && <span><b> {user.name} </b>, </span> }
                                        Welcome to portfolio website of Netanel Sheinbin.<br />
                                        Get informed, collaborate and discover projects I was working on through the years.
                                    </h1>
                                </div>
                                <Typed
                                    loop
                                    typeSpeed={60}
                                    backSpeed={60}
                                    strings={ this.roles }
                                    shuffle={false}
                                    backDelay={1000}
                                    loopCount={0}
                                    showCursor
                                    cursorChar="|"
                                    className="self-typed"
                                />
                                {/* <div className="hero-welcome-bio">
                                    <h2>
                                        Let's take a look on my work.
                                    </h2>
                                </div> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </BaseLayout>
        );
    }
}

export default Index;