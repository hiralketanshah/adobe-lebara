package com.lebara.core.workflow;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

@Component(
		service=WorkflowProcess.class,
		property = {"process.label=Asset Approval Task - Asset Approval Task"}
		)
public class AssetApprovalTask implements WorkflowProcess {

	@Reference
	AssetManager assetManager;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {

		final Logger LOGGER = LoggerFactory.getLogger(getClass());

		String payload = workItem.getWorkflowData().getPayload().toString();
		String fileName = payload.substring(payload.lastIndexOf("/"), payload.length());
		String filePath = payload.substring(0, payload.lastIndexOf("/"));
		LOGGER.debug("fileName {} filePath {}", fileName, filePath);
		assetManager.moveAsset(payload, filePath+"/approvedAsset/"+fileName);

	}

}
