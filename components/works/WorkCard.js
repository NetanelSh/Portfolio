import React from "react";
import WorkCardDetail from './WorkCardDetail';

import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle
} from "reactstrap";

export default class WorkCard extends React.Component {

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

        const cardBg = {
          backgroundImage: `url(${work.imageLink})`
        }

        return (
          <span onClick={this.handleToggle}>
            <WorkCardDetail
              toggle={this.handleToggle}
              work={work}
              isOpen={isOpen}
            />
            <Card className="work-card">
              <CardHeader className="work-card-header">
                {work.title}
              </CardHeader>
              <CardBody style={cardBg} className="work-card-body">
                <a href={work.url} className="work-card-title-link">
                  {work.title}
                </a>
                <CardTitle className="work-card-title-git">
                  <a href={work.gitUrl}> {work.title} </a>
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