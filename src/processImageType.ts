import { flatMap, get, identity, sortBy, uniq } from 'lodash';

import { detectImageWidths } from './detectImageWidths';
import { getGroupedIndexes, getRoundedImageWidth, getVW } from './helpers';
import { IAnalyzeContext, IImageType, IImageTypeResult } from './types';

export async function processImageType(
  imageType: IImageType,
  context: IAnalyzeContext
): Promise<IImageTypeResult> {
  const id = imageType.id;

  const adjustWidth = imageType.useRelativeUnit
    ? getRoundedImageWidth
    : (v: number) => v;

  const viewportWidths: number[] = context.viewports.map(({ width }) => width);

  const page = await context.browser.newPage();
  await page.authenticate(imageType.credentials);
  await page.goto(imageType.url);

  const imageWidths: number[] = await detectImageWidths(
    page,
    imageType.selector,
    viewportWidths
  );

  await page.close();

  const items = imageWidths.map((imageWidth, index) => {
    const viewport = context.viewports[index];
    const fallback = !!viewport.fallback;
    const policy: string = get(
      imageType,
      ['overrides', viewport.id, 'policy'],
      imageType.policy
    );
    const imageSize = {
      media: viewport.breakpoint
        ? `(min-width: ${viewport.breakpoint}px)`
        : undefined,
      value: imageType.useRelativeUnit
        ? getVW(imageWidth, viewport.width)
        : `${imageWidth}px`,
    };
    return { fallback, imageWidth, imageSize, policy };
  });

  const [fallbackItem] = items.filter(({ fallback }) => fallback);

  const groupedItems = getGroupedIndexes(items, 'policy').map(tempIndexList =>
    tempIndexList.map(tempIndex => items[tempIndex])
  );

  const sources = groupedItems.map(tempItemsList => {
    const lastItem = tempItemsList[tempItemsList.length - 1];
    const media = lastItem.imageSize.media;
    const policy = lastItem.policy;

    const widths = sortBy(
      uniq(
        flatMap(tempItemsList, tempItem => [
          adjustWidth(tempItem.imageWidth),
          adjustWidth(Math.round(tempItem.imageWidth * imageType.retinaScale)),
        ])
      ),
      [identity]
    ).filter(tempWidth => tempWidth > 0);

    const imageSizes = tempItemsList.map(tempItem => tempItem.imageSize);

    const groupedImagesSizes = getGroupedIndexes(imageSizes, 'value').map(
      tempIndexList => tempIndexList.map(tempIndex => imageSizes[tempIndex])
    );

    const sizes = groupedImagesSizes
      .map(tempImageSizeList => {
        const lastImageSize = tempImageSizeList[tempImageSizeList.length - 1];
        return !lastImageSize.media || lastImageSize.media === media
          ? lastImageSize.value
          : `${lastImageSize.media} ${lastImageSize.value}`;
      })
      .filter(
        (tempSize, tempIndex, sourceArray) =>
          !(tempSize === '100vw' && tempIndex === sourceArray.length - 1)
      );

    return {
      media,
      policy,
      widths,
      sizes,
    };
  });

  const src = {
    policy: fallbackItem.policy,
    width: adjustWidth(fallbackItem.imageWidth),
  };

  return {
    id,
    sources,
    src,
  };
}
