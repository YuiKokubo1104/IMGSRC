
$(function(){
    var app = new Vue({
        el: '#app',
        data: () => ({
            result_before: 0,
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

                if(this.result_text == 0){ //前回0だった場合
                    if(value == 0 || value == '.') return;
                    this.result_text = value;
                } else { //通常
                    this.result_text = this.result_text.replace( /,/g , "") + value;
                    this.result_text = Number(this.result_text).toLocaleString( undefined, { maximumFractionDigits: 20 });
                    if(value == '.') this.result_text = this.result_text + value;
                }
            },
            pushSymbol: function (value) {
                if(this.formula_num.length == 0) return;

            },
            pushClear: function(){
                Object.assign(app.$data, app.$options.data());
            }
        }
    })

    $("body").addClass("js_ready");
});