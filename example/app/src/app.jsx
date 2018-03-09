import React from 'react';
import { render } from 'react-dom';

import '../../../src/styles.scss';

// import Editor from '../../lib/components/Editor';

class firstComponent extends React.Component {
  render() {
    return (
      <div>place for your first custom solution</div>
    );
  }
}

class secondComponent extends React.Component {
  render() {
    return (
      <div>place for your second custom solution {JSON.stringify(this.props)}</div>
    );
  }
}

const customComponents = [
  {
    label: 'Custom component 1',
    secret: 'firstComponent',
    view: {
      secret: 'firstComponent',
      component: firstComponent,
    },
  },
  {
    label: 'Custom component 2',
    secret: 'secondComponent',
    view: {
      secret: 'secondComponent',
      component: secondComponent,
    },
  },
];

const renderApp = () => {
  const NextApp = require('../../../src/index.jsx').default
  render(
    <NextApp
      endpoint="/graphql_cms_endpoint"
      graphql="/graphql"
      newMenuItems={customComponents}
    />, document.getElementById('root'));
}

if (module.hot) {
 module.hot.accept('../../../src/index.jsx', function() {
   renderApp()
 })
}

renderApp()
/**
 * if you want to try as separate route
 */
/*render(
 <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
 <Route
 path='/admin'
 endpoint='/graphql_cms_endpoint'
 graphql='/graphql'
 newMenuItems={[newItem]}
 components={GraphqlCMS}
 />
 </Router>, document.getElementById('root'));*/
