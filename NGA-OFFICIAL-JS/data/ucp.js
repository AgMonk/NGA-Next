if(!window.commonui)
	commonui={}


commonui.ucp = {
_get_lock:null,
_get_debug:null,
_if_forum_admin:4,
_currentUid : 0,

load:function(uid,currentUid,o){
if(this._get_lock)return
uid = __NUKE.toInt(uid)
if(uid<1)
	return alert('未指定用户')
this._currentUid = currentUid
var self = this;
if(window.__UCPUSER)
	return this._echo(window.__UCPUSER,o)
httpDataGetter.script_muti_get(__API.userInfo(uid) ,
	function(r){
		if (!r)
			return self._echo('数据错误')
		
		if(r.debug)
			self._get_debug = r.debug

		self._get_lock=false;
		
		if(r.error)
			var data = r.error[0]
		else
			var data = r.data[0]
		
		self._echo(data,o)
		return true
		},
	function(){self._get_lock=false;return self._echo('未收到结果')},
	__CHARSET
	);

},//fe


_title:function(_U){
if(!_U.honor)return '';
var h = _U.honor
if (h.substr(0,1)==' '){
	h = h.split(' ');
	h[1] = __NUKE.toInt(h[1]);
	if(h[1] && h[1]>window.__NOW)
		h = h[2]
	else if(h[3])
		h=h[3]
	else
		h=''
	}
return h
},//fe

_stat:function(_U){
var y = []
if(_U.verified!==undefined){
	var r = commonui.activeInfo(_U.verified,_U.uid,_U.bit)
	y.push(_$('/a','className', r[0]+' b', 'innerHTML', r[2], 'href', r[5] ? r[5] : 'javascript:void(0)', 'onclick', function(){alert(this.title)}, 'title', r[3]+' '+r[4]))
	}
if(_U.bit & 16777216)
	y.push(_$('/span','className','b','innerHTML',' 已注销'))
return y
},//fe



_echo:function(_U,o){
	
if(typeof(_U)=='string')
	return o.appendChild( _$('<span/>')._.aC(this._genBlock('user_info_info_block','信息','',document.createTextNode(_U))))



var _SELF = _U.uid==this._currentUid ? true : false,
_ADMIN = __GP.admin,
_SUPER = __GP['super'],
_GREATER = __GP.greater,
_LESSER = __GP.lesser,
_SUPERLESSER = __GP.superlesser,
//_STAFF = __GP.staff,
all = _$('<span/>'),
sst = (__GP.ubMod || __GP.ubStaff || _U.verified<0 || _U.uid==this._currentUid)?true:false,
stp = (__GP.ubMod || __GP.ubStaff || _U.uid==this._currentUid)?true:false,
_UAU = (__GP.ubStaff || __GP.lesser || (__GP._bit&4194304))?true:false,

//_ACT_UNNUKE = _STAFF,
_ACT_UNNUKE = (_LESSER && (__GP._bit&33554432) && (__GP.userBit&256)),
_ACT_NUKE = _SUPERLESSER || (__GP._bit&33554432) || _ACT_UNNUKE,
_VIEW_NUKE = (_LESSER && (__GP.userBit&256) && (__GP._bit&(8388608|16777216))),
tmp
//_VIEW_NUKE = _STAFF||_SUPER
_U.username = _U.username+''
//---------------------------------------

//---------------------------------------------------
var buffs,self=this
if(_U.buffs){
	buffs= _$('<span/>')
	for(var k in _U.buffs)
		buffs.innerHTML += _U.buffs[k][9]+'<br/>'
	}

//---------------------------------------
tmp = []

commonui.forEach(_$('/span')._.add(
	window.reM_54354 ? reM_54354(_U.uid) : null,
	window.reL_76376 ? reL_76376(_U.uid) : null,
	window.regl_958645? regl_958645(_U.uid):null,
	window.reH_895432 ? reH_895432(_U.uid):null
	).getElementsByTagName('A')
	,function(o){tmp.push(self._a(1, o)),tmp.push(' ')})
console.log(tmp)
var info = this._span(
	
	this._ul(
		this._a(!_SELF, '发送私信','/nuke.php?func=message#to='+_U.uid),
		this._a(_GREATER || _UAU, '被操作记录',null,function(){adminui.viewLog(_U.uid,null)}),
		this._a(_GREATER, '操作记录',null,function(){adminui.viewLog(null,_U.uid)}),
		this._a(_GREATER, '审核记录',null,function aulooo(){
			if(!commonui.audit)
				return __SCRIPTS.load('read',function(){commonui.auditLog(null,{type:1,id0:_U.uid},1)})
			commonui.auditLog(null,{type:1,id0:_U.uid},1)
			}),
		this._a((_GREATER && _SELF) || _ADMIN , '访问记录','/nuke.php?__lib=admin_log_search&__act=access_log&uid='+_U.uid),
		this._a(_SUPERLESSER, '强制登出',null,function(){
			__NUKE.doRequest({
				u:{u:__API._base,
						a:{__lib:"login",__act:"logout",to_uid:_U.uid,raw:3}
						},
				b:this,
				f:function(d){alert(d.error && d.error[0] ? d.error[0] : d.data[0])}
				})
			}),
		this._a(_ADMIN, '更改头衔','/nuke.php?func=settitle&uid='+_U.uid),
		this._a(_GREATER, 'buff',null, function(e){adminui.addBuff(e,_U.uid)}),
		this._a(_SELF, '<span class="teal">更改密码</span>', null,function(){commonui.accountAction('changepass')}),
		this._a(_SELF, '<span class="teal">重置密码</span>', null,function(){commonui.accountAction('resetpass')}),
		this._a(_SELF, '<span class="teal">绑定手机号</span>', null,function(){commonui.accountAction('setphone')}),
		this._a(_SELF, '<span class="teal">更换手机号</span>', null,function(){commonui.accountAction('changephone')}),
		this._a(_SELF, '<span class="teal">账号关联</span>', null,function(){commonui.userLink(_U.uid,_U.bit)}),
		this._a(!_SELF, '屏蔽发言',null,function(){commonui.blockword.ui(__CURRENT_UID,_U.username)}),
		tmp
		),
			
	this._ul2(
		'用&nbsp;户&ensp;ID',_U.uid,
		'用&ensp;户&ensp;名',this._span(
				_U.username, 
				this._a(this._currentUid && !_SELF ,
						_U.followed ? '已关注' :'关注', null,
						function(){commonui.follow(_U.followed ? 8 :1,_U.uid)}),
				(_U.usernameChanged ? this._a(this._currentUid ? true : 0 ,
						'改动', null,
						function(){
							__NUKE.doRequest2(
								'f',function(d){
									commonui.alert(d,'',12)
									},
								'u',__API._base+'__lib=ucp&__act=oldname&__output=3',
								'uid',_U.uid
								)
							}) : null)
				),
		'邮&emsp;&emsp;箱',_U.email,
		'用&ensp;户&ensp;组',this._span(_U.group+' ('+_U.gid+')', this._a(_ADMIN, '更改','/nuke.php?func=setgroup&uid='+_U.uid)),
		
		'激&emsp;&emsp;活' , sst ? this._span(this._stat(_U), (_ACT_NUKE ? _$('<a/>').$0('innerHTML','[NUKE]','href','javascript:void(0)','onclick',function(e){adminui.nukeUi(e,_U.uid)}) : null) ) : null,
		
		'禁&emsp;&emsp;言' ,
		(_U.muteTime || _ACT_NUKE) ? _$('<span/>')._.add(
			_U.muteTime ? 
				_$('/span')._.cls('orangered b')._.add(' 至'+commonui.time2date(_U.muteTime,'Y-m-d H:i')) 
				:(
					_U.maxBuffMute ? _$('<span/>').$0('className','gray b','title','在某些区域禁言')._.add(' 至'+commonui.time2date(_U.maxBuffMute,'Y-m-d H:i')) : null
				),

			this._a(_ACT_NUKE, '禁言','nuke.php?func=muteuser&uid='+_U.uid)
			) : null ,
				
		'头&emsp;&emsp;衔',
		_$('/span')._.add(
			tmp = this._title(_U),
			_ADMIN ? this._a(_ADMIN, '更改','/nuke.php?func=settitle&uid='+_U.uid)
			 : ((_SELF && tmp) ? _$('/a','href','javascript:void(0)','innerHTML','[清除]','onclick',function(){
					if(window.confirm('清除有时限的头衔 永久头衔不受影响')){
							__NUKE.doRequest({
								u:{u:__API._base,
										a:{__lib:"set_title",__act:"remove_random_title",raw:3}
										},
								b:this
								})
						}
					})
				: null 
				)
			),
		'发&ensp;帖&ensp;数',_U.posts,
		'金&emsp;&emsp;钱',_$('/span','innerHTML',commonui.calc_money(_U.money)),
		'注册日期',commonui.time2date(_U.regdate) , 
		'最近访问', _U.thisvisit ? commonui.time2date(_U.thisvisit) : null,
		'前次访问' , _U.lastvisit ? commonui.time2date(_U.lastvisit) : null,
		'最近发帖' , _U.lastpost  ? commonui.time2date(_U.lastpost) : null,
		'审&emsp;&emsp;核', _U.audit_stat ? _U.audit_stat.replace(/_?[a-z]+/g,function(a){
			return a=='sign' ? '签名' : 
				(a=='avatar' ? '头像' :
				(a=='name' ? '用户名' :
				(a=='_wait' ? '待审核' : 
				(a=='_block' ? '屏蔽' : a ))))
			}) : null,
		'I&nbsp;P&nbsp;属&nbsp;地', _U.ipLoc ? _U.ipLoc : null,
		'绑定账号', _U.oauthfrom ? _U.oauthfrom : null
		)
	
	)

all._.aC(this._genBlock('user_info_block',_U.username+' 的基础信息','',info))

//----------------------------------------------
if(buffs)
	all._.aC(this._genBlock('user_buff_block',_U.username+' 的状态','',buffs))
//----------------------------------------------

if(_U.ipLog && _U.ipLog[0]){
	all._.aC(this._genBlock('user_ip_block',_U.username+' 的IP','',this._genIp(_U,_VIEW_NUKE)))
	}

//---------------------------------------


var avatar = this._span(
	
	this._ul(
		//this._a(_SELF || _GREATER, '更改头像','',function(e){commonui.setAvatar(e,_U.uid,_GREATER)}),
		this._a(_SELF || _GREATER, '更改头像','',function(e){__SCRIPTS.load('imgEdit',function(){commonui.setAvatar2(e,_U.uid,_GREATER)})})
		),
			
	_$('<img/>')._.css('border','5px solid #ccc')._.attr('src','about:blank')._.on('error',function(){
		if(this._srcLoaded)return
		this.tmp = commonui.selectUserPortrait(_U.avatar,null/*_U.buffs*/,_U.uid)
		if(this.tmp.indexOf('.webp.jpg')!=-1)
			this.tmp = this.tmp.replace('.webp.jpg','.webp')
		if(this.tmp){
			this.src=this.tmp
			this._srcLoaded=true
			}
		else
			this.style.display="none"
		})
	
	)

all._.aC(this._genBlock('user_avatar_block',_U.username+' 的头像','',avatar))

//-------------------------------------------------------------------
		
var sign = this._span(
	
	this._ul(
		this._a(_SELF || _GREATER, '更改签名','',function(e){commonui.setSign(e,_U.uid,_GREATER)})
		),
			
	_U.sign ? _$('<div/>')._.attr({id:'userSignC'})._.css({padding:'5px',border:'5px solid #ccc',width:'90%',maxWidth:'740px'})._.cls('sign ubbcode') : null,
	
	_U.sign ? _$('<img/>')._.css({display:'none'})._.attr('src','about:blank')._.on('error',function(){
		ubbcode.bbsCode({
					c:$('userSignC'),
					fId:1,
					tId:1,
					pId:1,
					authorId:_U.uid,
					rvrc:_U.fame/10,
					isSig:true,
					opt:128,
					txt:_U.sign+'',
					isLesser:_U._lesser
					})
		}) : null
	
	)

all._.aC(this._genBlock('user_sign_block',_U.username+' 的签名','',sign))

//-------------------------------------------------------------------


if( _U.bit & this._if_forum_admin || _U._admin || _U._super || _U._greater || _U._lesser || _U._superlesser || typeof(_U.userForum)=='object'){
	
	if(_U.adminForums){
		var u = this._ul()
		for(var k in _U.adminForums)
			this._ul(u, this._a(true, _U.adminForums[k],'/thread.php?fid='+k), __GP.admin?_$('/a',__TXT('gear'),'href','javascript:void(0)','_fid',k,'onclick',function(e){adminui.modifyForum(null,this._fid)}):null )
		}
	else
		var u=null
	
		
	
	var adminStat = this._span(
		
		_U.username,
		
		_U._admin ? ' 拥有Administrator权限 拥有任意用户的管理权限 ' : 
			_U._super ? ' 拥有Super Moderator权限 拥有用户管理权限 ' : 
				_U._greater ? ' 拥有Moderator权限 拥有有限用户管理权限 ' : 
					_U._lesser ? ' 拥有Lesser Moderator权限 ' : 
						' 是普通用户/无特殊权限 ',
		
		_U._superlesser ? '拥有任意内容管理权限 ' :  null,

		u ? '拥有以下位置的内容管理与发言控制权限 ' : null,

		u

		)
			
	all._.aC(this._genBlock('user_admin_block',_U.username+' 的管理权限','',adminStat))
	}

//---------------------------------------------------

var u = this._ul2( '威望' , _U.fame/10 )._.cls('info')

for(var k in _U.reputation){
	var r  = _U.reputation[k]
	this._ul2(u, _$('<span/>')._.attr({title:r[2],innerHTML:r[0]}), r[1] )
	}
	
var repu = this._span(
	u,
	_$('/b')._.add('用户声望查询 '),
	_$('/input','placeholder','用户名或用户ID'),
	' 对 '+_U.username+' 的声望 ',
	_$('/button','type','button','innerHTML','查询', 'onclick',function(){
		__NUKE.doRequest2('b',this, 'f', function(d){
			commonui.alert( _$('/pre')._.add(commonui._debug._d( d.error && d.error[0] ? d.error[0] : d.data[0])) )
			}, 'u', __API._base,'__lib', "user_reputation", '__act', "get", 'uid', _U.uid,'user', this.previousSibling.previousSibling.value, 'raw', 3 )
		})
	)
		
all._.aC(this._genBlock('user_fame_block',_U.username+' 的声望','表示 论坛/某版面/某用户 对 '+_U.username+' 的关系',repu))


//---------------------------------------------------
if(_U.items){
	
	var item = _$('<span/>')
	all._.aC(this._genBlock('user_fame_block',_U.username+' 的物品/道具','',item))

	if(commonui.userItem){
		commonui.userItem.manualInit(item, this._currentUid )
		commonui.userItem.open()
		if(_U.items==2)commonui.userItem.list(null,null,null,_U.uid)
		}
	else
		loader.script(__SCRIPTS.userItem,function(){
			commonui.userItem.manualInit(item, this._currentUid)
			commonui.userItem.open()
			if(_U.items==2)commonui.userItem.list(null,null,null,_U.uid)
			} )

	
	}

//---------------------------------------------------

if(typeof(_U.userForum)=='object'){
	
	all._.aC(this._genBlock('user_forum_block',_U.username+' 的个人版面','个人版面是由用户自己管理的版面 以用户声望限制访问权限',
		this._span(

			this._ul(
				this._a(_SELF, '用户版面设置', '', function(e){if(window.adminui)
						adminui.modifyUserForum(e,_U.userForum[0])
					else
						loader.script(__SCRIPTS.admin,function(){adminui.modifyUserForum(e,_U.userForum[0])})
					}),
				this._a(typeof(_U.userForum)=='object', _U.userForum[1], '/thread.php?fid='+_U.userForum[0])
				)

			)

		))
	
	}
else if(_U.userForum && (_SELF||_ADMIN)){
	
	all._.aC(this._genBlock('user_forum_block','创建个人版面','个人版面是由用户自己管理的版面 以用户声望限制访问权限',
		this._span(
			this._ul(
				_$('/a','class','block_txt block_txt_c2','href','javascript:void(0)','innerHTML','创建个人版面','onclick',function(e){
						var o= this
						if(o._func)	return o._func(e,_U.uid)
						__NUKE.doRequest({
							u:{u:__API._base+'__output=3',a:{__lib:'user_forum',__act:'create'}},
							f:function(d){
								if(d && d.data && d.data[0]){
									eval("o._func = "+d.data[0])
									return setTimeout(function(){o._func(e,_U.uid)})
									}
								else
									alert(d.error[0])
								}
							})
						})
				)

			)

		))	
	}

//---------------------------------------------------
if(this._currentUid){
	all._.aC(this._genBlock('user_post_block', _U.username+' 发布的帖子','',
		this._span(

			this._ul(
				this._a(true , '搜索 '+_U.username+' 发布的主题', '/thread.php?authorid='+_U.uid),
				this._a(true , '搜索 '+_U.username+' 发布的回复', '/thread.php?searchpost=1&authorid='+_U.uid)
				,' \u2001 '
				,_UAU ? this._a(true , '...主题', 'javascript:void(0)'
						, function(e){commonui.fastPostLoader(_U.uid,1,16);commonui.cancelEvent(e)}) : null
				,_UAU ? this._a(true , '...回复', 'javascript:void(0)'
						, function(e){commonui.fastPostLoader(_U.uid,1,1);commonui.cancelEvent(e)}) : null
				,_UAU ? this._a(true , '...编辑', 'javascript:void(0)'
						, function(e){commonui.fastPostLoader(_U.uid,1,4);commonui.cancelEvent(e)}) : null
				,_UAU ? this._a(true , '...主题/回复/编辑', 'javascript:void(0)'
						, function(e){commonui.fastPostLoader(_U.uid,1,12);commonui.cancelEvent(e)}) : null
				),
			/*
			_$('<div/>')._.attr('id','vftrwegvbytrjnuh'),

			stp ? __NUKE.trigger(function(){
				httpDataGetter.script_muti_get(
					'/nuke.php?__lib=load_topic&__act=load_topic_by_uid&uid='+_U.uid+'&raw=1',
					function(d){
						if (!d)return false;
						var o = $('vftrwegvbytrjnuh'),i=0
						if (d.error){
							o.innerHTML = d.error;
							return true;
							}
						for(var k in d.data[0]){
							var x = d.data[0][k]
							if(x.tid)
								o.innerHTML+="<span class='gray'>"+commonui.time2date(x.postdate,'y-m-d H:i')+"</span> <a href='/read.php?tid="+(x.quote_from ? x.quote_from : x.tid)+"' target='_blank'>"+x.subject+"</a><br/>"
							else
								o.innerHTML+="<span class='gray'>"+x.subject+"</span><br/>"
							if(i++>10)break;
							}
						return true;
						},
					function(){
						$('vftrwegvbytrjnuh').innerHTML='读取错误';
						},
					'gbk'
					);
				}) : null
				*/
			)

		))
	}

//---------------------------------------------------
/*
if(_SELF){
	all._.aC(this._genBlock('user_script_block','用户脚本','用javascript制作论坛插件',
		this._span(

			this._ul(
				this._a(true , '编辑用户脚本', '/nuke.php?func=user_script')
				)

			)

		))	
	}
*/

//---------------------------------------------------

if(_UAU){
	
	var u = _$('<span/>');
	if(typeof(_U.remark)=='object'){
		for(var k in _U.remark)
			u.innerHTML+="<div "+((_U.remark[k][4]&1)?'><span':"onmouseover='this.firstChild.style.visibility=\"\"' onmouseout='this.firstChild.style.visibility=\"hidden\"'><span style='visibility:hidden'")+"><span class='gray'>"+commonui.time2date(_U.remark[k][3])+"</span> <a href='nuke.php?func=ucp&uid="+_U.remark[k][1]+"' target='_blank'>["+_U.remark[k][1]+"]</a> "+_U.remark[k][2]+" <a href='javascript:void(0)' onclick='__NUKE.doRequest({u:__API.remarkDel("+_U.uid+","+_U.remark[k][0]+"),b:this})'>[删除]</a></span></div>";
		}
	all._.aC(this._genBlock('user_remark_block','用户备注','版主可见,用户信息备忘,添加/删除备注可能在一天后方能生效',
		this._span(

			u,
			_SELF ? null : _$('/div')._.add(
				_$('/input'),
				_$('/button').$0('innerHTML','提交一条备注','onclick',function(){
					var v = this.previousSibling.value, w = v.match(/(?:&|\?)tid=(\d+)/)
					if(w)v='[tid]'+w[1]+'[/tid]'
					if(!v)
						return
					if(v.match(/\.(jpg|jpeg|gif|png)$/))
						return alert('仅限文字')
					__NUKE.doRequest({
						u:__API.remarkAdd(_U.uid,v,this.nextSibling.checked?1:0),
						b:this
						})
					}),
				_$('/input').$0('type','checkbox'),
				'所有用户可见',
				_$('/b').$0('className','red','innerHTML','&emsp;严禁添加无用备注')
				)


			)

		))	
	}

//---------------------------------------------------


o.appendChild(all)

var u = location.search.match(/(?:\?|&)(reset_email|load_post)=([a-z0-9A-Z]+)/)
if(u){
	if(u[1]=='load_post' && _UAU)
		commonui.fastPostLoader(_U.uid,1,12);
	else
		commonui.resetEmail(_U.username, _U.uid, u[2])
	}





},//fe




_long2ip : function (ip) {
if(typeof ip =='string' && ip.indexOf('.')!=-1)
	return ip
ip = __NUKE.toInt(ip)
return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
},//fe
_genIpSub : function(o,data,ifS){
if(typeof data !='object')
	return
var $ = _$, oo = $('/table','className', 'forumbox','style','width:auto'), ooo,i=0
for(var k in data){
	var x = data[k]
	oo._.add(
		$('/tr','style','font-size:12px','className', 'row'+(1+((i++)&1)),
			$('/td','className', 'c1')._.add(commonui.time2date(x[1],'Y-m-d')),
			$('/td','className', 'c2',	$('/b')._.add(x[0] ? this._long2ip(x[0]) : 'n/a')),
			$('/td','className', 'c1')._.add(
				$('/b')._.add(x[2]? x[2] : null),
				
				x[0] ? 
				$('/a').$0('href','javascript:void(0)','name',this._long2ip(x[0]),'innerHTML','[地区]','onclick',function(e){commonui.ipArea(e,this.name)})
				: null),
			ooo = $('/td','className', 'c1')
			)
		)
	if(ifS && x[0] && this.genIp_5649)
		this.genIp_5649(ooo,x,ifS)
	}
o.appendChild(oo)
},//fe
day2date:function(d){
d = d*86400-28800+1;
return commonui.time2date(d, 'Y/m/d')
},
_genIp :function(_U,ifS){
	var x = _$('/span')
if(ifS){
	__NUKE.doRequest({
		u:{u:'/nuke.php?',
			a:{__lib:"admin_log_search",
				__act:"user_log_recent",
				uid:_U.uid,
				raw:3}
			},
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			eval ('var y = '+d.data[0])
			x._.add(y(_U.uid,d.data[1]))
			}
		})
	}
return x

},//fe




