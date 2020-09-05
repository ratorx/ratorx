import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faLinkedinIn,
  faFacebookF,
  faGithubAlt,
} from "@fortawesome/free-brands-svg-icons";
import { faCode, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { originURL, getCommit } from "utils/git";

export interface Link {
  name: string;
  icon: IconDefinition;
  url: string;
}

export const data = {
  linkedIn: {
    name: "LinkedIn",
    icon: faLinkedinIn,
    url: "https://www.linkedin.com/in/reeto/",
  },
  facebook: {
    name: "Facebook",
    icon: faFacebookF,
    url: "https://www.facebook.com/reetoc",
  },
  github: {
    name: "GitHub",
    icon: faGithubAlt,
    url: "https://github.com/ratorx/",
  },
  email: {
    name: "Email",
    icon: faEnvelope,
    url: "mailto:website@ree.to",
  },
  source: {
    name: "View Source",
    icon: faCode,
    url: originURL(),
  },
};
