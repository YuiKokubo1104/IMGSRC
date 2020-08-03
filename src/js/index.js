 var app;
$(function(){
    app = new Vue({
        el: '#app',
        data: () => ({
            result: '0',
            result_text: '0',
            formula_num: [],
            formula_symbol: [],
            formula_text: '',
            formula_flg: false,
            error: {
                result: false,
                formula: false
            }
        }),
        beforeMount: function() {
        },
        methods: {
            pushNumber: function (value) {

                if(this.result == 0){ //0だった場合
                    if(value == 0 || value == '.') return;
                    this.result = value;
                    this.result_text = this.result;
                } else { //通常
                    if(this.result.slice(-1) == '.' && value == '.') return;//最後が.で終わっている且つ値が.

                    this.result = this.result.replace( /,/g , "") + value;
                    this.result_text = Number(this.result).toLocaleString( undefined, { maximumFractionDigits: 20 });
                    if(value == '.') this.result_text = this.result_text + value;//.が取れてしまったのでつけ直し
                }
            },
            pushSymbol: function (value) {
                if(this.formula_num.length == 0 && this.result == 0) return; //数値が無くボタンが押された場合

                if(this.formula_num.length　== this.formula_symbol.length && this.result == 0){ // すでに記号が押されていた場合
                    this.formula_symbol[this.formula_symbol.length-1] = value;
                } else {
                    // 数値
                    this.formula_num[this.formula_num.length] = this.result_text;
                    this.result = 0;

                    // 記号
                    this.formula_symbol[this.formula_symbol.length] =　value;

                }
                this.createAllformula();

            },
            pushCalculation: function(){
            },
            pushClear: function(){
                Object.assign(app.$data, app.$options.data());
            },
            createAllformula: function(){
                this.formula_text = '';

                let tmp_num = this.formula_num.length;
                let tmp_symbol = this.formula_symbol.length; 
                let numFlg = (tmp_num < tmp_symbol) ? true : false;

                for(let i = 0;i < tmp_num; i++){
                    this.formula_text = this.formula_text + this.formula_num[i];
                    if(numFlg && (i+1 == tmp_num)) break;
                    this.formula_text = this.formula_text + this.formula_symbol[i];
                }
            },
        }
    })

    $("body").addClass("js_ready");
});