package com.lebara.core.workflow;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang.text.StrLookup;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.Group;
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
import com.day.cq.commons.mail.MailTemplate;
import com.day.cq.mailer.MailingException;
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
		ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
		if (null == resourceResolver) {
			return;
		}

		String payloadPath = workItem.getWorkflow().getWorkflowData().getMetaDataMap().get("newPayloadPath", StringUtils.EMPTY);
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
		String emailRecepientUserOrGroupName = StringUtils.EMPTY;
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

		List<HistoryItem> historyList;
		String userComment = StringUtils.EMPTY;
		try {
			historyList = workflowSession.getHistory(workItem.getWorkflow());
			int listSize = historyList.size();
			HistoryItem lastItem = historyList.get(listSize-1);
			userComment = lastItem.getComment();
			if(userComment != null && userComment.length() > 0) {
				LOGGER.debug("Previous Workflow Comment = " + userComment);
			} else {
				LOGGER.debug("Previous Workflow Comment = null or ''");
			}
		} catch (WorkflowException e) {
			LOGGER.error("WorkflowException {}", e);
		}


		try {

			Authorizable authorizable = manager.getAuthorizable(emailRecepientUserOrGroupName);
			if (null == authorizable) {
				return;
			}
			List<InternetAddress> emailIds = getEmailIdList(authorizable);
			Map<String, String> emailParams = new HashMap<>();
			emailParams.put("senderName", authorizable.getPrincipal().getName());
			emailParams.put("payloadPath", payloadPath);
			emailParams.put("userComment", userComment);
			sendEmail(workflowSession.adaptTo(Session.class), emailParams, templatePath, emailIds);

		} catch (RepositoryException e) {
			LOGGER.error("RepositoryException {}", e);
		}

	}

	/**
	 * This method sets the list of emailids to whom the emails will be sent.
	 */
	private List<InternetAddress> getEmailIdList(Authorizable authorizable) throws RepositoryException {
		List<InternetAddress> emailIds = new ArrayList<>();
		//if authorizable is a group type, send email to all its member users.
		if (null == authorizable) {
			return emailIds;
		}
		if (authorizable.isGroup()) {
			Group group = (Group) authorizable;
			Iterator<Authorizable> members = group.getMembers();
			while (members.hasNext()) {
				Authorizable userOfGroup = members.next();

				//rejecting the groups which are members of the parent group
				// only considering the user members of the parent group
				if (!userOfGroup.isGroup()) {
					InternetAddress internetAddress = setUserDetails(userOfGroup);
					if (null != internetAddress) {
						emailIds.add(internetAddress);
					}
				}

			}
		} else {
			InternetAddress internetAddress = setUserDetails(authorizable);
			if (null != internetAddress) {
				emailIds.add(internetAddress);
			}
		}
		return emailIds;
	}

	/**
	 * this method returns the email details of user authorizables and not group authorizables
	 * this method returns null if email is not present for that user.
	 */
	private InternetAddress setUserDetails(Authorizable userOfGroup) throws RepositoryException {
		//not every authorizable has ./profile/email in it, eg admin.
		Value[] userArray = userOfGroup.getProperty("./profile/email");
		String emailOfUserOfGroup = StringUtils.EMPTY;
		if (ArrayUtils.isNotEmpty(userArray)) {
			emailOfUserOfGroup = userArray[0].getString();
		}
		try {
			if (StringUtils.isNotBlank(emailOfUserOfGroup)) {
				return new InternetAddress(emailOfUserOfGroup);
			}

		} catch (AddressException e) {
			LOGGER.error("AddressException", e);
		}
		return null;
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

	/**
	 * this method is responsible for sending the emails.
	 */
	private void sendEmail(Session session, Map<String, String> emailParams, String templatePath, List<InternetAddress> emailIds) {
		if (emailIds.isEmpty()) {
			return;
		}
		LOGGER.debug("send templatePath {}", templatePath);
		String senderEmail = "ankita.kumari@lebara.com";
		MailTemplate mailTemplate = MailTemplate.create(templatePath, session);
		HtmlEmail email;
		try {
			email = mailTemplate.getEmail(StrLookup.mapLookup(emailParams), HtmlEmail.class);
			email.setTo(emailIds);
			email.setFrom(senderEmail);
			messageGatewayService.getGateway(HtmlEmail.class).send(email);
		} catch (IOException e) {
			LOGGER.error("IOException {}", e);
		} catch (MessagingException e) {
			LOGGER.error("MessagingException {}", e);
		} catch (EmailException e) {
			LOGGER.error("EmailException {}", e);
		} catch (MailingException e) {
			LOGGER.error("MailingException {}", e);
		} catch (Exception e) {
			LOGGER.error("MailingException {}", e);
		}

		LOGGER.debug("send exit ");
	}
}
