import React from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';

import Resources from './index';
import ResourceForm from './createResource/index';
import ResourceDetails from './resourceDetails';
// import StackListViewPage from './resourceDetails/component/stackListPage';

type Props = RouteComponentProps;

const ResourceRouting: React.FC<Props> = (props: Props) => {
  console.log(props.match.url);
  return (
    <Switch>
      <Route exact path={props.match.url} component={Resources} />
      <Route exact path={`${props.match.url}/new`} component={ResourceForm} />
      {/* <Route exact path={`${props.match.url}/stackList`} component={StackListViewPage} /> */}
      <Route path={`${props.match.url}/:id`} component={ResourceDetails} />
    </Switch>
  );
};

export default ResourceRouting;
