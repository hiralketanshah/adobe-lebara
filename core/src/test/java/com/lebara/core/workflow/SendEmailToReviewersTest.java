package com.lebara.core.workflow;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Session;
import javax.jcr.Value;
import java.security.Principal;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class SendEmailToReviewersTest {

    @InjectMocks
    private SendEmailToReviewers sendEmailToReviewers = new SendEmailToReviewers();

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private WorkItem workItem;

    @Mock
    private Workflow workflow;

    @Mock
    private Resource resource;

    @Mock
    private ValueMap valueMap;

    @Mock
    private WorkflowData WorkflowData;

    @Mock
    private WorkflowSession workflowSession;

    @Mock
    private MetaDataMap metaDataMap1;

    @Mock
    private MetaDataMap metaDataMap2;

    @Mock
    private UserManager manager;

    @Mock
    private Authorizable authorizable;

    @Mock
    private Principal principal;

    @Mock
    private Session session;

    @BeforeEach
    public void setup(AemContext context) throws Exception {
        String payloadPath = "/content/dam/lebara/markets/fr/assets-rejected/testfile-2021-06-06_01-28-07.JPG";
        Mockito.when(workflowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
        Mockito.when(workItem.getWorkflow()).thenReturn(workflow);
        Mockito.when(workflow.getWorkflowData()).thenReturn(WorkflowData);
        Mockito.when(WorkflowData.getPayload()).thenReturn("/content/dam/lebara/markets/fr/assets-qc/testfile.pdf");
        Mockito.when(resourceResolver.adaptTo(UserManager.class)).thenReturn(manager);
        Mockito.when(manager.getAuthorizable(anyString())).thenReturn(authorizable);
        Mockito.when(authorizable.isGroup()).thenReturn(false);
        Value[] userArray = null;
        Mockito.when(authorizable.getProperty(anyString())).thenReturn(userArray);
        Mockito.when(authorizable.getPrincipal()).thenReturn(principal);
        Mockito.when(principal.getName()).thenReturn("testprinciple");
    }

    @Test
    public void testExecute() {
        sendEmailToReviewers.execute(workItem, workflowSession, metaDataMap2);
    }
}
