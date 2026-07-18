import React from 'react'
import { HeroBlock } from './Hero/Component'

const components = {
  hero: HeroBlock,
}

export const RenderBlocks: React.FC<{
  blocks: any[]
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in components) {
            const Block = components[blockType as keyof typeof components]

            if (Block) {
              return (
                <div key={index}>
                  <Block id={block.blockName} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}
