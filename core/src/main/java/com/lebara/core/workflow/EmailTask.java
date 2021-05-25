package com.lebara.core.workflow;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang.text.StrLookup;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.ResourceResolver;
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

@Component(
		service=WorkflowProcess.class,
		property = {"process.label=Lebara Email Task"}
		)
public class EmailTask implements WorkflowProcess{
	
	@Reference 
	MessageGatewayService messageGatewayService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {

		final Logger LOGGER = LoggerFactory.getLogger(getClass());
		ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
		UserManager manager = resourceResolver.adaptTo(UserManager.class);
		Authorizable authorizable;
		try {
			authorizable = manager.getAuthorizable(workItem.getWorkflow().getInitiator());
			Value[] email = authorizable.getProperty("./profile/email");
			
			
	        Map<String, String> emailParams = new HashMap<>();
	        emailParams.put("senderFName", "Ankita");
	        emailParams.put("senderLName", "Kumari");
	        emailParams.put("senderEmail", "ankumari@adobe.com");
	        emailParams.put("senderPhone", "");
	        emailParams.put("senderPostalCode", "");
	        emailParams.put("emailSubject", "");
	        emailParams.put("emailBody", "<p>This is the test email</p>");
	        try {
				send(workflowSession.adaptTo(Session.class), emailParams);
			} catch (EmailException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		} catch (RepositoryException e) {
			LOGGER.error("RepositoryException", e);
		}

	}
	
	private void send(Session session, Map emailParams) throws EmailException, MessagingException, IOException {
		String templatePath = "/apps/lebara/email/html5-template.txt";
		String recipient = "ankita.kumari3189@gmail.com";
		String senderEmail = "noreply@adobe.com";
		MailTemplate mailTemplate = MailTemplate.create(templatePath, session);
        Email email = mailTemplate.getEmail(StrLookup.mapLookup(emailParams), HtmlEmail.class);
        email.setSubject(emailParams.get("emailSubject").toString());
        email.setTo(Collections.singleton(new InternetAddress(recipient)));
        email.setFrom(senderEmail);
        MessageGateway messageGateway = messageGatewayService.getGateway(email.getClass());
        messageGateway.send(email);
    }

}
