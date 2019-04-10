import React from "react";
import WorkCardDetail from './WorkCardDetail';

import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle
} from "reactstrap";

export default class WorkCardDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {

        const {work, children} = this.props;
        const { isOpen } = this.state;

        return (
          <span onClick={this.handleToggle}>
            <WorkCardDetail
              toggle={this.handleToggle}
              work={work}
              isOpen={isOpen}
            />
            <Card className="work-card">
              <CardHeader className="work-card-header">
                {work.position}
              </CardHeader>
              <CardBody>
                <p className="work-card-city">
                  {work.location}
                </p>
                <CardTitle className="work-card-title">
                  {work.title}
                </CardTitle>
                <CardText className="work-card-text">
                  {work.description}
                </CardText>
                <div className="readMore">{children}</div>
              </CardBody>
            </Card>
          </span>
        );
    }
}