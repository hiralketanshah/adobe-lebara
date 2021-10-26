export const nameRegex =
  /^[A-Za-z0-9ÀàÂâÆæÄäÇçÈèÉéÊêËëÎîÏïÖöÔôŒœÙùÛûÜü€?ÿŸß\-, _.\s']{0,50}$/;
export const emailRegex =
  /^(?=.{1,100}$)[A-Za-z0-9._%+-]+?@(?!-)[A-Za-z0-9-]+(\.(?!-)[A-Za-z0-9-]{2,16})+$/i;
export const phoneNumberRegex = /^0[0-9]{9,11}$/i;
