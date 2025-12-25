import * as React from "react";
import { Icon } from "@iconify/react";
import { ButtonLink } from "@/components/ButtonLink";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SocialMediaLinksProps {}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({}) => {
  return (
    <div className="flex">
      <ButtonLink
        href="https://www.facebook.com/SojournersMN"
        target="_blank"
        aria-label="link to facebook page"
        variant="footer-icon"
      >
        <Icon icon={"simple-icons:facebook"} />
      </ButtonLink>
      <ButtonLink
        href="https://www.youtube.com/@sojournerschurch7048"
        target="_blank"
        aria-label="link to youtube"
        variant="footer-icon"
      >
        <Icon icon={"simple-icons:youtube"} />
      </ButtonLink>
      <ButtonLink
        href="https://open.spotify.com/show/4XUQE1mKNoKG2r4Ovr7FoQ?si=89b3897946374748"
        target="_blank"
        aria-label="link to spotify"
        variant="footer-icon"
      >
        <Icon icon={"simple-icons:spotify"} />
      </ButtonLink>
      <Tooltip>
        <TooltipTrigger asChild>
          <ButtonLink
            href="sms:+15075521595"
            aria-label="click to send SMS"
            variant="footer-icon"
          >
            <Icon icon={"material-symbols:sms"} />
          </ButtonLink>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to send text message</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default SocialMediaLinks;
