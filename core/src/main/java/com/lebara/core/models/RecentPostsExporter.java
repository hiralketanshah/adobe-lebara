package com.lebara.core.models;


import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.lebara.core.utils.LebaraConstants.LEBARA_BLOG_TEMPLATE;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {RecentPostsExporter.class, ComponentExporter.class},
        resourceType = RecentPostsExporter.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RecentPostsExporter implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "lebara/components/recentposts";

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String recentPostsLabel;

    @ValueMapValue
    private String buttonLabel;

    @ChildResource
    private List<RecentPostBean> recentPostData;

    public String getRecentPostsLabel() {
        return recentPostsLabel;
    }

    public String getButtonLabel() {
        return buttonLabel;
    }

    public List<RecentPostBean> getRecentPostData() {
        List<RecentPostBean> recentPostBeans = new ArrayList<>();
        if (recentPostData == null) {
            return recentPostBeans;
        }
        for (RecentPostBean bean : recentPostData) {
            if (bean == null) {
                continue;
            }
            String blogPath = bean.getArticleLink();
            if (resourceResolver == null) {
                continue;
            }
            Resource blogRes = resourceResolver.getResource(blogPath);
            if (blogRes == null) {
                continue;
            }
            Page page = blogRes.adaptTo(Page.class);
            if (page == null) {
                continue;
            }
            Resource blogContentRes = page.getContentResource();
            if (page.isHideInNav()) {
                continue;
            }
            if (!StringUtils.equals(page.getTemplate().getPath(), LEBARA_BLOG_TEMPLATE)) {
                continue;
            }
            if (StringUtils.isBlank(bean.getHeading())) {
                bean.setHeading(AemUtils.getTitle(page));
            }
            if (StringUtils.isBlank(bean.getImage())) {
                bean.setImage(AemUtils.getStringProperty(blogContentRes, "blogImagePath"));
            }
            bean.setArticleLink(AemUtils.getLinkWithExtension(bean.getArticleLink(), resourceResolver));
            Date date = AemUtils.getProperty(blogContentRes, "blogDate", Date.class);
            String tag = AemUtils.getStringProperty(blogContentRes, "articleTags");
            bean.setDate(AemUtils.getFormattedDate(date, "dd/MM/yyyy"));
            bean.setCategory(AemUtils.getTagValue(tag, resourceResolver.adaptTo(TagManager.class)));
            recentPostBeans.add(bean);
        }
        return recentPostBeans;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
