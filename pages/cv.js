import React from "react";

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

class Cv extends React.Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="cv=page" title="I am Cv Page">
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Cv;
