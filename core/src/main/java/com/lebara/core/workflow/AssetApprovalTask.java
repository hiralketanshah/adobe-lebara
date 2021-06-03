package com.lebara.core.workflow;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
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
		property = {"process.label=Lebara Asset Approval Task"}
		)
public class AssetApprovalTask implements WorkflowProcess {

	final Logger LOGGER = LoggerFactory.getLogger(getClass());
	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {


		ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
		AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
		String payload = workItem.getWorkflowData().getPayload().toString();
		String fileName = payload.substring(payload.lastIndexOf("/"), payload.length());
		String filePath = payload.substring(0, payload.lastIndexOf("/"));
		LOGGER.info("fileName {} filePath {}", fileName, filePath);

		if (metaDataMap.containsKey("PROCESS_ARGS")){
			LOGGER.info("workflow metadata for key PROCESS_ARGS and value {}",metaDataMap.get("PROCESS_ARGS","taskType").toString());
			String procArgs = metaDataMap.get("PROCESS_ARGS","taskType").toString();
			if(null != procArgs) {
				String taskType = procArgs.split("=")[1];
				if(null != taskType && "approve".equals(taskType)) {
					if(null != payload && payload.contains("/assets-qc/")) {
						String newPayload = payload.replaceFirst("/assets-qc/", "/assets-approved/");
						moveAssetTOnewPath(assetManager, payload, newPayload);
					}
				}
				if(null != taskType && "reject".equals(taskType)) {
					if(null != payload && payload.contains("/assets-qc/")) {
						String newPayload = payload.replaceFirst("/assets-qc/", "/assets-rejected/");
						moveAssetTOnewPath(assetManager, payload, newPayload);
					}
				}

			}
		}   

	}

	private void moveAssetTOnewPath(AssetManager assetManager, String payload, String newPayload) {
		if(!assetManager.assetExists(newPayload)) {
			assetManager.moveAsset(payload, newPayload);
		} else {
			if(newPayload.contains(".")) {
				DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");  
				LocalDateTime now = LocalDateTime.now();  
				String currentDateTime = dtf.format(now);
				String payloadv = newPayload.substring(0, newPayload.indexOf(".")) +"-"+currentDateTime+ newPayload.substring(newPayload.indexOf("."), newPayload.length());
				assetManager.moveAsset(payload, payloadv);
			}
		}
	}

	

}
