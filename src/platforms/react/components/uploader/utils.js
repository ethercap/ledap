export function getDefaultHint(mimeTypes, maxPxSize, maxFileKBSize) {
    let formatStr = ''
    let pxLimitStr = ''
    let fileSizeLimitStr = ''
    if (Array.isArray(mimeTypes) && mimeTypes.length > 0) {
        formatStr = mimeTypes.map((_formatStr) => {
            if (_formatStr.indexOf('/') > -1) {
                return _formatStr.split("/")[1]
            }
            return _formatStr
        }).join(",") + ' 格式'
    }
    if (maxPxSize?.width && maxPxSize?.height) {
        pxLimitStr = `最大${maxPxSize.width}*${maxPxSize.height}`
    }
    if (maxFileKBSize && !isNaN(maxFileKBSize)) {
        fileSizeLimitStr = `≤${formatSize(maxFileKBSize)}`
    }

    return [formatStr, pxLimitStr, fileSizeLimitStr].filter(v => v!=='').join('，')
}

export function getDefaultFiles(value) {
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

export function checkFileType(file, allowedTypes) {
    if (!file || !file.name) {
        return false; // 文件无效
    }

    return allowedTypes.some(
        (type) =>
            file.type === type ||
            file.name.toLowerCase().endsWith(`.${type.toLowerCase()}`)
    );
}

export function checkFilePxSize(file, width, height) {
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


export function formatSize(kb) {
    const KB = 1;
    const MB = 1024 * KB;
    const GB = 1024 * MB;
    const TB = 1024 * GB;

    let value, unit;

    if (kb < 1024) {
        value = kb;
        unit = 'KB';
    } else if (kb < GB) {
        value = kb / MB;
        unit = 'MB';
    } else if (kb < TB) {
        value = kb / GB;
        unit = 'GB';
    } else {
        value = kb / TB;
        unit = 'TB';
    }

    return Number.isInteger(value) ? `${value}${unit}` : `${value.toFixed(2)}${unit}`;
}