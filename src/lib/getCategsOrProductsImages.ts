function getImages(result: ImageDto[][], item: CategoryDto | ProductDto): ImageDto[][] {
  if (item.images.length && result.length <= 10) result.push(item.images)
  return result
}

export function getCategsOrProductsImages(item: CategoryDto[] | ProductDto[]) {
  return item.reduce<ImageDto[][]>(getImages, []).flat()
}
