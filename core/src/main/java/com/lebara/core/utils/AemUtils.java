package com.lebara.core.utils;


import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.mail.MailTemplate;
import com.day.cq.i18n.I18n;
import com.day.cq.mailer.MailingException;
import com.day.cq.mailer.MessageGatewayService;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.lebara.core.dto.DashboardLabels;
import org.apache.commons.lang.text.StrLookup;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.Group;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * This is a utility class for aem specific utilities like getting resource etc.
 */
public class AemUtils {

    private AemUtils() {

    }

    final static Logger LOGGER = LoggerFactory.getLogger(AemUtils.class);
    public static final String HTTP = "http";
    public static final String WWW = "www";
    public static final String MAIL_TO = "mailto:";
    public static final String TEL = "tel:";

    private static final String DE_ROOT_PATH = "/content/lebara/de";
    private static final String FR_ROOT_PATH = "/content/lebara/fr";
    private static final String NL_ROOT_PATH = "/content/lebara/nl";
    private static final String DK_ROOT_PATH = "/content/lebara/dk";
    private static final String UK_ROOT_PATH = "/content/lebara/uk";

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
        }catch (MailingException e) {
            LOGGER.error(" MailingException Error in sending an email  [ {} ]", e.getMessage());
        }catch (IOException | EmailException | MessagingException e) {
            LOGGER.error("Error in sending an email  [ {} ]", e.getMessage());
        }
        LOGGER.debug("send exit ");
    }

    /**
     * this method takes the payloadpath and appends /assetdetails.html beofre the /content
     *
     * @param payloadPath path of image
     * @return payloadpath with assetsdetails in url
     */
    public static String getModifiedPath(String payloadPath) {
        if (StringUtils.contains(payloadPath, "/content/dam")) {
            return payloadPath.replace("/content/", "/assetdetails.html/content/");
        }
        return payloadPath.replace("/content/", "/editor.html/content/") + LebaraConstants.HTML_EXTENSION;
    }

    /**
     * this method takes the path as input and returns an externalized path.
     * this method is to be utilized for every pathfield.
     *
     * @param payloadPath      path to be externalized.
     * @return externalized path.
     */
    public static String getLinkWithExtension(String payloadPath, SlingHttpServletRequest request) {
        if (StringUtils.isBlank(payloadPath) || isExternalLink(payloadPath)) {
            return payloadPath;
        }
        return ((request == null) ? payloadPath : trimmedPath(payloadPath)) + (isHtmlExtensionRequired(payloadPath) ? LebaraConstants.HTML_EXTENSION : StringUtils.EMPTY);
    }

    private static String trimmedPath(String payloadPath) {
        if(StringUtils.isNotBlank(payloadPath)){
            payloadPath = StringUtils.replace(payloadPath,"/content/lebara/de","");
            payloadPath = StringUtils.replace(payloadPath,"/content/lebara/fr","");
        }
        return payloadPath;
    }

    public static String getLinkWithExtension(String payloadPath, ResourceResolver resourceResolver) {
        if (StringUtils.isBlank(payloadPath) || isExternalLink(payloadPath)) {
            return payloadPath;
        }
        return ((resourceResolver == null) ? payloadPath : trimmedPath(payloadPath)) + (isHtmlExtensionRequired(payloadPath) ? LebaraConstants.HTML_EXTENSION : StringUtils.EMPTY);
    }

    public static String updateShortenLinksInRichText(String text, SlingHttpServletRequest slingRequest) {
        if (StringUtils.isNotBlank(text)) {
            Document document = Jsoup.parse(text);
            Elements ancTag = document.getElementsByTag("a");
            for (Element aTag : ancTag) {
                String hrefURL = aTag.attr("href");
                String shortURL = AemUtils.getLinkWithExtension(hrefURL, slingRequest);
                text = text.replace(hrefURL, shortURL);
            }
        } else {
            return StringUtils.EMPTY;
        }
        return text;
    }

    public static String updateShortenLinksInRichText(String text, ResourceResolver resourceResolver) {
        if (StringUtils.isNotBlank(text)) {
            Document document = Jsoup.parse(text);
            Elements ancTag = document.getElementsByTag("a");
            for (Element aTag : ancTag) {
                String hrefURL = aTag.attr("href");
                String shortURL = AemUtils.getLinkWithExtension(hrefURL, resourceResolver);
                text = text.replace(hrefURL, shortURL);
            }
        } else {
            return StringUtils.EMPTY;
        }
        return text;
    }

    public static boolean isExternalLink(String payloadPath) {
        return payloadPath.startsWith(HTTP) || payloadPath.startsWith(WWW) || payloadPath.startsWith(MAIL_TO)|| payloadPath.startsWith(TEL);
    }

    private static boolean isHtmlExtensionRequired(String payloadPath) {
        if (StringUtils.startsWithIgnoreCase(payloadPath, LebaraConstants.DAM_ROOT_PATH)) {
            return false;
        }
        return !payloadPath.contains(".html");
    }
    /**
     * priority of display of title is navigationtitle > pagetitle > title
     */
    public static String getTitle(final Page page) {
        if (page == null) {
            return StringUtils.EMPTY;
        }
        String title = page.getNavigationTitle();
        if (title == null) {
            title = page.getPageTitle();
        }
        if (title == null) {
            title = page.getTitle();
        }
        if (title == null) {
            title = page.getName();
        }
        return title;
    }
    public static String getInheritedValue(String name, InheritanceValueMap inheritedProp) {
        if (null != inheritedProp) {
            return Optional.ofNullable(inheritedProp.getInherited(name, String.class)).orElse("");
        }
        return StringUtils.EMPTY;
    }

    public static DashboardLabels populateDashboardLabels(SlingHttpServletRequest request) {
        PageManager pageManager = request.getResourceResolver().adaptTo(PageManager.class);
        Page page = null;
        Resource resource = request.getResource();
        if (pageManager != null) {
            page = pageManager.getContainingPage(resource);
        }
        DashboardLabels dashboardLabels = new DashboardLabels();
        if (page != null) {
            InheritanceValueMap inheritedProp = new HierarchyNodeInheritanceValueMap(page.getContentResource());
            dashboardLabels.setDataPlanName(getInheritedValue("dataPlanName", inheritedProp));
            dashboardLabels.setDataType(getInheritedValue("dataType", inheritedProp));
            dashboardLabels.setMinPlanName(getInheritedValue("minPlanName", inheritedProp));
            dashboardLabels.setMinDataType(getInheritedValue("minDataType", inheritedProp));
            dashboardLabels.setSmsPlanName(getInheritedValue("smsPlanName", inheritedProp));
            dashboardLabels.setSmsDataType(getInheritedValue("smsDataType", inheritedProp));
            dashboardLabels.setInternationalMinPlanName(getInheritedValue("internationalMinPlanName", inheritedProp));
            dashboardLabels.setInternationalMinDataType(getInheritedValue("internationalMinDataType", inheritedProp));
            dashboardLabels.setLeftOfLabel(getInheritedValue("leftOfLabel", inheritedProp));
        }
        return dashboardLabels;
    }
    /**
     * this method returns the I18n locale based object
     * @param resourceResolver resourceresolver
     * @param resource resource
     * @param slingRequest SlingHttpServletRequest request
     * @return locale based i18n object
     */
    public static I18n geti18n(ResourceResolver resourceResolver, Resource resource, SlingHttpServletRequest slingRequest) {
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        if (pageManager != null) {
            Page currentPage = pageManager.getContainingPage(resource);
            Locale pageLang = currentPage.getLanguage(false);
            ResourceBundle resourceBundle = slingRequest.getResourceBundle(pageLang);
            return new I18n(resourceBundle);
        }
        return null;
    }

    public static String getFormattedDate(Date date, String datePattern) {
        if (date == null) {
            return StringUtils.EMPTY;
        }
        try {
            SimpleDateFormat formatter = new SimpleDateFormat(datePattern);
            return formatter.format(date);
        } catch (IllegalArgumentException e) {
            return StringUtils.EMPTY;
        }
    }

    public static String getTagValue(String blogTag, TagManager tagManager) {
        if (StringUtils.isBlank(blogTag)) {
            return StringUtils.EMPTY;
        }
        Tag tag = tagManager.resolve(blogTag);
        if (tag == null) {
            return StringUtils.EMPTY;
        }
        return tag.getTitle();
    }

    public static String getCountrySpecificCode(String pagePath) {
        if (StringUtils.startsWith(pagePath, DE_ROOT_PATH)) {
            return "de";
        }
        if (StringUtils.startsWith(pagePath, FR_ROOT_PATH)) {
            return "fr";
        }
        if (StringUtils.startsWith(pagePath, NL_ROOT_PATH)) {
            return "nl";
        }
        if (StringUtils.startsWith(pagePath, DK_ROOT_PATH)) {
            return "dk";
        }
        if (StringUtils.startsWith(pagePath, UK_ROOT_PATH)) {
            return "uk";
        }
        return "de";
    }
}