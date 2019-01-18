import { Page } from 'puppeteer';

export async function detectImageWidths(
  page: Page,
  selector: string,
  viewportWidths: number[]
): Promise<number[]> {
  const results: number[] = [];

  for (const tempViewportWidth of viewportWidths) {
    let imageWidth = 0;

    await page.setViewport({
      width: tempViewportWidth,
      height: tempViewportWidth,
    });

    const imageElement = await page.$(selector);
    if (imageElement) {
      const boundingBox = await imageElement.boundingBox();
      imageWidth = boundingBox ? Math.round(boundingBox.width) : 0;
    } else {
      throw Error(
        `No element found for selector '${selector}' (Url: ${page.url})`
      );
    }

    results.push(imageWidth);
  }

  return results;
}
