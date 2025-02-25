import React, { useState, useEffect } from "react";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { get } from "lodash";

interface Size {
  width: number;
  height: number;
}
interface FileInfo {
  name: string;
  url?: string;
}

interface UploaderDraggerProps extends UploadProps {
  model: any;
  attr: string;
  value?: any;
  onSetValue?: Function;
  children?: any;
  dragger?: boolean;
  icon?: any;
  text?: any;
  hint?: any;
  maxPxSize?: Size;
  maxFileKBSize?: number;
  action?: string;
  data?: any;
  actionHeaders?: any;
  urlPath?: string;
  mimeTypes?: string[];
  onError?: (msg: string) => void;
  onFileChanged?: Function;
}

function Uploader(props: UploaderDraggerProps) {
  const {
    icon,
    attr,
    model,
    value,
    onSetValue,
    text,
    hint,
    dragger = false,
    children,
    beforeUpload, // 业务代码可返回false或promise<reject>不进行记录
    maxPxSize,
    maxFileKBSize,
    mimeTypes,
    action,
    data: actionParams,
    actionHeaders,
    urlPath,
    onError,
    ...reset
  } = props;
  const { multiple = true, onFileChanged } = reset;
  const _hint = hint || model?.getAttributeLabel?.(attr);
  const propValue = model[attr];
  const _defaultFileList = getDefaultFiles(propValue);
  const { fileList, removeFile, addFile, clear } = useFileList(
    _defaultFileList,
    action,
    actionParams,
    actionHeaders,
    urlPath
  );

  function _addFile(file) {
    _localCheck(file)
      .then(() => {
        const clear = reset.multiple === false ? true : false;
        addFile(file, clear);
      })
      .catch((errmsg) => {
        onError?.(errmsg);
      });
  }

  const _localCheck = async (file) => {
    try {
      // 文件格式校验
      if (!checkFileType(file, mimeTypes)) {
        throw "文件格式错误";
      }
      // 文件大小校验
      const fileKb = file.size / 1024;
      if (maxFileKBSize && fileKb > maxFileKBSize) {
        throw "文件过大";
      }
      // 图像大小校验
      if (maxPxSize) {
        try {
          await checkFilePxSize(file, maxPxSize.width, maxPxSize.height);
        } catch (e) {
          throw e;
        }
      }
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  function _beforeUpload(file) {
    if (typeof beforeUpload === "function") {
      // 业务校验
      const res = beforeUpload?.(file, fileList);

      if (res?.then && typeof res.then == "function") {
        res
          .then((promiseResule) => {
            if (promiseResule !== false) {
              // console.log("call _addFile", promiseResule);
              _addFile(file);
            }
          })
          .catch?.(() => {});
      } else if (res === false) {
        // 值类型
        return false;
      } else {
        // console.log("call _addFile res", res);
        _addFile(file);
      }
    } else {
      _addFile(file);
    }

    // 自定义上传
    return false;
  }

  function _onRemove(file) {
    removeFile(file);
  }
  // console.log(attr, "files:", fileList);

  useEffect(() => {
    // console.log("file list changed:", fileList);
    const _fileList = action ? fileList.map((f) => f.url) : fileList;
    const targetFile = multiple ? [..._fileList] : _fileList[0];
    onFileChanged?.(targetFile);
    onSetValue?.(targetFile);
  }, [fileList]);
  const Fragment = dragger ? Upload.Dragger : Upload;
  const content = dragger ? (
    <>
      <p className="ant-upload-drag-icon">{icon || <InboxOutlined />}</p>
      <p className="ant-upload-text">{text || "点击或将文件拖拽到这里上传"}</p>
      {_hint && <p className="ant-upload-hint">{_hint}</p>}
    </>
  ) : typeof children == "function" ? (
    children(fileList)
  ) : (
    children
  );
  return (
    <Fragment
      fileList={fileList}
      onRemove={_onRemove}
      beforeUpload={_beforeUpload}
      {...reset}
    >
      {content}
    </Fragment>
  );
}

function useFileList(
  initFileList = [],
  action,
  actionParams = {},
  actionHeaders = {},
  urlPath = ""
) {
  const [fileList, setFileList] = useState(initFileList);

  function addFile(file, clear = false) {
    const _olfFiles = clear ? [] : fileList;
    setFileList([..._olfFiles, file]);
    action && uploadFile(file);
  }
  function removeFile(file) {
    // console.log("call removefile:", file);
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  }
  function clear() {
    setFileList([]);
  }
  function updateFile(fileInfo) {
    setFileList((fileList) => {
      return fileList.map((file) => {
        const { uid, ...reset } = fileInfo;
        if (file.uid == uid) {
          Object.assign(file, reset);
          return file;
        } else {
          return file;
        }
      });
    });
  }
  function uploadFile(file) {
    var formData = new FormData();
    formData.append(file.name, file);
    for (let key in actionParams) {
      formData.append(key, actionParams[key]);
    }
    fetch(action, {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        "x-requested-with": "XMLHttpRequest",
        ...actionHeaders,
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        const url = get(res, urlPath || "data.url[0]", "");
        url && updateFile({ uid: file.uid, url, status: "success" });
      });
  }
  return {
    fileList,
    addFile,
    removeFile,
    clear,
    uploadFile,
  };
}

function checkFileType(file, mimeTypes) {
  // console.log({ file, mimeTypes });
  if (mimeTypes && mimeTypes.length > 0) {
    return mimeTypes.indexOf(file.type) > -1;
  }
  return true;
}
function checkFilePxSize(file, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      if (img.width > width || img.height > height) {
        reject("图像尺寸过大");
      } else {
        resolve(true);
      }
    };
    img.onerror = function (e) {
      reject("图像加载失败");
    };
    img.src = URL.createObjectURL(file);
  });
}

function getDefaultFiles(value) {
  if (!value) {
    return [];
  }
  if (typeof value == "string" && value.length > 0) {
    return [{ url: value, name: value }];
  }
  // array
  if (value.length > 0 && value[0].url) {
    return value;
  }
  return [];
}

export default Uploader;
