import sanitizeHtml from "sanitize-html";

sanitizeHtml.defaults.allowedAttributes['div'] = [ 'class' ];
sanitizeHtml.defaults.allowedAttributes['span'] = [ 'class' ];
sanitizeHtml.defaults.allowedAttributes['span'] = [ 'style' ];

export default sanitizeHtml.defaults;
