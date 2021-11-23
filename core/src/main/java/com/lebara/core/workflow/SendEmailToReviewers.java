package com.lebara.core.workflow;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.commons.Externalizer;
import com.day.cq.mailer.MessageGatewayService;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.mail.internet.InternetAddress;
import java.util.*;

@Component(
        service = WorkflowProcess.class,
        property = {"process.label=Lebara Send Email to Reviewers"}
)
public class SendEmailToReviewers implements WorkflowProcess {

    @Reference
    MessageGatewayService messageGatewayService;

    final Logger LOGGER = LoggerFactory.getLogger(getClass());
    static Map<String, String> groupMapping = new HashMap<>();

    Set<InternetAddress> emailIds = new HashSet<>();

    static {
        groupMapping = new HashMap<>();
        groupMapping.put("/content/dam/lebara/markets/de", "lebara-reviewer-de");
        groupMapping.put("/content/dam/lebara/markets/fr", "lebara-reviewer-fr");
        groupMapping.put("/content/dam/lebara/markets/uk", "lebara-reviewer-uk");
        groupMapping.put("/content/dam/lebara/markets/dk", "lebara-reviewer-dk");
        groupMapping.put("/content/dam/lebara/markets/nl", "lebara-reviewer-nl");
    }

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) {
        String templatePath = "/etc/notifications/email/html5-template-reviewer.txt";
        sendEmailToReceipients(workItem, workflowSession, templatePath);

    }

    private void sendEmailToReceipients(WorkItem workItem, WorkflowSession workflowSession, String templatePath) {
       String payloadPath = workItem.getWorkflow().getWorkflowData().getPayload().toString();
        ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
        if (null == resourceResolver) {
            return;
        }
        String emailRecepientGroupName = getReviewerGroupNameFromPayloadPath(payloadPath);
        LOGGER.debug("userToSendEmail {}", emailRecepientGroupName);
        UserManager manager = resourceResolver.adaptTo(UserManager.class);
        if (null == manager || StringUtils.isBlank(emailRecepientGroupName)) {
            return;
        }
        final Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
        if (null != externalizer) {
            payloadPath = externalizer.authorLink(resourceResolver, payloadPath);
        }
        try {
            Authorizable authorizable = manager.getAuthorizable(emailRecepientGroupName);
            if (null == authorizable) {
                return;
            }
            Set<InternetAddress> emailIdList = getEmailIdList(authorizable);
            Map<String, String> emailParams = new HashMap<>();
            emailParams.put("payloadPath", AemUtils.getPathWithAssetDetails(payloadPath));
            if (!emailIdList.isEmpty()) {
                AemUtils.sendEmail(workflowSession.adaptTo(Session.class), emailParams, templatePath, emailIdList, messageGatewayService);
            }

        } catch (RepositoryException e) {
            LOGGER.error("RepositoryException {}", e);
        }
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
        return AemUtils.getEmailIdFromGroupOrUser(authorizable);
    }


    /**
     * this method checks country name in the path of the asset and returns the name
     * of that country's publisher group name
     *
     * @param filePath path of the asset containing the country code
     * @return publisher group name for that country
     */
    private String getReviewerGroupNameFromPayloadPath(final String filePath) {
        String groupName = StringUtils.EMPTY;
        for (Map.Entry<String, String> entry : SendEmailToReviewers.groupMapping.entrySet()) {
            if (filePath.startsWith(entry.getKey())) {
                groupName = entry.getValue();
                break;
            }
        }
        return groupName;
    }

}
