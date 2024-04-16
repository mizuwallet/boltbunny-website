import { library } from '@fortawesome/fontawesome-svg-core';
import { faDiscord, faGithub, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faCopy,
  faPaperPlane,
  faQuestionCircle,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
  faAnglesLeft,
  faAnglesRight,
  faArrowsDownToLine,
  faBars,
  faBook,
  faC,
  faChevronDown,
  faChevronRight,
  faCircleInfo,
  faCompress,
  faExpand,
  faExternalLink,
  faEye,
  faEyeSlash,
  faGears,
  faHome,
  faMagnifyingGlass,
  faMobileScreen,
  faPause,
  faPlay,
  faRefresh,
  faShoppingBag,
  faSignOut,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* add icons to the library */
[
  faCircleInfo,
  faQuestionCircle,
  faExpand,
  faCompress,
  faXTwitter,
  faPaperPlane,
  faRefresh,
  faBars,
  faSpinner,
  faCopy,
  faMagnifyingGlass,
  faGithub,
  faExternalLink,
  faShoppingBag,
  faSignOut,
  faTwitter,
  faDiscord,
  faHome,
  faGears,
  faUser,
  faMobileScreen,
  faAnglesLeft,
  faAnglesRight,
  faChevronRight,
  faChevronDown,
  faC,
  faEye,
  faEyeSlash,
  faBook,
  faPlay,
  faPause,
  faTrashCan,
  faArrowsDownToLine,
].forEach((icon: any) => {
  library.add(icon);
});

export default (app: any) => app.component('font-awesome-icon', FontAwesomeIcon);

