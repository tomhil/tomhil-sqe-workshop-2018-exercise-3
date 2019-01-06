import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
let  should_calc = true;
let parms=[];
let val_params = [];
let vars = new Map();
let i=0;
let visited=[];

const parseCode = (codeToParse) => {
    should_calc = true;
    parms=[];
    val_params = [];
    vars = new Map();
    visited=[];
    i=0;
    let b = [];
    let node= analyze( esprima.parseScript(codeToParse));
    b.push(' st->node1 \n'+get_arrows(node)  );
    b.push(' st=>start: start| approved \n '+build_nodes(node));
    b.push(node);
    return b;



};
const decl_stat = (decleration) =>{
    let non_change = JSON.parse(JSON.stringify(decleration));
    decleration.declarations.forEach(function (declerator) {vars.set(declerator.id.name,replace(declerator.init));
    });
    i++;
    let ev=should_calc;
    return {type: 'Node_var', curr:non_change , next:[null,null,null] ,to_eval:ev, indx:i};
};
const expr_statment = (expr ) =>{
    let non_change = JSON.parse(JSON.stringify(expr));

    if(expr.expression.type == 'SequenceExpression'){
        expr.expression.expressions.forEach(function (exprs) {
            replace(exprs);
        });
    }
    else{
        replace(expr.expression);
    }
    i++;
    let ev = should_calc;
    return {type:'Node_var',curr:non_change,next:[null,null,null],to_eval:ev,indx: i};

};
const expr_update = (expr ) =>{
    //  if(expr.argument.type == 'MemberExpression'){
    //    return update_arr(expr.argument,expr.operator);
    // }
    if(expr.operator == '++') {
        vars.set(expr.argument.name, {
            type: 'BinaryExpression',
            operator: '+',
            left: vars.get(expr.argument.name), right: {type: 'Literal', value: 1, raw: '1'}
        });
        return vars.get(expr.argument.name);
    }else{
        vars.set(expr.argument.name, {
            type: 'BinaryExpression',
            operator: '-',
            left: vars.get(expr.argument.name), right: {type: 'Literal', value: 1, raw: '1'}});
        return vars.get(expr.argument.name);
    }
};
//const update_arr =(expr_arr,op)=>{
//    let ar = vars.get(expr_arr.object.name);
//    if(op == '++') {
//        ar.elements[expr_arr.property.value] ={ type: 'BinaryExpression',
//            operator: '+',
//            left: replace( vars.get(ar.elements[expr_arr.property.value])),
//            right: {type: 'Literal', value: 1, raw: '1'}};
//    }else {
//        ar.elements[expr_arr.property.value] ={ type: 'BinaryExpression',
//            operator: '-',
//            left: replace(vars.get(ar.elements[expr_arr.property.value])), right: {type: 'Literal', value: 1, raw: '1'}};
//    }
//    vars.set(expr_arr.object.name,ar);
//    return ar.elements[expr_arr.property.value];
//};
const replace = (expr)=> {
    return (ftype(expr.type))(expr);
};
const subLiteral = (body) => {
    return body;
};
function assignment_arr(left, right) {
    let arr = vars.get(left.object.name);
    arr.elements[left.property.value] = replace(right);
    vars.set(left.object.name,arr);

}
const subAssignment = (body) => {
    let b =  JSON.parse(JSON.stringify(body));
    if(body.left.type === 'MemberExpression'){
        assignment_arr(body.left,body.right);

    }else{
        vars.set(body.left.name,replace(body.right));
    }
    return b;
};
const  subBinary =(binaryExp) => {
    let subbed_binary =binaryExp.valueOf();
    subbed_binary.left = replace(subbed_binary.left);
    subbed_binary.right= replace(subbed_binary.right);
    return binaryExp;
};
const subUnary = (body)=>{
    let unar = body;
    unar.argument = replace(unar.argument);
    return unar;

};
const subArray = (body) =>{
    let arr = body;
    let i=0;
    arr.elements.forEach(function (element) {
        arr.elements[i] = replace(element);
        i++;
    });
    return arr;
};
const subMember = (member) =>{
    return replace(vars.get(member.object.name).elements[member.property.value]);
};
const subIdentifer = (identifier) =>{
    return vars.get(identifier.name);
};
const sub_body_2 = (expr)=>{
    let node=null;
    expr.body.forEach(function (ele) {
        node = find_end(node,replace(ele));
    })  ;
    return node;
};
const  subWhile = (while_expr) =>{
    i++;
    let while_node = {type: 'while_test' ,curr: 'Null',next: [null ,null,null],to_eval:should_calc ,indx:i};
    while_node.curr=JSON.parse(JSON.stringify(while_expr.test));
    let befor= new Map(vars);
    if(should_calc){
        if(!check_condiion(while_node.curr)) {
            should_calc = false;
            let while_body = replace(while_expr.body);
            while_node.next[1] = while_body;
            vars= befor;
            should_calc=true;
            return while_node;
        }else{
            let while_body = replace(while_expr.body);
            while_node.next[1] = while_body;
            while (check_condiion(while_node.curr)) {
                while_node.next[1]=  replace(while_expr.body);
            }return while_node;}}let while_body = replace(while_expr.body);while_node.next[1] = while_body;vars= befor;return while_node;
};
const subret = (ret_statment) =>{
    i++;
    return {type:'return' , curr:ret_statment, next:[null,null,null],to_eval:true,indx:i};
};
const if_sub = (if_expr)=>{
    let continue_with ;
    let befor_if = new Map(vars);
    i++;
    let test_node ={type:'testNode',test_result:null ,curr: if_expr.test, next:[null,null,null] , to_eval:null,indx: i};
    test_node.to_eval= should_calc;
    let test = if_expr.test;
    test_node.curr = test;
    if(should_calc) {
        test_node.test_result = check_condiion(test);
        should_calc =test_node.test_result;
        test_node.next[1]=replace(if_expr.consequent);
        continue_with = new Map(vars);
        vars = befor_if;
        should_calc= !test_node.test_result;
        if(if_expr.alternate != null) {
            test_node.next[2] = replace(if_expr.alternate);}else{test_node.next[2] = null;}if(test_node.test_result){vars = continue_with;}should_calc = true;return test_node;}continue_with = new Map(vars);test_node.next[1]=replace(if_expr.consequent);vars = befor_if;if(if_expr.alternate!=null){test_node.next[2]= replace(if_expr.alternate);}else{test_node.next[2]=null;}vars = continue_with;return test_node;
};
const   ftype =(type) => {
    let arrfunc = [];
    arrfunc['BinaryExpression'] = subBinary;
    arrfunc['UnaryExpression'] = subUnary;
    arrfunc['ArrayExpression'] = subArray;
    arrfunc['MemberExpression'] = subMember;
    arrfunc['Literal'] = subLiteral;
    arrfunc['Identifier'] = subIdentifer;
    arrfunc['UpdateExpression'] = expr_update;
    arrfunc['IfStatement'] =  if_sub ;
    arrfunc['ReturnStatement'] =subret ;
    arrfunc['BlockStatement'] = sub_body_2;
    arrfunc['VariableDeclaration'] =decl_stat ;
    arrfunc['ExpressionStatement'] =expr_statment ;
    arrfunc['AssignmentExpression']=subAssignment;
    arrfunc['WhileStatement'] = subWhile;
    return  arrfunc[type];

};
const check_condiion =(test)=>{
    let t =test;
    //return esprima.parseScript(escodegen.generate(t)).body[0];
    let subbed_test = replace(esprima.parseScript(escodegen.generate(t)).body[0].expression);
    //return subbed_test;
    let essub=escodegen.generate(subbed_test);
    let test_result= eval(essub);
    return test_result;
};
const analyze = (code)=>{
    let b=null;
    code.body.forEach(function (element) {
        if(element.type === 'ExpressionStatement') {
            if (element.expression.type === 'CallExpression') {
                element.expression.arguments.forEach(function (ele) {
                    val_params.push(ele);
                });
            }
        }
        if(element.type === 'FunctionDeclaration'){
            set_parmas(element);
        }
    });
    replace_vars();
    code.body.forEach(function (element) {
        if(element.type === 'FunctionDeclaration'){
            b=    replace(element.body);}});return b;
};
const set_parmas = (func) =>{
    func.params.forEach(function (paramater) {
        parms.push(paramater.name);
    });
};
const replace_vars = () => {
    let i=0;
    parms.forEach(function (ele) {
        vars.set(ele,val_params[i]);
        i=i+1;
    });

};
const find_end = (body,expr) =>{
    if(body === null){
        return expr;
    }
    if(body.type === 'return'){
        return body;
    }
    if(check_empty(body)){
        return empty_senerio(body,expr);
    }

    return cont(body,expr);
};
const build_nodes = (node) =>{
    if(node === null){
        return '';
    }
    return logic(node) ;
};
const logic = (node)=>{
    if(node.type === 'Node_var'){
        return node_var_cont(node);
    }else{
        if(node.type === 'while_test'){
            return test_cont_while(node);
        }
        if(node.type ==='testNode'){
            return test_cont(node);
        }else{
            if(node.type === 'return'){
                let str = 'node'+node.indx+'=>'+'end'+': '+get_stringed_value(node.curr)+' -'+node.indx+'- |approved '+' \n ';
                return str;
            }
        }
    }
};
const node_var_cont = (node)=>{
    if(node.curr === 'circle'){
        if(node.to_eval) {
            let str = 'node' + node.indx + '=>' + 'start' + ': ' + 'null|approved' + ' \n ' + build_nodes(node.next[0]);
            return str;
        }
        let str = 'node' + node.indx + '=>' + 'start' + ': ' + 'null' + ' \n ' + build_nodes(node.next[0]);
        return str;
    }
    if(node.to_eval){
        let str = 'node'+node.indx+'=>'+'operation'+': '+get_stringed_value(node.curr)+' -'+node.indx+'- |approved'+' \n ' +build_nodes(node.next[0]);
        return str;}
    let str = 'node'+node.indx+'=>'+'operation'+': '+get_stringed_value(node.curr)+' -'+node.indx+'- '+' \n ' +build_nodes(node.next[0]);
    return str;
};
const test_cont =(node)=>{
    if(node.to_eval){
        let cond_if = 'node'+node.indx+'=>'+'condition' +': '+ get_stringed_value(node.curr)+' -'+node.indx+'- |approved'+ ' \n ';
        let true_cond =  build_nodes(node.next[1]);
        let false_cond =build_nodes(node.next[2]);
        return cond_if+ true_cond+ false_cond;
    }
    let cond_if = 'node'+node.indx+'=>'+'condition' +': '+ get_stringed_value(node.curr)+' -'+node.indx+'- '+ ' \n ';
    let true_cond =  build_nodes(node.next[1]);
    let false_cond =build_nodes(node.next[2]);
    return cond_if+ true_cond+ false_cond;
};
const test_cont_while=(node)=>{
    if(node.to_eval){
        let cond_while = 'node'+node.indx+'=>'+'condition' +': '+ get_stringed_value(node.curr)+' -'+node.indx+'- |approved'+' \n ';
        let body_cond =  build_nodes(node.next[1]);
        let cont = build_nodes(node.next[2]);
        return cond_while+ body_cond+ cont;
    }
    let cond_while = 'node'+node.indx+'=>'+'condition' +': '+ get_stringed_value(node.curr)+' -'+node.indx+'- '+'\n ';
    let body_cond =  build_nodes(node.next[1]);
    let cont = build_nodes(node.next[2]);
    return cond_while+ body_cond+ cont;
};
const get_stringed_value = (data) =>{
    return escodegen.generate(data);
};
const get_arrows = (node) =>{
    if(node.type==='Node_var'){
        let str = 'node'+node.indx+ '->'+'node'+node.next[0].indx+' \n '+ get_arrows(node.next[0]);
        return str;
    }
    if(node.type === 'while_test'){
        let test_to_body= 'node'+node.indx+'(true)'+'->'+'node'+node.next[1].indx+' \n ';
        let body_to_test = get_arrows_to_while(node.next[1],'node'+node.indx);
        let test_to_cont= 'node'+node.indx+'(false)'+'->'+'node'+node.next[2].indx+' \n '+get_arrows(node.next[2]);
        return test_to_body+' '+body_to_test+' '+test_to_cont;
    }
    if(node.type === 'testNode'){
        let test_to_true_branch ='node'+node.indx+'(true)'+'->'+'node'+node.next[1].indx+'\n '+get_arrows(node.next[1]);
        let test_to_false_branch ='node'+node.indx+'(no)'+'->'+'node'+node.next[2].indx+'\n '+get_arrows(node.next[2]);
        return test_to_true_branch+ test_to_false_branch;
    }
    if(node.type === 'return'){
        return '';
    }
};
const get_arrows_to_while  = (node,s)=> {
    if(check_empty(node)){
        return 'node'+node.indx+ '->'+s+' \n';
    }else{
        if(node.type==='Node_var'){
            let str = 'node'+node.indx+ '->'+'node'+node.next[0].indx+' \n '+ get_arrows_to_while(node.next[0],s);
            return str;
        }
        if(node.type === 'while_test'){
            let test_to_body= 'node'+node.indx+'(true)'+'->'+'node'+node.next[1].indx+' \n ';
            let body_to_test = get_arrows_to_while(node.next[1],'node'+node.indx);
            let test_to_cont= 'node'+node.indx+'(false)'+'->'+'node'+node.next[2].indx+' \n '+get_arrows_to_while(node.next[2],s);
            return test_to_body+' '+body_to_test+' '+test_to_cont;
        }
        if(node.type === 'testNode'){
            return test_node_cont(node,s);
        }
    }
};
const test_node_cont = (node,s)=>{
    if(node.next[1]===null){
        let test_to_true_branch ='node'+node.indx+'(true)'+'->'+s+'\n ';
        let test_to_false_branch ='node'+node.indx+'(false)'+'->'+'node'+node.next[2].indx+'\n '+get_arrows_to_while(node.next[2],s);
        return test_to_true_branch+ ' ' +test_to_false_branch;
    }
    if(node.next[2]=== null){
        let test_to_true_branch ='node'+node.indx+'(true)'+'->'+'node'+node.next[1].indx+' \n '+get_arrows_to_while(node.next[1],s);
        let test_to_false_branch ='node'+node.indx+'(false)'+'->'+s+' \n ';
        return test_to_true_branch+ ' ' +test_to_false_branch;
    }
    let test_to_true_branch ='node'+node.indx+'(true)'+'->'+'node'+node.next[1].indx+' \n '+get_arrows_to_while(node.next[1],s);
    let test_to_false_branch ='node'+node.indx+'(false)'+'->'+'node'+node.next[2].indx+' \n '+get_arrows_to_while(node.next[2],s);
    return test_to_true_branch+ ' ' +test_to_false_branch;
};
const empty_senerio = (body,expr)=>{
    if(expr.type === 'return'){
        body.next[0]=expr;
        return body;
    }
    if(body.type === 'Node_var'){
        body.next[0]=expr;
        return body;
    }//else{
    //  if(body.type === 'testNode'){
    //      i++;
    //      let ev = body.to_eval;
    //     let circle = {type: 'Node_var', curr: 'circle' ,to_eval: ev,next: [expr,null,null], indx:i};
    //      visited.push(body.indx);
    //      body.next[1]= circle;
    //      body.next[2]= circle;
    //      return body;
    //}else{
    //   body.next[2] = expr;return body;}}
};
const check_empty =(node) =>{
    if(node.next[0]=== null & node.next[1]=== null & node.next[2]=== null){
        return true;
    }
    return false;
};
const contains = (indx) => {
    for(let k=0; k<visited.length; k++){
        if(visited[k]=== indx)
            return true;
    }
    return false;
};
const cont = (body,expr)=>{
    if(body.type =='Node_var'){
        body.next[0]=find_end(body.next[0],expr);
        return body;}
    else {
        if (body.type === 'testNode') {
            if (contains(body.indx)){
                body.next[1] =  find_end(body.next[1],expr);
                return body;
            }
            i++;
            let ev = body.to_eval;
            let circle = {type: 'Node_var', curr: 'circle', to_eval: ev, next: [expr, null, null], indx: i};
            visited.push(body.indx);
            body.next[1] = find_end(body.next[1], circle);
            body.next[2] = find_end(body.next[2], circle);
            return body;} else {if (body.type === 'while_test') {body.next[2] = find_end(body.next[2], expr);return body;}return body;
        }
    }
};
export {parseCode};