_span : function(){
if(!arguments[0])return
var u = _$('<span/>')
for(var i=0;i<arguments.length;i++)
	u._.add(arguments[i])
return u
},//fe

_a : function(x,n,h,f,t){
if(!x)return null
if(n.nodeName){
	n.className='block_txt block_txt_c2 '
	n.innerHTML = n.innerHTML.replace(/^\[|\]$/g,'')
	return n
	}
var a = _$('/a','style','margin:auto 0.2em','class','block_txt block_txt_c2 ','innerHTML',n)
if(f)
	a._.on('click',f)

a._.attr('href',h?h:'javascript:void(0)')
if(h && h.substr(0,4)=='http')
	a._.attr('target','_blank')
	
if(t)
	a._.attr('title',t)
return a
},//fe

_ul:function(){
if(arguments[0] && arguments[0].nodeName=='DIV' && arguments[0]._name=='uld')
	var u = arguments[0],i=1
else
	var u = _$('/div','_name','uld','style','margin:0.25em 0') , i=0

for(;i<arguments.length;i++){
	var v = arguments[i]
	if(!v)continue
	if(typeof(v)=='string')
		v = _$('/span','innerHTML',v)
	u._.add(v)
	}

return u
},//fe

_txtWidth:function(s){
var j = 0,c
for (var i=0;i<s.length;i++){
	c = s.charCodeAt(i);
	if (c > 127)
		j = j+1;
	else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
		j = j+0.65;
	else
		j = j+0.35;
	}
return j
},//fe

