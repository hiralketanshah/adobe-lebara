import React, {RefObject} from "react";

import {
  ComponentMapping,
  AllowedComponentsContainer,
  Container,
  ResponsiveGrid,
  ResponsiveGridProperties
} from '@adobe/aem-react-editable-components';
import {
  CoreContainerProperties,
  CoreContainerState,
  withStandardBaseCssClass
} from './AbstractCoreContainerComponent';

import "../../styles/page-container.scss";

export interface LebaraContainerProps extends CoreContainerProperties, ResponsiveGridProperties {
  backgroundStyle: string;
  id: string;
  layout?: 'responsiveGrid' | 'simple';
  width?: '';
}

class LebaraContainer extends AllowedComponentsContainer<LebaraContainerProps, CoreContainerState> {
  mainDiv: RefObject<HTMLDivElement>;

    constructor(props: LebaraContainerProps) {
        super(props);

        //@ts-ignore
        this.state = {
            componentMapping: this.props.componentMapping || ComponentMapping,
        };
        this.mainDiv = React.createRef();
    }

    componentDidMount() {
        if (this.mainDiv.current) {
            this.mainDiv.current.setAttribute('style', this.props.backgroundStyle);
        }

    }

    componentDidUpdate() {
        if (this.mainDiv.current) {
            this.mainDiv.current.setAttribute('style', this.props.backgroundStyle);
        }
    }

    get coreContainerProps() {
        return {
            className: 'container responsivegrid ' + (this.props.width ? this.props.width : '')
        };
    }
  
  get childComponents() {
    //@ts-ignore
    return super.child;
  }

  get placeholderComponent() {
    //@ts-ignore
      return super.placeholderComponent;
  }

  render() {
    const {
      componentMapping,
      allowedComponents,
      children,
      cqPath,
      cqItems,
      cqItemsOrder,
      isInEditor,
      width,
      ...otherProps
  } = this.props;

  if (isInEditor && allowedComponents && allowedComponents.applicable) {
      return super.render();
  }

  const gridProps: ResponsiveGridProperties = {
      allowedComponents: {applicable: false, components: []},
      componentMapping: this.state.componentMapping,
      gridClassNames: this.props.gridClassNames,
      columnClassNames: this.props.columnClassNames,
      cqItems: this.props.cqItems,
      cqItemsOrder: this.props.cqItemsOrder,
      title: "",
      cqPath: this.props.cqPath,
      isInEditor: false
  };

  return (
      <div {...this.coreContainerProps}>
            <div ref={this.mainDiv}
                id={this.props.id}
                className={this.props.baseCssClass}>

                {(this.props.layout && this.props.layout === 'simple') &&
                <Container
                    componentMapping={this.state.componentMapping}
                    cqForceReload={this.props.cqForceReload}
                    cqPath={this.props.cqPath}
                    cqItems={this.props.cqItems}
                    cqItemsOrder={this.props.cqItemsOrder}
                    isInEditor={false}/>}

                {(!this.props.layout || this.props.layout !== 'simple') &&
                <ResponsiveGrid {...gridProps}/>

                }
                {this.placeholderComponent}
            </div>
        </div>
    )
  }
}

export default withStandardBaseCssClass(LebaraContainer, "cmp-container");
