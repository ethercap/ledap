import React, { useState, useEffect, useContext } from "react";
import type { UploadProps } from "antd";
import { message, Upload, Button } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { get } from "lodash";
import { LedapAppContext } from "../configProvider/LedapAppContext";

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
  upload?: boolean;
  mimeTypes?: string[];
  onError?: (msg: string) => void;
  onFileChanged?: Function;
  attach: any;
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
    upload,
    attach,
    onError,
    ...reset
  } = props;
  const { multiple = false, onFileChanged } = reset;
  const _hint = hint || model?.getAttributeHint?.(attr);
  const propValue = model[attr];
  const _defaultFileList = getDefaultFiles(propValue);
  const { fileList, removeFile, addFile, clear } = useFileList(
    _defaultFileList,
    upload,
    attach
  );

  function _addFile(file) {
    _localCheck(file)
      .then(() => {
        const clear = reset.multiple === false ? true : false;
        addFile(file, clear);
      })
      .catch((errmsg) => {
        message.error({ content: errmsg });
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
              _addFile(file);
            }
          })
          .catch?.(() => {});
      } else if (res === false) {
        // 值类型
        return false;
      } else {
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
    const _fileList = upload ? fileList.map((f) => f.url) : fileList;
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
  ) : children ? (
    children
  ) : (
    <Button>点击上传文件</Button>
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

function useFileList(initFileList = [], upload, attach) {
  const { uploader } = useContext(LedapAppContext);
  const [fileList, setFileList] = useState(initFileList);

  function addFile(file, clear = false) {
    const _olfFiles = clear ? [] : fileList;
    setFileList([..._olfFiles, file]);
    upload && uploadFile(file);
  }
  function removeFile(file) {
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
    if (!uploader) {
      console.error("尚未配置 uploader");
      return;
    }

    uploader(file, attach)
      .then((url) => {
        updateFile({ uid: file.uid, url, status: "success" });
      })
      .catch(() => {});
  }
  return {
    fileList,
    addFile,
    removeFile,
    clear,
    uploadFile,
  };
}

function checkFileType(file, allowedTypes) {
  if (!file || !file.type || !file.name) {
    return false; // 文件无效
  }

  return allowedTypes.some(
    (type) =>
      file.type === type ||
      file.name.toLowerCase().endsWith(`.${type.toLowerCase()}`)
  );
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
  if (value.length == 0) {
    return [];
  }
  // array
  if (value[0]?.url) {
    return value;
  }
  if (typeof value[0] == "string") {
    return value.map((item) => ({ name: item, url: item }));
  }
  return [];
}

export default Uploader;
