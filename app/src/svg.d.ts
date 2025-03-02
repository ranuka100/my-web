// global.d.ts or svg.d.ts
declare module '*.svg' {
  const content: string;
  export default content;
}
