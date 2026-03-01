declare module 'react-use-fusejs' {
  export function useGatsbyPluginFusejs(
    query: string,
    data: { index: unknown; data: unknown },
  ): Array<{ item: unknown }>
}
