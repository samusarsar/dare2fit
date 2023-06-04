import { FC, ReactElement } from 'react';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';

const ShareButtons: FC<{ location: string, text: string, size?: number }> = ({ location, text, size=32 }): ReactElement => {
    return (
        <>
            <FacebookShareButton
                url={`[insertURLhere]${location}`}
                quote={`Check out ${text}'s profile on dare2fit!`}
                hashtag="#dare2fit"
            >
                <FacebookIcon size={size} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={`[insertURLhere]${location}`}
            >
                <TwitterIcon size={size} round />
            </TwitterShareButton>
            <LinkedinShareButton
                url={`[insertURLhere]${location}`}
                hashtag="#dare2fit"
            >
                <LinkedinIcon size={size} round />
            </LinkedinShareButton>
        </>
    );
};

export default ShareButtons;
