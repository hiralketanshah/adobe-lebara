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
import withAsyncImport from "../utils/withAsyncImport";

import "./Page/Page";
import "./Container/Container";
import "./ExperienceFragment/ExperienceFragment";
import Teaser from "./Teaser/Teaser";
import ViewPlans from "./ViewPlans/PlanCardWrapper";
import LanguageHeader from "./LanguageHeader/LanguageHeader";
import Header from "./Header/Header";
import LebaraText from "./LebaraText/LebaraText";
import GetApp from "./GetApp/GetApp";
import { MapTo } from "@adobe/aem-react-editable-components";
import Usp from "./usp/usp";
import Porting from "./Porting/Porting";
import Aboutlebara from "./aboutlebara/aboutlebara";
import Carousel from "./Carousel/Carousel";
import Trustpilot from "./Trustpilot/Trustpilot";
import PlanOffers from "./PlanOffers/PlanOffers";
import PostpaidPlans from "./PostpaidPlans/PostpaidPlans";
import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import ProgressStep from "./ProgressStep/ProgressStep";
import FooterMenu from "./FooterMenu/FooterMenu";
import { TitleV2IsEmptyFn } from "@adobe/aem-core-components-react-base/dist/isEmptyFunctions";

import {
  ContainerV1,
  ContainerV1IsEmptyFn,
  TabsV1,
  TabsV1IsEmptyFn,
  AccordionV1,
  AccordionV1IsEmptyFn,
} from "@adobe/aem-core-components-react-spa";

import {
  BreadCrumbV2,
  BreadCrumbV2IsEmptyFn,
  ButtonV1,
  ButtonV1IsEmptyFn,
  ImageV2,
  ImageV2IsEmptyFn,
  // LanguageNavigationV1,
  // NavigationV1,
  DownloadV1,
  DownloadV1IsEmptyFn,
  SeparatorV1,
  SeparatorV1IsEmptyFn,
  ListV2,
  ListV2IsEmptyFn,
} from "@adobe/aem-core-components-react-base";

//lazyload / code splitting example of an internal component
const LazyTextComponent = withAsyncImport(() => import(`./Text/Text`));

//lazyload / code splitting examples of external components
const TitleV2 = withAsyncImport(() =>
  import(
    `@adobe/aem-core-components-react-base/dist/authoring/title/v2/TitleV2`
  )
);

MapTo("lebara/components/download")(DownloadV1, {
  isEmpty: DownloadV1IsEmptyFn,
});
MapTo("lebara/components/list")(ListV2, { isEmpty: ListV2IsEmptyFn });
MapTo("lebara/components/separator")(SeparatorV1, {
  isEmpty: SeparatorV1IsEmptyFn,
});

MapTo("lebara/components/button")(ButtonV1, { isEmpty: ButtonV1IsEmptyFn });
MapTo("lebara/components/image")(ImageV2, { isEmpty: ImageV2IsEmptyFn });
MapTo("lebara/components/title")(TitleV2, { isEmpty: TitleV2IsEmptyFn });

MapTo("lebara/components/breadcrumb")(BreadCrumbV2, {
  isEmpty: BreadCrumbV2IsEmptyFn,
});

MapTo("lebara/components/tabs")(TabsV1, { isEmpty: TabsV1IsEmptyFn });
MapTo("lebara/components/accordion")(AccordionV1, {
  isEmpty: AccordionV1IsEmptyFn,
});
MapTo("lebara/components/container")(ContainerV1, {
  isEmpty: ContainerV1IsEmptyFn,
});

//lazy load of internal component (hello world)

/**
 * Default Edit configuration for the Text component that interact with the Core Text component and sub-types
 *
 * @type EditConfig
 */
