import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('expressions-test1', () => {
        assert.equal(
            JSON.stringify(parseCode(test1())[2]),
            sol1()
        );
    });

    it('expressions-test2', () => {
        assert.equal(
            JSON.stringify(parseCode(test2())[2]),
            sol2()
        );
    });

    it('aviram example-test3', () => {
        assert.equal(
            JSON.stringify(parseCode(test3())[2]),
            sol3()
        );
    });
    it('if&while-test4', () => {
        assert.equal(
            JSON.stringify(parseCode(test4())[2]),
            sol4()
        );
    })

    it('if&while-test5', () => {
        assert.equal(
            JSON.stringify(parseCode(test5())[2]),
            sol5()
        );
    });

    it('if&while-test6', () => {
        assert.equal(
            JSON.stringify(parseCode(test6())[2]),
            sol6()
        );
    });

    it('if&while-test7', () => {
        assert.equal(
            JSON.stringify(parseCode(test7())[2]),
            sol7()
        );
    });
    it('if&while-test8', () => {
        assert.equal(
            JSON.stringify(parseCode(test8())[2]),
            sol8()
        );
    });

    it('if&while-test9', () => {
        assert.equal(
            JSON.stringify(parseCode(test9())[2]),
            sol9()
        );
    });
    it('if&while-test10', () => {
        assert.equal(
            JSON.stringify(parseCode(test10())[2]),
            sol10()
        );
    });

});


const  test1 =()=>{
    return 'function foo(x, y, z){\n' +
        'let a=[1,2,3];\n' +
        '   a[1]= x+1;\n' +
        '   x= a[2];\n' +
        '   x++;\n' +
        '   x--;\n' +
        '   y++,z=z+1;\n' +
        '  return x;\n' +
        '    \n' +
        '\n' +
        '}\n' +
        'foo(1,2,3);';
};


const sol1 =() =>{
    return '{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"a\"},\"init\":{\"type\":\"ArrayExpression\",\"elements\":[{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"},{\"type\":\"Literal\",\"value\":2,\"raw\":\"2\"},{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}]}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"MemberExpression\",\"computed\":true,\"object\":{\"type\":\"Identifier\",\"name\":\"a\"},\"property\":{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"}},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"}}}},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"MemberExpression\",\"computed\":true,\"object\":{\"type\":\"Identifier\",\"name\":\"a\"},\"property\":{\"type\":\"Literal\",\"value\":2,\"raw\":\"2\"}}}},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"--\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"SequenceExpression\",\"expressions\":[{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"y\"},\"prefix\":false},{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"z\"},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"z\"},\"right\":{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"}}}]}},\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":7},null,null],\"to_eval\":true,\"indx\":6},null,null],\"to_eval\":true,\"indx\":5},null,null],\"to_eval\":true,\"indx\":4},null,null],\"to_eval\":true,\"indx\":3},null,null],\"to_eval\":true,\"indx\":2},null,null],\"to_eval\":true,\"indx\":1}';
};

