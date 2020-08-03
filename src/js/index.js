
$(function(){
    var app = new Vue({
        el: '#app',
        data: {
            result: 0,
            result_before: 0,
            result_flg: true,
            formula_text: '',
            formula_num: [],
            formula_symbol: [],
            errorText_result: '',
            errorText_formula: ''
        },
        beforeMount: function() {
            
        },
        methods: {
            pushNumber: function (value) {
            },
            pushSymbol: function (value) {
            },
            pushCarculate: function(){
            }
        }
    })
});