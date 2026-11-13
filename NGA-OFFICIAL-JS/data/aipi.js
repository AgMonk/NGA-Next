/**
@namespace
*/

if(!commonui.buttonBase.altsubtil)
	commonui.buttonBase.altsubtil=function(tx){
		return _$('/span','className','block_txt_big title','style','padding-left:0.2em;width:1.04em;padding-right:0.2em;float:left;color:'+__COLOR.bg0+';background:'+__COLOR.border0
			,_$('/span','style','transform:scale('+(tx.length>3?'0.6':'0.8')+');transform-origin:50% 0%;display:block;line-height:1.2em;padding-top:0.2em;','innerHTML',tx)
			)
		}
commonui.aipi = {
css:null,
pop:null,
cancel:0,
postUi : function(event, a){
var $ = _$, c, s=this
, req = commonui.aipi.gen()
, f = function(x){
	if(typeof x =='object'){
		var y , z=window.innerWidth * 0.9,cs
		c.innerHTML=''
		try{
			y = $('m_posts_c').getElementsByClassName('ubbcode')[0]
			if(y.parentNode.parentNode.nodeName=='TD')
				z = commonui.getAvilWidth(y.parentNode.parentNode)
		}catch(e){}
		if(x && !x.raw)delete x.raw
		c._.add(
			$('/div','class','forumbox','style','width:'+z+'px;margin:0;box-shadow:none;border:0')._.add(
				$('/div','class','postrow row2')._.add(
					cs = $('/pre','class','postcontent ubbcode contentBlock','style','display:block;border:none;margin:0')._.add(commonui._debug._d('',x).replace(/^content = /,''))
					)
				)
			)
		s.pop._.show()
		return cs
		}
	else if(typeof x =='number')
		c.innerHTML = '思考中... '+x
	}
,ki,ch,urlInp,modInp,st
,ni = function(h){
	return $('/input','placeholder',h,'style','margin: 0px 0.1em; background: transparent; box-shadow: none; width: 18em; border: 1px solid'+__COLOR.bg6)
	}
,bb = function(t,b,o){
	return $('/a','class','block_txt_big silver','style','background:'+__COLOR.bg6,'href','javascript:void(0)','_op',o,'onclick',function(){
		req.taskPost(
			a.tid
			,a.pid
			,window.__CURRENT_PAGE
			,this._op | (st.checked ? 8 : 0)
			,f
			,(this._op&4) ? ki.value : null
			,(this._op&4) ? (ch.value ? ch.value : ch.placeholder) : null
			,(this._op&4) ? (urlInp.value ? urlInp.value : urlInp.placeholder) : null
			,(this._op&4) ? (modInp.value ? modInp.value : modInp.placeholder) : null
			)
		})._.add(t,b ? [$('/br'),$('/span','class','info')._.add('\u2003'+b)] : null )
	}
,sv = function(){
	var y={}, x
	if(x=ki.value)
		y.kdp = x
	if(x=ch.value)
		y.per = x
	if(x=urlInp.value)
		y.apiurl = x
	if(x=modInp.value)
		y.model = x
	if(st.checked)
		y.stream = 1
	for(var k in y)
		return commonui.userCache.set('aipisave',JSON.stringify(y),86400*180)
	commonui.userCache.del('aipisave')
	}
,lo = function(){
	var y = commonui.userCache.get('aipisave')
	if(y)
		try{
			y = JSON.parse(y)
			ki.value = y.kdp ? y.kdp : ''
			ch.value = y.per ? y.per : ''
			urlInp.value = y.apiurl ? y.apiurl : ''
			modInp.value = y.model ? y.model : ''
			if(y.stream)
				st.checked='checked'
			}
		catch(e){
			commonui.userCache.del('aipisave')
			}
	return null
	}
if(!this.pop)
	this.pop = commonui.createCommmonWindow((a.lite & 32)? 16:0,{'onclose':function(){
		if(s.cancel)
			return s.cancel=0
		}})
	
this.pop._.addContent(null,
	c=$('/div')._.add(
		a.__GP.staff ? 
			$('/div')._.add(
				commonui.buttonBase.altsubtil('内置')
				,bb('总结此页','(包括主楼)',3) 
				,bb('总结此页','',1)
				,bb('总结此楼','',0)
				) : null
		,$('/div','style','border-top:1px solid '+__COLOR.postUiElm)._.add(
			commonui.buttonBase.altsubtil('自助')
			,bb('总结此页','(包括主楼)',7)
			,$('/br')
				,$('/span','class','silver xtxt')._.add('K E Y ', ki = ni('填入API KEY').$0('type','password','size','7','onchange'
					,function(){
						if(this.value)
							alert('APIKEY将保存在客户端 请注意安全风险')
						sv()
						})
					, 'APIKEY将保存在客户端'
					)
			,$('/br')
			,$('/span','class','silver xtxt')._.add('提示词' ,ch = ni('总结以下论坛对话').$0('onchange'
					,function(){
						sv()
						})
				)
			,$('/br')
			,$('/span','class','silver xtxt')._.add('接\u2003口' ,urlInp = ni('https://api.deepseek.com/chat/completions').$0('onchange'
					,function(){
						sv()
						})
				)
			,$('/br')
			,$('/span','class','silver xtxt')._.add('模\u2003型' ,modInp = ni('deepseek-chat').$0('onchange'
					,function(){
						sv()
						})
				)
			,$('/br')
			,$('/span','class','silver xtxt')._.add('流\u2003式' ,st = $('/input','type','checkbox','onchange'
					,function(){
						sv()
						})
				,(()=>{return lo()})()
				)
			)
		)
	)
this.pop._.addTitle('AI总结')
this.pop._.show(event)
}//
,gen:function(){
	/** @type {commonui.aipi} */
	var x = function(){}
	x.prototype = this
	x = new x()
	x.nowtsk=''
	x.i=0
	
	return x
	}//
,poll:function(id,url,f){
var s = this
if(s.nowtsk!=id || s.i>60)
	return
if(s.cancel)
	return s.cancel=0
fetch(new Request('https://'+location.host+url)).then(
	function(rr) {
		if(rr.ok){
			rr.text().then(function(txt){
				if(!txt){
					f(++s.i)
					setTimeout(function(){s.poll(id,url,f)},1000)
					}
				else{
					txt = JSON.parse(txt)
					if(txt && txt.rky){
						if(txt.stream){


							s.stream_from_relay(txt.rky, txt.stream, f)

							}
						else
							__NUKE.doRequest2(
								'f',function(d){
									s.result(d,f)
									}
								,'u',__API._base+'__lib=ai_explain&__act=get_result_json'
								,'rky',txt.rky
								,'__output',3
								)
						}
					}
				})
			}
		else
			alert('POLL ERROR')
		}
	).catch(
	function(){alert('POLL ERROR')}
	)
}//
,i:0
,nowtsk:''
,result:function(d,f){
if(this.cancel)
	return this.cancel=0
if(d && d.data && d.data[0]){
	if(d.data[0].charAt(0)=='{')
		f(JSON.parse(d.data[0]))
	else
		f({'content':d.data[0],'raw':d.data[1] ? d.data[1] : null})
	}
else
	alert('DATA ERROR')
}//
/** 
first arg of f is loopi/result
*/
,taskPost:function(tid,pid,page,op,f,key,pormp,apiUrl,model){
var s = this
,b = 524288,u='/read.php?'
if(op&1){
	u+='tid='+tid+'&page='+(page?page:'')
	if(op&2)
		b|=1048576
	}
else{
	u+='tid='+tid+'&pid='+(pid ? pid : '')
	if(!pid)
		b|=2
	}
if(op&4){
	b|=2097152
	return this.clientTask(u,b,f,key,pormp,apiUrl,model,(op&8))
	}
s.i = 0
__NUKE.doRequest2(
	'f',function(d){
		if(d.error){
			if(d.error[0]=='4096:WAIT'){
				f(++s.i)
				var pol = d.error[1].match(/POLLING\s*(\/event_query\/[^\s]+)/)
				if(!pol)
					return alert('DATA ERROR')

				s.nowtsk = 'P'+Math.random()
				setTimeout(function(){s.poll(s.nowtsk, pol[1],f)},1000)
				}
			else if(d.error[0]=='4096:CACHE'){
				var pol = d.error[1].match(/RESULT rky=([^\s]+)/)
				if(!pol)
					return alert('DATA ERROR')
				__NUKE.doRequest2(
					'f',function(d){
						s.result(d,f)
						}
					,'u',__API._base+'__lib=ai_explain&__act=get_result_json'
					,'rky',pol[1]
					,'__output',3
					)
				}
			else
				alert(d.error[0])
			}
		else
			alert('REQUEST ERROR')
		}
	,'u',u+'&__output=3&opt='+b
	)
}//

,clientTask: function(u,b,f,key,pormp,apiUrl,model,ifstream){
var s = this
__NUKE.doRequest2(
	'f',function(d){
		if(d.error){
			if(d.error[0]=='4096:OUTPUT'){
				//console.log(d.data.__MESSAGE[6])
				if(ifstream)
					s.stream_api(apiUrl,key,model,pormp,d.data.__MESSAGE[6],f)
				else
					s.wait_api(apiUrl,key,model,pormp,d.data.__MESSAGE[6],f)
				
				}
			else
				alert(d.error[0])
			}
		else
			alert('REQUEST ERROR')
		}
	,'u',u+'&__output=3&opt='+b
	)
}//
, stream_from_relay: async function(key,tok,f){
var rrr = await fetch('https://'+location.host+'/nuke.php?__lib=ai_explain&__act=stream_relay', {
	method: 'POST',
	headers: {  "Content-Type": "application/x-www-form-urlencoded", 'Accept': 'text/event-stream' },
	body: 'ky='+key+'&tok='+tok
	});

var cs = f(null)
, reader = rrr.body.getReader()
, api = rrr.headers.get('x-nga-api-relay')
, merged = {content:'',raw:null}
,decoder = new TextDecoder()


if(!rrr.ok)
	return cs.textContent = rr.status + ' '+rr.statusText


if(api == 'deepseek_chat_stream'){
	while (true) {
		var x = await reader.read()
		if (x.done)
			break
		this.stream_looper(decoder.decode(x.value, { stream: true }),cs,merged)
		}
	console.log(merged);

	}
else{
	rrr.text().then(function(txt){
		if(txt.charAt(0)=='{'){
			var e = __NUKE.doRequestIfErr(JSPN.parse(txt))
			if(e)cs.textContent = e
			}
		else
			cs.textContent = txt
		})
	}
}//
,wait_api: async  function(apiUrl,key,model,pormp,content,f){
var cd , i=0
f(i)
cd = setInterval(function(){console.log(i);f(++i)},1000)

var rrr = await fetch(apiUrl, {
	method: "POST",
	headers: { "Content-Type": "application/json"
		,'Authorization':'Bearer '+key
		},
	body: (JSON.stringify({
		"model": model,
		"messages":[
			{'role':'user' , 'content':pormp}
			,{'role':'user' , 'content':content}
			],
		"stream":false
		}))
	});

var cs
, reader = rrr.body.getReader()
, merged = {content:'',raw:null}
,decoder = new TextDecoder()

var x = await reader.read()
clearInterval(cd)
cs = f(null)
this.stream_looper([decoder.decode(x.value)],cs,merged)

}//
,stream_api: async function(apiUrl,key,model,pormp,content,f){
var rrr = await fetch(apiUrl, {
	method: "POST",
	headers: { "Content-Type": "application/json"
		,'Authorization':'Bearer '+key
		},
	body: (JSON.stringify({
		"model": model,
		"messages":[
			{'role':'user' , 'content':pormp}
			,{'role':'user' , 'content':content}
			],
		"stream":true
		}))
	});

var cs = f(null)
, reader = rrr.body.getReader()
, merged = {content:'',raw:null}
,decoder = new TextDecoder()

if(!rrr.ok)
	return cs.textContent = rrr.status + ' '+rrr.statusText

while (true) {
	var x = await reader.read()
	if (x.done)
		break
	this.stream_looper(decoder.decode(x.value, { stream: true }),cs,merged)
	}
console.log(merged);

}//
,stream_looper : function(chunk,contentNode,merge){
var cc=''
//console.log(chunk)
if(typeof chunk=='string')
	chunk = chunk.split("\n\n")
chunk.forEach(function(v){
	if(!v.length)return
	v = v.replace(/^\s*data:\s*/,'')
	if(v=='[DONE]')
		return
	try{
		//console.log(v)
		v= JSON.parse(v)
		if(v.deltaC){
			cc = v.deltaC
			v.deltaC = '...'
			}
		else if(v.choices){
			if(v.choices[0].delta){
				cc = v.choices[0].delta.content
				v.choices[0].delta.content = '...'
				}
			else{
				cc = v.choices[0].message.content
				v.choices[0].message.content = '...'
				}
			}
		merge.content+=cc
		contentNode.textContent += cc
		if(v.usage)
			merge.raw = v
		}
	catch(e){console.log(e,v)}
	})
if(merge.raw)
	contentNode.textContent += "\n"+commonui._debug._d('',merge.raw)
}//

}////


if(!commonui.aipi.css){
	__NUKE.addCss('input[type="password"] {border:1px solid '+__COLOR.border2+';box-shadow: 0 0 2px 0 '+__COLOR.gbg4+' inset;border-radius: 0.25em}')
	commonui.aipi.css=1
	}