_ul2:function(){

if(arguments[0] && arguments[0].nodeName=='DIV' && arguments[0]._name=='uld')
	var u = arguments[0],i=1
else{
	var i=0,u = _$('/div','_name','uld',
			__NUKE.trigger(function(){

				var x=this.parentNode.getElementsByTagName('div'),y=Math.floor(this.parentNode.offsetWidth/5)
				for(var i=0;i<x.length;i++)
					if(x[i].offsetWidth>y)y=x[i].offsetWidth
				if(!y)return
				if(y>250)y=250
				for(var i=0;i<x.length;i++)
					x[i].style.width=y+'px'
					
				})
			)
	}
for(;i<arguments.length;i+=2){
	if(!arguments[i] || !arguments[i+1])continue
	var k = arguments[i],v = arguments[i+1]
	u._.add(
		_$('/div','class','inlineblock',
			(k.constructor==String)?_$('/label').$0('innerHTML',k):_$('/label')._.add(k),
			_$('/span')._.add(' : ',v)._.css('color','gray')
			)
		)
	}

return u
},//fe

_genBlock :function(id,name,info,o){
return commonui.genStdBlock_a ('ucp'+id,name,info,o)
}//fe

}//ce


commonui.resetEmail = function(name,uid,tok){
this.createadminwindow()
var $ = _$,x = this.adminwindow,y
x._.addContent(null)
x._.addTitle('修改账号邮箱')
x._.addContent(
	$('/span')._.add(
		'修改账号 '+name+' 的邮箱',$('/br'),
		y=$('/input','placeholder','输入新的邮箱'),$('/br'),
		$('/button','innerHTML','确定','class','larger','onclick',function(){
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=login&__act=reset_email&raw=3',
					a:{uid:uid,email:y.value,token:tok}
					},
				b:this
				})
			})
		)
	)
