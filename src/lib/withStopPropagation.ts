export const withStopPropagation = (callback?: (args?: any) => void, ...args: any) => (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation()
  callback && callback(...args)
}