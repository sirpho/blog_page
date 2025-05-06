/// <reference types="vite/client" />

declare interface ResponseResult<T = any> extends TableResult<T> {
  code: number
  msg?: string
  message?: string
  data?: T
  page?: T
  sum?: any
}

declare interface TableResult<T = any> {
  total?: any
  pageNum?: number
}
declare module '@kangc/v-md-editor/lib/theme/vuepress.js';
declare module '@kangc/v-md-editor/lib/theme/github.js';
declare module '@kangc/v-md-editor';


declare interface articleType {
  createTime: string,
  lastUpdateTime: string,
  deleted: string,
  publicity: string,
  id: string,
  title: string,
  summary: string,
  content: string,
  wordCount: number,
  author: string,
  creationType: string,
  source: string,
  category: string,
  sticky: boolean,
  tags: string[],
}

declare type RecordType = Record<string, any>;