this.adminwindow._.show()
}//fe


commonui.setPhone = function(){
this.createadminwindow()
var $ = _$,x = this.adminwindow,y,z
x._.addContent(null)
x._.addTitle('绑定手机号')
x._.addContent(
	y=$('/span')._.add(
		'绑定手机可以获得发帖权限',$('/br'),
		$('/input','placeholder','输入手机号 国际区号空格分隔','title','输入手机号 国际区号空格分隔'),$('/br'),
		$('/button','innerHTML','向此手机号发送验证码','onclick',function(){
			z = '_'+this.previousSibling.previousSibling.value.replace(/^[\s0+]+|\s+$/g,'')
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=login&__act=set_phone_send&raw=3',
					a:{phone:z}
					},
				b:this,
				f:function(d){
					if(d.error)
						return alert(d.error[0])
					y.innerHTML=''
					y._.add(
						'已发送 请输入收到的验证码',$('/br'),
						$('/input','placeholder','输入验证码'),$('/br'),
						$('/button','innerHTML','确定','class','larger','onclick',function(){
							__NUKE.doRequest({
								u:{u:__API._base+'__lib=login&__act=set_phone&raw=3',
									a:{vcode:this.previousSibling.previousSibling.value.replace(/^\s+|\s+$/g,''),phone:z}
									},
								b:this,
								f:function(d){
									return alert(d.error ? '错误 '+d.error[0] : d.data[0])
									}
								})
							})
						)
					}
				})
			})
		)
	)