const test2=()=>{
    return 'function foo(x,y,z) {\n' +
        '  if(x>3){\n' +
        '   x++;\n' +
        '}\n' +
        '\n' +
        ' if(x<3){\n' +
        '   x++;\n' +
        '}\n' +
        '\n' +
        ' if(x<3){\n' +
        '   x++;\n' +
        '}else{\n' +
        ' let b=0;\n' +
        '} \n' +
        '\n' +
        ' if(x>3){\n' +
        '   x++;\n' +
        '}else{\n' +
        ' let b=0;\n' +
        '} \n' +
        'return x;\n' +
        '}\n' +
        'foo(4,2,1);';
};
const sol2=()=>{
    return '{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":true,\"indx\":11},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":false,\"indx\":12}],\"to_eval\":true,\"indx\":10},null,null],\"indx\":13},null,null],\"to_eval\":false,\"indx\":7},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":true,\"indx\":11},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":false,\"indx\":12}],\"to_eval\":true,\"indx\":10},null,null],\"indx\":13},null,null],\"to_eval\":true,\"indx\":8}],\"to_eval\":true,\"indx\":6},null,null],\"indx\":9},null,null],\"to_eval\":false,\"indx\":4},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":true,\"indx\":11},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":false,\"indx\":12}],\"to_eval\":true,\"indx\":10},null,null],\"indx\":13},null,null],\"to_eval\":false,\"indx\":7},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":true,\"indx\":11},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":false,\"indx\":12}],\"to_eval\":true,\"indx\":10},null,null],\"indx\":13},null,null],\"to_eval\":true,\"indx\":8}],\"to_eval\":true,\"indx\":6},null,null],\"indx\":9}],\"to_eval\":true,\"indx\":3},null,null],\"indx\":5},null,null],\"to_eval\":true,\"indx\":2},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":true,\"indx\":11},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":false,\"indx\":12}],\"to_eval\":true,\"indx\":10},null,null],\"indx\":13},null,null],\"to_eval\":false,\"indx\":7},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":true,\"indx\":11},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":false,\"indx\":12}],\"to_eval\":true,\"indx\":10},null,null],\"indx\":13},null,null],\"to_eval\":true,\"indx\":8}],\"to_eval\":true,\"indx\":6},null,null],\"indx\":9},null,null],\"to_eval\":false,\"indx\":4},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":true,\"indx\":11},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":false,\"indx\":12}],\"to_eval\":true,\"indx\":10},null,null],\"indx\":13},null,null],\"to_eval\":false,\"indx\":7},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":3,\"raw\":\"3\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":true,\"indx\":11},{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":14},null,null],\"indx\":15},null,null],\"to_eval\":false,\"indx\":12}],\"to_eval\":true,\"indx\":10},null,null],\"indx\":13},null,null],\"to_eval\":true,\"indx\":8}],\"to_eval\":true,\"indx\":6},null,null],\"indx\":9}],\"to_eval\":true,\"indx\":3},null,null],\"indx\":5}],\"to_eval\":true,\"indx\":1}';
};
const test3 =()=>{
    return 'function foo(x, y, z){\n' +
        '    let a = x + 1;\n' +
        '    let b = a + y;\n' +
        '    let c = 0;\n' +
        '    \n' +
        '    if (b < z) {\n' +
        '        c = c + 5;\n' +
        '    } else if (b < z * 2) {\n' +
        '        c = c + x + 5;\n' +
        '    } else {\n' +
        '        c = c + z + 5;\n' +
        '    }\n' +
        '    \n' +
        '    return c;\n' +
        '}\n' +
        '\n' +
        'foo(1,2,3);';
};
const sol3= () =>{
    return '{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"a\"},\"init\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"}}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"a\"},\"right\":{\"type\":\"Identifier\",\"name\":\"y\"}}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"c\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"b\"},\"right\":{\"type\":\"Identifier\",\"name\":\"z\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"c\"},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"c\"},\"right\":{\"type\":\"Literal\",\"value\":5,\"raw\":\"5\"}}}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"c\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":9},null,null],\"indx\":10},null,null],\"to_eval\":false,\"indx\":5},{\"type\":\"testNode\",\"test_result\":true,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"b\"},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"*\",\"left\":{\"type\":\"Identifier\",\"name\":\"z\"},\"right\":{\"type\":\"Literal\",\"value\":2,\"raw\":\"2\"}}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"c\"},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"c\"},\"right\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"right\":{\"type\":\"Literal\",\"value\":5,\"raw\":\"5\"}}}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"c\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":9},null,null],\"indx\":10},null,null],\"indx\":11},null,null],\"to_eval\":true,\"indx\":7},{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"c\"},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"c\"},\"right\":{\"type\":\"Identifier\",\"name\":\"z\"}},\"right\":{\"type\":\"Literal\",\"value\":5,\"raw\":\"5\"}}}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"c\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":9},null,null],\"indx\":10},null,null],\"indx\":11},null,null],\"to_eval\":false,\"indx\":8}],\"to_eval\":true,\"indx\":6}],\"to_eval\":true,\"indx\":4},null,null],\"to_eval\":true,\"indx\":3},null,null],\"to_eval\":true,\"indx\":2},null,null],\"to_eval\":true,\"indx\":1}';
};
const test4 =() =>{
    return 'function foo(x,y,z){\n' +
        'let a =7;\n' +
        ' while(x>2){\n' +
        '   if(y>1){\n' +
        '   y++;\n' +
        '   }\n' +
        'y--;\n' +
        ' }\n' +
        'return x;\n' +
        '}\n' +
        'foo(1,2,3);';
};
const sol4 =()=>{
    return '{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"a\"},\"init\":{\"type\":\"Literal\",\"value\":7,\"raw\":\"7\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"while_test\",\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":2,\"raw\":\"2\"}},\"next\":[null,{\"type\":\"testNode\",\"test_result\":null,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"y\"},\"right\":{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"y\"},\"prefix\":false}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":false,\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"--\",\"argument\":{\"type\":\"Identifier\",\"name\":\"y\"},\"prefix\":false}},\"next\":[null,null,null],\"to_eval\":false,\"indx\":5},null,null],\"indx\":6},null,null],\"to_eval\":false,\"indx\":4},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":false,\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"--\",\"argument\":{\"type\":\"Identifier\",\"name\":\"y\"},\"prefix\":false}},\"next\":[null,null,null],\"to_eval\":false,\"indx\":5},null,null],\"indx\":6}],\"to_eval\":false,\"indx\":3},{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":7}],\"to_eval\":true,\"indx\":2},null,null],\"to_eval\":true,\"indx\":1}';
};

