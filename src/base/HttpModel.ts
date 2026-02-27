import Model from './Model';

export default class HttpModel extends Model {
    
    private _httpRequest;
    private _primaryKey = 'id';
    
    private _basePath = '';

    private _viewPath = '/view';
    private _createPath = '/create';
    private _updatePath = '/update';
    private _deletePath = '/delete';


    constructor(config: object = {}) {
        super();
        const keyMap = {
            httpRequest: '_httpRequest',
            primaryKey: '_primaryKey',
            basePath: '_basePath',
            viewPath: '_viewPath',
            createPath: '_createPath',
            updatePath: '_updatePath',
            deletePath: '_deletePath',
        };
        Object.keys(keyMap).forEach(key => {
            if (config.hasOwnProperty(key)) {
                this[keyMap[key]] = config[key];
            }
        });
        if (!this._httpRequest) {
            throw new Error('httpRequest必须配置');
        }
        if (!this._basePath) {
            throw new Error('basePath必须配置');
        }
    }

    get createUrl(): string {
        return this._basePath + this._createPath;
    }

    get viewUrl(): string {
        return this._basePath + this._viewPath;
    }

    get updateUrl(): string {
        return this._basePath + this._updatePath;
    }
    
    get deleteUrl(): string {
        return this._basePath + this._deletePath;
    }


    // 找到相关的参数
    public static find(config: object = {}, params: object = {}) {
        const model = new this(config);
        if (params.hasOwnProperty('withConfig')) {
            params['withConfig'] = !!params['withConfig'];
        }
        return model.getModel(params[model._primaryKey] || 0, params);
    }

    private getRequestData(excludePrimaryKey = false) {
        const data = {};
        Object.keys(this).forEach(key => {
            if (this.isPrivateKey(key)) {
                return;
            }
            data[key] = this[key];
        });
        if (excludePrimaryKey) {
            delete data[this._primaryKey];
        }
        return data;
    }

    private getChangedRequestData() {
        const changedData = this.getChangeData();
        const data = {};
        Object.keys(changedData).forEach(key => {
            if (this.isPrivateKey(key)) {
                return;
            }
            data[key] = changedData[key];
        });
        return data;
    }

    public getModel(id = 0, params: object = {}) {
        return new Promise((resolve, reject) => {
            this._httpRequest({
                url: this.viewUrl + '?' + this._primaryKey + '=' + id,
                params,
                method: 'GET',
            }, data => {
                this.load(data.data);
                resolve({model:this, data});    
            }, error => {
                reject(error); 
            });        
        });
       
    }

    private process(httpOptions, resolve, reject) {
        this._httpRequest(httpOptions, data => {
            this.load(data.data);
            this.sync();
            resolve({model:this, data});            
        }, error => {
            reject(error); 
        }); 
    }

    // 更新model
    public updateModel() {
        const dirtyObject = this.getChangedRequestData();
        return new Promise((resolve, reject) => {
            if (dirtyObject == null || Object.keys(dirtyObject).length === 0) {
                return resolve({model:this, data:{}}); 
            }
            if (dirtyObject.hasOwnProperty(this._primaryKey)) {
                return reject(new Error('不允许更改primaryKey')); 
            }
            this.process({
                url: this.updateUrl + '?' + this._primaryKey + '=' + this[this._primaryKey],
                method: 'POST',
                data: dirtyObject,
            }, resolve, reject);
        });
    }

    // 创建新model
    public createModel() {
        const data = this.getRequestData(true);
        return new Promise((resolve, reject) => {
            this.process({
                url: this.createUrl,
                method: 'POST',
                data,
            }, resolve, reject);
        });
    }

    // 删除当前model
    public deleteModel() {
        return new Promise((resolve, reject) => {
            if (!this[this._primaryKey]) {
                return reject(new Error('primaryKey不能为空')); 
            }
            this.process({
                url: this.deleteUrl + '?' + this._primaryKey + '=' + this[this._primaryKey],
                method: 'POST',
                data: {},
            }, resolve, reject); 
        });
    }
}