this.adminwindow._.show()
}//fe



commonui.setUcpbg = function(uid){
var w = this.createCommmonWindow(),sl,ic,$=_$,dd,defbase
w._.addContent(null)
w._.addTitle('设置个人页面背景图(APP)')
w._.addContent(
	'选择一个预置的背景图'
	,$('/br')
	,sl = $('/select','onchange',function(){
			if(sl.selectedIndex == sl.options.length-1){
				lv()
				dd.style.display=''
				}
			})._.add(
				$('/option','value','')._.add('不使用背景图')
				)
	,$('/br')
	,$('/button','textContent','确定','onclick',function(){
			__NUKE.doRequest2(
				'b',this
				,'u',__API._base
				,'__lib','ucp'
				,'__act','set_ucp_bg'
				,'__output','3'
				,'bgid',sl.options[sl.selectedIndex].value
				)
			})
	,$('/br')
	,dd = $('/div','style','display:none')._.add(
		$('/br')
		,'或从自己上传的图片中选择一个'
		,$('/br')
		)
	)

__NUKE.doRequest2(
	'f',function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		var dd = d.data[0]
		for(var k in dd){
			if(k=='baseurl')defbase = dd[k]
			else{
				sl._.add($('/option','value',k)._.add(dd[k]))
				}
			}
		sl._.add($('/option','value','')._.add('上传一个图片(需要VIP)'))
		}
	,'u',__API._base
	,'__lib','ucp'
	,'__act','get_ucp_bg_list'
	,'__output','3'
	)