const TextEditConfig = {
  emptyLabel: "Text",

  isEmpty: function (props) {
    return !props || !props.text || props.text.trim().length < 1;
  },
};
const TeaserEditConfig = {
  emptyLabel: "Teaser",

  isEmpty: function (props) {
    return !props || !props.title || !props.description;
  },
};
const ViewPlansConfig = {
  emptyLabel: "ViewPlans",

  isEmpty: function (props) {
    return !props || !props.offers || !props.buttonLabel;
  },
};
const detailViewPlansConfig = {
  emptyLabel: "detailViewPlans",

  isEmpty: function (props) {
    return (
      !props ||
      !props?.offers ||
      !props.buttonLabel ||
      !props.title ||
      !props.subTitle ||
      !props.description ||
      !props.hideLabel ||
      !props.ctaTopLink ||
      !props.ctaTopLabel ||
      !props.ctaBottomLink ||
      !props.ctaBottomLabel ||
      !props.buttonLabel
    );
  },
};
const TitleEditConfig = {
  emptyLabel: "Title",

  isEmpty: function (props) {
    return !props || !props.text;
  },
};

const ProgressStepLinksEditConfig = {
  emptyLabel: "Progress Step Links",
  isEmpty: function (props) {
    return !props.pageLinks?.length;
  },
};

const GetAppEditConfig = {
  emptyLabel: "Get APP",
  isEmpty: function (props) {
    return !props.appTitle;
  },
};

const uspEditConfig = {
  emptyLabel: "usp",
  isEmpty: function (props) {
    return !props.title;
  },
};

const PortingEditConfig = {
  emptyLabel: "Porting",
  isEmpty: function (props) {
    return !props.title;
  },
};

const AboutLebaraEditConfig = {
  emptyLabel: "About Lebara",
  isEmpty: function (props) {
    return !props.title;
  },
};

const CarouselEditConfig = {
  emptyLabel: "Carousel",
  isEmpty: function (props) {
    return !props || !props.cqItems;
  },
};

// const trustpilotratingEditConfig = {
//   emptyLabel: "trustpilotrating",
//   isEmpty: function (props) {
//     return !props.fileReferenceBackground;
//   },
// };

const PostpaidPlansEditConfig = {
  emptyLabel: "PostpaidPlans",
  isEmpty: function (props) {
    return !props.durationTitle;
  },
};

const BannerConfig = {
  emptyLabel: "Banner Component",
  isEmpty: function (props) {
    return !props.title;
  },
};

const FaqConfig = {
  emptyLabel: "Faq Component",
  isEmpty: function (props) {
    return !props.title;
  },
};


MapTo("lebara/components/getapp")(GetApp, GetAppEditConfig);
MapTo("lebara/components/text")(LazyTextComponent, TextEditConfig);
MapTo("lebara/components/teaser")(Teaser, TeaserEditConfig);
MapTo("lebara/components/viewplans")(ViewPlans, ViewPlansConfig);
MapTo("lebara/components/detailedviewplans")(PlanOffers, detailViewPlansConfig);
MapTo("lebara/components/progressstep")(
  ProgressStep,
  ProgressStepLinksEditConfig
);
MapTo("lebara/components/header/languagenavigation")(LanguageHeader);
MapTo("lebara/components/header/headernavigation")(Header);
MapTo("lebara/components/title")(LebaraText, TitleEditConfig);
MapTo("lebara/components/footer")(FooterMenu);
MapTo("lebara/components/usp")(Usp, uspEditConfig);
MapTo("lebara/components/aboutlebara")(Aboutlebara, AboutLebaraEditConfig);
MapTo("lebara/components/carousel")(Carousel);
MapTo("lebara/components/trustpilotrating")(Trustpilot);
MapTo("lebara/components/postpaidPlans")(
  PostpaidPlans,
  PostpaidPlansEditConfig
);
MapTo("lebara/components/porting")(Porting, PortingEditConfig);
MapTo("lebara/components/banner")(Banner, BannerConfig);
MapTo("lebara/components/faq")(Faq, FaqConfig);

