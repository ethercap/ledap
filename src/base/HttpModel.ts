import Model from './Model';

export default class HttpModel extends Model {
    
    private httpRequest;
    private primayKey = 'id';
   
    private basePath = '';

    private viewPath = '/view';
    private createPath = '/create';
    private updatePath = '/update';
    private deletePath = '/delete';


    constructor(config: object = {}) {
        super();
        ['httpRequest', 'primayKey', 'basePath', 'viewPath', 'createPath', 'updatePath', 'deletePath'].forEach(key => {
            if (config.hasOwnProperty(key)) {
                this[key] = config[key]; 
            }
        });
        if (!this.httpRequest) {
            throw new Error('httpRequest必须配置');
        }
        if (!this.basePath) {
            throw new Error('basePath必须配置');
        }
    }

    get createUrl(): string {
        return this.basePath + this.createPath;
    }

    get viewUrl(): string {
        return this.basePath + this.viewPath;
    }

    get updateUrl(): string {
        return this.basePath + this.updatePath;
    }
    
    get deleteUrl(): string {
        return this.basePath + this.deletePath;
    }


    // 找到相关的参数
    public static find(config: object = {}, params: object = {}) {
        const model = new this(config);
        if (params.hasOwnProperty('withConfig')) {
            params['withConfig'] = true;
        }
        return model.getModel(params[model.primayKey] || 0, params);
    }

    public getModel(id = 0, params: object = {}) {
        return new Promise((resolve, reject) => {
            this.httpRequest({
                url: this.viewUrl + '?' + this.primayKey + '=' + id,
                parmas: params,
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
        this.httpRequest(httpOptions, data => {
            this.load(data.data);
            this.sync();
            resolve({model:this, data});            
        }, error => {
            reject(error); 
        }); 
    }

    // 更新model
    public updateModel() {
        const dirtyObject = this.getChangeData();
        return new Promise((resolve, reject) => {
            if (dirtyObject == null || Object.keys(dirtyObject).length === 0) {
                return resolve({model:this, data:{}}); 
            }
            if (dirtyObject.hasOwnProperty(this.primayKey)) {
                return reject(new Error('不允许更改primaryKey')); 
            }
            this.process({
                url: this.updateUrl + '?' + this.primayKey + '=' + this[this.primayKey],
                method: 'POST',
                data: dirtyObject,
            }, resolve, reject);
        });
    }

    // 创建新model
    public createModel() {
        const obj = JSON.parse(JSON.stringify(this));
        delete obj[this.primayKey];
        return new Promise((resolve, reject) => {
            this.process({
                url: this.createUrl,
                method: 'POST',
                data: obj,
            }, resolve, reject);
        });
    }

    // 删除当前model
    public deleteModel() {
        return new Promise((resolve, reject) => {
            if (!this[this.primayKey]) {
                return reject(new Error('primaryKey不能为空')); 
            }
            this.process({
                url: this.deleteUrl + '?' + this.primayKey + '=' + this[this.primayKey],
                method: 'POST',
                data: {},
            }, resolve, reject); 
        });
    }
}