var lv = function(){
	__SCRIPTS.load('imgEdit',function(){
		var o = commonui.saveFile(null,uid
				,function(v){
					if(v===undefined)
						return {bbtag:'',txt:'选择这张'}
					var x = ubbcode.attach.check((Math.random()+'').substr(2)|0 , v)
					if(x.w!=1200 || x.h!=744)
						return alert('图片尺寸必须为1200x744')
					sl.lastChild.value = sl.lastChild.textContent=v
					sl.selectedIndex = sl.options.length-1
					}
				,1|8)
		dd.appendChild(o)
		})
	}
w._.show()
}//



commonui.userLink = function(uid,ub){
if((ub&4096) && (ub&1048576)==0)
	return alert('此账号已关联过')
this.createadminwindow()
var $ = _$,x = this.adminwindow,y,z
x._.addContent(null)
x._.addTitle('关联账号')
if(ub&1048576){//绑定过手机
	x._.addContent(
		y=$('/span')._.add(
			'输入账号绑定的手机号 获取验证码 以关联其他账号',$('/br'),
			'关联未绑定的手机号的账号可给予其发言权限',$('/br'),
			'关联账号之间NUKE/锁定/禁言的状态共享',$('/br'),
			$('/input','placeholder','输入手机号 国际区号空格分隔','title','输入手机号 国际区号空格分隔'),$('/br'),
			$('/button','innerHTML','发送验证码','onclick',function(){
				z = '_'+this.previousSibling.previousSibling.value.replace(/^[\s0+]+|\s+$/g,'')
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=login&__act=user_link_send&raw=3',
						a:{phone:z}
						},
					b:this,
					f:function(d){
						if(d.error)
							return alert(d.error[0])
						y.innerHTML=''
						y._.add(
							'已发送 请于欲关联的账号处输入收到的验证码'
							)
						}
					})
				})
			,$('/br'),$('/br')
			,$('/a','href','/nuke.php?__lib=login&__act=account&resetlink','target','_blank')._.add('重置关联账号的密码')
			)
		)
	}
