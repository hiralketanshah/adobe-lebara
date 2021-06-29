package com.lebara.core.workflow;

import java.util.*;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.mail.internet.InternetAddress;

import com.day.cq.commons.Externalizer;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.HistoryItem;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.mailer.MessageGatewayService;

@Component(
        service = WorkflowProcess.class,
        property = {"process.label=Lebara Email Task"}
)
public class EmailTask implements WorkflowProcess {

    @Reference
    MessageGatewayService messageGatewayService;

    final Logger LOGGER = LoggerFactory.getLogger(getClass());
    static final String PROCESS_ARGS = "PROCESS_ARGS";
    static Map<String, String> groupMapping = new HashMap<>();

    Set<InternetAddress> emailIds = new HashSet<>();

    static {
        groupMapping = new HashMap<>();
        groupMapping.put("/content/dam/lebara/markets/de", "lebara-publisher-de");
        groupMapping.put("/content/dam/lebara/markets/fr", "lebara-publisher-fr");
        groupMapping.put("/content/dam/lebara/markets/uk", "lebara-publisher-uk");
        groupMapping.put("/content/dam/lebara/markets/dk", "lebara-publisher-dk");
        groupMapping.put("/content/dam/lebara/markets/nl", "lebara-publisher-nl");
    }

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) {
        String emailType = StringUtils.EMPTY;
        String userType = StringUtils.EMPTY;

        if (metaDataMap.containsKey(PROCESS_ARGS)) {
            final String processArgs = metaDataMap.get(PROCESS_ARGS, StringUtils.EMPTY);
            //processArgs type 1 : emailType=approve,userType=non-initiator
            //processArgs type 2 : emailType=reject,userType=initiator
            LOGGER.debug("workflow metadata for key PROCESS_ARGS and value {}", processArgs);
            if (StringUtils.isBlank(processArgs)) {
                return;
            }
            if (processArgs.contains(",")) {
                String[] processArgsVal = processArgs.split(",");
                emailType = processArgsVal[0].split("=")[1];
                userType = processArgsVal[1].split("=")[1];
            }
        }
        String templatePath = StringUtils.EMPTY;

        //emailtype can be approve or reject.
        if (StringUtils.isBlank(emailType)) {
            return;
        }
        if (emailType.equalsIgnoreCase("approve")) {
            templatePath = "/etc/notifications/email/html5-template-approve.txt";
        } else if (emailType.equalsIgnoreCase("reject")) {
            templatePath = "/etc/notifications/email/html5-template-reject.txt";
        }

        //user type can be initiator(for rejected Asset scenario) or non-initiator(for Approved Asset scenario)
        //if asset is rejected, email sent to original creators of asset,
        // if approved, email to be sent to publisher group of that country
        if (StringUtils.isBlank(userType)) {
            return;
        }

        sendEmailToReceipients(workItem, workflowSession, userType, templatePath);

    }

    private void sendEmailToReceipients(WorkItem workItem, WorkflowSession workflowSession, String userType, String templatePath) {
        String emailRecepientUserOrGroupName = StringUtils.EMPTY;
        String payloadPath = workItem.getWorkflow().getWorkflowData().getMetaDataMap().get("newPayloadPath", StringUtils.EMPTY);
        ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
        if (null == resourceResolver) {
            return;
        }
        if (userType.equals("initiator")) {
            //asset rejected, email to be sent to the original creator of the asset.
            emailRecepientUserOrGroupName = workItem.getWorkflow().getInitiator();
            if (StringUtils.isNotBlank(emailRecepientUserOrGroupName) && emailRecepientUserOrGroupName.equals("workflow-service")) {
                emailRecepientUserOrGroupName = AemUtils.getStringProperty(resourceResolver.getResource(payloadPath), "jcr:createdBy");
            }
        } else if (userType.equals("non-initiator")) {
            emailRecepientUserOrGroupName = getPublisherGroupNameFromPayloadPath(payloadPath);
        }

        LOGGER.debug("userToSendEmail {}", emailRecepientUserOrGroupName);
        UserManager manager = resourceResolver.adaptTo(UserManager.class);
        if (null == manager || StringUtils.isBlank(emailRecepientUserOrGroupName)) {
            return;
        }
        final Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
        if (null != externalizer) {
            payloadPath = externalizer.authorLink(resourceResolver, payloadPath);
        }
        try {
            Authorizable authorizable = manager.getAuthorizable(emailRecepientUserOrGroupName);
            if (null == authorizable) {
                return;
            }
            Set<InternetAddress> emailIdList = getEmailIdList(authorizable);
            Map<String, String> emailParams = new HashMap<>();
            emailParams.put("senderName", authorizable.getPrincipal().getName());
            emailParams.put("payloadPath", payloadPath);
            emailParams.put("userComment", getUserComment(workItem, workflowSession));
            AemUtils.sendEmail(workflowSession.adaptTo(Session.class), emailParams, templatePath, emailIdList, messageGatewayService);

        } catch (RepositoryException e) {
            LOGGER.error("RepositoryException {}", e);
        }
    }

    private String getUserComment(WorkItem workItem, WorkflowSession workflowSession) {
        List<HistoryItem> historyList;
        String userComment = StringUtils.EMPTY;
        try {
            historyList = workflowSession.getHistory(workItem.getWorkflow());
            if (CollectionUtils.isNotEmpty(historyList)) {
                HistoryItem lastItem = historyList.get(historyList.size() - 1);
                userComment = lastItem.getComment();
            }

            if (userComment != null && userComment.length() > 0) {
                LOGGER.debug("Previous Workflow Comment = " + userComment);
            } else {
                LOGGER.debug("Previous Workflow Comment = null or ''");
            }
        } catch (WorkflowException e) {
            LOGGER.error("WorkflowException {}", e);
        }
        return userComment;
    }

    /**
     * This method sets the list of emailids to whom the emails will be sent.
     */
    private Set<InternetAddress> getEmailIdList(Authorizable authorizable) throws RepositoryException {
        emailIds = new HashSet<>();
        //if authorizable is a group type, send email to all its member users.
        if (null == authorizable) {
            return emailIds;
        }
        emailIds = AemUtils.getEmailIdFromGroupOrUser(authorizable);
        return emailIds;
    }


    /**
     * this method checks country name in the path of the asset and returns the name
     * of that country's publisher group name
     *
     * @param filePath path of the asset containing the country code
     * @return publisher group name for that country
     */
    private String getPublisherGroupNameFromPayloadPath(final String filePath) {
        String groupName = StringUtils.EMPTY;
        for (Map.Entry<String, String> entry : EmailTask.groupMapping.entrySet()) {
            if (filePath.startsWith(entry.getKey())) {
                groupName = entry.getValue();
                break;
            }
        }
        return groupName;
    }

}
