package com.lebara.core.workflow;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.lebara.core.services.CrudOperationEpc;
import com.lebara.core.utils.LebaraConstants;

@Component(service = WorkflowProcess.class, immediate = true, property = {"process.label=Lebara EPC data Store Task"}, configurationPid = "com.lebara.core.workflow.LebaraOfferCFStep")
public class LebaraOfferCFStep implements WorkflowProcess {

    private static final Logger logger = LoggerFactory.getLogger(LebaraOfferCFStep.class);

    @Reference
    CrudOperationEpc crudOperationEpc;

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) {
        String payloadPath = workItem.getWorkflowData().getPayload().toString();
        ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
        if (null == resourceResolver) {
            return;
        }
        if (StringUtils.isNotBlank(payloadPath)) {
            crudOperationEpc.readEPCAndCreateCF(payloadPath, resourceResolver);
            logger.debug("bulk content fragment creation triggered at {}", payloadPath);
        }
    }

}