else if((ub&4096)==0){//没关联过
	x._.addContent(
		y=$('/span')._.add(
			'关联一个绑定手机号的账号可使此账号获得发言权限',$('/br'),
			'关联账号之间NUKE/锁定/禁言的状态共享',$('/br'),
			$('/button','innerHTML','下一步','onclick',function(){
				y.innerHTML=''
				y._.add(
					'请登录欲关联的账号生成验证码并在此输入',$('/br'),
					$('/input','placeholder','输入验证码'),$('/br'),
					$('/button','innerHTML','提交','onclick',function(){
						z = this.previousSibling.previousSibling.value.replace(/^\s+|\s+$/g,'')
						__NUKE.doRequest({
							u:{u:__API._base+'__lib=login&__act=user_link&raw=3',
								a:{code:z}
								},
							b:this,
							f:function(d){
								if(d.error)
									return alert(d.error[0])
								y.innerHTML=''
								y._.add(	d.data[0])
								}
							})
						})
					)
				})
			)
		)
	}
__NUKE.doRequest({
	u:{u:__API._base+'__lib=login&__act=user_link_get&raw=3',
		a:{uid:uid}
		},
	b:this,
	f:function(d){
		if(d.error)
			return alert(d.error[0])
		if(d.data[0]){
			y._.add($('/br'),$('/br'),'已经关联的用户',$('/br'))
			for(var k in d.data[0]){
				y._.add(
					$('/b')._.add(d.data[0][k]),
					$('/span','style','color:silver')._.add(' (UID '+k+')'),
					$('/br')
					)
				}
			}
		}
	})
this.adminwindow._.show()
}//fe


commonui.ucp.accountAction = function(act){
return commonui.accountAction(act)
}//


commonui.redeemCodeUse = function(){

__NUKE.doRequest2(
	'f',function(d){console.log(d)}
	,'u',__API._base+'__lib=redeem&__act=use_code&__output=3'
	,'code','兑换码'
	)
}//


