import React from "react";

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Row, Col } from 'reactstrap';
class Cv extends React.Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="cv-page" title="Preview Of My CV">
        <Row>
          <Col md={{size: 8, offset: 2}}>
            <div className="cv-title">
              <a download="NetanelSheinbinCV.pdf" className="btn btn-success" href="/static/NetanelSheinbinCV.pdf">
                Download
              </a>
            </div>
            <iframe src="/static/NetanelSheinbinCV.pdf" style={{width: '100%', height: '800px'}}>

            </iframe>
          </Col>
        </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Cv;