const test5=() => {
    return 'function foo(x,y,z) {\n' +
        '  if(false){\n' +
        '  while( x<4) {\n' +
        '  x++;\n' +
        '}\n' +
        '}\n' +
        'return x;\n' +
        '}\n' +
        'foo(1,2,1);';
};
const sol5= ()=>{
    return '{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"Literal\",\"value\":false,\"raw\":\"false\"},\"next\":[null,{\"type\":\"while_test\",\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":4,\"raw\":\"4\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[null,null,null],\"to_eval\":false,\"indx\":3},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":4},null,null],\"indx\":5}],\"to_eval\":false,\"indx\":2},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":4},null,null],\"indx\":5}],\"to_eval\":true,\"indx\":1}';
};

const test6=() =>{
    return 'function foo(x,y,z) {\n' +
      '  if(false){\n' +
      '  while( x<4) {\n' +
      '  x++;\n' +
      '}\n' +
      '}\n' +
      'while(y<4){\n' +
      ' y++;\n' +
      '\n' +
      '}\n' +
      'return x;\n' +
      '}\n' +
      'foo(1,2,1);';
};

const sol6 = ()=>{
    return '{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"Literal\",\"value\":false,\"raw\":\"false\"},\"next\":[null,{\"type\":\"while_test\",\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":4,\"raw\":\"4\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":false}},\"next\":[null,null,null],\"to_eval\":false,\"indx\":3},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"while_test\",\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"y\"},\"right\":{\"type\":\"Literal\",\"value\":4,\"raw\":\"4\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"y\"},\"prefix\":false}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":6},{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":8}],\"to_eval\":true,\"indx\":4},null,null],\"indx\":7}],\"to_eval\":false,\"indx\":2},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"while_test\",\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"y\"},\"right\":{\"type\":\"Literal\",\"value\":4,\"raw\":\"4\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"y\"},\"prefix\":false}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":6},{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":8}],\"to_eval\":true,\"indx\":4},null,null],\"indx\":7}],\"to_eval\":true,\"indx\":1}';
};
const test7=()=>{
    return 'function foo(x,y,z) {\n' +
        'let a = !x;\n' +
        '\n' +
        'if(a){\n' +
        '  let b=0;\n' +
        '}\n' +
        '\n' +
        'return x;\n' +
        '}\n' +
        'foo(true,2,1);';
};
const sol7=()=>{
    return '{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"a\"},\"init\":{\"type\":\"UnaryExpression\",\"operator\":\"!\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"},\"prefix\":true}}],\"kind\":\"let\"},\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"Identifier\",\"name\":\"a\"},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":4},null,null],\"indx\":5},null,null],\"to_eval\":false,\"indx\":3},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":4},null,null],\"indx\":5}],\"to_eval\":true,\"indx\":2},null,null],\"to_eval\":true,\"indx\":1}';
};
const  test8=()=>{
    return 'function foo(x){\n' +
        ' if(x>2){\n' +
        '   x=0;\n' +
        '}\n' +
        'if(x>1){\n' +
        ' x=2;\n' +
        '}\n' +
        'return 0;\n' +
        '}\n' +
        'foo(1);';
};
const sol8 =() =>{
    return '{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":2,\"raw\":\"2\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":2,\"raw\":\"2\"}}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":6},null,null],\"indx\":7},null,null],\"to_eval\":false,\"indx\":4},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":6},null,null],\"indx\":7}],\"to_eval\":true,\"indx\":3},null,null],\"indx\":5},null,null],\"to_eval\":false,\"indx\":2},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"testNode\",\"test_result\":false,\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":2,\"raw\":\"2\"}}},\"next\":[{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":6},null,null],\"indx\":7},null,null],\"to_eval\":false,\"indx\":4},{\"type\":\"Node_var\",\"curr\":\"circle\",\"to_eval\":true,\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":6},null,null],\"indx\":7}],\"to_eval\":true,\"indx\":3},null,null],\"indx\":5}],\"to_eval\":true,\"indx\":1}';
};

