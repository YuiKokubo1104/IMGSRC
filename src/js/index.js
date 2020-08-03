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
            flg_inputNum: false, //0が押されている可能性
            error: {
                result: false,
                formula: false
            }
        }),
        beforeMount: function() {
        },
        methods: {
            pushNumber: function (value) {
                if((this.result.split('.').length == 2 && value == '.')) return;//最後が.で終わっている且つ値が.

                if(this.result == '0'){//現在0だった場合
                    if(value == 0) { //0が押されました
                        this.result_text　= value;
                        this.flg_inputNum = true;
                        return;
                    }

                    if(value == '.') { //.が押されました
                        this.result = this.result + value;
                    } else {
                        this.result = value;
                    }
                    
                } else { //通常
                    //数値に戻して付け足し
                    this.result = this.result.replace( /,/g , "") + value;

                    let flg_decimal = this.result.split('.').length == 2 ? this.result.split('.')[1] : false;
                    console.log(flg_decimal);

                    this.result = Number(this.result).toLocaleString( undefined, { maximumFractionDigits: 20 });

                    if(flg_decimal || flg_decimal==""){ // 小数点以下が存在
                        if(value == '.' && flg_decimal=="") this.result = this.result + value;//.が取れてしまったのでつけ直し
                        if(value == '0') this.result = this.result.split('.')[0] + '.' + flg_decimal;
                    }
                }
                this.result_text = this.result;
                this.flg_inputNum = true;
            },
            pushSymbol: function (value) {

                if(this.formula_text.slice(-1) == ' '){ // 記号で終わっている場合
                    //数値の入力がない
                    if(!this.flg_inputNum) this.formula_symbol[this.formula_symbol.length-1] = value;
                    
                } else {
                    // 数値
                    this.formula_num[this.formula_num.length] = Number(this.result).toLocaleString( undefined, { maximumFractionDigits: 20 });
                    this.result = '0';

                    // 記号
                    this.formula_symbol[this.formula_symbol.length] =　value;

                }
                this.createAllformula();
                flg_inputNum = false;
            },
            pushCalculation: function(){
                if(this.formula_num.length == 0 || this.result == 0) return;// 式がない時は返却

                if(this.formula_text.slice(-1) == ' '){ // 記号で終わっている場合
                }
                let answer = safeEval(this.formula_text);
                alert(answer);

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
            safeEval: function (value) {
                return Function('"use strict";return ('+value+')')();
            }
        }
    })

    $("body").addClass("js_ready");
});
