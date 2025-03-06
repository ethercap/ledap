import * as ledap from './lib/ledap'

interface UploaderOptions {
    url:string;
    onProgress?:Function;
    onError?:Function;
    onAbort?:Function;
    data?:Object | FormData;
    headers?:any;
    onSuccess:Function
}
function getFormData(data){
    const formData = new FormData()
    Object.keys(data).forEach((key) =>  {
        formData.append(key, data[key]);
    });
    return formData
}
export default function Uploader(options:UploaderOptions){
    const { url,onProgress,onError,onAbort,data={},headers={},onSuccess } = options
    let formData = data instanceof FormData ? data : getFormData(data)
    const controller = new AbortController();
    const httpOptions = {
        url,
        method:'POST',
        data:formData,
        headers:{
            'Content-Type': 'multipart/form-data',
            ...headers,
        },
        onUploadProgress:(event) => {
            onProgress?.((event.loaded / event.total) * 0.9)// 前90是上传进度
        },
        onDownloadProgress:(event) => {
            onProgress?.((0.9 + (event.loaded / event.total) / 10))// 90% - 100% 是下载进度
        },
        withCredentials:true,
        signal: controller.signal
    }
    const _onabort = (e) => {
        onAbort?.(e)
    }
    controller.signal.addEventListener("abort", _onabort);
    ledap.App.request(httpOptions, (data) => {
        onSuccess?.(data)
        controller.signal.removeEventListener("abort", _onabort);
    }, (err) => {
        onError(err)
        controller.signal.removeEventListener("abort", _onabort);
    })

    return {
        abort:() => {
            controller.abort()
        }
    }
}
