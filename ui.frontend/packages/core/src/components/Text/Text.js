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

import sanitizeHtml from "sanitize-html";
import sanitizeWhiteList from "../sanitize-html.whitelist";

import React, { Component } from "react";
import extractModelId from "../../utils/extract-model-id";
import GenericText from "@lebara/core/components/GenericText/index";

import "./text.scss";

/**
 * Text React component
 */
class Text extends Component {

  get richTextContent() {
    return (
      <div
        style={{textAlign: this.props.textalignment}}
        id={extractModelId(this.props.cqPath)}
        data-rte-editelement
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(this.props.text, sanitizeWhiteList),
        }}
        className="lb-text-comp"
      />
    );
  }

  get renderNewDesign() {
    return <GenericText text={this.props.text} textAlignment={this.props.textalignment} appliedStyles={this.props.appliedStyles} />
  }

  get textContent() {
    return <div style={{textAlign: this.props.textalignment}}>{this.props.text}</div>;
  }

  render() {

    if(this.props.isNewDesign) {
      return this.renderNewDesign
    }else {
      return this.props.richText ? this.richTextContent : this.textContent;
    }
  }
}

export default Text;
