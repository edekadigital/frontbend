import { flatMap, uniq } from 'lodash';

import { detectImageWidths } from './detectImageWidths';
import { getGroupedIndexes, getRoundedImageWidth, getVW } from './helpers';
import {
  IAnalyzeContext,
  IImageType,
  IImageTypeResult,
  ISource,
} from './types';

type Media = string | undefined;

export async function processImageType(
  imageType: IImageType,
  context: IAnalyzeContext
): Promise<IImageTypeResult> {
  const roundImageWidth: (value: number) => number = imageType.useRelativeUnit
    ? getRoundedImageWidth
    : Math.round;

  const id = imageType.id;

  const viewportWidths: number[] = context.viewports.map(({ width }) => width);

  const medias: Media[] = context.viewports.map(({ breakpoint }) =>
    breakpoint ? `(min-width: ${breakpoint}px)` : undefined
  );

  const policies: string[] = context.viewports.map(
    viewport =>
      (imageType.policyOverrides && imageType.policyOverrides[viewport.id]) ||
      imageType.policy
  );

  const page = await context.browser.newPage();

  if (imageType.credentials) {
    await page.authenticate(imageType.credentials);
  }

  await page.goto(imageType.url);

  const imageWidths: number[] = await detectImageWidths(
    page,
    imageType.selector,
    viewportWidths
  );

  await page.close();

  const imageSizes = imageWidths.map((tempImageWidth, tempIndex) => ({
    media: medias[tempIndex],
    value: imageType.useRelativeUnit
      ? getVW(tempImageWidth, viewportWidths[tempIndex])
      : `${tempImageWidth}px`,
  }));

  const policyGroups = getGroupedIndexes(policies);

  const sources: ISource[] = policyGroups.map(policyGroupIndexes => {
    const lastIndex = policyGroupIndexes[policyGroupIndexes.length - 1];

    const media = medias[lastIndex];
    const policy = policies[lastIndex];

    const filteredImageWidths = imageWidths.filter((_, tempIndex) =>
      policyGroupIndexes.includes(tempIndex)
    );

    const widths = uniq(
      flatMap(filteredImageWidths, tempWidth => [
        roundImageWidth(tempWidth),
        roundImageWidth(tempWidth * imageType.retinaScale),
      ])
    ).sort((a, b) => a - b);

    const filteredImageSizes = imageSizes.filter((_, tempIndex) =>
      policyGroupIndexes.includes(tempIndex)
    );

    const imageSizeGroups = getGroupedIndexes(filteredImageSizes, 'value');

    const sizes: string[] = imageSizeGroups
      .map(imageSizeGroupIndexes => {
        const lastimageSizeGroupIndex =
          imageSizeGroupIndexes[imageSizeGroupIndexes.length - 1];
        const tempSize = filteredImageSizes[lastimageSizeGroupIndex];

        return !tempSize.media || tempSize.media === media
          ? tempSize.value
          : `${tempSize.media} ${tempSize.value}`;
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

  let fallbackIndex: number = 0;
  context.viewports.some((viewport, index) => {
    if (viewport.fallback) {
      fallbackIndex = index;
      return true;
    }
    return false;
  });

  const src = {
    policy: policies[fallbackIndex],
    width: roundImageWidth(imageWidths[fallbackIndex]),
  };

  return {
    id,
    sources,
    src,
  };
}