commonui.myfollow = { 
w:null,
get_follow: function(e,page){
	if(!__CURRENT_UID)
		return alert('需要登录')
	var s = this
	if(!page)page = 1
	__NUKE.doRequest2(
		'f',function(d){
			var e
			if(e = __NUKE.doRequestIfErr(d))
				return alert(e)
			if(!s.w)
				s.w = commonui.createCommmonWindow()
			var $ = _$, c = $('/table','className','forumbox'), i=0
			c._.forEachAdd(d.data[0],function(v){
				return $('/tr','className','row'+(((++i)&1)?'1':'2')
					,$('/td','className','c1','style','padding:0.25em'
						,$('/a','className','b','href','/nuke.php?__lib=ucp&__act=ucp&uid='+v.uid,'innerHTML',v.username,'target','_blank')
						)
					,$('/td','className','c2','style','padding:0.25em'
						,$('/a','className','b','_uid',v.uid,'_uname',v.username,'href','javascript:void(0)','innerHTML','[取消关注]','onclick',function(){
							if(confirm('是否要取消关注 '+this._uname))
								commonui.myfollow.unfollow(null,this._uid)
							})
						)
					)
				})
			if(!c.firstChild)
				return alert('没有更多页了')
			s.w._.addContent(null);
			s.w._.addTitle('关注的用户')
			s.w._.addContent(c,
				$('/div')._.add(
					(page>1 ? $('/button','innerHTML','上一页','onclick',function(){
						commonui.myfollow.get_follow(null,page-1)
						}) : null)
					,' 第 '+page+' 页 ' 
					,$('/button','innerHTML','下一页','onclick',function(){
						commonui.myfollow.get_follow(null,page+1)
						})
					)
				)
			s.w._.show()
			},
		'u','/nuke.php?__lib=follow_v2&__act=get_follow&page='+page,
		'__output',3
		)
	},
get_follow_by:function(){


	},
get_push_list:function(e,page){

	if(!__CURRENT_UID)
		return alert('需要登录')
	var s = this
	if(!page)page = 1
	__NUKE.doRequest2(
		'f',function(d){
			var e
			if(e = __NUKE.doRequestIfErr(d))
				return alert(e)
			if(!s.w)
				s.w = commonui.createCommmonWindow()

			var da = d.data[0], users = d.data[1], maxpage = d.data[2], curpage = d.data[3], posts = d.data[4]

			var _DATA_ID = 0//此条动态的ID
			, _DATA_TYPE = 1
			, _TYPE_USER_TOPIC = 1//关注的用户发布了一个主题
			, _TYPE_USER_REPLY = 2//关注的用户发布了一个回复
			, _TYPE_USER_FAV = 3//关注的用户收藏了主题或回复

			, _DATA_POSTER = 2//发帖者
			, _DATA_TID = 3//主题id
			, _DATA_PID = 4//回复id
			, _DATA_REPLY_TO_PID = 5//发帖所回复的pid
			, _DATA_TIME = 6//发帖时间

			, _DATA_FAVER = 2//收藏者uid
			, _DATA_TID = 3//主题id
			, _DATA_PID = 4//回复id
			, _DATA_TIME = 6//收藏时间
			, _DATA_FAV_POSTER = 5//发帖者uid
			, _DATA_FAV_ID = 7//在收藏表中的ID

			
			var $ = _$, c = $('/table','className','forumbox'), i=0
			c._.forEachAdd(da,function(v){

				var a,b

				if(v[_DATA_TYPE] == _TYPE_USER_FAV || v[_DATA_TYPE] == _TYPE_USER_REPLY || v[_DATA_TYPE] == _TYPE_USER_TOPIC){
					uid = v[_DATA_TYPE] == _TYPE_USER_FAV ? v[_DATA_FAVER] : v[_DATA_POSTER]
					b = [$('/a','className','b'
							,'href','/nuke.php?__lib=ucp&__act=ucp&uid='+uid
							,'innerHTML',users[uid].username,'target','_blank')
							
							,' '+(v[_DATA_TYPE] == _TYPE_USER_FAV ? '收藏' :'发布')+'了'+(v[_DATA_PID] ? '回复' : '主题')
							]
					a = $('/a','className','b'
							,'href','/read.php?tid='+v[_DATA_TID]+(v[_DATA_PID] ? '&pid='+v[_DATA_PID]+'&opt=128':'')
							,'innerHTML',posts[v[_DATA_TID]].subject,'target','_blank')
					
					return $('/tr','className','row'+(((++i)&1)?'1':'2')
						,$('/td','className','c1','style','padding:0.25em')._.add(a)
						,$('/td','className','c2','style','padding:0.25em')._.add(b)
						)
					}
				else
					return null

				})

			if(!c.firstChild)
				return alert('没有更多页了')
			s.w._.addContent(null);
			s.w._.addTitle('关注动态')
			s.w._.addContent(c,
				$('/div')._.add(
					(page>1 ? $('/button','innerHTML','上一页','onclick',function(){
						commonui.myfollow.get_push_list(null,page-1)
						}) : null)
					,' 第 '+page+' 页 ' 
					,$('/button','innerHTML','下一页','onclick',function(){
						commonui.myfollow.get_push_list(null,page+1)
						})
					)
				)
			s.w._.show()
			},
		'u','/nuke.php?__lib=follow_v2&__act=get_push_list&page='+page,
		'__output',3
		)

	},
unfollow:function(e,uid){
	console.log(uid)
	}

}//