export interface _VueData {
    name: string;
    value: string;
}

export interface _VueMethod {
    name: string;
    /**
     * 方法体
     * **/
    value: string;
}

export interface _Vue {
    name?: string;
    data: _VueData[];
    created?: string;
    mounted?: string;
    methods: _VueMethod[];
    imports: string[];
}