const test9 =() => {
    return 'function foo(x){\n' +
        ' let a=0,b=9;\n' +
        'return x;\n' +
        '}\n' +
        'foo(1);';
};

const sol9=() =>{
    return '{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"a\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}},{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"Literal\",\"value\":9,\"raw\":\"9\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"x\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":2},null,null],\"to_eval\":true,\"indx\":1}';
};
const test10 =()=>{
    return 'function foo(x, y, z){\n' +
        '   let a = x + 1;\n' +
        '   let b = a + y;\n' +
        '   let c = 0;\n' +
        '   \n' +
        '   while (a < z) {\n' +
        '       c = a + b;\n' +
        '       a++;\n' +
        '   }\n' +
        '   \n' +
        '   return z;\n' +
        '}\n' +
        'foo(1,2,3);';
};

const sol10 = ()=>{
    return '{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"a\"},\"init\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"x\"},\"right\":{\"type\":\"Literal\",\"value\":1,\"raw\":\"1\"}}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"b\"},\"init\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"a\"},\"right\":{\"type\":\"Identifier\",\"name\":\"y\"}}}],\"kind\":\"let\"},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"VariableDeclaration\",\"declarations\":[{\"type\":\"VariableDeclarator\",\"id\":{\"type\":\"Identifier\",\"name\":\"c\"},\"init\":{\"type\":\"Literal\",\"value\":0,\"raw\":\"0\"}}],\"kind\":\"let\"},\"next\":[{\"type\":\"while_test\",\"curr\":{\"type\":\"BinaryExpression\",\"operator\":\"<\",\"left\":{\"type\":\"Identifier\",\"name\":\"a\"},\"right\":{\"type\":\"Identifier\",\"name\":\"z\"}},\"next\":[null,{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"AssignmentExpression\",\"operator\":\"=\",\"left\":{\"type\":\"Identifier\",\"name\":\"c\"},\"right\":{\"type\":\"BinaryExpression\",\"operator\":\"+\",\"left\":{\"type\":\"Identifier\",\"name\":\"a\"},\"right\":{\"type\":\"Identifier\",\"name\":\"b\"}}}},\"next\":[{\"type\":\"Node_var\",\"curr\":{\"type\":\"ExpressionStatement\",\"expression\":{\"type\":\"UpdateExpression\",\"operator\":\"++\",\"argument\":{\"type\":\"Identifier\",\"name\":\"a\"},\"prefix\":false}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":6},null,null],\"to_eval\":true,\"indx\":5},{\"type\":\"return\",\"curr\":{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"Identifier\",\"name\":\"z\"}},\"next\":[null,null,null],\"to_eval\":true,\"indx\":7}],\"to_eval\":true,\"indx\":4},null,null],\"to_eval\":true,\"indx\":3},null,null],\"to_eval\":true,\"indx\":2},null,null],\"to_eval\":true,\"indx\":1}';
};