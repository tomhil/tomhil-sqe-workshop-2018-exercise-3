import $ from 'jquery';
import {parseCode} from './code-analyzer';
import * as flowchart from 'flowchart.js';
let str = 'node1=>operation:let b = [\n    1,\n    2,\n    3\n]; -1- \nnode2=>operation:b[1] = 9; -2- \nnode3=>operation:let q = b[2]; -3- \nnode4=>operation:let a = 5; -4- \nnode5=>operation:a = x + y; -5- \nnode6=>condition:x < a -6- \nnode7=>operation:x++; -7- \n node7=>condition:x < 3 -7- \nnode8=>condition:x < 2 -8- \nnode10=>operation:x = 7; -10- \nnode13=>start: \nnode12=>start: \nnode12=>operation:return x; -12- \nnode11=>operation:x = 2; -11- \nnode12=>operation:x = 3; -12- \nnode13=>start: \nnode12=>start: \nnode12=>operation:return x; -12- \nnode12=>start: \nnode12=>operation:return x; -12- \n'+'node1->node2\n node2->node3\n node3->node4\nnode4->node5\nnode5->node6\nnode6(true)->7\nnode7->node6 \nnode6(false)->7\nnode7(true)->8\nnode8(true)->10\nnode10->node13\nnode13->node12\nnode12->node12\nnode8(fasle)->11\nnode11->node12\nnode12->node13\nnode13->node12\nnode12->node12\nnode7(fasle)->12\nnode12->node12\n';
$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        let string =parsedCode[1]+' '+parsedCode[0];
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        $('#graph').empty();
        flowchart.parse(string).drawSVG('graph',{
            'x': 0,
            'y': 0,
            'line-width': 3,
            'line-length': 50,
            'text-margin': 10,
            'font-size': 14,
            'font-color': 'black',
            'line-color': 'black',
            'element-color': 'black',
            'fill': 'white',
            'yes-text': 'yes',
            'no-text': 'no',
            'arrow-end': 'block',
            'scale': 1,
            // style symbol types
            'symbols': {
                'start': {
                    'font-color': 'red',
                    'element-color': 'green',
                    'fill': 'white'
                },
                'end':{
                    'class': 'end-element'
                }
            },
            // even flowstate support ;-)
            'flowstate' : {
                'past' : { 'fill' : '#CCCCCC', 'font-size' : 12},
                'current' : {'fill' : 'yellow', 'font-color' : 'red', 'font-weight' : 'bold'},
                'future' : { 'fill' : '#ebffd3'},
                'request' : { 'fill' : 'blue'},
                'invalid': {'fill' : '#444444'},
                'approved' : { 'fill' : '#1cc43c', 'font-size' : 12, 'yes-text' : 'T', 'no-text' : 'F' },
                'rejected' : { 'fill' : '#C45879', 'font-size' : 12, 'yes-text' : 'F', 'no-text' : 'REJECTED' }
            }});

    });
});
