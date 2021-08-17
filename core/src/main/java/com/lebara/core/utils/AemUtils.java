package com.lebara.core.utils;


import com.day.cq.commons.mail.MailTemplate;
import com.day.cq.mailer.MailingException;
import com.day.cq.mailer.MessageGatewayService;
import org.apache.commons.lang.text.StrLookup;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.Group;
import org.apache.sling.api.resource.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.io.IOException;
import java.util.*;

/**
 * This is a utility class for aem specific utilities like getting resource etc.
 */
public class AemUtils {

    private AemUtils() {

    }

    final static Logger LOGGER = LoggerFactory.getLogger(AemUtils.class);

    /**
     * Gets property.
     *
     * @param <T>          the type parameter
     * @param resource     the resource
     * @param propertyName the property name
     * @param clazz        the clazz
     * @return property with propertyName of given type defined by clazz from resource
     */
    public static <T> T getProperty(final Resource resource, final String propertyName, final Class<T> clazz) {
        ValueMap propertiesMap = resource != null ? resource.adaptTo(ValueMap.class) : null;
        return propertiesMap != null ? propertiesMap.get(propertyName, clazz) : null;
    }

    /**
     * Gets string property.
     *
     * @param resource     the resource
     * @param propertyName the property name
     * @return String property with propertyName for resource
     */
    public static String getStringProperty(final Resource resource, final String propertyName) {
        return getProperty(resource, propertyName, String.class);
    }

    /**
     * Gets string[] property as a List.
     *
     * @param resource     the resource
     * @param propertyName the property name
     * @return String property with propertyName for resource
     */
    public static List<String> getStringListProperty(final Resource resource, final String propertyName) {
        final String[] result = getProperty(resource, propertyName, String[].class);
        if (result == null) {
            return new ArrayList<>();
        }

        return Arrays.asList(result);
    }

    /**
     * This method recursively finds all the users inside subgroups as well.
     */
    public static Set<InternetAddress> getEmailIdFromGroupOrUser(Authorizable authorizable) throws RepositoryException {
        Set<InternetAddress> emailIds = new HashSet<>();
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
                } else {
                    getEmailIdFromGroupOrUser(userOfGroup);
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
    public static InternetAddress setUserDetails(Authorizable userOfGroup) throws RepositoryException {
        //not every authorizable has ./profile/email in it, eg admin.
        LOGGER.debug("principal name of authorizable getting the email {}", userOfGroup.getPrincipal().getName());
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
     * this method is responsible for sending the emails.
     */
    public static void sendEmail(Session session, Map<String, String> emailParams, String templatePath, Set<InternetAddress> emailIds, MessageGatewayService messageGatewayService) {
        if (emailIds.isEmpty()) {
            return;
        }
        LOGGER.debug("send templatePath {}", templatePath);
        String senderEmail = "Digital.Assets@lebara.com";
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

    /**
     * this method takes the payloadpath and appends /assetdetails.html beofre the /content
     *
     * @param payloadPath path of image
     * @return payloadpath with assetsdetails in url
     */
    public static String getPathWithAssetDetails(String payloadPath) {
        if (StringUtils.contains(payloadPath, "/content/")) {
            return payloadPath.replace("/content/", "/assetdetails.html/content/");
        }
        return payloadPath;
    }

    /**
     * this method takes the resolver and path as input and returns an externalized path.
     * this method is to be utilized for every pathfield.
     *
     * @param payloadPath      path to be externalized.
     * @return externalized path.
     */
    public static String getLinkWithExtension(String payloadPath) {
        if (payloadPath.startsWith("http") || payloadPath.startsWith("www") || StringUtils.isBlank(payloadPath) || StringUtils.endsWith(payloadPath, LebaraConstants.HTML_EXTENSION)) {
            return payloadPath;
        }
        return payloadPath + LebaraConstants.HTML_EXTENSION;
    }
}