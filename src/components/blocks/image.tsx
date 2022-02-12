import React from 'react';
import Image from 'next/image'
import {
    BaseBlock,
} from '@/types/blog';


const ImageBlock = ({ block }: { block: BaseBlock }) => {
    let image_url = block[block.type].file.url
    return (<>
        <div className="min-w-80 max-h-240 relative">
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