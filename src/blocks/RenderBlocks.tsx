import React from 'react'
import { HeroBlock } from './Hero/Component'
import { ExploreProductsBlock } from './ExploreProducts/Component'
import { TechnicalSupportBlock } from './TechnicalSupport/Component'
import { WidelyUsedBlock } from './WidelyUsed/Component'
import { StatisticsBlock } from './Statistics/Component'
import { CallToActionBlock } from './CallToAction/Component'
import { CategoryHeaderBlock } from './CategoryHeader/Component'

const components = {
  hero: HeroBlock,
  exploreProducts: ExploreProductsBlock,
  technicalSupport: TechnicalSupportBlock,
  widelyUsed: WidelyUsedBlock,
  statistics: StatisticsBlock,
  callToAction: CallToActionBlock,
  categoryHeader: CategoryHeaderBlock,
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
