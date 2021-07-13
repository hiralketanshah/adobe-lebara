package com.lebara.core.workflow;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.lebara.core.services.CrudOperationEpc;
import com.lebara.core.utils.LebaraConstants;

@Component(service = WorkflowProcess.class, immediate=true, property = {"process.label=Lebara EPC data Store Task"}, configurationPid = "com.lebara.core.workflow.LebaraOfferCFStep")

public class LebaraOfferCFStep implements WorkflowProcess{

	private static final Logger logger = LoggerFactory.getLogger(LebaraOfferCFStep.class);
	@Reference
	CrudOperationEpc crudOperationEpc;
 
	 
	

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {
		String destinationFolder = getPayloadPath(workItem);
		if(destinationFolder != null) {
			String cfDamPath = destinationFolder + LebaraConstants.SINGLE_SLASH;
			
			crudOperationEpc.readEPCAndCreateCF(cfDamPath);
		}



	}

	private String getPayloadPath(WorkItem workItem) {
		String payload = workItem.getWorkflowData().getPayload().toString();
		if(StringUtils.isNotBlank(payload) && payload.startsWith(LebaraConstants.DAM_PATH)) {
			payload = payload.replaceFirst(LebaraConstants.DAM_PATH, LebaraConstants.EMPTY_STRING);
			return payload;
		}
		return null;
	}

	
	



}






