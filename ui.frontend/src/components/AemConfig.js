
import withAsyncImport from "../utils/withAsyncImport";
import { MapTo } from "@adobe/aem-react-editable-components";
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
const LazyTextComponent = withAsyncImport(
    () => import(`./Text/Text`)
);
/**
 * Default Edit configuration for the Text component that interact with the Core Text component and sub-types
 *
 * @type EditConfig
 */
MapTo("lebara/components/text")(LazyTextComponent, {
    emptyLabel: "Text",
    isEmpty: function (props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
});


//lazyload / code splitting examples of external components
const TitleV2 = withAsyncImport(() =>
  import(
    `@adobe/aem-core-components-react-base/dist/authoring/title/v2/TitleV2`
  )
);
MapTo("lebara/components/title")(TitleV2, {
    isEmpty: TitleV2IsEmptyFn
});


MapTo("lebara/components/container")(ContainerV1, {
    isEmpty: ContainerV1IsEmptyFn
});
MapTo("lebara/components/tabs")(TabsV1,{
    isEmpty: TabsV1IsEmptyFn
});
MapTo("lebara/components/accordion")(AccordionV1, {
    isEmpty: AccordionV1IsEmptyFn
});
MapTo("lebara/components/breadcrumb")(BreadCrumbV2, {
    isEmpty: BreadCrumbV2IsEmptyFn
});
MapTo("lebara/components/button")(ButtonV1, {
    sEmpty: ButtonV1IsEmptyFn
});
MapTo("lebara/components/image")(ImageV2, {
    isEmpty: ImageV2IsEmptyFn
});
MapTo("lebara/components/download")(DownloadV1, {
    isEmpty: DownloadV1IsEmptyFn
});
MapTo("lebara/components/separator")(SeparatorV1, {
    isEmpty: SeparatorV1IsEmptyFn
});
MapTo("lebara/components/list")(ListV2, {
    isEmpty: ListV2IsEmptyFn
});
