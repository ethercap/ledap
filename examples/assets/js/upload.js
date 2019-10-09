ledap.App.getTheme().addComponent({
    name: 'uploader',
    components: {
        'file-upload': VueUploadComponent,
    },
    props: {
        postAction: {
            type: String,
            required: true
        },
        value: Array,
        // 下面为可选属性
        multiple: {
            type: Boolean,
            default: true
        },
        headers: Object,
        data: Object,
        accept: {
            type: String,
            default: 'image/*'
        },
        size: {
            type: Number,
            default: 1024 * 1024 * 10
        }
    },
    data() {
        return {
            files: [],
            name: 'upload',
            timeout: 1000 * 15,
            maximum: 10,
            thread: 3,
            drop: '.upload',
            dropDirectory: true,
            uploadAuto: true,
            directory: false,
            addIndex: false,
            minSize: 1024,
        }
    },
    methods: {
        formatSize(size) {
            let sizeArr = ["", "K", "M", "G", "T", "P"];
            let fsize = size;
            let i = 0;
            for (i = 0; i < sizeArr.length - 1; i++) {
                if (fsize > 1024) {
                    fsize = Math.round(fsize * 100 / 1024) / 100;
                } else {
                    break;
                }
            }
            return fsize + sizeArr[i];
        },
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // 过滤系统文件 和隐藏文件
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent();
                }
                // 过滤 php html js 文件
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent();
                }
                // 去重
                this.files.forEach(file => {
                    if (file.name === newFile.name && this.multiple) {
                        return prevent();
                    }
                });
            }
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                // 创建 blob 字段
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }
                // 缩略图
                newFile.thumb = ''
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob
                }
            }
        },
        // add, update, remove File Event
        inputFile(newFile, oldFile) {
            if (newFile && oldFile) {
                // update
                if (newFile.active && !oldFile.active) {
                    // beforeSend
                    // min size
                    if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                        this.$refs.upload.update(newFile, { error: 'size' });
                    }
                }
                if (newFile.success !== oldFile.success) {
                    this.updateValue();
                }
            }
            if (!newFile && oldFile) {
                this.updateValue();
            }
            // Automatically activate upload
            if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                if (this.uploadAuto && !this.$refs.upload.active) {
                    this.$refs.upload.active = true;
                }
            }
        },
        updateValue() {
            var files = this.files.map(function(item, index) {
                var data = item.response.data;
                // 模拟了请求结果
                return {
                    name: 'name' + index,
                    url: 'url' + index
                };
            });
            this.$emit('input', files);
        }
    },

    template: `
<div class="example-full">
    <div class="upload">
        <div class="panel" :class="[($refs.upload && $refs.upload.dropActive) ? 'panel-primary' : 'panel-default']">
            <div class="panel-body">
                <div class="text-center p-5">
                    <div class="row">
                        <div class="col-sm-4 col-md-4" v-for="file, index in files">
                            <div class="thumbnail" style="height:200px;overflow-y:auto">
                                <img v-if="file.thumb" :src="file.thumb" :alt="file.name" style="height: 50px;">
                                <span v-else>No Image</span>
                                <div class="caption">
                                    <div class="progress" style="height:3px;" v-if="file.active || file.success">
                                        <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}" role="progressbar" :style="{width: file.progress + '%'}">{{file.progress}}%</div>
                                    </div>
                                    <div style="overflow-x: auto;height: 100px">
                                        <p>{{file.name}}</p>
                                        <p>{{formatSize(file.progress*file.size/100)}}b/{{formatSize(file.size)}}b</p>
                                        <div class="actions">
                                            <span class="glyphicon glyphicon-off" v-if="file.active" @click.prevent="$refs.upload.update(file, {active: false, error:'cancel'})"></span>
                                            <span class="glyphicon glyphicon-refresh" v-if="file.error && file.error !== 'compressing' && $refs.upload.features.html5" @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})"></span>
                                            <span class="glyphicon glyphicon-trash"  @click.prevent="$refs.upload.remove(file)"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4>拖动文件到此处上传</h4>
                </div>
            </div>
        </div>
    </div>
    <div class="example-foorer">
        <file-upload
          class="btn btn-primary dropdown-toggle"
          v-model="files"
          :post-action="postAction"
          :multiple="multiple"
          :headers="headers"
          :data="data"
          :accept="accept"
          :directory="directory"
          :size="size"
          :thread="thread"
          :drop="drop"
          :drop-directory="dropDirectory"
          :add-index="addIndex"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload">
          <i class="fa fa-plus"></i>
          选择文件
        </file-upload>
    </div>
</div>
`,
});
ledap.App.register("uploader", Vue);