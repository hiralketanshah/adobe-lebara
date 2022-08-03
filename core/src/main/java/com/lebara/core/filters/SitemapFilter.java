package com.lebara.core.filters;

import com.lebara.core.services.LebaraCaConfig;
import com.lebara.core.utils.AemUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.wrappers.SlingHttpServletResponseWrapper;
import org.apache.sling.caconfig.ConfigurationBuilder;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;

import javax.servlet.*;
import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.PrintWriter;


@Component(
        service = Filter.class,
        immediate = true,
        name = "AEM Sitemap Response Modifier Filter",
        property = {
                Constants.SERVICE_RANKING + ":Integer=-99",
                "sling.filter.scope=REQUEST",
                "sling.filter.pattern=.*sitemap.xml"
        }
)
public class SitemapFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (!(request instanceof SlingHttpServletRequest) ||
                !(response instanceof SlingHttpServletResponse)) {
            // Not a SlingHttpServletRequest/Response, so ignore.
            chain.doFilter(request, response);
            return;
        }

        final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;

        String uri = slingRequest.getRequestURI();
        if (!uri.endsWith("sitemap.xml")) {
            chain.doFilter(request, response);
            return;
        }

        SlingHttpServletResponse modelResponse = getModelResponse((SlingHttpServletResponse) response);
        //sending modelResponse instead of response object in filter chain as it doesn't write anything.
        //chain.doFilter(request, response);
        if (modelResponse != null) {
            chain.doFilter(request, modelResponse);
            response.setContentType("application/xml");
            response.getWriter().write(getModifiedContent(modelResponse.toString(), slingRequest));
        }
    }

    private String getModifiedContent(String originalContent, SlingHttpServletRequest slingRequest) {
        Resource currentResource = slingRequest.getResource();
        String externalPath = StringUtils.EMPTY;
        if (currentResource.getPath().startsWith(AemUtils.DE_ROOT_PATH)) {
            externalPath = AemUtils.DE_DOMAIN_NAME;
            originalContent = originalContent.replaceAll(AemUtils.DE_ROOT_PATH, "");
        } else if (currentResource.getPath().startsWith(AemUtils.FR_ROOT_PATH)) {
            externalPath = AemUtils.FR_DOMAIN_NAME;
            originalContent = originalContent.replaceAll(AemUtils.FR_ROOT_PATH, "");
        } else if (currentResource.getPath().startsWith(AemUtils.NL_ROOT_PATH)) {
            externalPath = AemUtils.NL_DOMAIN_NAME;
            originalContent = originalContent.replaceAll(AemUtils.NL_ROOT_PATH, "");
        } else if (currentResource.getPath().startsWith(AemUtils.DK_ROOT_PATH)) {
            externalPath = AemUtils.DK_DOMAIN_NAME;
            originalContent = originalContent.replaceAll(AemUtils.DK_ROOT_PATH, "");
        } else if (currentResource.getPath().startsWith(AemUtils.UK_ROOT_PATH)) {
            externalPath = AemUtils.UK_DOMAIN_NAME;
            originalContent = originalContent.replaceAll(AemUtils.UK_ROOT_PATH, "");
        }
        if (StringUtils.isNotBlank(externalPath)) {
            String content_without_countries = originalContent
                    .replaceAll(AemUtils.DE_ROOT_PATH, "")
                    .replaceAll(AemUtils.FR_ROOT_PATH, "")
                    .replaceAll(AemUtils.NL_ROOT_PATH, "")
                    .replaceAll(AemUtils.DK_ROOT_PATH, "")
                    .replaceAll(AemUtils.UK_ROOT_PATH, "");
            return content_without_countries.replaceAll("<loc>", "<loc>" + externalPath)
                    .replaceAll("href=\"/", "href=\"" + externalPath + "/");
        }
        return originalContent;
    }

    SlingHttpServletResponse getModelResponse(SlingHttpServletResponse response) {
        return new DefaultSlingModelResponseWrapper(response);
    }

    @Override
    public void destroy() {

    }

    private static class DefaultSlingModelResponseWrapper extends SlingHttpServletResponseWrapper {
        private CharArrayWriter writer;

        public DefaultSlingModelResponseWrapper(final SlingHttpServletResponse response) {
            super(response);
            writer = new CharArrayWriter();
        }

        public PrintWriter getWriter() throws IOException {
            return new PrintWriter(writer);
        }

        public String toString() {
            return writer.toString();
        }
    }

}
