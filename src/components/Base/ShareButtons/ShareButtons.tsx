import { FC, ReactElement } from 'react';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { SITE_URL } from '../../../common/constants';

const ShareButtons: FC<{ location: string, text: string, size?: number }> = ({ location, text, size=32 }): ReactElement => {
    return (
        <>
            <FacebookShareButton
                url={`${SITE_URL}${location}`}
                quote={`Check out ${text}'s profile on dare2fit!`}
                hashtag="#dare2fit"
            >
                <FacebookIcon size={size} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={`${SITE_URL}${location}`}
            >
                <TwitterIcon size={size} round />
            </TwitterShareButton>
            <LinkedinShareButton
                url={`${SITE_URL}${location}`}
            >
                <LinkedinIcon size={size} round />
            </LinkedinShareButton>
        </>
    );
};

export default ShareButtons;
