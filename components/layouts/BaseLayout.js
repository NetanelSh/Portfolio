import React from "react";
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = (props) => {

  const { className, children, isAuthenticated, user, isSiteOwner, cannonical } = props;
  const headerType = props.headerType || 'default';
  const title = props.title || "Netanel Sheinbin Portfolio";
  console.log(process.env.BASE_URL);
    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
          <meta name="description" content="My name is Netanel Sheinbin and I am an experienced Full Stack Web Developer." />
          <meta name="keywords" content="sheinbin portfolio, sheinbin developer, sheinbin freelancig, sheinbin programming, netanel portfolio, netanel developer, netanel freelancig, netanel programming"/>
          <meta property="og:title" content="Netanel Sheinbin - programmer, developer" />
          <meta property="og:locale" content="he_IL" />
          <meta property="og:locale:alternate" content="en_IL" />
          <meta property="og:url" content={`${process.env.BASE_URL}`}/>
          <meta property="og:type" content="website"/>
          <meta property="og:description" content="My name is Netanel Sheinbin and I am an experienced Full Stack Web Developer."/>
          
          {cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`} />}

          <link rel="icon" type="image/ico" href="/static/favicon.ico" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
        <div className="layout-container">
          <Header
            className={`port-nav-${headerType}`}
            isAuthenticated={isAuthenticated}
            user={user}
            isSiteOwner={isSiteOwner}
          />
          <main className={`cover ${className}`}>
            <div className="wrapper">{children}</div>
          </main>
        </div>
      </React.Fragment>
    );
};

export default BaseLayout;