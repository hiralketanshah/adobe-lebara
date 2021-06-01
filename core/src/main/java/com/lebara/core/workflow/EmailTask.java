package com.lebara.core.workflow;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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
					payloadPath = payloadPath.replaceFirst("/assets-qc/", "/assets-approved/");
				} else if(emailType.equalsIgnoreCase("reject")) {
					templatePath = "/etc/notifications/email/html5-template-reject.txt";
					payloadPath = payloadPath.replaceFirst("/assets-qc/", "/assets-rejected/");
				}
			}
			String userToSendEmail = null;
			//user type
			if(StringUtils.isNotBlank(userType)) {
				if(userType.equals("initiator")) {
					userToSendEmail = workItem.getWorkflow().getInitiator();
					if(StringUtils.isNotBlank(userToSendEmail) && userToSendEmail.equals("workflow-service")) {
						userToSendEmail = getGroupNameBasedPayloadPath(payloadPath, resourceResolver);
					}
				} else {
					userToSendEmail = getGroupNameBasedPayloadPath(payloadPath, resourceResolver);
				}
			}
			
			LOGGER.info("userToSendEmail "+ userToSendEmail);
			authorizable = manager.getAuthorizable(userToSendEmail);
			List<InternetAddress> emailIds = new ArrayList<InternetAddress>();
			LOGGER.info("autho "+ "before authorizable" );
			if(null != authorizable && authorizable.isGroup()) {
				Group group = (Group)authorizable;
				Iterator<Authorizable> members = group.getMembers();
				while(members.hasNext()) {
					Authorizable userOfGroup = members.next();
					if(!userOfGroup.isGroup()) {
						String emailOfUserOfGroup = userOfGroup.getProperty("./profile/email")[0].getString();
						try {
							emailIds.add(new InternetAddress(emailOfUserOfGroup));
						} catch (AddressException e) {
							LOGGER.error("AddressException", e);
						}
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
			
			LOGGER.info("email {} ", emailIds);


			Map<String, String> emailParams = new HashMap<>();
			emailParams.put("senderName", authorizable.getPrincipal().getName());
			emailParams.put("payloadPath", payloadPath);
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

	private String getGroupNameBasedPayloadPath(String filePath, ResourceResolver resolver) {
		LOGGER.info("entry into getGroupNameBasedPayloadPath");
		String groupName = null;

		try {
			Resource resource =  resolver.getResource("/etc/notifications/group-mapping.json");
			Node jcnode = resource.adaptTo(Node.class).getNode("jcr:content");
			InputStream content = jcnode.getProperty("jcr:data").getBinary().getStream();
			LOGGER.info("resource "+resource.getPath());
			StringBuilder sb = new StringBuilder();
			String line;            
			BufferedReader br = new BufferedReader(new InputStreamReader(content, StandardCharsets.UTF_8));
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			LOGGER.info("sb" + sb.toString());

			Gson gson = new Gson();
			Map<String, String> groupMapping = gson.fromJson(sb.toString(), Map.class);

			for (Map.Entry<String,String> entry : groupMapping.entrySet()) {
				LOGGER.info("Key = " + entry.getKey()	 +   ", Value = " + entry.getValue());
				if(filePath.startsWith(entry.getKey())) {
					groupName = entry.getValue();
					break;
				}
			}


			LOGGER.info("groupMapping " + groupMapping);

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
		LOGGER.info("send templatePath "+templatePath);
		String senderEmail = "assethub2019@gmail.com";
		MailTemplate mailTemplate = MailTemplate.create(templatePath, session);
		HtmlEmail email = mailTemplate.getEmail(StrLookup.mapLookup(emailParams), HtmlEmail.class);
		email.setTo(emailIds);
		email.setFrom(senderEmail);
		MessageGateway messageGateway = messageGatewayService.getGateway(HtmlEmail.class);
		messageGateway.send(email);
		LOGGER.info("send exit ");
	}

}
