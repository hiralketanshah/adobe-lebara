import {
    MapTo,
    withComponentMappingContext,
} from '@adobe/aem-react-editable-components';

import LebaraContainer from "./LebaraContainer";

const ContainerConfig = {
    emptyLabel: 'Core Lebara Container',
    
    isEmpty: function(props) {
        return !props || !props.cqItemsOrder || props.cqItemsOrder.length === 0;
    }
};

MapTo('lebara/components/container')(withComponentMappingContext(LebaraContainer), ContainerConfig);