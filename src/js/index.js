
$(function(){
    var app = new Vue({
        el: '#app',
        data: {
            result: 0,
            result_before: 0,
            result_text: '',
            formula_num: [],
            formula_symbol: [],
            formula_text: '',
            error: {
                result: false,
                formula: false
            }
        },
        beforeMount: function() {
            this.result_text = this.result;
        },
        methods: {
            pushNumber: function (value) {
                alert(value);

            },
            pushSymbol: function (value) {
                alert(value);
            },
            pushClear: function(){
                alert('clear');
                this.result = 0;
                this.result_before = 0;
                this.result_text = '';
                this.formula_num = [];
                this.formula_symbol = [];
                this.error.result = false;
                this.error.formula = false;
            }
        }
    })

    $("body").addClass("js_ready");
});