/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from "../../PrivateRoute";
import {AuthoringUtils} from "@adobe/aem-spa-page-model-manager";
/**
 * Helper that facilitate the use of the {@link Route} component
 */

/**
 * Returns a composite component where a {@link Route} component wraps the provided component
 *
 * @param {React.Component} WrappedComponent    - React component to be wrapped
 * @param {string} [extension=html]             - extension used to identify a route amongst the tree of resource URLs
 * @returns {CompositeRoute}
 */
export const withRoute = (WrappedComponent, extension) => {
  return class CompositeRoute extends Component {
    render() {
      const PROJECT_URL_ROOT_REGEX = /^\/content\/lebara\/[a-z]{2}(.*)$/;
      let routePath = (/\%/).test(this.props.cqPath) ? decodeURIComponent(this.props.cqPath) : this.props.cqPath;
      if((this.props.cqPath).concat('.html').includes(window.location.pathname)){
      document.title = this.props.pageTitle;
      }

      if (!routePath) {
        return <WrappedComponent {...this.props} />;
      }
      let paths = ['(.*)' + routePath + '(.' + extension + ')?'];
      extension = extension || 'html';
       if (!AuthoringUtils.isInEditor() && PROJECT_URL_ROOT_REGEX.test(routePath)) {
        paths.push(PROJECT_URL_ROOT_REGEX.exec(routePath)[1] + "(.html)?");
    }
      // Context path + route path + extension
      return (
        <Route
          key={routePath}
          exact
          path={paths}
          render={routeProps => {
            return <PrivateRoute WrappedComponent={WrappedComponent} routeProps={routeProps} {...this.props} />;
          }}
        />
      );
    }
  };
};
