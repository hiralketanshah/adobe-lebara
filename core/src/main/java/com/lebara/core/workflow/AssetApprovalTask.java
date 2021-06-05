package com.lebara.core.workflow;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

/**
 * This class creates a custom process step and is responsible for moving assets to approved or rejected folder.
 * If on move, the asset already exists, a date timestamp is added to filename.
 */
@Component(
        service = WorkflowProcess.class,
        property = {"process.label=Lebara Asset Approval Rejection Task"}
)
public class AssetApprovalTask implements WorkflowProcess {

    final Logger LOGGER = LoggerFactory.getLogger(getClass());
    static final String PROCESS_ARGS = "PROCESS_ARGS";

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) {
        ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
        if (null == resourceResolver) {
            return;
        }
        AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
        if (null == assetManager) {
            return;
        }
        String payload = workItem.getWorkflowData().getPayload().toString();
        if (StringUtils.isBlank(payload)) {
            return;
        }
        String fileName = payload.substring(payload.lastIndexOf("/"), payload.length());
        String filePath = payload.substring(0, payload.lastIndexOf("/"));
        LOGGER.debug("fileName {} filePath {}", fileName, filePath);

        if (metaDataMap.containsKey(PROCESS_ARGS)) {
            String procArgs = metaDataMap.get(PROCESS_ARGS, "taskType");
            LOGGER.debug("workflow metadata for key PROCESS_ARGS and value {}", procArgs);
            if (StringUtils.isBlank(procArgs)) {
                return;
            }
            String taskType = procArgs.split("=")[1];

            String newPayloadPath = StringUtils.EMPTY;
            if (StringUtils.isNotBlank(taskType) && StringUtils.equalsIgnoreCase(taskType, "approve") && payload.contains("/assets-qc/")) {
                String newPayload = payload.replaceFirst("/assets-qc/", "/assets-approved/");
                newPayloadPath = moveAssetTONewPath(assetManager, payload, newPayload);
            } else if (StringUtils.isNotBlank(taskType) && StringUtils.equalsIgnoreCase(taskType, "reject") && payload.contains("/assets-qc/")) {
                String newPayload = payload.replaceFirst("/assets-qc/", "/assets-rejected/");
                newPayloadPath = moveAssetTONewPath(assetManager, payload, newPayload);
            }
            //after moveAssetTONewPath adds a datestamp to a path, that path is not available in the next processstep,
            // hence passing it on from one step to next process step
            workItem.getWorkflow().getWorkflowData().getMetaDataMap().put("newPayloadPath", newPayloadPath);
        }

    }

    private String moveAssetTONewPath(AssetManager assetManager, String payload, String newPayload) {
        if (!assetManager.assetExists(newPayload)) {
            assetManager.moveAsset(payload, newPayload);
            return newPayload;
        } else {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");
            LocalDateTime now = LocalDateTime.now();
            String currentDateTime = dtf.format(now);
            String payloadWithDate = newPayload.substring(0, newPayload.lastIndexOf(".")) + "-" + currentDateTime + newPayload.substring(newPayload.lastIndexOf("."), newPayload.length());
            assetManager.moveAsset(payload, payloadWithDate);
            return payloadWithDate;
        }
    }


}
