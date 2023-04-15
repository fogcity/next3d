export type GlftLoadOptions = {
    onProgress: (receivedLength:number, contentLength:number, url:string) => {
        // 监听下载进度
      },
      onComplete: (url:string) => {
        // 文件下载完成
      },
      onError: (e) => {
        // 文件加载错误
      },
      onUrl: (url:string) =>{
        // 可以根据需求，修改原始url，返回自定义路径
      }
}
export function loadGltf(path:string,options:GlftLoadOptions){}