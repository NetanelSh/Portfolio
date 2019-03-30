import React from "react";
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = (props) => {

    const { className, children, isAuthenticated, user } = props;
    const headerType = props.headerType || 'default';

    return (
      <React.Fragment>
        <Head>
          <title>Netanel Sheinbin - Portfolio</title>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
        <div className="layout-container">
          <Header
            className={`port-nav-${headerType}`}
            isAuthenticated={isAuthenticated}
            user={user}
          />
          <main className={`cover ${className}`}>
            <div className="wrapper">{children}</div>
          </main>
        </div>
      </React.Fragment>
    );
};

export default BaseLayout;