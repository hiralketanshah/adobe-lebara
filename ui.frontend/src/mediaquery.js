import { generateMedia } from 'styled-media-query';
import { breakpoints } from './breakpoints';

const mq = generateMedia(breakpoints);

/* Usage;

const Wrapper = styled.div`
// @media (max-width: 719px)
${mediaquery.mobile`
width: 719px;
`};
`;

const Wrapper = styled.div`
// @media (min-width: 720px)
${mediaquery.tablet`
width: 720px;
`};
`;

const Wrapper = styled.div`
//  @media (min-width: 1280px)
${mediaquery.desktop`
width: 1280px;
`};
`;

const Wrapper = styled.div`
//  @media (min-width: 1680px)
${mediaquery.desktopMax`
width: 1680px;
`};
`;
*/

const mediaquery = {
    // @media (max-width: 719px){...}
    mobile: mq.lessThan('smallMax'),

     // @media (min-width: 720px){...}
     tablet: mq.between('medium','large'),

     // @media (min-width: 1280px){...}
     desktop: mq.between('large','largeMax'),

      // @media (max-width: 1680px){...}
      desktopMax: mq.greaterThan('largeMax'),

};

export default mediaquery;
