
import React from 'react';
import { ComponentMapping, Container } from '@adobe/aem-react-editable-components';
import { CarouselV1IsEmptyFn } from "@adobe/aem-core-components-react-spa/dist/isEmptyFunctions";
import {
  CoreContainerProperties, CoreContainerState, withAuthorPanelSwitch, withStandardBaseCssClass, CoreContainerItem
} from "@adobe/aem-core-components-react-spa";
import { Box } from '@chakra-ui/react';
import Slider from "react-slick";
import CarouselPagingCircle from './CarouselPagingCircle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import { CarouselItemOptions, CarouselProps } from './types';

const formatFn = (value: string, args: string[]) => {
  let content = value;
  for (let i = 0; i < args.length; i++) {
    const replacement = '{' + i + '}';
    content = content.replace(replacement, args[i]);
  }
  return content;
};

export interface CarouselV1Properties extends CoreContainerProperties {
  autoplay: boolean;
  autopauseDisabled: boolean;
  accessibilityLabel: string;
  accessibility: CarouselV1AccessibilityProperties;
  delay: number;
  cqItems: { [key: string]: CoreContainerItem };
}

export interface CarouselV1AccessibilityProperties {
  play: string;
  pause: string;
  next: string;
  previous: string;
  slide: string;
  indicator: string;
  indicators: string;
}
export interface CarouselV1State extends CoreContainerState {
  activeIndex: number,
}

class Carousel extends Container<CarouselV1Properties, CarouselV1State> {
  interval = 0;
  static defaultProps = {
    _allowedComponentPlaceholderListEmptyLabel: 'CarouselV1',
    isInEditor: false,
    autoplay: false,
    cqPath: '',
    cqItems: {},
    cqItemsOrder: [],
    accessibilityLabel: 'Carousel',
    accessibility: {
      play: 'Play',
      pause: 'Pause',
      next: 'Next',
      previous: 'Previous',
      slide: 'Slide {0} of {1}',
      indicator: 'Slide %{0}',
      indicators: 'Choose a slide to display'
    }
  };

  constructor(props: CarouselV1Properties) {
    super(props);
    //@ts-ignore
    this.state = {
      activeIndex: 0,
      componentMapping: this.props.componentMapping || ComponentMapping
    };
  }

  render() {
    const isEmpty = CarouselV1IsEmptyFn(this.props);
    return (
      <div className={this.props.baseCssClass}
        role="group"
        data-panelcontainer="carousel"
        aria-label={this.props.accessibilityLabel}
        aria-roledescription="carousel">
        {!isEmpty && this.renderCarousel()}
        {this.placeholderComponent}
      </div>
    )
  }

  displayItem(item: JSX.Element, index: number) {
    const isActive = index === this.state.activeIndex;
    const display = !!(isActive || this.props.isInEditor);
    const cssClass = isActive ? `${this.props.baseCssClass}__item ${this.props.baseCssClass}__item--active` : `${this.props.baseCssClass}__item`;
    const ariaLabel = formatFn(this.props.accessibility.slide, [(index + 1).toString(), this.props.cqItemsOrder.length.toString()]);
    return (
      <div key={'item-' + index}
        className={cssClass}
        role="tabpanel"
        aria-label={ariaLabel}
        data-cmp-hook-carousel="item">
        {display && item}
      </div>
    )
  }

  renderCarousel() {
    const { activeIndex } = this.state;
    const { cqItems } = this.props;
    const adaptedcqItems = cqItems as CarouselItemOptions;
    console.log(this.childComponents);
    const settings = {
      dots: true,
      arrows: false,
      infinite: false,
      slidesToShow: 1,
      initialSlide: 0,
      adaptiveHeight: true,
      customPaging(index: number) {
        return (
          <CarouselPagingCircle
            w="14px"
            height="14px"
            isActive={index === activeIndex}
          />
        );
      },
    };
    return (
      <div className={this.props.baseCssClass + '__content'} >
        <Box bg="lebaraBlue.500" pb={{ base: "40px", lg: "70px" }}>
          <Slider {...settings} beforeChange={(_: number, next: number) => this.setState({ activeIndex: next })}>
            {
              this.childComponents.map((childComponent, index) => this.displayItem(childComponent, index))
            }
          </Slider>
        </Box>

      </div>
    )
  }

}

export default withStandardBaseCssClass(withAuthorPanelSwitch(Carousel), "cmp-carousel");