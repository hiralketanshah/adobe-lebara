package com.lebara.core.filters;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.SlingHttpServletResponseWrapper;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;

import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.PrintWriter;

@Component(service = Filter.class, immediate = true, name = "AEM Model Response Modifier Filter", property = {
		Constants.SERVICE_RANKING + ":Integer=-99", "sling.filter.scope=COMPONENT",
		"sling.filter.pattern=.*.model.json" })
public class ModelFilter implements Filter {

	private transient Logger log = LoggerFactory.getLogger(getClass());
	private static final String pathObject = ":path";

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		String uri = ((HttpServletRequest) request).getRequestURI();

		if (!uri.endsWith(".model.json")) {
			chain.doFilter(request, response);
			return;
		}

		SlingHttpServletResponse modelResponse = getModelResponse((SlingHttpServletResponse) response);

		chain.doFilter(request, modelResponse);

		PrintWriter responseWriter = response.getWriter();

		responseWriter.write(getModifiedContent(modelResponse.toString(), request));

	}

	SlingHttpServletResponse getModelResponse(SlingHttpServletResponse response) {
		SlingHttpServletResponse modelResponse = new DefaultSlingModelResponseWrapper(response);
		return modelResponse;
	}

	private String getModifiedContent(String originalContent, ServletRequest request) {
		String modifiedContent = originalContent;

		try {
			Gson gson = new Gson();
			JsonObject model = gson.fromJson(originalContent, JsonObject.class);
			addAddnPropertiesInPageModel(model, request);
			modifiedContent = model.toString();
		} catch (Exception e) {
			log.error("Error at ModelFilter : {}", e);
			modifiedContent = originalContent;
		}
		return modifiedContent;
	}

	private void addAddnPropertiesInPageModel(JsonObject model, ServletRequest request) {
		if (null == model || !model.has(pathObject)) {
			return;
		}
		String pageTitle = StringUtils.EMPTY;
		String path = model.get(pathObject).getAsString();

		ResourceResolver resolver = ((SlingHttpServletRequest) request).getResourceResolver();
		Resource resource = resolver.getResource(path);
		if (null != resource) {
			Resource content = resource.getChild("jcr:content");
			if (null != content) {
				ValueMap properties = content.adaptTo(ValueMap.class);
				if (properties.containsKey("pageTitle") && null != properties.get("pageTitle")) {
					pageTitle = properties.get("pageTitle", String.class);
				} else {
					pageTitle = properties.get("jcr:title", String.class);
				}

			}

		}

		JsonParser jsonParser = new JsonParser();
		JsonElement jsonElement = jsonParser.parse("\"" + pageTitle + "\"");
		model.add("pageTitle", jsonElement);
	}

	private class DefaultSlingModelResponseWrapper extends SlingHttpServletResponseWrapper {
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

	@Override
	public void destroy() {

	}

}
