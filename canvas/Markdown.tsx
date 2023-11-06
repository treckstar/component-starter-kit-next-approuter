import { FC } from 'react';
import classNames from 'classnames';
import { Next, documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';
import { BLOCKS, NodeData, Document } from '@contentful/rich-text-types';
import { registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc';
import { getTextClass } from '@/utils/styling';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import Container from '@/components/Container';
import { PaddingSize } from '@/utils/styling';

type RichTextProps = ComponentProps<{
  markdownContent?: string;
}>;

enum RichTextVariants {
  Light = 'light',
}

const documentToHtmlStringOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: NodeData, next: Next) => `<p class="pb-10 text-lg">${next(node.content)}</p>`,
    [BLOCKS.HEADING_2]: (node: NodeData, next: Next) => `<h2 class="pb-2.5 text-2xl">${next(node.content)}</h2>`,
    [BLOCKS.EMBEDDED_ASSET]: (node: NodeData) =>
      `<div class="pb-12 lg:pb-16 max-w-4xl">
            <img src="${node.data.target.fields.file.url}" 
                    height="${node.data.target.fields.file.details.image.height}"
                    width="${node.data.target.fields.file.details.image.width}" alt="${node.data.target.fields.description}"/>
          </div>`,
  },
};

const Markdown: FC<RichTextProps> = async ({ markdownContent, component }) => {
  const contentfulContent = await richTextFromMarkdown(markdownContent || '');
  return (
    <Container paddingTop={PaddingSize.Small} paddingBottom={PaddingSize.Small}>
      <div
        className={classNames('prose max-w-full', {
          'text-primary-content': component?.variant === RichTextVariants.Light,
          'text-secondary-content': component?.variant !== RichTextVariants.Light,
        })}
      >
        <div
          className={classNames({
            '[&_*]:text-primary-content !marker:text-primary-content': component?.variant === RichTextVariants.Light,
            '[&_*]:text-secondary-content marker:text-secondary-content': component?.variant !== RichTextVariants.Light,
          })}
        >
      {contentfulContent ? (
        <div
          className="py-6 text-xl"
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(contentfulContent, documentToHtmlStringOptions),
          }}
        />
      ) : (
        <UniformText
          placeholder="Text goes here"
          parameterId="text"
          className="py-6 text-xl"
          component={component}
        />
      )}
        </div>
      </div>
    </Container>
  );
}

[undefined, RichTextVariants.Light].forEach(variantId =>
  registerUniformComponent({
    type: 'markdown',
    component: Markdown,
    variantId,
  })
);

export default Markdown;
