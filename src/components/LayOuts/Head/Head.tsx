import { siteConfig } from '@/config/site.config';
import { FC } from 'react';
import { Helmet } from 'react-helmet';

type Props = {
    extraTitle?:string
}
const Head: FC<Props> = ({extraTitle =""}) => {
    return <Helmet>
        <title>{siteConfig?.siteName}{extraTitle}</title>
        <meta name="description" content={siteConfig?.description} />
    </Helmet>
}

export default Head;