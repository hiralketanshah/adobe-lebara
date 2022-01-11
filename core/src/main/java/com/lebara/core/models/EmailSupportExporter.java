package com.lebara.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.lebara.core.utils.AemUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Collections;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {EmailSupportExporter.class,
        ComponentExporter.class}, resourceType = EmailSupportExporter.RESOURCE_TYPE_EMAIL_SUPPORT, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class EmailSupportExporter extends IntroExporter {

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE_EMAIL_SUPPORT = "lebara/components/emailsupport";

    @ScriptVariable
    private Resource resource;

    @SlingObject
    private SlingHttpServletRequest slingRequest;

    @ValueMapValue
    private String firstName;
    @ValueMapValue
    private String firstNameError;
    @ValueMapValue
    private String lastname;
    @ValueMapValue
    private String lastnameError;
    @ValueMapValue
    private String email;
    @ValueMapValue
    private String emailEmptyError;
    @ValueMapValue
    private String emailInvalidError;
    @ValueMapValue
    private String subject;
    @ValueMapValue
    private String subjectError;
    @ValueMapValue
    private String helplabel;
    @ValueMapValue
    private String helpError;
    @ValueMapValue
    private String requestText;
    @ValueMapValue
    private String attachment;
    @ValueMapValue
    private String attachmentDescription;
    @ValueMapValue
    private String submitLabel;
    @ValueMapValue
    private List<String> dropDownValues;

    private String description;

    public List<String> getDropDownValues() {
        return dropDownValues == null ? Collections.emptyList() : Collections.unmodifiableList(dropDownValues);
    }

    public String getFirstName() {
        return firstName;
    }

    public String getFirstNameError() {
        return firstNameError;
    }

    public String getLastname() {
        return lastname;
    }

    public String getLastnameError() {
        return lastnameError;
    }

    public String getEmail() {
        return email;
    }

    public String getEmailEmptyError() {
        return emailEmptyError;
    }

    public String getEmailInvalidError() {
        return emailInvalidError;
    }

    public String getSubject() {
        return subject;
    }

    public String getSubjectError() {
        return subjectError;
    }

    public String getHelplabel() {
        return helplabel;
    }

    public String getHelpError() {
        return helpError;
    }

    public String getRequestText() {
        return requestText;
    }

    public String getAttachment() {
        return attachment;
    }

    public String getAttachmentDescription() {
        return AemUtils.updateShortenLinksInRichText(attachmentDescription,slingRequest);
    }

    public String getSubmitLabel() {
        return submitLabel;
    }

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }



}
