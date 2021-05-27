package com.lebara.core.workflow;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang.text.StrLookup;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.Group;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.commons.mail.MailTemplate;
import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;
import com.google.gson.Gson;

@Component(
		service=WorkflowProcess.class,
		property = {"process.label=Lebara Email Task"}
		)
public class EmailTask implements WorkflowProcess{

	final Logger LOGGER = LoggerFactory.getLogger(getClass());
	@Reference 
	MessageGatewayService messageGatewayService;

	@Reference
	private ResourceResolverFactory resolverFactory;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {


		ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
		UserManager manager = resourceResolver.adaptTo(UserManager.class);
		Authorizable authorizable;
		try {
			String payloadPath = workItem.getWorkflow().getWorkflowData().getPayload().toString();
			String emailType =  "";
			String userType = "";

			if (metaDataMap.containsKey("PROCESS_ARGS")){
				LOGGER.info("workflow metadata for key PROCESS_ARGS and value {}",metaDataMap.get("PROCESS_ARGS","").toString());
				String processArgs = metaDataMap.get("PROCESS_ARGS", "").toString();
				if(null != processArgs && processArgs.contains(",")) {
					String[] processArgsVal = processArgs.split(",");
					emailType =  processArgsVal[0].split("=")[1];
					userType = processArgsVal[1].split("=")[1];
				} else if(null != processArgs && processArgs.contains("=")) {
					String[] processArgsVal = processArgs.split("=");
					emailType =  processArgsVal[1];
				}
			}
			String templatePath = "";
			//email type
			if(StringUtils.isNotBlank(emailType)) {

				if(emailType.equalsIgnoreCase("approve")) {
					templatePath = "/etc/notifications/email/html5-template-approve.txt";
				} else if(emailType.equalsIgnoreCase("reject")) {
					templatePath = "/etc/notifications/email/html5-template-reject.txt";
				}
			}
			String userToSendEmail = null;
			//user type
			if(StringUtils.isNotBlank(userType)) {
				if(userType.equals("initiator")) {
					userToSendEmail = workItem.getWorkflow().getInitiator();
				} else {
					userToSendEmail = getGroupNameBasedPayloadPath(payloadPath);
				}
			}
			
			LOGGER.debug("userToSendEmail "+ userToSendEmail);
			authorizable = manager.getAuthorizable(userToSendEmail);
			List<InternetAddress> emailIds = new ArrayList<InternetAddress>();
			if(authorizable.isGroup()) {
				Group group = (Group)authorizable;
				while(group.getMembers().hasNext()) {
					Authorizable userOfGroup = group.getMembers().next();
					String emailOfUserOfGroup = userOfGroup.getProperty("./profile/email")[0].getString();
					try {
						emailIds.add(new InternetAddress(emailOfUserOfGroup));
					} catch (AddressException e) {
						LOGGER.error("AddressException", e);
					}
				}
			} else {
				String emailOfUserOfGroup = authorizable.getProperty("./profile/email")[0].getString();
				try {
					emailIds.add(new InternetAddress(emailOfUserOfGroup));
				} catch (AddressException e) {
					LOGGER.error("AddressException", e);
				}
			}
			
			LOGGER.debug("email {} ", emailIds);


			Map<String, String> emailParams = new HashMap<>();
			emailParams.put("senderName", authorizable.getPrincipal().getName());
			emailParams.put("emailSubject", "Asset has rejected by approver group");
			emailParams.put("emailBody", "<p>This is the test email</p>");
			//emailParams.put("payloadPath", payloadPath);
			try {
				send(workflowSession.adaptTo(Session.class), emailParams, templatePath, emailIds);
			} catch (EmailException e) {
				LOGGER.error("EmailException", e);
			} catch (MessagingException e) {
				LOGGER.error("MessagingException", e);
			} catch (IOException e) {
				LOGGER.error("IOException", e);
			}

		} catch (RepositoryException e) {
			LOGGER.error("RepositoryException", e);
		}

	}

	private String getGroupNameBasedPayloadPath(String filePath) {
		LOGGER.debug("entry into getGroupNameBasedPayloadPath");
		String groupName = null;
		ResourceResolver resolver = null;
		HashMap<String, Object> param = new HashMap<>();
		param.put(ResourceResolverFactory.SUBSERVICE, "readService"); //readService is my System User.

		try {
			resolver = resolverFactory.getServiceResourceResolver(param);
			Resource resource =  resolver.getResource("/etc/notifications/group-mapping.json");
			Node jcnode = resource.adaptTo(Node.class).getNode("jcr:content");
			InputStream content = jcnode.getProperty("jcr:data").getBinary().getStream();
			LOGGER.debug("resource "+resource.getPath());
			StringBuilder sb = new StringBuilder();
			String line;            
			BufferedReader br = new BufferedReader(new InputStreamReader(content, StandardCharsets.UTF_8));
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			LOGGER.debug("sb" + sb.toString());
			//jsonObj = new JSONObject(sb.toString());

			Gson gson = new Gson();
			Map<String, String> groupMapping = gson.fromJson(sb.toString(), Map.class);

			for (Map.Entry<String,String> entry : groupMapping.entrySet()) {
				LOGGER.debug("Key = " + entry.getKey() +   ", Value = " + entry.getValue());
				if(filePath.startsWith(entry.getKey())) {
					groupName = entry.getValue();
					break;
				}
			}


			LOGGER.debug("groupMapping " + groupMapping);

		} catch (LoginException e) {
			LOGGER.error("LoginException", e);
		} catch (PathNotFoundException e) {
			LOGGER.error("PathNotFoundException", e);
		} catch (RepositoryException e) {
			LOGGER.error("RepositoryException", e);
		} catch (IOException e) {
			LOGGER.error("IOException", e);
		}
		return groupName;
	}

	private void send(Session session, Map emailParams, String templatePath,List<InternetAddress> emailIds) throws EmailException, MessagingException, IOException {
		LOGGER.debug("send templatePath "+templatePath);
		//String templatePath = "/apps/lebara/email/html5-template.txt";
		String senderEmail = "assethub2019@gmail.com";
		MailTemplate mailTemplate = MailTemplate.create(templatePath, session);
		HtmlEmail email = mailTemplate.getEmail(StrLookup.mapLookup(emailParams), HtmlEmail.class);
		email.setSubject(emailParams.get("emailSubject").toString());
		email.setTo(emailIds);
		email.setFrom(senderEmail);
		MessageGateway messageGateway = messageGatewayService.getGateway(HtmlEmail.class);
		messageGateway.send(email);
		LOGGER.debug("send exit ");
	}

}
