import React from 'react';
import Image from 'next/image'
import {
    BaseBlock,
} from '@/types/blog';
import { getAssetUrlFromBlock } from '@/lib/next-notion-s3-assets'


const ImageBlock = ({ block }: { block: BaseBlock }) => {
    const image_url = getAssetUrlFromBlock(block, false)
    if (!image_url) {
        return (<></>)
    }
    return (<>
        <div className="min-w-80 max-h-240 relative drop-shadow">
            <Image
                src={image_url}
                className='object-contain h-2/5 m-auto'
                width={600}
                height={240}
                objectFit="contain"
                alt="my image"
            />
        </div>
    </>)
}

export default ImageBlock