
if(!window.commonui)
	var commonui = {}


commonui.readStyleFix = function(a){
if(this.readStyleFix.init)
	return
this.readStyleFix.init=1
var css = 
'.cell .iconfont {fill:'+ __COLOR.border2+'}'
//图标按钮样式
+'\n.ogoodbtn a .iconfont {fill:'+ __COLOR.inverttxt3+'}'
+'\n.ogoodbtn a:hover .iconfont {fill:'+ __COLOR.inverttxt1+'}'

+'\n.postrow .postinfob {background-color:'+__COLOR.postUiElm+';color:'+__COLOR.postUiElm_hh+'}'
+'\n.postrow .postinfob .iconfont {background-color:transparent;fill:'+__COLOR.postUiElm_hh+';color:'+__COLOR.postUiElm_hh+'}'
+'\n.postrow .postinfot {color:'+__COLOR.gbg6+'}'
+'\n.postrow .postinfot:hover {color:'+__COLOR.gbg3+'}'
+'\n.postrow .postinfoib {background-color:transparent;color:'+__COLOR.postUiElm+'}'
+'\n.postrow .postinfoib .iconfont {background-color:transparent;fill:'+__COLOR.postUiElm+';color:'+__COLOR.postUiElm+'}'
+'\n.postrow .postoptb {background-color:'+__COLOR.postUiElm_ll+';}'

+'\n.forumbox .postrow .postInfo .postdatec {margin-left:0.4em}'
+'\n.forumbox .postrow .postInfo .postfavb {margin-left:'+(a.small?'1.5em':'0.7em')+'}'
+'\n.forumbox .postrow .postInfo .postoptb {margin-left:'+(a.small?'1.5em':'0.7em')+'}'
+'\n.forumbox .postrow .postInfo .postshareb {margin-left:'+(a.small?'1.5em':'0.7em')+'}'
+'\n.forumbox .postrow .postInfo .goodbad {margin-left:'+(a.small?'1.5em':'0.7em')+'}'
+'\n.forumbox .postrow .postInfo .postoptswb {float:left;}'

+'\n.forumbox .postrow .comment_c .postInfo {float:none;display:block}'
+'\n.forumbox .postrow .comment_c .postInfo .goodbad {display:inline-block}'//;margin-left:0.7em;}'
//+'\n.forumbox .postrow .comment_c .postInfo .postdatec {margin-left:0.4em}'
//+'\n.forumbox .postrow .comment_c .postInfo .postfavb {margin-left:0.7em}'
//+'\n.forumbox .postrow .comment_c .postInfo .postoptb {margin-left:0.7em}'
+'\n.forumbox .postrow .comment_c .postInfo .brafter:after {content:"\x5CA";white-space:pre}'

+'\n.forumbox .postrow .goodbad {display:inline-block}'

+'\n.noselectmenu, .postbtmb { -webkit-touch-callout: none;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}'

+'\n .postrow .avatar_noborder, .msgread .avatar_noborder {border:0;out-line:0}'

+'\n .postrow .avatar, .msgread .avatar {max-width:180px;max-height:255px;margin:0.25em auto} '
+'\n .postrow .usercol {color:'+__COLOR.gbg7+'} '
+'\n .postrow .userval {color:'+__COLOR.gbg7+'} '
+'\n .postrow .postbtmb , .postrow .postbtmb .iconfont {color:'+__COLOR.postUiElm+';fill:'+__COLOR.postUiElm+'} '
+'\n .postrow .postbtmb:hover , .postrow .postbtmb .iconfont:hover {color:'+__COLOR.postUiElm_h+';fill:'+__COLOR.postUiElm_h+'} '
+'\n .postrow .postbtmbvisited , .postrow .postbtmbvisited .iconfont {color:'+__COLOR.postUiElm_l+';fill:'+__COLOR.postUiElm_l+'} '
+'\n .commonwindow .halfmenu .postbtmb ,  .commonwindow .halfmenu .postbtmb .iconfont {color:'+__COLOR.gbg2+';fill:'+__COLOR.gbg2+'}'
+'\n .fixblk .urlincontent:after, .fixblk .urlincontent:before {content:none}'
+'\n .apd {display:none} '
+'\n .urlincontent:after {content:"]";vertical-align:0.05em;padding:0 0.15em;color:'+__COLOR.gbg6+'} '
+'\n .urlincontent:before {content:"[";vertical-align:0.05em;padding:0 0.15em;color:'+__COLOR.gbg6+'} '
+'\n .forumbox .postrow .posterInfoLine {margin:-6px -6px 0 -6px;padding:0.80em 0.80em 0.3em 0.80em;line-height:1.8em}'+'\n .forumbox .postrow .posterInfoLineB {margin:1.5em -6px -6px -6px;border-bottom-width:0;border-top-width:1px;text-align:right;padding:0;background-color:transparent}'
+'\n .forumbox .postrow .posterInfoLineC {margin:1.5em -0.5em -0.5em -0.5em;border-bottom-width:0;border-top-width:1px;text-align:right;padding:0;background-color:transparent;display:none;min-width:22em}'
+'\n .comment_c .comment_c_0 {margin-top:0.2em}'
+'\n .comment_c .comment_c_1 {vertical-align:top}'
+'\n .comment_c .comment_c_1_1 {border-top: 0.9em solid #fff;border-left: 0.9em solid transparent;position: relative;margin-left: -0.9em;right: -0.345em;top: -0.8095em;}'
+'\n .row2 .comment_c .comment_c_1_1 {border-top-color:'+__COLOR.bg5+'}'
+'\n .row1 .comment_c .comment_c_1_1 {border-top-color:'+__COLOR.bg2+'}'
+'\n .voteBarTable td {padding-right:0.5em;line-height:2.2em}'
+'\n .voteBarTable tr td:nth-child(odd) {padding-left:0.5em}'
+'\n .voteBarTable tr:nth-child(odd) {background-color:'+__COLOR.bg3+'}'
+'\n .voteBarTable tr:nth-child(even) {background-color:'+__COLOR.bg2+'}'

/*
if(__SETTING.bit & 16){//超小
css+=//'\n.forumbox .postrow .comment_c .postInfo .postinfob {font-size:1.125em}'+
	'\n.forumbox .postrow .postInfo .postfavb:before {content:"\x5CA";white-space:pre}'
}
*/

css+="\n.postrow .ceffect1 .avatar_small, .postrow .avatar_small, .msgread .avatar_small, .commonwindow .avatar_small {margin: 0.1em 0.5em 0.5em -0em; width: 3.6em; height: 3.6em; border: 0em solid "+__COLOR.postUiElm_ll+"; border-radius: 1.850em; float: left;box-shadow:0 0 0 0.15em "+__COLOR.postUiElm_ll+";}"
//css+="\n.postrow .ceffect1 .avatar_small, .postrow .avatar_small, .msgread .avatar_small, .commonwindow .avatar_small {margin: 0.1em 0.5em 0.5em -0em; width: 3.6em; height: 3.6em; border-radius: 1.95em; float: left; border-width: 0; outline: 0.15em solid "+__COLOR.postUiElm_ll+"; outline-offset: -0.1em;object-fit:cover}"

css+='\n.postrow .postoptb {background-color:'+__COLOR.postUiElm_ll+';}'
css+='\n#m_posts .highlightpost {box-shadow: -0.833em 0 0 0 '+__COLOR.postUiElm_ll+'}'


if(__SETTING.bit & __SETTING.bits.floatPager)
	css+=//浮动翻页/主题操作/回帖
	'\n#m_pbtnbtm .stdbtn a {background-color:transparent;border-left-color:'+__COLOR.border2+';color:'+__COLOR.border2+'}'
	+'\n#m_pbtnbtm .stdbtn {border-radius:1.6em;border-color:none;opacity:0.9;background-color:'+this.rgbaShadow(0.85)+'}'
	+'\n#m_pbtnbtm .stdbtn a .iconfont {fill:'+ __COLOR.border2+'}'
	+'\n#m_pbtnbtm .stdbtn a:hover .iconfont {fill:'+ __COLOR.bg6+'}'
	+'\n#m_pbtnbtm .stdbtn a:hover {background-color:transparent;color:'+ __COLOR.bg6+'}'
	+'\n#m_pbtnbtm .stdbtn td:first-child, #m_pbtnbtm .stdbtn td:first-child a {border-radius:1.6em 0 0 1.6em;}'
	+'\n#m_pbtnbtm .stdbtn td:last-child, #m_pbtnbtm .stdbtn td:last-child a {border-radius:0 1.6em 1.6em 0;}'
	+'\n .userlink, .userlink:hover {color:'+ __COLOR.border1+'}'
	+'\n .postcontent .userlink {font-weight:inherit}'
	+'\n #m_posts {padding-bottom:0;margin-bottom:0}'

if(a.lite & 1){
	css +='\n .forumbox .postrow .postInfo {padding:0 0.5em 0 0.5em}'
			+'\n #mc .forumbox .postrow .postbodysubtitle {border-bottom:none}'
	css += '\n#m_posts .highlightpost {box-shadow:none;}'
	css += '\n#m_posts .highlightpost .c2 {box-shadow:inset -0.5em 0 0 0 '+__COLOR.postUiElm_ll+'}'
	}

if(a.small)
	css +='\n .forumbox .postrow .postsignC .sigline {margin-top:0.44em}'

if(a.vsmall)
	css +='\n #m_posts {box-shadow:none;border-radius:0;border:none;margin-left:0;margin-right:0}'
		+'\n #m_posts_c table:first-of-type,#m_posts_c table:last-of-type {border-radius:0}'
		+'\n #m_posts_c .forumbox .postrow .c2 {padding-left:0.166rem;padding-right:0.166rem}'
		+'\n .forumbox .postrow .posterInfoLine {margin-left:-0.166rem;margin-right:-0.166rem}'
		+'\n .forumbox .postrow .posterInfoLineB {margin-left:-0.166rem;margin-right:-0.166rem}'
		+'\n .postcontent > .quote, .postcontent > .lessernuke {margin:0.8em 0.1em}'
		+'\n .forumbox .postrow .postcontent {line-height:1.7em}'
		+'\n .forumbox .postrow .postsignC .sigtog {display:none}'


__NUKE.addCss(css)
}//


//============================
//===========
commonui.postArg = {//#帖子显示参数储存处理
data:{},
w:window,
def:{},
inited:0,
init:function(){
commonui.blockword.init()
this.data.sts=[]
},
//设置帖子参数的默认值 参见proc
setDefault:function(fid,stid,tid,tAid,topicMiscBit1,punUsers,visit,mods,vote,customLevel,tType,tReplies,tLastTime,thisPagePosts){//版面id 所在合集的stid 主题id 帖子id 主题作者id tmbit1 贴中禁言的用户 访问数 版主 主题的投票/投注/打分信息 声望级别 主题type 回复数 最后回复时间 当前页贴数
if(!this.inited){
	this.inited=1
	this.init()
	}
if(!customLevel && window.__CUSTOM_LEVEL)
	customLevel = window.__CUSTOM_LEVEL
if(typeof customLevel=='string')
	eval("customLevel="+customLevel)
if(window._TMPCTL)
	visit=''
var sb = __SETTING.bit,sbs = __SETTING.bits
this.def = {
	fid:fid,
	stid:stid|0,
	tid:tid,
	tAid:tAid|0,
	tReplies:tReplies,
	tLastRTime:tLastTime,
	punUsers:punUsers ? (function(){var y={};(punUsers+'').replace(/\d+/g,function($0){y[$0]=1;return $0});return y})() : null,
	mods:mods ? (function(){//1版主 2副版主 4副版主过期  8副版加标记
		var now = __NOW,x=1,v,y={},z = function($0){
			if($0.substr($0.length-1)=='t'){
				x=2,v=$0.substr(0,$0.length-1)|0
				if((v&4095)&1)
					x|=8
				if(v-now<0)
					x|=4
				}
			else{
				if(x&2){
					if((x&4)==0){
						y[$0] |= x
						x = 1
						}
					}
				else
					y[$0] |= 1
				} 
			return $0
			}
		mods.replace(/\d+t?/g,z)
		return y
		})() : {},
	tmBit1:topicMiscBit1|0,
	tType:tType|0,
	noimg:0,//对应ubbcode.bbsCode的noimg
	medium:(__SETTING.bit & 4) && true,
	small:(__SETTING.bit & 8) && true,
	vsmall:(__SETTING.bit & 16) && true,
	visit:visit ? (function(vi){
		if(typeof vi=='string')
			return vi.split(',')
		else
			return [vi[8],vi[24],vi[72]]//lib_read::get_topic_visit		
		})(visit) : null,
	ie8: __UA && __UA[0]==1 && __UA[1]<=8, //under ie8
	rmdVal:function(v){
		if(v===undefined)
			return this.recommendO.textContent
		this.recommendO.innerHTML = v
		if(this.recommendO2)
			this.recommendO2.innerHTML = v
		},
	rmdHl:function(good,bad){
		var i=0;
		[this.goodO,this.goodOO,this.badO,this.badOO].forEach(function(o){
			if(o){
				o.className = o.className.replace('postbtmbvisited','')
				if((good && i<2)||((bad && i>1)))
					o.className += ' postbtmbvisited'
				}
			i++
			})
		},
	__GP:this.w.__GP,
	__CURRENT_UID:this.w.__CURRENT_UID,
	topicVote:(vote&&vote.length>1) ? __NUKE.scDe(vote) : (vote|0),
	customLevel:customLevel,
	lite:0,
	thisPagePosts:thisPagePosts|0,
	scoreLog:false,
	recommendO:null,
	recommendO2:null,
	goodO:null,
	goodOO:null,
	badO:null,
	badOO:null,
	setShowSig:1
	}
commonui.afterPostProc.more.push(function(){
	var x = commonui.userCache.get('postScoreLog',2)
	commonui.postArg.def.scoreLog = x ? x : ''
	})
if(this.def.vsmall)
	this.def.lite |=16
if(__SETTING.bit & 268435456)
	this.def.lite |= 8
if(this.def.small)
	this.def.lite |= 32|1
if(__SETTING.width<1000)
	this.def.lite |= 1

if(sb & sbs.noPic)
	this.def.noimg |= 2
else if(sb & sbs.autoLess)
	this.def.noimg |= 1

if(sb & sbs.autoPicM)
	this.def.noimg |= 1048576
else if(sb & sbs.autoPic)
	this.def.noimg |= 524288

if((sb & sbs.showSig)==0 || this.def.noimg)
	this.def.setShowSig = 0

commonui.readStyleFix(this.def)

/*
var resizeObserver = new ResizeObserver(function(entries){
	var x = $('debug')
	if(x){
		console.log('size change', x.getBoundingClientRect())
		}
	});
resizeObserver.observe($('mc'));
console.log('obadd')*/
},
clearCache:function(){
this.def={}
for(var k in this.data){
	if(k != 'length' && this.data.hasOwnProperty(k))
		delete this.data[k]
	}
},
arg:[
'i',0,//楼层或数据id

'pC',0,//帖子block
'subjectC',0,//标题
'contentC',0,//内容
'signC',0,//签名
'uInfoC',0,//用户信息
'pInfoC',0,//帖子信息
'postBtnC',0,//帖子操作按钮容器

'fid',2,//版面id 设null
'tid',2,//主题id 设null
'pid',0,//帖子id
'type',1,//帖子类型bit

'tAid',2,//主题作者id 设null
'pAid',0,//帖子作者id
'postTime',0,//发帖时间戳
'recommend',0,//帖子推荐值
'cLength',1,//帖子内容长度

'ip',0,//发帖ip
'orgForum',0,//原版面名
'fromClient',0,//发送自客户端
'orgFid',0,//原版面fid
'stid',2,//所在合集的stid 设null
'atItem',2,//对帖子使用的道具
'opt',2 //额外选项bit  &1限制显示长度,去掉引用,增加原链接   &2跳过渲染部分
],

proc:function(){//#设置帖子参数 参数顺序见arg
var n = function(){}
n.prototype = this.def
var m = new n()

for(var i=0;i<arguments.length;i++){
	if((this.arg[i*2+1]&2) && !arguments[i])continue
	m[this.arg[i*2]] = (this.arg[i*2+1]&1) ? (arguments[i]|0) : arguments[i];
	}

m.comment = ( m.contentC.id.substr(0,11)=='postcomment')?true:false//是否显示为评论
m.opt = m.opt?(m.opt|0):0 //&1限制显示长度,去掉引用,增加原链接
//if(m.comment && (m.type & 1)==0){
//	if(m.uInfoC.parentNode.parentNode.id.substr(0,14)=='hightlight_for'){
//		m.hightPost = 1//是热点回复
//		m.opt|=1
//		}
//	}

if(m.recommend && m.recommend.constructor!=Number){
	i = (m.recommend+'').split(',')//推荐值,支持,反对
	m.score = (i[1]|=0)
	m.score_2 = (i[2]|=0)
	m.recommend = i[1]-i[2]>0 ? i[1]-i[2] : 0
	}
else{
	m.score = m.score_2 = 0
	m.recommend |= 0
	}
m.correctNode = m.i==0?true:false
m.atItem = m.atItem?commonui.atItems._CREATE(m.atItem) : null//此贴所含有的道具(obj) .length .id(i)获取第i个道具的id  .count(i)获取第i个的数量  .i(id)返回特定id的index .info(i)获取第i个道具的info
m.recommendO = _$('/span','class','recommendvalue','style','color:'+__COLOR.gbg5,'title',(m.__GP.ubMod ? m.score+'支持 '+m.score_2+'反对 (版主可见)' : ''),'innerHTML',m.recommend ? m.recommend : (m.__GP.ubMod ? '0' :'&nbsp;'))
m.recommendO2 = m.recommendO.cloneNode(1)
this.data[ m.i ] = m

if(m.opt&2)
	return

commonui.postDisp(m.i)
}//fe

,removeFirstBr:function(o){

var x = o.firstChild
while(x && x.nodeType!=1)
	x=x.nextSibling
if(x && x.nodeName=='BR')
	o.removeChild(x)

}//

}//ce commonui.postArg

/**
// &1 small用户信息单行显示 / &2显示头像 / &4显示签名 / &8 floatpager / &16 vsmall / &32折叠顶部操作按钮显示底部操作按钮
@typedef {number} postDispLite
*/

//============================
//=====================
commonui.postDisp = function (argid){//#帖子显示

//return;
var w = window,
$ = _$,
a = this.postArg.data[argid],
uI = this.userInfo.users[a.pAid],
isLesser = (this.userInfo.groups[uI.memberid][1] & 16),
_TM_BIT1_COUNT_VIEW = 67108864,
tmp

if(!a.cLength)
	a.cLength = a.contentC.innerHTML.length;
if (a.contentC.innerHTML && a.contentC.innerHTML.substr(0,24).indexOf('lessernuke')>-1)
	a.cLength=0;

/** @type {postDispLite} mask见上*/
var lite=a.lite

//ip
var oip = a.ip ? $('/a','className','postinfot stxt','href','javascript:void(0)','innerHTML','['+a.ip+']','onclick',function(e){commonui.ipArea(e,a.ip)}) : null
//源版面
, oofrm = a.orgForum && (a.fid!=108 || a.__GP.ubMod)? 
	$('/a','class','postinfot','href','/thread.php?fid='+a.orgFid,'innerHTML',"["+a.orgForum+"]") : null
//posttime
,optime = $('/span','id','postdate'+a.i,'className','postinfot postdatec stxt',
		'innerHTML',this.time2date(a.postTime,'Y-m-d H:i'), 
		a.__GP.admincheck?'onclick':null,a.__GP.admincheck?function(){if(this.style.color){adminui.selectPid(a.tid,a.pid,1);this.style.color=''}else{adminui.selectPid(a.tid,a.pid,0);this.style.color='darkred'}}:null)
//收藏
,ofav = $('/a','className','postinfob postfavb small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)','title','收藏','onclick',function(e){commonui.favor(e,this,a.tid,a.pid)}
			)._.add(__TXT.svg('star','',8))
//操作菜单
,oopt = $('/a','className','postinfob postoptb small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)','title','操作菜单','onclick',function(e){
				//if(lite&8)
				//	return commonui.postBtnLite(e,1,argid)
				commonui.postBtn.allBtn(e,argid)},
			'oncontextmenu',function(e){commonui.postBtn.allBtn(e,argid);return commonui.cancelEvent(e)}
			)._.add(__TXT.svg('gear','',8))

,shar = (a.i==0 && !a.pid) ? $('/a','style','text-align:0.75em;marginLeft:'+(a.small?'1.5em':'0.7em'),'className','postinfob postshareb small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)',
			'title','分享菜单','_c',function(e){
				var x = commonui.postBtn.all
				commonui.postBtn.all={'分享':[24,25,26,27,46]}
				commonui.postBtn.allBtn(e, argid)
				commonui.postBtn.all=x
				},'onclick',function(e){this._c(e)},
			'oncontextmenu',function(e){this._c(e);return commonui.cancelEvent(e)},
			__TXT.svg('share','',8)
			) :null
//属性
,otypeh =this.getPostBitInfo(a.fid, a.tid, a.pid , a.type, a.tmBit1, 2|(a.comment?4:0), a.__GP.admincheck, a.tType)
,otype = $('/span')
//标题
,osubj = $(a.subjectC).$0('style','line-height:inherit')
//推荐按钮
,ogood = $('/div','style','display:inline-block','class','goodbad')._.add(
	$('/span','className','postinfob small_colored_text_btn block_txt_c2 stxt ogoodbtn')._.add(
		$('/span','className','urltip nobr','style','marginTop:-1.8em;color:'+__COLOR.txt2),
		a.goodO = $('/a','className','white','href','javascript:void(0)','title','支持','onclick',function(){commonui.postScoreAdd(this,a)})._.add(__TXT.svg('good','margin:0 0.5em 0 0.3em;height:1em;')),
		a.recommendO,
		a.badO = $('/a','className','white','href','javascript:void(0)','title','反对','onclick',function(){commonui.postScoreAdd(this,a,1)})._.add(__TXT.svg('bad','margin:0 0.3em 0 0.5em;height:1em;'))
		)
	,$('/span','class','stxt')._.add('\u200b')
	)
//客户端
,clt = a.fromClient ? this.postDispFromClient(a.fromClient) : null
,ooptsw = $('/a','className','postinfot postoptswb stxt','href','javascript:void(0)','id','postoptswb'+a.i,'innerHTML','#'+a.i)


this.afterPostProc.more.push(function(){
	var fi = commonui.postScoreAdd.ifScore(a.tid,a.pid)
	if(fi)
		a.rmdHl(fi>0,fi<0)
	})


if(clt)
	clt.$0('className','postinfoib stxt','style','margin-left:'+(a.small?'1.5em':'0.7em')+';')

//
if(window.__CURRENT_UID==a.tAid && a.pAid==a.tAid && (a.type & 67109376)){
	if((tmp = $('currentTopicName'))
			&& (tmp._heyh 
				|| (tmp._heyh===undefined 
					&& (tmp._heyh=tmp.innerHTML.match(/\[(安科|安价)/)?1:0)
					)
				))
		otypeh += commonui.txtTagTemplate('审核', '等待审核或审核未通过', '', '#7c5d5c','')
	}

if((lite&16) == 0){
	if(otype && otype.firstChild || osubj.firstChild)
		ogood.firstChild.style.verticalAlign='0.18em'
	}

otype.innerHTML = otypeh
if(otypeh.substr(-10)=='<!--del-->' && a.pC){
	a.pC.style.backgroundImage='url( "data:image/svg+xml,'+encodeURIComponent(this.postDisp.delbg)+'")'
	a.pC.style.backgroundSize="5em 5em"
	}

//pinfo块 + subject块
if(a.comment){//贴条 上菜单隐藏
	var pInfoC_add =[
		oip,
		oofrm,
		optime,
		clt,
		ofav,
		ogood,
		shar,
		oopt
		],
	subjectCC_add = [otype,osubj]
	if(tmp = a.contentC.parentNode.getElementsByTagName('a')[0]){
		ooptsw.$0('style','float:right','innerHTML','','onclick',function(){
			if(this.nextSibling.style.display=='none'){
				var x = this
				x.style.display='none'
				x.nextSibling.style.display=''
				var y = x.nextSibling.childNodes
				if(a.postFixBtnC){
					for(var i =0;i<y.length;i++){
						if(y[i].className.indexOf('postdatec')!=-1)
							y[i].style.display = ''
						else
							y[i].style.display = 'none'
						}
					a.postFixBtnC.style.display='block'
					}
				else{
					if(y[i].style.display=='none')
						y[i].style.display = ''
					if(y[i].className.indexOf('postdatec')!=-1)
						y[i]._.add($('/br'))
					}
				}
			})._.add(__TXT.svg('dot3narw','fill:'+__COLOR.postUiElm,8))
		tmp.parentNode.replaceChild(ooptsw,tmp)
		}
	a.pInfoC.style.display='none'
	}
else if(lite & 32){//使用下菜单 上菜单部分隐藏  帖子信息占一行
	ofav.style.display = ogood.style.display = oopt.style.display = 'none'
	var pInfoC_add = [
		ooptsw.$0('_ofav',ofav,'onclick',function(){
			if(this._ofav.style.display=='none'){
				var x =this._ofav
				x.parentNode.insertBefore($('/br'),x)
				do{x.style.display=''}
				while(x = x.nextSibling)
				}
			}),
		oip,
		oofrm,
		optime,
		ofav,
		ogood,
		oopt
		],
	subjectCC_add = [otype,osubj]
	}
else//默认 帖子信息右浮动
	{
	var pInfoC_add =[
		oip,
		oofrm,
		optime,
		clt,
		ofav,
		shar,
		oopt
		],
	subjectCC_add = [ogood,otype,osubj]
	}

//subject块
var x = a.subjectC.parentNode
this.postArg.removeFirstBr(x)
x.removeChild(a.subjectC)
//if(lite & 16)
//	this.postArg.removeFirstBr(x)
x.insertBefore(
	a.subjectCC=$('/div',	subjectCC_add		),
	x.firstChild
	)





//if((a.comment || a.cLength>40 || a.pAid==a.__CURRENT_UID) && uI.active>=0)
//	lite = lite | 2;



//pinfo块
a.pInfoC.innerHTML=ngaAds.bbs_ads32_gen();

$(a.pInfoC).$0('style','lineHeight:inherit;color:'+__COLOR.gbg2, pInfoC_add)

if(lite & 32)
	a.pInfoC.$0('style','float:none;display:block')
if(a.comment)
	a.pInfoC.$0('style','display:none')
	

//if(lite&8)
//	$(a.postBtnC).$0(opra_add)

//对贴道具
if(a.atItem)
	a.pInfoC.parentNode.insertBefore(commonui.postDispAtitems(argid,a.atItem),a.pInfoC.nextSibling)


//客户端屏蔽
if(this.blockword.ru && this.blockword.checkUsername(uI.uid,uI.username))
	a.userblocked = 1
else if(this.blockword.rc && this.blockword.checkContent(a.subjectC.innerHTML + a.contentC.innerHTML))
	a.userblocked = 2

//正文颜色
var tmp = this.postTxtColor(uI.memberid, this.postArg.def.mods[a.pAid]|0, a.atItem)
if(tmp)
	a.contentC.parentNode.style.color = tmp

if (a.comment){//comment
	var posterinfo =  $(a.uInfoC.cloneNode(),'innerHTML',this.posterInfo.main(lite, a.i, a.fid, a.tid, a.pid, a.cLength, a.pAid, a.type, a.stid, a.comment),'style','display:block','class',(lite&1)?' posterInfoSub':'')
	a.uInfoC.parentNode.replaceChild(posterinfo,a.uInfoC)
	a.uInfoC = posterinfo

	if((tmp = a.uInfoC.nextElementSibling) && tmp.nodeName=='TABLE'){
		tmp.getElementsByClassName('comment_c_1')[0].appendChild(
			$('/div','class','comment_c_1_1')
			)
		}

	w.ubbcode.bbsCode({
		i:a.i,
		c:a.contentC,
		noImg:2,
		fId:a.fid,
		tId:a.tid,
		pId:a.pid,
		authorId:a.pAid,
		rvrc:uI.rvrc,
		isSig:0,
		callBack: (a.type & 4096) ? function(a){commonui.autoTranslate.main(a.c,a.fId)} : null,
		isLesser:isLesser,
		isNukePost:(a.type & 2048) ? 1 : ((a.punUsers && a.punUsers[a.pAid]) ? 2 : 0),
		isComment:1,
		maxLength:(a.opt&1) ? 256 : 0,
		fullLink:(a.opt&1) ? 1 : 0,
		removeQuote:1
		})
	
	if(a.userblocked ){
		try{
		var tmp = a.uInfoC.nextElementSibling
		}catch(e){}
	
		if(tmp.nodeName=='TABLE'){
			tmp.style.display=a.uInfoC.style.display ='none'
			a.uInfoC.parentNode.insertBefore($('/div'
				,$('/span','className','hint','innerHTML',a.userblocked ==1? '被你屏蔽的用户发布的内容' : '包含有被你屏蔽的内容')
				,'style','text-align:center;border:1px solid;margin:1px'
				,'className','userblockcontents'
				/*,'onclick',function(){
					var o = this
					if(!o._click){
						o._click = 1
						o.style.backgroundColor = __COLOR.gbg7
						if(o._tl)clearTimeout(o._tl)
						return o._tl=setTimeout(function(){
							o._click = 0
							o.style.backgroundColor = ''
							},2000)
						}
					o.style.display='none'
					o.nextElementSibling.style.display=''
					o.nextElementSibling.nextElementSibling.style.display=''
					}*/
				),a.uInfoC)
			}
			
		}

	if(lite & 32){
		a.postFixBtnC = $('/div','class','posterInfoLine posterInfoLineC')
		a.contentC.parentNode.appendChild(a.postFixBtnC)
		commonui.postBtn.loadFix(argid, lite)
		var tmp = a.postFixBtnC.childNodes
		for(var i=0;i<tmp.length;i++)
			tmp[i].style.padding = tmp[i].style.padding.replace('1.325em','1em')
		}

	return
	}


if(a.atItem && a.atItem.sp && a.atItem){
	if(a.atItem.sp[4]){
		a.pC.parentNode.className+=' ceffect'+a.atItem.sp[4]
		}
	if(a.atItem.sp[1]){
		this.postDispAvatarBg(
		a.uInfoC.parentNode, 
		__IMG_STYLE+'/'+a.atItem.sp[1], a.atItem.sp[2])
		}
	}

var tmp = commonui.getAvatarMagicInfo(uI.buffs)

if(tmp){
	if(tmp.avatarBg)
		this.postDispAvatarBg(a.uInfoC.parentNode, tmp.avatarBg)
	if(tmp.append)
		a.contentC.innerHTML+=' [color=silver]……'+tmp.append+'~[/color]'
	}


/*
if (rmd && rmd<-3){
	rmd=Math.floor(100+rmd*10/1.5);
	cC.style.opacity = '0.'+rmd;
	cC.style.MozOpacity = '0.'+rmd;
	//cC.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+rmd+')';
	cLen = 0
	}
*/

if(a.contentC.nodeName=='P' && a.ie8){//ie8 not allow nest p
	var x = $('/span')
	x.id = a.contentC.id
	x.className=a.contentC.className
	a.txt = a.contentC.innerHTML
	a.contentC.parentNode.replaceChild(x,a.contentC)
	a.contentC = x
	}
var clo = ((a.type & 4096)?1:0) | (a.i<2?2:0) | ((lite&16) ? 4: 0)
w.ubbcode.bbsCode({
	i:a.i,
	c:a.contentC,
	opt:((a.tmBit1&255) ? 1 : 0) ,//| ((a.atItem && a.atItem.i(26)!==false)?512:0),
	noImg:a.noimg,
	fId:a.fid,
	tId:a.tid,
	pId:a.pid,
	authorId:a.pAid,
	rvrc:uI.rvrc,
	isSig:0,
	postType:a.type,
	isLesser:isLesser,
	isNukePost:(a.type & 2048) ? 1 : ((a.punUsers && a.punUsers[a.pAid]) ? 2 : 0),
	txt:a.txt!==undefined?a.txt:undefined,
	callBack: clo? function(a){
		if(clo&1)
			commonui.autoTranslate.main(a.c,a.fId)
		if(clo&2)
			setTimeout(function(){ngaAds.bbs_ads8_load_new_load(a.i)},1000)
		//console.log(a.c.getClientRects()[0].height , __NUKE.position.get().ch)
		//if((clo&4) && a.c.getClientRects()[0].height < __NUKE.position.get().ch)
		//	oopt.style.display='none'
		}:null
	})

a.cLength = this.postDispCalcContentLength(a.contentC);

if(uI.active>=0){
	if(a.pAid==a.__CURRENT_UID)
		lite |= 6
	else if(a.cLength>20){
		lite |= 2
		if(uI.postnum>20)
			lite |= 4
		}
	}


//commonui.dispUserInfo(lite,pos,avatar,honor,regdate,lastlogin,lesser,ip,level,mute,medal,postNum,rvrc,repu,aid,fid,money,site,ifRemark,$('postauthor'+pos).innerHTML)

var posterinfo =  $(a.uInfoC.cloneNode(),'innerHTML',this.posterInfo.main(lite, a.i, a.fid, a.tid, a.pid, a.cLength, a.pAid, a.type, a.stid, a.comment, null),'style','display:block')
,uInfoCParentC
//if(lite & 8){
//	a.uInfoC.parentNode.replaceChild(posterinfo,a.uInfoC)
//	a.uInfoC = posterinfo
//	a.uInfoC.appendChild($('/div','className','clear'))
//	var uInfoCParentC = a.uInfoC.parentNode
//	}else
if(this.extraSts)this.extraSts(posterinfo)
if(lite&1){
	var x=a.uInfoC.parentNode.style
	x.display='none'
	posterinfo.className='posterInfoLine'
	a.pC.insertBefore(posterinfo,a.pC.getElementsByTagName('div')[1])
	var uInfoCParentC = posterinfo.parentNode
	}
else{
	var uInfoCParentC = a.uInfoC.parentNode
	uInfoCParentC.replaceChild(posterinfo,a.uInfoC)
	a.uInfoC = posterinfo
	if(window.__CURRENT_UID==a.pAid && (window.__GP.ubMod || window.__GP.rvrc>10) && window.File && window.FileReader && window.FileList){
		this.postDispSetUserInfoBg(uInfoCParentC)
		a.uInfoC.firstChild.appendChild($('/a','href','javascript:void(0)',__TXT.svg('gear','fill:'+__COLOR.border2,8),'onclick',function(e){commonui.postDispSetUserInfoBgEdit(e)}))
		}
	}


if(!a.pid && window.__APPEMBED && (window.__CURRENT_F_BIT & 134217728) && __SETTING.nClientMatch('0000.0000.0000','0010.0000.0003','0002.0000.0001')){
	a.contentC.parentNode.insertBefore(
		$('/span')._.add(
			$('/h4','class','silver subtitle postbodysubtitle','innerHTML','打赏作者')
			,$('/button','innerHTML','打赏作者','onclick'
				,function(){
					var u = commonui.posterInfo.uI.users[a.pAid]
					__doAction.appDoAsync('patron', {
						'uid':u.uid
						,'username':u.username
						,'avatar':commonui.selectUserPortrait(u.avatar,null,u.uid)
						,'tid':a.tid
						,'pid':a.pid|0
						})
					})
			)
		,a.contentC.nextSibling)
	}

//this.usernamelink($('postauthor'+pos),aid, pos % 20 )//修改链接
if(a.small)
	this.postDispAdjCommetWidth(a)
if(a.signC && uI.signature)
	this.postDispSign(a,uI,lite)

//if(this.quoteTo && a.contentC.parentNode.id.substr(0,21)=='postcontentandsubject')
//	this.aE(a.contentC.parentNode,'mouseup',function(e){commonui.quoteTo.onmouseup(e, parseInt(this.id.substr(21),10) )})


if(lite & 32){
	a.postFixBtnC = $('/div','class','posterInfoLine posterInfoLineB')
	a.pC.appendChild(a.postFixBtnC)
	commonui.postBtn.loadFix(argid, lite)
	if(tmp = $('hightlight_for_'+a.i)){
		a.pC.appendChild(tmp)
		a.postFixBtnC.$0('style','border-bottom-width:1px')
		}
	}
else
	commonui.postBtn.load(argid)

if(a.userblocked ){
	try{
	var tmp = a.pInfoC.parentNode.parentNode.parentNode
	}catch(e){}

	if(tmp.parentNode.nodeName=='TABLE' && tmp.nodeName=='TBODY'){
		tmp.style.display='none'
		tmp.parentNode.insertBefore($('/caption'
			,$('/span','className','hint','innerHTML',a.userblocked ==1? '被你屏蔽的用户发布的内容' : '包含有被你屏蔽的内容')
			,'style','text-align:center;border:1px solid;margin:1px'
			,'className','userblockcontents'
			/*,'onclick',function(){
				var o = this
				if(!o._click){
					o._click = 1
					o.style.backgroundColor = __COLOR.gbg7
					if(o._tl)clearTimeout(o._tl)
					return o._tl=setTimeout(function(){
						o._click = 0
						o.style.backgroundColor = ''
						},2000)
					}
				o.style.display='none'
				o.nextSibling.style.display=''
				}*/
			),tmp)
		}
		
	}



}//fe commonui.postDisp

commonui.postDisp.delbg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M15.8 53.2 53 15.8a6 6 0 0 1 8.5 0l22.5 22.4a6 6 0 0 1 0 8.5L46.7 84.1a6 6 0 0 1-8.5 0L15.8 61.7a6 6 0 0 1 0-8.5Zm2.5 1.2 36-36a4 4 0 0 1 5.7 0l21.2 21.2a4 4 0 0 1 0 5.7l-36 36a4 4 0 0 1-5.7 0L18.3 60a4 4 0 0 1 0-5.7Zm13 9.1a14 14 0 0 1-1.3 1.3l1.4 1.4a14.4 14.4 0 0 1 1.3-1.4 39.2 39.2 0 0 1 4.9 5.8 14.5 14.5 0 0 1 2.2 4.7 3.6 3.6 0 0 1 2-.3A24.2 24.2 0 0 0 40 71a37.1 37.1 0 0 0-2.7-3.8 32.4 32.4 0 0 0-3.4-3.7l1.5-1.5 7.4 7.4a.7.7 0 0 1 .3.8 6.5 6.5 0 0 1-1.3 1.2 7.5 7.5 0 0 1 2.3 1.1 9.3 9.3 0 0 0 1.2-2.2 1.8 1.8 0 0 0-.8-1.6l-7.9-8 1.3-1.2 3.9 4a22.6 22.6 0 0 1 2 2.7A7.8 7.8 0 0 1 45 69a8.6 8.6 0 0 1 2.2-.3 16.4 16.4 0 0 0-2.3-4l-2.5-3-3.3-3.3 1.5-1.5 7.6 7.6q.6.5.4.8a6.9 6.9 0 0 1-1.3 1 7.8 7.8 0 0 1 2.3 1.3 13.1 13.1 0 0 0 1-2 1.4 1.4 0 0 0-.4-1.6l-8.4-8.4a10.7 10.7 0 0 1 1-.9l-1.3-1.4a10.4 10.4 0 0 1-1 1Q35.1 49 34 47.8l-4 4 6.6 6.6-1.3 1.3q-5.9-5.9-6.5-6.7l-4 4.1 6.6 6.5Zm7.9-21.8-1.4 1.5 2.3 2.2 13.5 13.4a1 1 0 0 1 .4 1 6 6 0 0 1-1.6 1.5 9.6 9.6 0 0 1 2.4 1.4 7.8 7.8 0 0 0 1.4-2.5 2.3 2.3 0 0 0-.9-2.2L41.4 44.1l-2.2-2.4Zm-1 4.4-1.5 1.5 2.4 2.2 6.7 6.7 2.6 2.7 1.4-1.4-2.7-2.6-6.7-6.7-2.3-2.4Zm-5.6 16.2L27.2 57l1.5-1.5 5.4 5.4Zm5.2-5.2-5.4-5.4 1.5-1.5 5.4 5.4Zm23.4-23q.8-.9 1.8-1.7L61.8 31a16.1 16.1 0 0 0 3.5-.5 6 6 0 0 1-.6-2.7 17.3 17.3 0 0 1-5.5 1.3 17.4 17.4 0 0 1-5-.8l-.2-1.1a16.7 16.7 0 0 1-2.4.8 26.8 26.8 0 0 1 2 5.5 20.2 20.2 0 0 1 .5 6.6 9.1 9.1 0 0 1 2.3-.2 18.3 18.3 0 0 0-.4-3l1.2 1.2q.7-.9 1.5-1.6l.7-.8 2.4 2.4-1.3 1.3L58 42l1.4 1.4 2.4-2.6 1.4-1.4 4.6 4.7c.6.5.8 1 .6 1.3a12.5 12.5 0 0 1-1.4 1.5 7.7 7.7 0 0 1 2.5 1.4 11.6 11.6 0 0 0 1.2-2.6q.3-.9-1.1-2.3l-5.2-5.2 1.7-1.7 2.4-2.2L67 33l-2.3 2.4L63 37l-2.3-2.4Zm-12.1-.7L43.5 39l3.4 3.3 9.2 9.1 4.8 5 1.4-1.3L46 38.9l2.5-2.4a36.5 36.5 0 0 1 3 6.4 16 16 0 0 1 4.8 1.5 3 3 0 0 1 1.7 1.7q.1 1-1.1 2.5a12.3 12.3 0 0 1 2.4 1.1 5.3 5.3 0 0 0 1-3 3.6 3.6 0 0 0-1.2-2.4 8.7 8.7 0 0 0-2.2-1.6 17.9 17.9 0 0 0-3.9-1.2l-4-8Zm6.8 3.2a33.8 33.8 0 0 0-1.3-6.4 21.3 21.3 0 0 0 6.8 1Zm12 1-.3 2a18.6 18.6 0 0 1 3.1.4q2 .3 3.4.7a4.7 4.7 0 0 1 .3-2.4 26 26 0 0 1-3.5-.2l-3-.5Zm-3.6 5.2a8.5 8.5 0 0 1-2.2.4 20.8 20.8 0 0 1 .9 3.3 18.8 18.8 0 0 1 .3 3.1 12.9 12.9 0 0 1 2-.2q-.2-2-.6-3.7a20.8 20.8 0 0 1-.4-2.9Z" preserveAspectRatio="none" style="fill:'+__COLOR.border2+';fill-opacity:.4;fill-rule:evenodd"/></svg>'


commonui.postTxtColor = function(group,modbit,atItem){

if(atItem && atItem.sp && atItem.sp[0])
	return atItem.sp[0]
var mc = commonui.modInfo(group,  (modbit&1) || (modbit&10)==10 )
if(mc)
	return mc[0]

}//


//已经使用的对贴道具
commonui.postDispAtitems = function(argid,atItem){
var $=_$,x = $('/span','className','silver b opacity75'),i,j,l
for(i=0;i<5;i++){
	j=atItem.info(i)
	if(j)
		x._.add( (l=atItem.count(i))+(l>9?'':'×'), $('/img','src',atItem._P+'/'+j[1],'style','verticalAlign:middle;width:3em;height:3em','title',j[2]),$('/br'))
	}
return $('/div',
		'title','评价',
		'onclick',function(e){commonui.recommendPost(e,argid,this)},
		'style','clear:right;cssFloat:right;float:right;marginBottom:-0.2em;textAlign:right;cursor:pointer',
		x 
		)
}//


//设备信息的链接
commonui.postDispFromClient = function(client,lite){
var client = (client+'').match(/^(\d+)\s*(.*)$/),$=_$
if(client){
	var x=client[2],y=client[1]|=0
	if(y!=7 && y!=101 && y!=8 && y!=100 && y!=31 && y!=104)
		return null
	return $("/a",'title',(y==8||y==9||y==7||y==31) ? ('发送自'+(x?' '+x+' 上的':'')+' NGA官方客户端') : (x?'发送自 '+x:'发送自 未知设备'),
				'className',' inlineBlock','style','vertical-align:middle;filter:'+((y==8||y==9||y==7) ? 'none' : 'opacity(0.6)'),
				'href','http://app.nga.cn',
				__TXT.svg((y==7||y==101)?'apples':'androids','height:1.5em')
				)

		

	}
return null
}//



//用户信息区域背景图
commonui.postDispSetUserInfoBg = function(uInfoCBg){
var pbg = commonui.userCache.get("customPosterBackgroundFile")
if(pbg){
	var opt = 0
	uInfoCBg.style.backgroundImage = "url("+pbg.replace(/~(\d+)$/,function($0,$1){opt = ($1|0);return ''})+")"
	uInfoCBg.style.backgroundPosition = (opt&1) ? "top left" : 
												( (opt&2) ? "right top" : 
													( (opt&4) ? "right bottom" : 
														( (opt&8) ? "left bottom" : '')
														)
													)
	uInfoCBg.style.backgroundRepeat = (opt&32) ? "repeat" : "no-repeat"
	}
}//

//设置用户信息区域背景图
commonui.postDispSetUserInfoBgEdit = function(e){
	commonui.createadminwindow()
	var x = commonui.adminwindow,$=_$
	x._.addContent(null)
	x._.addTitle('设置背景图')
	var y = $('/span')._.add(
		'图片将保存在浏览器储存中',
		$('/br'),
		'可能会意外清除 请自行备份原图',
		$('/br'),
		'对齐至 ',
		$('/input','type','radio','name','CPBalign_74635','value',1,'checked','checked'),'左上 ',
		$('/input','type','radio','name','CPBalign_74635','value',2),'右上 ',
		$('/input','type','radio','name','CPBalign_74635','value',4),'右下 ',
		$('/input','type','radio','name','CPBalign_74635','value',8),'左下 ',
		$('/br'),
		$('/input','type','checkbox','value',16,'checked','checked'),'半透明 ',
		$('/input','type','checkbox','value',32),'平铺 ',
		//'文件大小不超过1536k',
		$('/br'),
		//支持window.FileReader
		$('/input','type','file','onchange',function(e) {
				var f = e.target.files[0], reader = new FileReader(),p = this.parentNode
				reader.onload = function(e) {
					p._data = e.target.result
					};
				reader.readAsDataURL(f);
				}
			),
		$('/br'),
		$('/br'),
		$('/button','onclick',function(){
			var data = this.parentNode._data
			if(data){
				var opt = 0,x = this.parentNode.getElementsByTagName('input')
				for(var i=0;i<x.length;i++){
					if(x[i].checked)
						opt |= (x[i].value|0)
					}
				if(opt&16)
					data = commonui.gradientImage(data, opt)
				if(data.length>(1024*1024))
					return alert('文件过大');
				commonui.userCache.set("customPosterBackgroundFile",data+'~'+opt,86400*300)
				}
			else
				commonui.userCache.del("customPosterBackgroundFile")
			alert("设置完毕 刷新页面后生效")
			commonui.adminwindow._.hide()},'type','button','innerHTML','确定','class','larger'),
		$('/button','onclick',function(){commonui.userCache.del("customPosterBackgroundFile")
			alert("设置完毕 刷新页面后生效")
			commonui.adminwindow._.hide()
			},'type','button','innerHTML','清除背景图')
		)
	x._.addContent(y)
	x._.show(e)
}//



//计算内容长度
commonui.postDispCalcContentLength=function(contentC){
var x = contentC.childNodes,y=0
for(var i=0;i<x.length;i++){
	if(x[i].nodeType==3 && x[i].nodeValue){
		y+=x[i].nodeValue.length
		if(y>20)
			break;
		}
	}
return y
}//


//调整贴条的宽度到 （默认一行两个 调整为一行一个
commonui.postDispAdjCommetWidth=function(a){
for(var j=0;j<2;j++){
	if(x = $((j?'comment_for_':'hightlight_for_')+(a.pid ? a.pid : a.i))){
		x = x.childNodes
		for(var i=0;i<x.length;i++){
			if(x[i].className=='comment_c left'){
				x[i].className='comment_c'
				x[i].style.width=''
				}
			if(x[i].nodeName=='BR' && x[i].className=='commentblkoffset')
				x[i].style.display='none'
			}
		}
	}
}//


//显示签名
commonui.postDispSign=function(a,uI,lite){
if(lite&4){
	var $=_$, mh = 300, z = this.postDispSign.tpl(a.i,mh)
	a.signC = $(a.signC)

	if(uI.buffs[113] && a.pAid==window.__CURRENT_UID){
		z[1] = 
			$('/button','type','button','disabled','disabled')._.add('签名被禁用')
		a.signC._.add(z)
		}
	else if(a.setShowSig){
		a.signC._.add(z)
		ubbcode.bbsCode({
			c:a.signC.childNodes[1],
			fId:a.fid,
			tId:a.tid,
			pId:a.pid,
			authorId:a.pAid,
			rvrc:uI.rvrc,
			isSig:true,
			opt:128,
			callBack: function(a){window.setTimeout(function(){commonui.postSignCheckHeight(a.c,mh,a.authorId)},1000)},
			txt:uI.signature,
			suffix:"<div class='clear'></div>"
			})
		}
	else{
		z[1] = $('/button','class','sigtog','type',"button",'innerHTML','点击显示签名','onclick',function(){
			var x = this.parentNode
			x.innerHTML=''
			x._.add(commonui.postDispSign.tpl(a.i,mh))
			var y = x.childNodes[1]
			,aw = commonui.getAvilWidth(y)
			if(aw){
				y.style.maxWidth=aw+'px'
				y.style.overflow='auto'
				}
			y.style.maxHeight = (mh*2)+'px'
			ubbcode.bbsCode({
				c:y,
				fId:a.fid,
				tId:a.tid,
				pId:a.pid,
				authorId:a.pAid,
				rvrc:uI.rvrc,
				isSig:true,
				opt:128,
				callBack: function(a){a.c.style.visibility=''},
				txt:uI.signature,
				suffix:"<div class='clear'></div>"
				})
			})
		z[0].$0('ondblclick',function(){this.nextSibling.click()})
		a.signC._.add(z)
		if(a.vsmall && !a.__GP.ubMod)
			a.signC.style.display='none'
		}
	a.signC.className=a.signC.className.replace('x','')+' postsignC'
	//a.signC.style.display='block'
	}
else
	a.signC.style.display='none'
}//

commonui.postDispSign.tpl = function(i,mh){
var $ = _$
return [$('/span','class','sigline',$('/span','class','en_font xtxt')._.add(location.hostname.toLocaleUpperCase()) )
	,$('/div','class','sign ubbcode','style','visibility:hidden;max-height:'+mh+'px;overflow:hidden','id',"postsigncontent"+i)
	,$('/div','class','clear')
	]
}//

commonui.postScoreAdd = function psa(o,a,badgood){
if(!window.__CURRENT_UID){
	return alert(psa.after(o,a,'登录之后方可使用此功能'))
	}
if(psa.loading)
	return alert(psa.after(o,a,'提交中 请稍候...'))
psa.loading = 1
var goodbad = badgood ? -1 : 1
__NUKE.doRequest({u:{u:__API._base,
	a:{__lib:"topic_recommend",__act:"add",tid:a.tid,pid:a.pid,value:goodbad,raw:3}
	},
	f:function(d){
		psa.loading = 0
		var e = __NUKE.doRequestIfErr(d)
		if (e)
			psa.after(o,a,e)
		else
			psa.after(o,a,d.data[0],d.data[1]|0,d.data[2]|0)
		return true
		}
	})
}//

commonui.postScoreAdd.after = function(o,a,al,v,w){
if(v!==undefined){
	if(a.rmdVal){
		var y = a.rmdVal()
		if(y.match(/^\d+$/)){
			var c = (y|0)+v
			a.rmdVal( c<=0 ? '' : c )
			}
		else
			a.rmdVal( v>0 ? ('+'+v) : v )
		}
	}
if(w){
	a.rmdHl(w&4 , w&8)

	var lo = commonui.userCache.get('postScoreLog',2)
	if(!lo)lo=''
	if(lo.length>4096)
		lo = lo.substr(1024)
	if(w&(1|2))//remove old
		lo = lo.replace(this.toExp(a.tid,a.pid), function(a,b,c){return c})
	if(w&(4|8))//2good/bad
		lo += this.toStr(a.tid,a.pid,(w&4) ? 1 : 0)
	commonui.userCache.set('postScoreLog',lo,7776000,2)
	}
if(al){
	var s = this
	if(!s.pop)
		s.pop = _$('/div','style','position:absolute;border:1px solid '+__COLOR.gbg1+';background-color:'+__COLOR.bg0+';display:inline-block')
	var p = o.getClientRects()[0],q = __NUKE.position.get(),pt = p.top-__SETTING.fontSize-5+q.yf
	if(p.left>q.cw/2)
		s.pop.$0('style','right:'+(q.cw-p.left-p.width)+'px;top:'+pt+'px')
	else
		s.pop.$0('style','left:'+p.left+'px;top:'+pt+'px')
	s.pop.$0('innerHTML','')._.add(al)
	if(!s.pop.parentNode)
		document.body.appendChild(s.pop)
	if(s.ti)clearTimeout(s.ti)
	s.ti = setTimeout(function(){document.body.removeChild(s.pop)},2000)
	return al
	}
}//

commonui.postScoreAdd.toStr = function(tid,pid,goodbad){return pid ? ((goodbad>0?'<':'>')+commonui.uint2b64(pid)) : ((goodbad>0?'@':'#')+commonui.uint2b64(tid))}

commonui.postScoreAdd.toExp = function(tid,pid){return new RegExp(pid ? ('(<|>)'+commonui.uint2b64(pid)+'(<|>|@|#|$)') : ('(@|#)'+commonui.uint2b64(tid)+'(<|>|@|#|$)'))}

commonui.postScoreAdd.ifScore = function(tid,pid){
var x=0
if(commonui.postArg.def.scoreLog){
	x = commonui.postArg.def.scoreLog.match(this.toExp(tid,pid))
	if(x){
		x = x[1]
		if(x=='<' || x=='@')x = 1
		else x = -1
		}
	else
		x = 0
	}
return x
}//

//===========================
//
commonui.gradientImage=function(dataUrl,opt){

var x = new Image(), y=document.createElement('canvas'), z = y.getContext('2d'), w ,h, hw, hh, u,
g = function(alpha,pos,center){
	return (alpha*(1-(pos-center)/center))|0
	},
l = function(alpha,pos,center){
	return (alpha*(1-(center-pos)/center))|0
	}
x.src =  dataUrl
w = y.width = z.width = x.width
h = y.height = z.height = x.height
z.drawImage(x, 0, 0)
u = z.getImageData(0, 0, w, h)
hw = (w/2)|0
hh = (h/2)|0
for(var i=0;i<h;i++){
	for(var j=0;j<w;j++){
		var ak = (i*w+j)*4 +3
		u.data[ak] = (u.data[ak]/3)|0
		if((opt&32)==0){
			if(opt&1){//左上100% 右下0%
				if(j>hw)
					u.data[ak] = g(u.data[ak],j,hw)
				if(i>hh)
					u.data[ak] = g(u.data[ak],i,hh)
				}
			if(opt&2){//右上100% 左下0%
				if(j<hw)
					u.data[ak] = l(u.data[ak],j,hw)
				if(i>hh)
					u.data[ak] = g(u.data[ak],i,hh)
				}
			if(opt&4){//右下100% 左上0%
				if(j<hw)
					u.data[ak] = l(u.data[ak],j,hw)
				if(i<hh)
					u.data[ak] = l(u.data[ak],i,hh)
				}
			if(opt&8){//左下100% 右上0%
				if(j>hw)
					u.data[ak] = g(u.data[ak],j,hw)
				if(i<hh)
					u.data[ak] = l(u.data[ak],i,hh)
				}
			}
		}
	}
z.putImageData(u,0,0)
return y.toDataURL()
}
//头像背景图====================
commonui.postDispAvatarBg = function(o,i,p){
o.style.background='#fff url("'+i+'")'+(p?' '+p:' 50% 0.5em no-repeat')
o.style.backgroundColor=''
}//


//签名高度=====================
commonui.postSignCheckHeight=function(o,h,aid){
if(o.scrollHeight<=h){
	o.style.visibility=''
	return
	}
if(aid==window.__CURRENT_UID){
	o.style.display='none'
	o.style.visibility=''
	o.parentNode.insertBefore(
		_$('/button','type',"button",'onclick',function(){this.style.display='none';this.nextSibling.style.display='';this.nextSibling.style.maxHeight=(h*2)+'px'})._.add('签名高度超过'+h),	o
		)
	}
else{
	_$(o).$0('style','mask-image:linear-gradient(to bottom, black 0%, transparent 60%)','ondblclick',function(){
		this.style.maskImage = ''
		this.style.overflow = 'auto'
		})
	o.style.visibility=''
	}
}//fe
//购买并使用================
commonui.atItemBuyUse = function(e,tid,pid){
if(!window._ITEM)
	return __SCRIPTS.asyncLoad('userItem',function(){
		commonui.atItemBuyUse(e,tid,pid)
		} )
var x,z, $ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('对帖子使用道具')
this.adminwindow._.addContent(x = $('/span'),z=$('/span'))
var s = function(o,b,t){
	var y = tid+'\t'+(pid?pid:0)+'\t0'
	var io = new_ITEM_inset(o)
	io.storeBuyAndUse(1,5,b,y,t)//类别5 对贴道具
	}//fe
s(x,'9,10,11,12,13,14,15,16,17,18,19,20','选择一个礼物购买并使用')// 礼物类
s(z,'21,23,24,25,26','或购买一个道具并使用')// 功能类
this.adminwindow._.show(e)
}//fe


commonui.atItemBuyUse2 = function(e,tid,pid,uid,usegroup){
if(!window._ITEM)
	return __SCRIPTS.asyncLoad('userItem',function(){
		commonui.atItemBuyUse2(e,tid,pid)
		} )
var w=this.atItemBuyUse2.w, y, z, $ = _$
if(!w){
	w = this.createCommmonWindow()
	this.atItemBuyUse2.w = w
	}
w._.addContent(null)
w._.addTitle('使用道具')
w._.addContent(y=$('/span'))

if(!usegroup)
	usegroup= 'boring'

__NUKE.doRequest2(
	'f',function(da){
		var e=__NUKE.doRequestIfErr(da)
		if(e)
			return alert(e)
		var groups = da.data[3]
		,items = da.data[0]

		for(var gk in groups){
			var gg = groups[gk]
			if(!gg[3])continue
			y._.add($('/h4','class'," textTitle",'innerHTML',gg[0]))
			if(gk==usegroup){
				for(var j in items){
					if(j=='length')continue
					var it = items[j]
					y._.add($('/a'
								,'href','javascript:void(0)'
								,'title',it.name+' x'+it.num+'(ID:'+it.id+' 类别:'+it.type+' 子类:'+it.sub_type+') 每个'+it.price+(it.currency_type==2?'N币':'铜币')+' 出售中'
								,'style','display:block;float:left;width:3.255em;padding:0;margin:0.166em 0.166em 0.2em 0;line-height:1em;color:gray;'
								,$('/div','style','width:3em;height:3em;border:0.11em solid '+__COLOR.border0+';background:url('+it.icon.replace(/^https?:/,'')+') 50% 50% no-repeat;')
							))
					
					}
				}
			else{
				y._.add($('/button','_itgroup',gk,'innerHTML','　+　','onclick',function(e){
					commonui.atItemBuyUse2(e,tid,pid,uid,this._itgroup)
					}))	
				}
			}

		w._.show(e)
		}//
	,'u','nuke.php?__lib=item_v2&__act=list_mix&__output=3'
	,'group',usegroup
	)

}//fe

//推荐操作界面=================
/*
commonui.recommendPost = function(e,i,o){
if(!window.__CURRENT_UID && !i.length)
	return
var a = commonui.postArg.data[i], tid = a.tid, pid = a.pid, i = a.atItem, y,$ = _$

this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('使用道具')
var self = this, store = function(y){
	if(!window._ITEM)
		return loader.script(__SCRIPTS.userItem,function(){
			store(y,o)
			} )
	t.innerHTML=''
	y = tid+'\t'+(pid?pid:0)+'\t'+y
	var io = new_ITEM_inset(t)
	io.storeBuyAndUse(1,5,0,y,null)//类别5 对贴道具
	},//fe
 t,f
if(window.__CURRENT_UID)
	this.adminwindow._.addContent(
		$('/span',
			t = $('/span','classname','item_ui'	)
			)
		)
if(i){
	var x=$('/span').$0('className',"silver",'style',{lineHeight:'2.3em',fontSize:'2em',fontWeight:'bold'}),y=0
	for(var j=0;j<i.length;j++){
		var k = i.info(j)
		if(k)
			x._.add(
				' '+i.count(j)+'×',
				$('/img').$0('src',i._P+'/'+k[1],'style',{width:'2em',height:'2em',verticalAlign:'middle'},'title',k[0]+' : '+k[2])
				)

		if((y++)&1)
			x._.add($('/br'))
		}
	this.adminwindow._.addContent(
		$('/br'),$('/br'),
		$('/h4').$0('className',"textTitle silver",'innerHTML','其他用户此贴使用的道具'),
		x
		)
	}
this.adminwindow._.show(e)
store(0)
}//fe
*/
//修改记录格式化================
commonui.loadAlterInfo=commonui.loadAlertInfo=function(info,ci)
{
if(!info)return;
info = info.split(/\t|\n/);
var x = '', y = '', 
	s = function(x){return " class='block_txt "+(x?'block_txt_c2':'block_txt_c3')+"' style='margin-bottom:0.25em' "},
	c = function(x){return '<span class="block_txt block_txt_c0" style="margin-left:-0.4em">'+x+'</span> '}
for (var i=0;i<info.length;i++){
	var z = info[i].replace(/^[\t\n ]+/,'');
	if (!z)
		continue
		
	if (z.match(/^edit /i)){
		x += z+' ';
		}
	else if(z.substr(0,1)=='['){
		y += z.replace(/\[([A-Z])?([-\d\.\/ ]+)( .+?)?\](.+)?/g,function($0,$1,$2,$3,$4){
			$2 = $2.split(' ')
			if($2[5] && !$3)
				$3 = $2[5]
			$3 = $3!==undefined?' '+$3:''
			$4 = $4!==undefined?' '+$4:''
			if($1=='L'){
				if($2.length>3){
					var o='<span '+s()+'>'+c('&#10005;')
					if($2[0]!='0'){
						if($2[1]==='00')
							o+="在同声望版面中"
						else if($2[2]!='0')
							o+="在主题中"
						else if($2[1]!='0')
							o+="在版面中"
						o+='禁言'+$2[0]+'天 '
						}

					if($2[3]!='0'){
						o+='扣除声望'+$2[3]
						if($2[4]!='0')
							o+=' 扣除威望'+($2[4]/10)
						}
					return o+$3+'</span>&emsp;'
					}
				else
					return '<span '+s(1)+'>'+c('&#10005;')+'-'+$2[0]+'声望 -'+$2[1]+'威望 禁言'+$2[2]+'天'+$3+'</span>&emsp;'
				}
			else if($1=='U')
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+($3==' UM'?' 解除禁言':'')+' (取消操作)</span>&emsp;'
			else if($1=='E'){
				var o='<span '+s()+'>'
				if($2[1]=='0' && $2[2]=='#ANONYMOUS#')
					o+='匿名用户 '
				else if($2[1]=='0' && $2[2]=='0')
					o+=''
				else if($2[0]=='0'){
					o+="<a href=''>更多</a> "
					return ''
					}
				else
					o+="<a href='/nuke.php?func=ucp&uid="+$2[1]+"'>"+$3.substr(1)+"</a> " 
				x +=  o+'在'+commonui.time2date($2[0], 'Y-m-d H:i')+'修改</span>&emsp;'
				return ''
				}
			else if($1=='A')
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+$3+(__GP.greater ? " <a class='block_txt block_txt_c0' style='margin-right:-0.4em' href='javascript:void(0)' onclick='adminui.viewLog(0,0,"+$2[3]+")'>?</a>":'')+'</span>&emsp;'
			else
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+$3+$4+'</span>&emsp;'
			});
		}/*
	else if(z.substr(0,4)=='$fav'){

			x+='<span '+s()+'>'
			z = z.substr(4).split('/')
			for(var j=1;j<z.length;j+=2)
				x += "<a href='/column.php?uid="+z[j]+"'>"+z[j+1]+"</a> "
			if((z.length-1)/2<z[0])
				x += '等'+z[0]+'人'
			x+='(公开)收藏了此贴</span>&emsp;'
			
		}*/
	}
$(ci).innerHTML = x+y
//$(ci).innerHTML = (x ? '<div class="silver">'+x+'</div>' : '')+(y?"<table class='quote'><tr><td>评分记录 "+y+'</td></tr></table>':'')
}

//==============
commonui.posterInfo={//#发布者信息格式化
w:window,
c:commonui,
uI:commonui.userInfo,
pA:commonui.postArg.data,
mI:commonui.modInfo,
__IMG_STYLE:window.__IMG_STYLE,
__IMGPATH:window.__IMGPATH,
sb:window.__SETTING.bit,
__NOW:window.__NOW,

main:function(lite,i,fid,tid,pid,cLen,uid,type,stid,comment,optime){

var x ,d={},  u=this.uI.users[uid], rvrc=Math.floor(u.rvrc/10), a = this.pA[i]
,active = this.active(u.uid,u.bit_data, u.mute_time, u.allBuffs,fid,tid,this.__NOW,stid)

if(comment){
	d.avatar = this.avatar(i, lite|1, u.avatar, u.buffs, null, u.uid)
	d.authorname = this.name(i,active, u.username, uid, u.buffs,null,lite)
	return this.comment(d)
	}
d.avatar = this.avatar(i, lite, (cLen>=15 || window.__APPEMBED)?u.avatar:'', u.buffs, a ? a.atItem :null, uid);
d.honor=this.honor(u.honor,lite)
//d.icon=this.levelIcon(this.uI.groups[u.memberid][1] & 16, rvrc)
d.l=this.floor(i, pid, lite, u.bit_data)
d.uid = this.uid(uid)
d.r_bar = this.r(lite, uid)
d.level = this.level(lite, this.uI.groups[u.memberid][0], rvrc, fid, uid, active, u.groupid, (a && a.mods) ? a.mods[uid] : 0, (a && a.customLevel)?a.customLevel :null)
d.authorname = this.name(i,active, u.username, uid, u.buffs, u.uuname,lite)
d.postnum=(lite&16) ? '' :this.basic(u.postnum, u.regdate, u.thisvisit)
d.money = this.money(u.money)
d.medal = this.medal(u.medal)
d.site = this.site(uid, u.site, u.bit_data & 32768 )
d.remark = this.remark(u.remark)+this.remark(u.remark_mod)
d.hasRemark = u.remark ? 1 : 0
if((lite & 1 ) &&optime)
	d.optime = "<span class='userval'>"+commonui.time2date(optime,'Y-m-d H:i')+"</span>"

if((lite&1)==0)
	return this.normal(d,lite,a)
else{
	var x = this.lite(d)
	x = x.replace(/([^:]{2}): ?</g,' · $1 <')
	if(!d.honor)
		x = x.replace(' · ','')
	return x
	}

},//fe

normal:function(d,lite,a){
var x = ''
if(d.authorname)x+="<div style='text-align:left;line-height:1.5em'>"+d.l+d.authorname+d.uid+"</div>"

if(d.avatar)x+=d.avatar

if(d.honor)x+=d.honor
x+="<div class='stat' style='margin:2px 0 0 0' "+(lite&2?'':"onclick='commonui.posterInfo.showAll(this)'")+"><div style='width:100%'>"

if(d.r_bar){
	for (var k in d.r_bar)
		x+="<div>"+d.r_bar[k]+"</div>"
	}
x+="<div style='float:left;margin-right:3px;min-width:49%;*width:49%'><nobr>"+d.level.p1+"</nobr></div>"
x+="<div style='float:left;margin-right:3px'><nobr>"+d.level.p2+"</nobr></div>"
//x+="<span class='clickextend' style='"+(lite&2 ? '' : 'display:none')+"'>"
x+="<div style='float:left;margin-right:3px;min-width:49%;*width:49%'><nobr>"+d.postnum+"</nobr></div>"
x+="<div style='float:left'><nobr>"+(d.level.p3? d.level.p3 : d.money)+"</nobr></div>"
x+="<div class='clear'></div></div>"
x+="<span class='clickextend' style='"+(
	((lite&2)||(d.medal==''&&d.site==''&&d.remark=='')||d.hasRemark) ? '' : 'display:none'
	)+"'>"
if(d.medal)x+=d.medal+'<br/>'

if(d.site)x+=d.site+'<br/>'

if(d.remark)x+=d.remark

x+='<div class=clear></div></span></div><div class=stat_spacer></div>'
return x
},//fe
comment:function(d){
return d.avatar+d.authorname
},//fe
lite:function(d){
var x=d.l
if(d.avatar)
	x+=d.avatar+' '
if(d.authorname)
	x+=d.authorname+d.uid+' '
if(d.optime)
	x+=d.optime
x+='<br/>'
if(d.honor)x+=d.honor+' '

x+="<span class='usercol nobr'>"+d.level.p1+"</span> <span class='usercol nobr'>"+(d.level.p2?d.level.p2:d.postnum)+"</span> <span class='usercol nobr'> "+(d.level.p2?d.postnum:d.money)+"</span> "

if(d.medal)x+="<span class='usercol nobr'>"+d.medal+'</span> '

if(d.site)x+="<span class='usercol nobr'>"+d.site+'</span> '

if(d.remark)x+=d.remark
return x
},//fe

showAll:function(o){
if(o.__gtresgvb)return
o.__gtresgvb = true
o = o.getElementsByTagName('span')
for(var i=0;i<o.length;i++)
	if(o[i].className=='clickextend')
		o[i].style.display = ''
},//fe

remark:function(remark){
if(!remark)
	return ''
var x = ''
for(var k in remark){
	var z=''
	remark[k][4]+=''
	if((remark[k][3]&2)==0 && remark[k][4].indexOf('=')!=-1)
		remark[k][4] = remark[k][4].replace(/(?:http:\/|bbs\.ngacn\.cc|nga\.178\.com)\/[a-z0-9_%\/\-?.]+?(tid|pid|fid)=(\d+)[a-z0-9_%\/\-]*/i,function($0,$1,$2){
			if($1=='tid')
				z="<a href='/read.php?tid="+$2+"'>[+]</a>"
			if($1=='pid')
				z="<a href='/read.php?pid="+$2+"'>[+]</a>"
			if($1=='fid')
				z="<a href='/thread.php?fid="+$2+"'>[+]</a>"
			return ''
			}).replace(/\[(tid|pid|fid)=(\d+)\]/i,function($0,$1,$2){
			if($1=='tid')
				z="<a href='/read.php?tid="+$2+"'>[+]</a>"
			if($1=='pid')
				z="<a href='/read.php?pid="+$2+"'>[+]</a>"
			if($1=='fid')
				z="<a href='/thread.php?fid="+$2+"'>[+]</a>"
			return ''
			})
	var y = this.c.cutstrbylen(remark[k][4],9,9,'…')
	if(remark[k][3]&1)
		x+="<span style='padding:0.1em 0;display:inline-block;'><span class='block_txt block_txt_c3 nobr' style='line-height:1.18em;color:"+__COLOR.quote1+"'title='"+'公开备注 '+remark[k][4]+"'>"+'<span class="block_txt block_txt_c0" style="margin-left:-0.4em">&#10003;</span> ' +z+y+"</span></span> "
	else if(remark[k][3]&2){
		if(window.__CURRENT_GFID==2){
			var wo = this.wowcard(remark[k][4]),co = commonui.hexToRgba(__COLOR.postUiElm_h+'aa')
			x+="<span style='padding:0.1em 0;display:inline-block;'><span class='block_txt block_txt_c3 nobr' style='line-height:1.18em;display:inline-block;overflow:visible;background-color:rgba("+co.join(',')+");color:"+wo.color+"' title='"+wo.hint.replace(/'/g,'`')+"' onclick='commonui.posterInfo.wowpop(this.title,event)'>"
			+wo.html+
			"</span></span> "
			}
		}
	else
		x+="<span style='padding:0.1em 0;display:inline-block;' class='remarkHidden'><span class='block_txt block_txt_c3 nobr' style='line-height:1.18em;color:"+__COLOR.txt2+"'title='版主可见 '"+remark[k][4]+"' onmouseover='this.firstChild.style.visibility=\"\"' onmouseout='this.firstChild.style.visibility=\"hidden\"'><span style='visibility:hidden'>"+z+y+"</span></span></span> "
	}

return x
},//fe

wowpop: function(txt,e){
txt = txt.replace(/;/g, '<br/>').replace(/(https:\/\/.+)/, "<br/><a href='$1' target='blank'>官方英雄榜</a>")
commonui.alert(_$('/span','style','color:'+__COLOR.postUiElm_l,'innerHTML',txt),'',0,e)
},//

wowcard: function(txt){
var x = txt.split('\t'),y=[],z=this.wowkey,s = "height:1em;scale:1.6",r = Math.random()>0.5 ? 1 : 0
for(var i=0;i<x.length;i+=2)
	if(x[i] && z[x[i]])
		y[ z[x[i]][0] ] = x[i+1]

y.mythic_rating |= 0
y.hint=(y.server_type=='wow_classic'?'怀旧服':'正式服')+' '+y.realm_name+'; '+y.race+y.class+' '+y.character_name
+(y.title?(' "'+y.title+'"'):'')+";"
+(y.average_item_level ? (' 装备等级'+y.average_item_level) : '')
+(y.achievement_point ? (' 成就点数'+y.achievement_point) : '')
+(y.mythic_rating ? (' 史诗钥石'+y.mythic_rating) : '')
+'; https://wow.blizzard.cn/character/'+(y.server_type=='wow_classic'?'classic/':'')+'#/'+y.realm_name_en+'/'+y.character_name

y.classIcon = __IMGPATH+'/wow/class/24_'+this.wowicon[y.class]+'.png'
y.raceIcon = __IMGPATH+'/wow/race/24_'+this.wowicon[y.race]+'_'+(y.gender=='FEMALE'?'f':'m')+'.png'
y.factionIcon = __IMGPATH+'/wow/faction/'+(y.faction=='联盟'?'alliance':'horde')+'.svg'
y.color = (y.faction=='联盟'?'#2b93c7ff':'#a35353')
y.serverIcon = __IMGPATH+'/wow/server/'+(y.server_type=='wow_mainline'?'wow_mainline':'wow_classic')+'.svg'
y.html = "<div style='display:inline-block;overflow:hidden;width:3.56em;height:1.333em;box-sizing:border-box;vertical-align:bottom;border-radius:0.5em;border:0.0833em solid goldenrod;margin-top:-1em;background:#000 url("+(r ? y.classIcon :y.factionIcon)+") 1.5em top no-repeat;background-size:60% auto;transform: translate(-0.5em, 0.083em);'><div style='display:inline-block;overflow:hidden;clip-path:polygon(0 0, 75% 0, 35% 100%, 0 100%);width:3.2em;height:1.6em;background:goldenrod'><div style='display:inline-block;overflow:hidden;clip-path:polygon(0 0, 71% 0, 31% 100%, 0 100%);width:3.2em;height:1.6em;background:#000 url("+(r ? y.raceIcon : y.serverIcon)+") -0.09em bottom no-repeat;background-size:60% auto'></div></div></div>"
+y.character_name
+' '+commonui.cutstrbylen(y.title,7,7,'..')
+" <img src='"+__IMGPATH+"/wow/ui/itemlevel.svg' style='height:1em;transform:translate(0, 0.09em)'/>"+y.average_item_level
+(y.mythic_rating ? 
	(" <img src='"+__IMGPATH+"/wow/ui/keystone.svg' style='height:1em;transform:translate(0, 0.09em)'/>"+y.mythic_rating)
	: (" <img src='"+__IMGPATH+"/wow/ui/achievement.svg' style='height:1em;transform:translate(0, 0.09em)'/>"+y.achievement_point)
	)

return y
},//

wowicon:{"战士":"wa","猎人":"ht","法师":"mg","潜行者":"rg","牧师":"pt","术士":"wl","圣骑士":"pl","德鲁伊":"du","萨满祭司":"sm","武僧":"mk","恶魔猎手":"dh","死亡骑士":"dk","唤魔师":"ek","人类":"human","矮人":"dwarf","暗夜精灵":"nightelf","侏儒":"gnome","德莱尼":"draenei","狼人":"worgen","熊猫人":"panda","龙希尔":"dracthyr","虚空精灵":"voidelf","光铸德莱尼":"ltdraenei","黑铁矮人":"irondwarf","土灵":"earthen","库尔提拉斯人":"kultiran","机械侏儒":"mechgnome","兽人":"orc","亡灵":"undead","牛头人":"tauren","巨魔":"troll","血精灵":"bloodelf","地精":"goblin","夜之子":"nightborne","至高岭牛头人":"mountain","玛格汉兽人":"maghar","赞达拉巨魔":"zandalari","狐人":"vulpera"},

wowkey:{
'rl':['realm_name','服务器']
,'re':['realm_name_en','服务器en']
,'ch':['character_name','角色名']
,'rc':['race','种族']
,'cl':['class','职业']
,'fa':['faction','阵营']
,'tl':['title','称号']
,'av':['achievement_point','成就点数']
,'it':['average_item_level','装备等级']
,'mh':['mythic_rating','史诗钥石']
,'sv':['server_type','服务器类型']
,'gd':['gender','性别']
},

avatarBlank:function(c){return 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="130" height="130"><defs><path id="a" d="M65.3 102.4 41.5 93 29.7 67l9.8-25.6L65 30.6l26.2 9.8L102 65.6 91.3 91.4Z"/><path id="b" d="M65.3 94.6a29.2 29.2 0 1 1 29.2-29.2 29.2 29.2 0 0 1-29.2 29.2Zm25.4-29.2a25.4 25.4 0 0 0-.8-6.6l-6 6L90 71a25.4 25.4 0 0 0 .6-5.6Zm-1.6 8.9-7.3-7.4-14.4 14.4 7.5 7.5-.1.2A25.4 25.4 0 0 0 89 74.3Zm-9.5-9.5L65.3 50.4 50.9 64.8l14.4 14.4ZM71.8 90l-6.5-6.6-6.5 6.5a24.7 24.7 0 0 0 13 0Zm-16.2-1.1 7.5-7.6-14.3-14.4-7.3 7.3a25.5 25.5 0 0 0 14 14.7ZM39.9 65.4a25.4 25.4 0 0 0 .6 5.5l6.1-6.1-5.8-5.8a25.4 25.4 0 0 0-.9 6.4Zm2-9.6 6.9 6.9L63 48.3l-6.6-6.7a25.5 25.5 0 0 0-14.7 14.2ZM65.2 40a25.4 25.4 0 0 0-5.6.6l5.6 5.6 5.5-5.6a25.4 25.4 0 0 0-5.5-.6Zm8.8 1.6-6.7 6.7 14.4 14.4 7-7A25.5 25.5 0 0 0 74 41.6Z"/></defs><path d="m8.6 45.2 1 42.6H22L21.8 45Zm113.2 0-1 42.6h-12.4l.2-42.8ZM45.8 20V10s6.6-1.6 18.4-1.6a92.6 92.6 0 0 1 19.4 1.8V20H45.8Z" style="fill:#d5d3cf"/><path d="m114.5 49.5-1.8 36-47.2 40-46.5-40-1.8-36s7-34.2 48.7-34.2 48.6 34.2 48.6 34.2Z" style="fill:#b3afa8"/><path d="M117.3 110.6a4.7 4.7 0 0 0-.7-3.3c-1-1.3-8.5-5.5-9.2-10.3s5.7-3.7 5.2-12.2c0 0 0-4.5-4.2-4.8s-7.5-.5-9 3.5a35.3 35.3 0 0 1-66.9 0c-1.4-4-4.7-3.7-9-3.5s-4.2 4.8-4.2 4.8c-.5 8.5 6 7.5 5.2 12.2s-10 9-11 10.3a4.7 4.7 0 0 0-.8 3.3c6.6 46 97.6 45.8 104.6 0Z" style="fill:#cbc9c5"/><path d="M105.7 93.7a5.8 5.8 0 0 0-.8 2.2 9.7 9.7 0 0 0-.3 6.4c-.3 18-21.4 25.2-38 25.5-17.4.3-39.4-7.5-39.8-25.5a14.2 14.2 0 0 0 0-7.4 5 5 0 0 0-.7-1.2c-1.4-2-5.4-6.5-.8-8.4 3-1.2 5.8.2 7 3.5A31.8 31.8 0 0 0 39 98c8.2 7.7 15.9 12 26.7 12a38 38 0 0 0 27.2-11.3 39.9 39.9 0 0 0 6.8-10.3c1.3-3.3 4-4 6.9-2.7 4.6 1.9.5 6-.9 8Z" style="fill:#a5a39f"/><use y="4" href="#a" style="fill:#817f7e"/><use href="#a" style="fill:#d9d8d2"/><path d="M65.9 39.3a27.3 27.3 0 1 1-27.3 27.2A27.3 27.3 0 0 1 66 39.2Z" style="fill:#707676"/><use y="2" href="#b" style="fill:#595857"/><use href="#b" style="fill:#a5a39f"/></svg>')},


/**
@param {postDispLite} lite
*/
avatar:function(i, lite,avatar,buff,at,uid){
if(this.sb & (33554432|67108864))//不显示头像
	avatar = ''

avatar = this.c.selectUserPortrait(avatar,buff,uid)

if(avatar==''){
	if(lite&1){
		var tmp = new String(this.avatarBlank(__COLOR.gbg7))
		for(var k in avatar)
			tmp[k] = avatar[k]
		avatar = tmp
		}
	else
		return ''
	}


//if(at && at.sp && at.sp[4])
//avatar.replace(/http:\/\/pic1\.178\.com\/avatars\/(\d+)\/(\d+)\/(\d+)\/(\d+)_(\d+)\.jpg/ig,'http://pic1.178.com/avatars/$1/$2/$3/25_$5.jpg')
//var bdr = avatar.noborder? 'border-width:0;' : 'border-width:'+Math.round(__SETTING.fontSize/12)+'px;'
var ss=''

if(!avatar.func && at && at.sp && at.sp[3]){
	avatar.func = 'avatarPl'
	avatar.arg = at.sp[3]
	}

if(avatar.noborder)
	ss +=';border:0;outline:0'

if(avatar.none)
	ss +=';display:none'

if(lite&1)
	ss = '<img src="'+avatar+'" id="posteravatar'+i+'" class="avatar '+((lite&1)?'avatar_small':'')+'" style="'+ss+'" '
else if(lite&2)
	ss = '<img src="'+avatar+'" id="posteravatar'+i+'" class="avatar" style="'+ss+'" '
else
	return ''

ss += avatar.func ? ('onload="commonui.posterInfo[\''+avatar.func+'\'](this,'+lite+',\''+(avatar.arg?avatar.arg:'')+'\')"') : ''
ss += window.__APPEMBED ? (' data-uid="'+uid+'" onclick="commonui.posterInfo.avatarClick(this)" '):''
ss += '/>'
return ss
},//fe



avatarClick:function(o){
if((o.dataset.uid+'').match(/^\d+$/) && (o.dataset.uid|0))
	__doAction.appDoSync('userInfo', {uid:(o.dataset.uid|0)})
},



avatarAwaken:function(o,lite){
if(!o.style.transition){
	var li = (lite&1)?1:0,c = o.getBoundingClientRect(),a='color:#fff;display:inline-block;font-size:15px;text-shadow:0 0 3px #000;opacity:0.85',
	b='width:100%;height:100%;background:url('+o.src+') no-repeat 50% 0;background-size:auto 100%;transition:opacity 2s;opacity:1'
	d = _$('/div','class','avatar'+(li?' avatar_small':''),'style','border:0;outline:0;display:inline-block;width:'+c.width+'px;height:'+c.height+'px;text-align:left','_i',0,'_swapsrc',function(){
		var s=this
		s.childNodes[s._i].style.opacity = 0
		s._i=(s._i+1)&1
		s.childNodes[s._i].firstChild.style.transform='translate('+(Math.random()*o.width*0.3)+'px, '+(Math.random()*(o.height-24))+'px)'
		s.childNodes[s._i].style.opacity = 1
		setTimeout(function(){s._swapsrc()},2000+((Math.random()*5000)|0))
		}
		,_$('/div','style',b,_$('/div','style',a+(li?';display:none':''))._.add('天苍苍兮雨寂寂'))
		,_$('/div','style',b.replace('a_awak1','a_awak2')+';margin-top:-'+o.height+'px;opacity:0',_$('/div','style',a+(li?';display:none':''))._.add('天昏昏兮山暝暝'))
		)
	o.parentNode.replaceChild(d,o)
	d._swapsrc()
	}
},//






//==============================================
//头像特效 对应commonui.selectUserPortrait

//圆圈
avatarCir:function(o,li,u){
if(li & 1)
	var x = requestAnimationFrame(function(){
		u = u.split(',')//url,width,margin
		var r = o.getClientRects()[0],m = commonui.getStyle(o,'margin')
		,w = r.width
		,h = r.height
		,mwh = w/u[1]*u[2] + 1
		,ww=w+mwh*2
		,hh=h+mwh*2
		var d = _$('/div','style','width:'+ww+'px;height:'+hh+'px;margin:'+m+';float:left')
		o.parentNode.replaceChild(d,o)
		d._.add(o)
		_$(o).$0('style','margin:'+(mwh)+'px;display:;float:none;border:0;outline:0')
		d._.add(_$('/img','src',__COMMONRES_PATH+u[0],'style','width:'+ww+'px;height:'+hh+'px;margin-left:-'+ww+'px'))
		cancelAnimationFrame(x)
		})
o.style.display=''
},//

//挂件
avatarPl:function(o,li,u){
var x = requestAnimationFrame(function(){
	o.parentNode.insertBefore( 
		_$('/img','src',__IMG_STYLE+'/'+u,'style','vertical-align:bottom;display:none ','onload',function(){
			this.style.marginLeft=this.style.marginRight=(this.width/2*-1)+"px";
			this.style.display=''
			})
		,o.nextSibling)
	cancelAnimationFrame(x)
	})
o.style.display=''

},//

avatarOldtv:function(o,li){
if(li&1)
	return o.style.display=''
if(!this.avatarOldtvLo){
	try{eval("`foo`")}
	catch(e){return this.avatarOldtvLo = 'notsupport'}
	var q=[o]
	this.avatarOldtvQ=q
	return __SCRIPTS.asyncLoad(__COMMONRES_PATH+'/js_avatarOldtv.js?1', function(){
		for(var i=0;i<q.length;i++)
			commonui.posterInfo.avatarOldtv(q[i])
		})
	}
if(typeof this.avatarOldtvLo=='array')
	this.avatarOldtvLo.push(o)
},//


avatarFireb:function(o,li){
if((li&1)==0)
	var x = requestAnimationFrame(function(){
		var w = (o.width+2)/92*112, h = (o.height+2)/92*112 , bw = w*(10/112), bh=h*(10/112)
		o.parentNode.insertBefore( _$('/img','src',__IMG_STYLE+'/avatarbdfireb.webp','style','width:'+w+'px;height:'+h+'px;margin:0 0 -'+(h - parseInt(commonui.getStyle(o,'margin-bottom')))+'px -'+w+'px;position:relative;left:'+bw+'px;top:-'+(h-bh)+'px')
			,o.nextSibling)
		cancelAnimationFrame(x)
		})
o.style.display=''

},//

avatarTof:function(o,li){
if((li&1)==0)
	var x = requestAnimationFrame(function(){
		var w = (o.width+2)/960*1080, h = (o.height+2)/960*1080 , bw = w*(60/1080), bh=h*(60/1080)
		o.parentNode.insertBefore( _$('/img','src',__IMG_STYLE+'/avatarbdtof21.png','style','width:'+w+'px;height:'+h+'px;margin:0 0 -'+(h - parseInt(commonui.getStyle(o,'margin-bottom')))+'px -'+w+'px;position:relative;left:'+bw+'px;top:-'+(h-bh)+'px')
			,o.nextSibling)
		cancelAnimationFrame(x)
		})
o.style.display=''

},//


avatarBorderDefault:function(o,bm,s){//imgurl, {w:.., h:.., t:.., r:.., b:.., l:..}
var ra = o.height / (s.h-s.t-s.b)
for(var k in s)
	s[k] *=ra
s.w = s.l+s.r+o.width
var w1 = (s.w/2)|0
,w2 = s.w-w1
bm = 'width:'+w1+'px;height:'+s.h+'px;display:inline-block;background-image:url('+bm+');background-size:auto 100%'
o.style.marginTop=s.t+'px'
o.style.marginBottom=s.b+'px'
o.parentNode.insertBefore( _$('/div','style','width:'+s.w+'px;height:'+s.h+'px;position:relative;left:0px;top:0px;display:block;margin:0px auto -'+s.h+'px auto;top:-'+s.h+'px')._.add(
	_$('/div','style',bm)
	,_$('/div','style',bm+';width:'+w2+'px;background-position:top right')
	)
	,o.nextSibling)
},//

avatarSpr:function(o,li){
if((li&1)==0)
	var f=this.avatarBorderDefault, x = requestAnimationFrame(function(){
		f(o, __IMG_STYLE+'/avatarbdspr21.png', {w:843, h:795, t:53, r:65, b:16, l:65})
		cancelAnimationFrame(x)
		})
o.style.display=''
},//

avatar202203ff14 : function(o,li){
if((li&1)==0)
	var f=this.avatarBorderDefault, x = requestAnimationFrame(function(){
		f(o, __IMG_STYLE+'/avatar202203ff14.png', {w:600, h:438, t:22, r:33, b:33, l:19})
		cancelAnimationFrame(x)
		})
o.style.display=''
},//


avatarBlockrain:function(o){
	
var x = _$('/canvas')
if(!x.getContext)return
x.width = (o.width*1.25)|0
x.height = (o.height*1.25)|0
x.className = o.className
x.id = o.id
var c = x.getContext('2d') ,
bwmax = 12,
blmax = x.width-bwmax,
sx = (o.width*0.125)|0,
sy = (o.height*0.125)|0,
p=[],ne = function(){
var y= [
	(Math.random()*blmax)|0, //left
	0,//top
	(Math.random()*bwmax/2+bwmax/2)|0,//width
	0,//height
	0//alpha 
	]
y[3]=y[2]*2
y[1]=x.height-y[3]
return y
}, f=function(){
if(p.length<6 && Math.random()<0.05)
	p.push( ne() )
if(p.length){
	c.clearRect(0,0,x.width,x.height)
	//c.filter='none'
	c.drawImage(o,sx,sy)
	}
for(var i=0;i<p.length;i++){
	var q = p[i]
	c.strokeStyle = 'rgba(237,234,247,'+(q[4]+0.2)+')'
	c.lineWidth = 1
	c.strokeRect(q[0], q[1], q[2], q[3])
	//c.clearRect(q[0]+1, q[1]+1, q[2]-2, q[3]-2)
	c.fillStyle = 'rgba(156,134,222,'+q[4]+')'
	c.fillRect(q[0]+1, q[1]+1, q[2]-2, q[3]-2)
	if(q[1]>20){
		if(q[4]<0.5)
			q[4]+=0.025
		}
	else{
		if(q[4]>0)
			q[4]-=0.025
		}
	q[1] -= 2
	if(q[1]<0)
		p[i] = ne()
	}
setTimeout(function(){requestAnimationFrame(f)},25)
}
c.globalCompositeOperation = 'overlay'
c.drawImage(o,sx,sy)
o.parentNode.replaceChild(x,o)
document.body.appendChild(o)
requestAnimationFrame(f)
},//fe

testavatar1:function(o){
var x = _$('/canvas')
x.width = o.width
x.height = o.height
x.style.marginLeft = '-'+x.width+'px'
x.style.marginTop = '0.25em'
x.style.marginBottom = '0.25em'
var c = x.getContext('2d') ,p=[],l =function(x1,y1,x2,y2,displace){
if (displace < 2)//curDetail = 2
	p.push(x1,y1,x2,y2)
else {
	var mid_x = (x2+x1)/2;
	var mid_y = (y2+y1)/2;
	mid_x += (Math.random()-.5)*displace;
	mid_y += (Math.random()-.5)*displace;
	l(x1,y1,mid_x,mid_y,displace/2);
	l(x2,y2,mid_x,mid_y,displace/2);
  }
}, f=function(){
if(p.length){
	p = []
	c.clearRect(0,0,x.width,x.height)
	}
else{
	c.beginPath()
	l( (Math.random()*x.width)|0, 0, (Math.random()*x.width)|0, x.height, 75)
	for(var i=0;i<p.length;i+=4){
		c.moveTo(p[i],p[i+1]);
		c.lineTo(p[i+2],p[i+3]);
		}	
	c.stroke();
	}
setTimeout(function(){requestAnimationFrame(f)},150)
}
c.lineWidth = 2
c.strokeStyle = '#ffffff'
c.shadowColor = '#ffffff'
c.shadowBlur = 10
o.parentNode.insertBefore(x,o.nextSibling)
requestAnimationFrame(f)
},//fe


////////////avatar end


















honor:function(h,lite){
if(!h)
	return ''
if (h.substr(0,1)==' '){
	h = h.split(' ');
	h[1] = parseInt(h[1]);
	if(h[1] && h[1]>this.w.__NOW)
		h= h[2]
	else if(h[3])
		h=  h[3]
	else
		return ''
	}
if(lite&1)
	return "<span class='userval' name='honor'>"+h+"</span>"
return "<div class='userval' name='honor'>"+h+"</div>"
},//fe

levelIcon:function(lesser,rvrc){
//return this.__IMG_STYLE+'/uinfobg1.png?1'
/*
var x = this.__IMG_STYLE+'/level/'
if(lesser)
	return x+'sikle_bg.gif'
else if(rvrc>=0)
	return x+'nga_bg.gif'
else
	return x+'skeleton_bg.gif'
	*/
},//fe

floor:function(i,pid,lite,ubit){
if(!i)
	i = '0'
if(lite & 32){
	if(!this.dot3)
		this.dot3 = __TXT.svg('dot3narw','height:1.3em;margin:1em 0 1.2em 1em').outerHTML
	return "<span class='right'>"+(
		((window.__GP._bit & 2048) || window.__APPEMBED) ? "<a name=' "+i+"' href='javascript:void(0)' style='display:inline-block;color:"+__COLOR.gbg7+";margin-right:0.5em' class='postbtmb' onclick='commonui.postBtn.aiPostUi(event,commonui.postBtn.argCache[this.name|0])'>"+__TXT.svg('aithink','height:1.6em;vertical-align:-0.15em;margin:1em 0.5em 1.2em 0.75em').outerHTML+"</a>" : ''
		)+"<a name='l"+i+"' href='javascript:void(0)' style='display:inline-block;color:"+__COLOR.gbg7+"' class='postbtmb' onclick='commonui.triggerEvent($(\"allBtnSwll"+i+"\"),\"click\")'>"+this.dot3+"</a></span>"
	}
return "<span class='right'>&nbsp;<a name='l"+i+"' href='"+this.c.genPidLink(pid,i)+"' class='small_colored_text_btn stxt block_txt_c0 vertmod' style='background-color:"+__COLOR.postUiElm_ll+"'>#"+i+"</a></span>"
},//fe

uid:function(uid){
if(this.sb&16)
	return '';
return " <a href='javascript:void(0)' name='uid'  class='small_colored_text_btn stxt block_txt_c0 vertmod' style='background:"+__COLOR.gbg4+"' >"+uid+"</a>" //+ ((this.sb&16) && (uid+'').length>6 ? " title='"+uid+"' onclick='this.innerHTML=this.title'>…"+(uid+'').substr(-4)+"</a>" : ">"+uid+"</a>")
},//fe

level:function(lite,level,rvrc,fid,uid,active,gid,mod//见setDefaults
	,customLevel){
var d = {}

//if(le=this.mI(gid,mod))
	//le = (le[1] ? '<a href="javascript:void(0)" onclick="alert(this.title)" class="block_txt block_txt_c0" title="'+le[1]+'" style="background-color:#'+le[3]+'">'+level+'</a>' : level)+(le[4] ? ' <a href="javascript:void(0)" onclick="alert(this.title)" class="block_txt block_txt_c0" title="'+le[5]+'" style="background-color:#'+le[6]+'">'+le[4]+'</a>' : '')

var cRv=0, y,z, l, r =this.uI.reputations
for(var k in r){//使用版面的第一个声望的值
	//if(k==fid){
		cRv=r[k][uid];
		if(!cRv)cRv=0;
		if(cRv>21000)
			cRv = 21000
		if(cRv<-21000)
			cRv = -21000
		break
	//	}
	}




if(cRv){//如果有声望
	y = cRv>9999 ? 'numeric' :'numericl'

	if(level.length>3){
		if(level.charAt(0)=='警')
			level = level.replace('等级','')
		}


	if(customLevel){//如果有自定义声望等级 p1声望等级 p2声望值 p3威望值+等级
		if(!customLevel.offset){
			for (var i=0,j=customLevel.length;i<j;i++){
				if (customLevel[i].r>=0){
					if(customLevel[i].r==0)
						j=i
					else
						j=i-1
					break
					}
				}
			customLevel.offset = j>=0?j:0
			}

		for (var i=0,j=0;i<customLevel.length;i++){
			if (cRv>=customLevel[i].r)
				j=i
			else
				break
			}

		z = customLevel[j].n
		l = j-customLevel.offset
		if(lite&1){
			d.p1 ="声望: <span class='userval' title='"+cRv+' / lv'+l+"'>"+z+"</span>"
			d.p2 = "威望: <span class='userval' title='"+rvrc+"'>"+level+"</span>"
			}
		else{
			d.p1 ="级别: <span class='userval'>"+z+"</span>"
			d.p2 ="声望: <span class='userval "+y+"'>"+cRv+(cRv ? '(lv'+l+')' : '')+"</span>"
			if(level.length>3)
				d.p3 = "级别: <span class='userval' title='威望 "+rvrc+"'>"+level+"</span>"
			else
				d.p3 = "威望: <span class='numericl userval'>"+rvrc+"</span><span class='userval'>("+level+")</span>"
			}
		}
	else{//p1声望值+等级 p2威望值+等级

		l = Math.floor((cRv|0)/1000)
		if(lite&1){
			d.p1 ="声望: <span class='userval "+y+"' title='"+cRv+"'>"+(cRv ? 'lv'+l : '0')+"</span>"
			d.p2 = "威望: <span class='userval' title='"+rvrc+"'>"+level+"</span>"
			}
		else{
			d.p1 ="声望: <span class='userval "+y+"'>"+cRv+(cRv ? "</span><span class='numericl userval'>(lv"+l+')' : '')+"</span>"
			if(level.length>3)
				d.p2 = "级别: <span class='userval' title='威望 "+rvrc+"'>"+level+"</span>"
			else
				d.p2 = "威望: <span class='numericl userval'>"+rvrc+"</span><span class='userval'>("+level+")</span>"
			}
		}
	}
else{
	//p1威望等级 p2威望值
	if(lite&1){
		if(!rvrc)
			d.p1 ="威望: <span class='userval'>"+rvrc+"</span>"
		else{
			d.p1 ="级别: <span class='userval'>"+level+"</span>"
			d.p2 = "威望: <span class='numericl userval'>"+rvrc+"</span>"
			}
		}
	else{
		d.p1 ="级别: <span class='userval'>"+level+"</span>"
		d.p2 = "威望: <span class='numericl userval'>"+rvrc+"</span>"
		}
	}

if((mod&10)==10){
	for(var k in d){
		if(d[k].match(/^(级别|威望)/)){
			d[k] = "级别: <span class='numericl userval' title='威望 "+rvrc+' '+level+" '>副版主</span>"
			break
			}
		}
	}
return d
},//fe

r:function(lite,uid){

var y,z,r_bar = {},r = this.uI.reputations
for(var k in r){
	var n = r[k][0], v = r[k][uid]
	if (v==0 || !v)
		continue;
	if (v>21000)
		v=21000
	if (v<-21000)
		v=-21000
	z = y = Math.abs(v/1000)
	y=Math.floor(y)
	if (z==y){
		y--;
		z=100;
		}
	else{
		z=(z-y)*100
		if (z<1)z=1
		}
	if((lite&1)==0)
		r_bar[k]="<div class='r_container' style='margin:2px 0 1px 0' title='"+n+' &emsp;'+v+"'><table cellspacing=1 class='"+(v>0 ?'blue':'red')+"' "+(y?"style='margin-bottom:-1px'":'')+"><tbody><td class='r_barc'><div style='width:"+z+"%' class=r_bar></div>"
	else{
		r_bar[k]="<span title='"+n+"'>声望: <span class='"+(v>9999 ? 'numeric' :'numericl')+"'>"+v+"</span></span>"
		continue
		}

	if(y){
		r_bar[k]+="<table style='width:100%' cellspacing=1 class='"+(v>0?'blue':'red')+"'><tbody><tr>"
		for (var i=0;i<y;i++)
			r_bar[k]+="<td class='dot'></td>"
		r_bar[k]+="</tr></tbody></table>"
		}

	r_bar[k]+="</div></td></tr></tbody></table>"
	}
return r_bar
},//fe

basic:function(postnum,regdate,lastlogin){
regdate = this.c.time2date(regdate,'Y-m-d H:i')
lastlogin = this.c.time2date(lastlogin,'Y-m-d H:i')
if(!this.w.__GP.admincheck)
	return "<span title=' 注册时间: "+regdate+" &#10; 最后登陆: "+lastlogin+" '>注册: <span class='numeric userval' name='regdate'>"+regdate.substr(2,8)+"</span></span>"
var tmp = postnum>9999 ? 'numeric': 'numericl'
return "<span title=' 注册时间: "+regdate+" &#10; 最后登陆: "+lastlogin+" '>发帖: <span class='"+tmp+" userval' name='postnum'>"+postnum+"</span></span>"
},//fe

money:function(money){
if(money<=0)
	return ''
return "财富: <span class='numericl userval' name='money' value='"+money+"'>"+this.c.calc_money(money)+"</span>";

},//fe

medal:function(medal){
if (!medal)
	return ''
var x = '', r = this.uI.medals, medal = medal.toString().split(',')
for (var k in medal){
	if(k=='length' || !medal[k] || !this.uI.medals[medal[k]])
		continue
	var m = this.uI.medals[medal[k]]
	x+=" <img class='medalimg' src='"+this.__IMGPATH+"/medal/"+m[0]+"' title='"+m[1]+":&#10;"+m[2]+"' "
	+(m[3]==396||m[3]==397 ? " onload='commonui.posterInfo.medalLoad(event,this,"+m[3]+")' " : '')
	+(m[3]==351||m[3]==386?" onclick='commonui.posterInfo.medalClick(event,this,"+m[3]+")' ":'')+" style='margin-bottom:-4px'/>"
	}
if(!x)
	return x
return "徽章:<span name='medal'>"+x+"</span>"
},//fe

medalLoad:function(e,o,id){
if(id==396||id==397){
	if(window.__INSECTOB){
		if(o.src.substr(o.src.length-8)!=".ani.gif")
			__INSECTOB.add(o,function(){
				setTimeout(function(){o.src=o.src+".ani.gif"},1000)				
				})

		}
	}
},//fe

medalClick:function(e,o,mid){
if(mid==351 ||mid==386 ){
	if(!window.ubbcode||!ubbcode.psBtn)
		return loader.script(__COMMONRES_PATH+'/js_upup.js?'+__SCRIPTS.rand, function(){commonui.posterInfo.medalClick(e,o,mid)})
	if(mid==351)
		ubbcode.medalClickP5(e)
	else if(mid==386)
		ubbcode.medalClickMoss(e,o)
	}
},//fe

active:function(uid,bit,muteTime,allbuffs,fid,tid,now,stid){
if(bit & (14680064|16777216)){
	var y= this.c.activeInfo(0,uid,bit)
	y[3] = y[3]+' '+y[4]
	return y
	}
else if(muteTime>this.__NOW)
	return ['orange','MUTED','禁言',"此用户在全局禁言状态 至"+this.c.time2date(muteTime,'Y-m-d H:i')]
else if(allbuffs){
	for(var i in allbuffs){
		if(i== 105 || i == 116 ||  i == 117 || i == 118){
			for(var j=0;j<allbuffs[i].length;j++){
				var b = allbuffs[i][j]
				if(b.end >= this.__NOW){
					if((b.bid == 105 || b.bid == 116) && b.v0==0)
						return ['orange','MUTED','禁言','此用户在全局禁言状态 详情查看用户信息']
					else
						return ['gray','MUTED','禁言','此用户在某区域内是禁言状态 详情查看用户信息']
					}
				}
			}
		}
	}
return ['','','','']
},//fe

name:function(i,active,authorname,authorid,buff,uuname,lite){

if(window.__GP && __GP.greater && uuname)
	authorname = decodeURIComponent(uuname.replace(/(.{2})/g,'%$1'))
if(this.c.htmlName)
	authorname = this.c.htmlName(authorname)
//else if(buff && buff[103])
//	authorname = this.c.anonyName(authorname,true);
var color = ((lite&1) && buff && buff[129] && buff[129].v0==2048 && buff[129].end >=__NOW) ? ('style="color:'+__COLOR.utxt4+'"') : ''


return "<a href='nuke.php?func=ucp&uid="+authorid+"' id='postauthor"+i+"' "+color+" class='userlink author "+(window.__APPEMBED?'ltxt':'b')+" nobr' "+(active[3]?"title='"+active[3]+"'":'')+" onclick='commonui.posterInfo.userClick(event,\""+authorid+"\")'>"+authorname+"</a>"+(active[1]?"<sup class='"+active[0]+" b en_font' onclick='alert(this.previousSibling.title)'>"+active[1]+'</sup>':'')
},//fe

site:function(authorid,site,fav){
var x = ''
if(site)
	x+="<span style='padding:0.1em 0'><a class='block_txt block_txt_c2' style='line-height:1.18em;color:none' href='/thread.php?fid=-"+authorid+"' name='site'>"+site+"</a></span> "

return x
}//fe


,userClick:function(e,authorid){

}//fe

}//ce



//============================
//投票========================
//投票显示=====================
commonui.vote = function(o,tid,x){
if(!x)
	return this.voteOld(o,tid)
var w=window,
TYPE_VOTE = 0,//投票类
TYPE_BET = 1,//投注类
TYPE_SCORE = 2,//评分类
TYPE_SCORE_VOTE = 3,//评分类的单条评分数据
TYPE_QACHART = 4,

small = __SETTING.bit & __SETTING.bits.size4
bW = small ? 5 : 10

x = __NUKE.scDe(x)
x.type |= 0
x.opt |= 0
x.max_select |= 0
x.min |= 0
x.max |= 0
x.end |= 0
if(x.done)
	x.done = ','+x.done.toString()+','

x.inputType = x.max_select>1 ? 'checkbox' : 'radio'


if(x.type==TYPE_VOTE)
	return commonui.voteDefault(o,tid,x)
else if( x.type==TYPE_BET)
	return commonui.voteBet(o,tid,x)
else if( x.type==TYPE_SCORE)
	return commonui.voteScore(o,tid,x)
else if(x.type==TYPE_SCORE_VOTE){
	o.innerHTML = "<div><h4 class='silver subtitle postbodysubtitle'>评分</h4>"+(function(x,y){
		var z=''
		for(var k in x){
			if(k|0){
				z+='<b>'+y[k]+'</b>:'+x[k]+' '
				}
			}
		return z
		})(x,this.postArg.def.topicVote)+"</div>"
	return 
	}
else if(x.type==TYPE_QACHART){
	o.innerHTML = "<div><h4 class='silver subtitle postbodysubtitle'>问答</h4>"+(function(x,y){
		var z='',i=0
		for(var k in x){
			if(k|0){
				z+='<span style="color:'+__COLOR.txt2+'">'+(++i)+': </span><b>'+y[k]+'</b><br/>'
				}
			}
		return z
		})(x,this.postArg.def.topicVote)+"</div>"
	return 
	}
}//fe

commonui.voteFormat = function(x){
var r = {'userSum':0//总人数
	,'voteSum':0//总票数
	,'scoSum':0//总投注
	}

for (var k in x){
	if(k|0){
		var y = x['_'+k].split(',')//单项人数, 单项投注量, 总人数(在第一条里)
		x[k]={'til':x[k], 'voteNum':y[0]|0, 'scoNum':y[1]|0}//标题, 单项票数, 单项投注量
		r.voteSum += y[0]|0
		if(y[2]>r.userSum)
			r.userSum = y[2]|0 //总人数
		if(y[1])
			r.scoSum+=y[1]|0
		}
	}
return r
}//

commonui.voteFormatGroup = function(x,tid){

var j=0, sums = {'cur':{
					'voteSum':0	//本组票数总和
					,'voteMost':0 //本组最高项的票数
					,'voteMul':0 //票数进度条长度倍率
					,'scoSum':0//积分/投注...
					,'group':j//groupid
					,'scoMost':0//...
					,'scoMul':0//...
					}
			, 'voteSum':0//所有组票数总和
			, 'scoSum':0//积分/投注...
			}

for (var k in x){
	if((k|0)==0)
		continue;
	if(x[k].til.substr(0,3)==='===' && tid>38056407){
		x[k].disable = 1
		sums.next = {
					'voteSum':0
					,'voteMost':0
					,'voteMul':0
					,'scoSum':0
					,'scoMost':0
					,'scoMul':0
					,'group':++j
					}
		sums.cur = sums.next
		delete sums.next
		sums[k] = sums.cur
		}
	else{
		sums.cur.voteSum+=x[k].voteNum
		if(x[k].voteNum>sums.cur.voteMost)
			sums.cur.voteMost = x[k].voteNum

		if(x[k].scoNum){
			sums.cur.scoSum+=x[k].scoNum
			if(x[k].scoNum>sums.cur.scoMost)
				sums.cur.scoMost = x[k].scoMost
			}

		sums[k] = sums.cur
		}
	}

delete sums.cur
for (var k in sums){
	if((k|0)==0)
		continue;
	if(!sums[k].voteMul){
		var mostrate = sums[k].voteMost / sums[k].voteSum
		sums[k].voteMul = (mostrate<0.75) ? (0.75/mostrate) : 1
		sums.voteSum+=sums[k].voteSum
		}
	if(!sums[k].scoMul){
		if(sums[k].scoSum){
			var mostrate = sums[k].scoMost / sums[k].scoSum
			sums[k].scoMul = (mostrate<0.75) ? (0.75/mostrate) : 1
			sums.scoSum+=sums[k].scoSum
			}
		else
			sums[k].scoMul = 1
		}
	}

return sums
}//

commonui.votePercentString = function(x,y,z,w){
if(!y)return '0%'
return (((x/y*1000)|0)/10 * (z?z:1))+'%'
}//

commonui.voteBasicInfoString = function(x){
var y= " 最多选择"+(x.max_select ? x.max_select : 1)+"项"
if(x.priv)
	y += " "+x.priv.replace(/r-?\d+_/,'需要达到')+'版面声望以上'

if(x.end)
	y+=" 结束时间 "+this.time2date(x.end,'Y-m-d H:i')

if(x.opt&1)
	y+=" 提交后可查看结果"

if(x.opt&2)
	y+=" 结束后可查看结果"
return y
}//

commonui.voteBar = function(num,sum,mul){
return "<div style='background:"+__COLOR.quote1bg+";border-radius:0.17em;width:100%'><div style='background:"+__COLOR.border0+";border-radius:0.17em;height:1em;width:"+this.votePercentString(num,sum,mul)+"'></div></div>";
}//



//默认投票显示
commonui.voteDefault = function(o,tid,x){
var w=window,id='vote'+Math.random()
,small = __SETTING.bit & __SETTING.bits.size4
,bW = small ? 5 : 10

var fost = this.voteFormat(x)

var sums = this.voteFormatGroup(x,tid)
fost.voteSum = sums.voteSum

this.vote['tid'+tid+'stat'] = sums


var name = '投票', atv=!x.end || w.__NOW<=x.end
, info = "", btn='', i=0,savg=0
, txt="<table id='"+id+"' class='voteBarTable' style='font-size:"+(small?'0.842em':'')+"'><tbody>"

for (var k in x){
	if((k|0)==0)
		continue;
	i++
	if(x[k].disable)
		txt += "<tr><td>&nbsp;</td></tr>";
	txt += "<tr><td>"+x[k].til+"</td>";
	if(atv && w.__CURRENT_UID){
		if(x[k].disable)
			txt += "<td></td>"
		else
			txt += "<td><input type='"+x.inputType+"' name='vote"+tid+"g"+sums[k].group+"' value='"+k+"'/></td>"
		}

	if(x[k].disable){
		txt += "<td><b>共"+sums[k].voteSum+"票</b></td><td></td><td></td>"
		}
	else{
		txt += "<td><b><nobr>"+x[k].voteNum+"票</nobr></b></td>"
		txt += "<td><nobr>"+this.votePercentString(x[k].voteNum,sums[k].voteSum)+"</nobr></td>"
		txt += "<td style='width:"+bW+"em'>"+this.voteBar(x[k].voteNum,sums[k].voteSum,sums[k].voteMul)+"</td>";
		}

	txt+='</tr>'
	}

txt += "</tbody></table> "

info += "共计"+fost.userSum+"人"+name

info += " 共计"+sums.voteSum+"票"

info +=commonui.voteBasicInfoString(x)

if (atv && w.__CURRENT_UID)
	btn += "<br/><button type='button' onclick='commonui.vote.submit(this.parentNode.parentNode,"+tid+","+x.type+","+x.max_select+","+x.min+","+x.max+","+x.end+")'>"+name+"</button> "

o.innerHTML = "<div><h4 class='silver subtitle postbodysubtitle'>"+name+"</h4>"+(i>16 ? '<div>'+info+'</div>' : '')+txt+'<div>'+info+btn+'</div></div>'


}//fe



commonui.voteScore = function(o,tid,x){
var w=window,id='vote'+Math.random()
,small = __SETTING.bit & __SETTING.bits.size4
,bW = small ? 5 : 10

var fost = this.voteFormat(x)

var sums = this.voteFormatGroup(x,tid)
fost.voteSum = sums.voteSum


var name = '评分', atv=!x.end || w.__NOW<=x.end


, txt="<table id='"+id+"' class='voteBarTable' style='font-size:"+(small?'0.842em':'')+"'><tbody>", info = "", btn='', i=0,savg=0

for (var k in x){
	if((k|0)==0)
		continue;
	i++
	txt += "<tr><td>"+x[k].til+"</td>";



	var scc = ((x[k].scoNum/x[k].voteNum*100)|0)/100

	txt += "<td><b>"+scc+"分</b></td><td style='width:"+bW+"em'>"+this.voteBar(scc,x.max,1)+"</td>"
	this.vote['votedata_vote'+i+'value']= scc
	savg+=scc

	txt+='</tr>'
	}
this.vote['votedata_voteavgvalue']= ((savg/i*10)|0)/10

txt += "</tbody></table> "

info += "共计"+fost.userSum+"人"+name+"评分("+x.min+"~"+x.max+")"

this.vote['votedata_usernum']=fost.userSum

info +=commonui.voteBasicInfoString(x)

if (atv && w.__CURRENT_UID)
	btn+="<br/>回复主题以提交你的评分 (快速回复不能评分)"

o.innerHTML = "<div><h4 class='silver subtitle postbodysubtitle'>"+name+"</h4>"+(i>16 ? '<div>'+info+'</div>' : '')+txt+'<div>'+info+btn+'</div></div>'

}//



commonui.voteBet = function(o,tid,x){

var w=window,id='vote'+Math.random()
,small = __SETTING.bit & __SETTING.bits.size4
,bW = small ? 5 : 10

var fost = this.voteFormat(x)

var sums = this.voteFormatGroup(x,tid)
fost.voteSum = sums.voteSum

this.vote['tid'+tid+'stat'] = sums

var name = '投注', atv=!x.end || w.__NOW<=x.end
, info = "", btn='', i=0,savg=0
, txt="<table id='"+id+"' class='voteBarTable' style='font-size:"+(small?'0.842em':'')+"'><tbody>"

for (var k in x){
	if((k|0)==0)
		continue;
	i++
	if(x[k].disable)
		txt += "<tr><td>&nbsp;</td></tr>";
	txt += "<tr><td>"+x[k].til+"</td>";
	if(atv && w.__CURRENT_UID)
		if(x[k].disable)
			txt += "<td></td>"
		else
			txt += "<td><input name='"+k+"' value='' title='在此填入投注数量' style='width:2em'/></td>"

	if(x.done){
		if(x.done.indexOf(','+k+',')!=-1)
			txt += "<td><b class='red'>胜出</b></td>"
		else
			txt += "<td></td>"
		}
	else{
		if(!atv && w.__GP.admincheck)
			txt += "<td><input type='checkbox' name='vote"+tid+"' value='"+k+"'/></td>"
		}

	if(x[k].disable){
		txt += "<td colspan=6><b>共"+sums[k].voteSum+"票 投注"+sums[k].scoSum+"铜币</b></td><td></td><td></td>"
		}
	else{
		txt += "<td><b><nobr>"+x[k].voteNum+"票</nobr></b></td>"
		txt += "<td><nobr>"+this.votePercentString(x[k].voteNum,sums[k].voteSum)+"</nobr></td>"
		txt += "<td style='width:"+bW+"em'>"+this.voteBar(x[k].voteNum,sums[k].voteSum,sums[k].voteMul)+"</td>";
	
			txt+=small ? "</tr><tr style='box-shadow:0 0.052em "+__COLOR.quote1bg+"'><td colspan=2>" : "<td>"
			txt += "<b><nobr>投注"+x[k].scoNum+"铜币</nobr></b></td>"
			txt += "<td><nobr>"+this.votePercentString(x[k].scoNum,sums[k].scoSum)+"</nobr></td>"
			txt += "<td style='width:"+bW+"em'>"+this.voteBar(x[k].scoNum,sums[k].scoSum,sums[k].scoMul)+"</td>";

		}
	txt+='</tr>'
	}

txt += "</tbody></table> "

info += " 共计"+fost.userSum+"人"+name

info += " 共计"+sums.voteSum+"票 投注"+sums.scoSum+"铜币";

info += " 投注<a href='javascript:void(0)' class='b' onclick='alert(\"10000铜币=100银币=1金币\")'>铜币</a> 最少"+x.min+" 最多"+x.max

info +=commonui.voteBasicInfoString(x)

if (atv && w.__CURRENT_UID)
	btn += "<br/><button type='button' onclick='commonui.vote.submit(this.parentNode.parentNode,"+tid+","+x.type+","+x.max_select+","+x.min+","+x.max+","+x.end+")'>"+name+"</button> "

if(!atv && w.__GP.admincheck && !x.done)
	btn += "<br/><button type='button' onclick='commonui.vote.submitSettle(this.parentNode.parentNode,"+tid+")'>结算</button> (勾选判定为\"赢 \"的选项)"

o.innerHTML = "<div><h4 class='silver subtitle postbodysubtitle'>"+name+"</h4>"+(i>16 ? '<div>'+info+'</div>' : '')+txt+'<div>'+info+btn+'</div></div>'
}//




//投票结算=====================
commonui.vote.submitSettle = function (o,tid){
if(!confirm("你选择了结算投票！是否继续"))
	return
if(!confirm("再确认一次 将要结算投票！你确认选了正确的胜出结果么！"))
	return
var x = o.getElementsByTagName("input"),y=[]
for (var i = 0;i<x.length;i++){
	if(x[i].checked){
		y.push(x[i].value)
		}
	}
if (y.length)
	__NUKE.doRequest({u:__API.voteSettle(tid,y.join(',')),
		f:function(x){
			var e=__NUKE.doRequestIfErr(x)
			if (e)
				alert(e)
			else
				alert(x.data[0])
			return true
			}
		})
}//fe
//投票提交=====================
commonui.vote.submit = function (o,tid,type,max_select,min,max,end){
var x = o.getElementsByTagName("input"),y=[],c=0
,stat = this['tid'+tid+'stat']
for(var i in stat){
	if(i|0)
		stat[i].myvote = 0
	}

for (var i = 0;i<x.length;i++){
	if(type==1){
		if(x[i].value){
			stat[x[i].name].myvote++
			if(stat[x[i].name].myvote>max_select)
				return alert('不能投注超过'+max_select+'项')
			var z = x[i].value|0
			if(z<min)
				return alert('超过最小值')
			if(z>max)
				return alert('超过最大值')
			y.push(x[i].name)
			y.push(x[i].value)
			}
		}
	else{
		if (x[i].checked){
			stat[x[i].value].myvote++
			if(stat[x[i].value].myvote>max_select)
				return alert('不能投票超过'+max_select+'项')
			y.push(x[i].value)
			}
		}

	}
if (y.length)
	__NUKE.doRequest({u:__API.vote(tid,y.join(',')),
		f:function(x){
			var y = __NUKE.doRequestIfErr(x)
			if(y)
				alert(y)
			else
				alert(x.data[0])
			return true
			}
		})
}//fe



//============================
//对贴道具=====================
commonui.atItems = {//参看 items/lib_at_item.php
id:function(i){return this[i]&32767},
info:function(i){
	var id = this.id(i)
	if(this._IF_HIDDEN(id))return
	if(this._INFO[id]){
		if(this._INFO[id].constructor==String)
			this._INFO[id] = this._INFO[id].split('\t')
		return this._INFO[id]
		}
	},
count:function(i){return this[i]>>15},
i:function(id){
	for(var j=0;j<this.length;j++)
		if((this[j]&32767)==id)return j
		else return false
	},
sp:null,//道具特效（如果有） [文字颜色 头像bg 头像框右下]
length:0,
_CO_RIOT:18,
_P:__IMG_STYLE+'/items',
_SP:{//特定id道具的特效
	18:"#bf4385\triotbg.png\t0 0 no-repeat\triotbr.png",
	//文字颜色/ 头像bg/  头像框右下/ 
	19:__COLOR.utxt8+"\txishanbg.png\t0 0 no-repeat\txishanbr.png",
	23:__COLOR.utxt8+"\ttidebg.png\t0 0 no-repeat\ttidebr.png\t1",
	24:__COLOR.utxt8+"\talliancebg.png\t0 0 no-repeat\t\t1",
	25:__COLOR.utxt8+"\thordebg.png\t0 0 no-repeat\t\t1",
	27:__COLOR.utxt9+"\tblizzconbg.png?9\t0 0 no-repeat\t\t1" 
	},
_INFO:{
	1:'坚硬法杖\t5_1.gif\t虽然没用~但是花钱买它可以证明我的诚意~',
	2:'锥形巨剑\t5_2.gif\t虽然也没用~但是花钱买它可以证明我的诚意~',
	10:'便当\t5_10.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	11:'查水表\t5_11.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	12:'肥皂\t5_12.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	13:'给跪\t5_13.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	14:'求交往\t5_14.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	15:'张嘴吃药\t5_15.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	16:'祝福\t5_16.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	17:'祖传DNA\t5_17.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	18:'RIOT\t5_18.png\t来自RIOT公司的发言~',
	19:'西山居\t5_19.png\t来自西山居公司的发言~',
	20:'红包\t5_20.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	21:'高亮主题\t5_21.png\t在主题列表中显示主题发布者的头像 需40威望以上 只能对自己发布的主题使用',
	23:'浪\t5_23.png\t帖子使用不同的样式,加以特殊效果',
	24:'联盟\t5_24.png\t帖子使用不同的样式,加以特殊效果',
	25:'部落\t5_25.png\t帖子使用不同的样式,加以特殊效果',
	26:'播放视频/JS沙盒\t5_26.png?2\t允许贴子中嵌入视频播放/JS沙盒',
	28:'嵌入JS\t5_28.png?2\t允许贴子中嵌入JS 编辑内容会失效'
	},
_IF_HIDDEN:function(id){if(id==18||id==19)return 1},//在推荐道具里不显
_CREATE:function(a){//id,count,id,count,id,count...
	var b=function(){},c,s=this
	b.prototype=this
	b = new b
	
	commonui.uniEach(a, function(k,v){
		b[b.length++]=(v<<15)|(k&32767)
		if(s._SP[k&32767])
			c=1
		}, typeof a=='string'?1:2)

	if(c){
		for(var c in this._SP){
			for(var i=0;i<b.length;i++){
				if((b[i]&32767)==c){
					if(this._SP[c].constructor == String)
						this._SP[c] = this._SP[c].split("\t")
					b.sp = this._SP[c]
					break
					}
					
				}
			}
		}
	for(var i=0;i<b.length;i++){
		var a=null
		for(var j=0;j<b.length;j++){
			if(b[j]<b[j+1]){
				a = b[j]
				b[j] =  b[j+1]
				b[j+1] = a
				}
			}
		if(!a)
			break
		}
	return b
	}
}//fe
//============================
//帖子操作按钮lite=============
/*
commonui.postBtnLite = function(e,opt,argid){
var a = commonui.postArg.data[argid], $=_$
if(opt&1){
	var x = $('/span'
		,__CURRENT_UID == a.pAid ? $('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
			if(window.__APPEMBED)
				window.__API['do']('7?contentEdit#',{tid:a.tid,pid:a.pid})
			else
				commonui.openPostWindow(e,postfunc.__MODIFY,'',a.tid,a.pid)
			})._.add('编辑',$('/br'),'编辑') : null
		,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
			if(window.__APPEMBED)
				window.__API['do']('8?contentReport#',{tid:a.tid,pid:a.pid})
			else
				commonui.logPost(e,a.tid,a.pid)
			})._.add('举报',$('/br'),'举报')
		,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
			if(window.__APPEMBED)
				window.__API['do']('6?tieTiao#',{tid:a.tid,pid:a.pid})
			else
				commonui.comment(e,a.tid,a.pid)
			})._.add('贴条',$('/br'),'贴条')
		)
	}
if(x)
	commonui.liteWindow(e,null,x)
}//
*/

//============================

commonui.postBtn={//#帖子操作按钮
parent:commonui,
saveKey:'postBtnHis',
d:{

4:{u:'/read.php?pid={pid}&to',n1:'主题',n2:'跳转至主题内阅读此贴',c:'red',
	ck:function(a){if (a.pid && window.location.href.indexOf('pid=')!=-1)return 1} },

5:{n1:'举报',n2:'举报此贴至版主',n3:'举报',on:function(e,a){
	if(window.__APPEMBED && __SETTING.uA.clientVerMatch('>=0010.0001.0040') )
		window.__doAction.appDoSync('postReport',{tid:a.tid,pid:a.pid,fid:a.fid|0,stid:a.stid|0})
	else
		commonui.logPost(e,a.tid,a.pid,a.fid,a.stid)
	},
	ck:function(a){if (a.__CURRENT_UID && ( a.__GP.rvrc>-50 || a.__GP.admincheck))return 1} },

6:{
	u:'/post.php?action=modify&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}',
	init:function(o,a){
		if(o._longClick)
			return
		o._longClick = 1
		o.className+=' noselectmenu'//禁止ios长按弹出
		commonui.stdBtnsLongClickInit(o
			,function(e,opt){
				console.log(opt)
				var c=0//默认走链接
				if(window.__APPEMBED){
					//if(opt&1)//长按
					//	c=2|8
					//else
						c=1|8
					}
				else{
					if(opt&2){//touch
						if(opt&1)//长按
							c=4|8
						else
							c=2|8
						}
					else{
						if(opt&1)
							c=2|8
						else
							c=0
						}
					}
				if(c&1)
					commonui.postBtn.appDoSync('modifyPost', {'tid':a.tid, 'pid':a.pid},3,e)
				else if(c&2)
					commonui.openPostWindow(e,postfunc.__MODIFY,'',a.tid,a.pid)
				else if(c&4)
					location.assign(o.href)
				if(c&8)
					return commonui.cancelEvent(e)
				}
			)
		},
	_useloadread:48,
	n1:'编辑',
	n3:'编辑',
	//n2:'长按新窗口编辑',
	c:'disable_tap_menu',
	ck:function(a){if (a.pAid==a.__CURRENT_UID || a.__GP.admincheck)return 1} },

7:{u:'/post.php?action=quote&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}', 
	init:function(o,a){
		if(o._longClick)
			return
		o._longClick = 1
		o.className+=' noselectmenu'
		commonui.stdBtnsLongClickInit(o
			,function(e,opt){
				var c=0
				if(window.__APPEMBED){
					//if(opt&1)
					//	c=2|8
					//else
						c=1|8
					}
				else{
					if(opt&2){
						if(opt&1)
							c=4|8
						else
							c=2|8
						}
					else{
						if(opt&1)
							c=2|8
						else
							c=0
						}
					}
				if(c&1)
					commonui.postBtn.appDoSync('newReply', {'fid':a.fid, 'tid':a.tid, 'pid':a.pid, 'opt':1},3,e)
				else if(c&2)
					commonui.openPostWindow(e,postfunc.__QUOTE,'',a.tid,a.pid)
				else if(c&4)
					location.assign(o.href)
				if(c&8)
					return commonui.cancelEvent(e)
				}
			)
		},
	_useloadread:48,
	c:'disable_tap_menu',
	n1:'引用',
	n3:'引用',
	//n2:'长按新窗口引用',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

8:{u:'/post.php?action=reply&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}',
	init:function(o,a){
		if(o._longClick)
			return
		o._longClick = 1
		o.className+=' noselectmenu'
		commonui.stdBtnsLongClickInit(o
			,function(e,opt){
				var c=0
				if(window.__APPEMBED){
					//if(opt&1)
					//	c=2|8
					//else
						c=1|8
					}
				else{
					if(opt&2){
						if(opt&1)
							c=4|8
						else
							c=2|8
						}
					else{
						if(opt&1)
							c=2|8
						else
							c=0
						}
					}
				console.log(opt,c)
				if(c&1)
					commonui.postBtn.appDoSync('newReply', {'fid':a.fid, 'tid':a.tid, 'pid':a.pid, 'opt':0},3,e)
				else if(c&2)
					commonui.openPostWindow(e,postfunc.__REPLY,'',a.tid,a.pid)
				else if(c&4)
					location.assign(o.href)
				if(c&8)
					return commonui.cancelEvent(e)
				}
			)
		},
	_useloadread:48,
	c:'disable_tap_menu',
	n1:'回复',
	n3:'回复',
	//n2:'长按新窗口回复',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

9:{n1:'评论',n3:'.评论.贴条',n2:'做一个简短的回复 / 贴纸条',on:function(e,a){
	if(window.__APPEMBED)
		commonui.postBtn.appDoSync('newReply', {'fid':a.fid, 'tid':a.tid, 'pid':a.pid, 'opt':2},3,e)
	else
		commonui.comment(e,a.tid,a.pid)
	},
	_useloadread:48,
	ck:function(a){if (a.__CURRENT_UID)return 1} },

10:{n1:'评分',on:function(e,a){adminui.addpoint(e,a.tid,a.pid,a.fid)},
	ck:function(a){if((a.__GP.admincheck&2) && (__GP._bit&131072)==0)return 1} },

11:{u:'/nuke.php?func=set_user_reputation&uid={pAid}&fid={fid}',n1:'声望',n2:'设置此人的声望',
	ck:function(a){if (a.__GP.admincheck&2 && a.fid<0)return 1} },

//12:{n1:'禁言',on:function(e,a){adminui.muteuser(e,a.pAid)},
//	ck:function(a){if (a.__GP['super'])return 1} },

13:{n1:'Nuke',on:function(e,a){adminui.nukeUi(e,a.pAid,a.tid,a.pid)},c:'ngared',
	ck:function(a){if (a.__GP.superlesser || (a.__GP.ubSecAct))return 1} },

14:{n1:'Nuke',n2:'禁言并扣减声望',n3:'Nuke',on:function(e,a){commonui.lessernuke(e,a.tid,a.pid,a.fid)},
	ck:function(a){if (a.__GP.admincheck && (__GP._bit&131072)==0)return 1} },

15:{n1:'签名',n2:'清除签名',n3:'清除签名',on:function(e,a){commonui.setSign(e,a.pAid,a.__GP.greater)},
	ck:function(a){if (a.__GP.greater)return 1} },

16:{n1:'头像',n2:'清除头像',n3:'清除头像',on:function(e,a){commonui.setAvatar(e,a.pAid,a.__GP.greater)},
	ck:function(a){if (a.__GP.greater)return 1} },

17: {
	n1: '属性', n2: '设置帖子属性', n3: '帖子属性', on: function (e, a) { commonui.setPost(e, a.tid, a.pid, a.fid) },
	ck: function (a) { if ((a.__GP.admincheck & 10) && a.pid && parseInt(a.pid, 10) && a.pid > 0) return 1 }
},

18:{n1:'翻译',n2:'以版主提供的术语表进行对照翻译',on:function(e,a,o){if(o._.gV('transed'))return;commonui.autoTranslate.main($('postcontent'+a.lou),a.fid);o._.sV('transed',1)},
	ck:function(a){if (window.__AUTO_TRANS_FID)return 1} },

19:{u:"/nuke.php?func=message#to={pAid}",n1:'短信',n2:'向作者发送短消息',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

20:{u:"/nuke.php?func=ucp&uid={pAid}",n1:'作者',n2:'查看作者资料',n3:'作者信息'
	,on:function(e,a){
		if(window.__APPEMBED)
			commonui.postBtn.appDoSync('userInfo', {'uid':a.pAid},3 , e)
		},
	_useloadread:48
	},

21:{u:"/thread.php?authorid={pAid}&fid={fid}",n1:'搜索&sup1;',n2:'搜索作者在本版面发布的主题',n3:'版内主题'
	,ck:function(a){if(!window.__APPEMBED)return 1}
	},

22:{u:"/thread.php?searchpost=1&authorid={pAid}&fid={fid}",n1:'搜索&sup2;',n2:'搜索作者在本版面发布的回复',n3:'版内回复','ck':function(a){if(!window.__APPEMBED)return 1}},

23:{u:"/read.php?tid={tid}&authorid={pAid}",n1:'搜索&sup3;',n2:'搜索作者在本主题内的回复',n3:'只看作者'
	,on:function(e,a){
		if(window.__APPEMBED){
			if(a.type & 262144)
				commonui.postBtn.appDoSync('readPost', {'tid':a.tid,'pid':a.pid,'opt':512},3,e)
			else
				commonui.postBtn.appDoSync('readPost', {'tid':a.tid,'authorid':a.pAid},3,e)
			}
		}
	,_useloadread:48
	,init:function(o,a){
		if(a.type & 262144)
			o.href = "/read.php?tid="+a.tid+"&pid="+a.pid+"&opt=512"
		}
	},

25:{u:location.protocol+"//service.weibo.com/share/share.php?appkey=3938048249&title=_TOPIC&url=_URL",target:'_blank',n1:"分享到微博"
	,on:function(e,a,o){o.href=commonui.postBtn.replaceUrl(o.href)}
	,ck:function(a){if(!window.__APPEMBED)return 1}
	},

26: { u: location.protocol +'//connect.qq.com/widget/shareqq/index.html?url=_URL&title=_TOPIC&source=NGA玩家社区&desc=&pics=&summary=', target: '_blank', n1: "分享到QQ"
	, on: function (e, a, o) { o.href = commonui.postBtn.replaceUrl(o.href) } 
	,ck:function(a){if(!window.__APPEMBED)return 1}
	},

28:{u:"javascript:scrollTo(0,0)",n1:function(){return [__TXT.svg('up',''),'\u200b']},n2:'回到页面顶端'},
/*
29:{n1:'<input type="checkbox" name="delatc[]" value="0"/>',n2:'选中回复',n3:'(<input type="checkbox" name="delatc[]" value="0"/>选中回复)',
	ck:function(a){if (__GP['admincheck'] && a.pid && parseInt(a.pid,10) && a.pid>0){
		this.n3=this.n3.replace(/value="\d+"/i,'value="'+a.pid+'"')
		this.n1=this.n1.replace(/value="\d+"/i,'value="'+a.pid+'"')
		return 1}}
	,on:function(e,a){this.value=a.pid},tag:'span'},
*/
30:{n2:'查看编辑记录',n3:'.编辑.记录',
	ck:function(a){if (a.pAid==a.__CURRENT_UID || (a.__GP.admincheck&2))return 1} 
	,'on':function(e,a){
		var z, $ = _$,c=commonui
		,u = function(tid,pid,pg,z){
				z.innerHTML=''
				__NUKE.doRequest({
				u:{u:__API._base,a:{'__lib':'edit_history','__act':'edit_history','__output':3,'tid':tid,'pid':pid,'page':pg}},
				f:function(x){
					var y= __NUKE.doRequestIfErr(x)
					if (y)
						return alert(y);
					y=x.data[0]
					z._.add('├─── ',$('/br'))
					for(var i in y){
						z._.add('├─ '+commonui.time2date(y[i][1])+' 编辑内容'
							,$('/br')
							,$('/a','style','color:'+__COLOR.gbg4,'href',"./read.php?tid="+(a.tid|0)+"&pid="+(a.pid|0)+"&view_edit_bakup="+y[i][0],'target','_blank','innerHTML','├─── 查看历记录')
							,$('/br')
							)
						}
					z._.add($('/a','class','b','href',"javascript:void(0)",'innerHTML','下一页','onclick',function(){u(tid,pid,pg+1,z)}))
					}
				})
			}
		c.createadminwindow()
		c.adminwindow._.addContent(null)
		c.adminwindow._.addTitle('编辑历史')
		c.adminwindow._.addContent(
			z = $('/span')
			)
		c.adminwindow._.show(e)
		u(a.tid|0, a.pid|0, 1, z)
		}
	},

/*31:{u:'/nuke.php?func=locktopic&edit_lock&tid={tid}&pid={pid}&lock=1',n2:'发帖时间超过时限禁止编辑',n3:'禁止编辑',
	ck:function(a){if (__GP['admincheck'])return 1} },*/

32:{n2:'设置为发帖时间超过时限可以编辑',n3:'.许可.编辑',on:function(e,a){commonui.setPost(e,a.tid,a.pid,a.fid)},
	ck:function(a){if (a.__GP.admincheck&2)return 1} },

33:{u:window.location.href+'&noBBCode',n2:'查看帖子的BBCode源码',n3:'源码',n1:'源码' },

34:{n1:'转发',n3:'转发',on:function(e,a,o){
	if(window.__APPEMBED)
		return commonui.postBtn.appDoSync('share'
			, {'url':'https://bbs.nga.cn/read.php?tid='+a.tid+'&pid='+a.pid, 'title':document.title, content:''}
			,3 , e)
	else{
		var x = commonui.postBtn.all
		commonui.postBtn.all={'分享':[24,25,26,27]}
		commonui.postBtn.allBtn(e,a)
		commonui.postBtn.all=x
		}
	} },

35:{n1:'收藏',n2:'收藏此贴或主题',n3:'收藏',on:function(e,a){commonui.favor(e,this,a.tid,a.pid)} },

36:{n1:'道具',n2:'对此贴使用道具',n3:'道具',on:function(e,a){
	if(window.__APPEMBED)
		return commonui.postBtn.appDoSync('itemUse', {'tid':a.tid, 'pid':a.pid, 'uid':a.pAid},3,e)
	commonui.atItemBuyUse(e,a.tid,a.pid)} ,ck:function(a){if (a.__CURRENT_UID)return 1}
	,_useloadread:48
	},

37:{n1:'道具2',n2:'对此贴使用道具',on:function(e,a){
	commonui.recommendPost(e,a.i,this)},ck:function(a){if (a.__CURRENT_UID)return 1}
	},

38:{n1:'推荐',n2:'推荐此贴至工作人员',on:function(e,a){commonui.logPostRecommend(e,a.tid,a.pid)},
	ck:function(a){if ( a.__GP.rvrc>=200 || a.__GP.admincheck)return 1} },

39:{n1:'备注',n2:'为用户添加备注',on:function(e,a){adminui.remarkUi(e,a.tid,a.pid)},
	ck:function(a){if ( a.__GP.lesser && a.__GP.admincheck)return 1} },

40:{},

41: {
	n1: '抽楼', n2: '锁定隐藏该回复', n3: '锁隐', on: function (e, a) {
		__NUKE.doRequest({
			u: __API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 1026, 0, 0, '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
			})
		},
	ck: function (a) { if ((a.__GP.admincheck & 10) && a.pid && parseInt(a.pid, 10) && a.pid > 0) return 1 }
	},

42: {
	n1: '解抽', n2: '解除锁定隐藏', n3: '.锁隐.解除', on: function (e, a) {
		__NUKE.doRequest({
			u: __API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 0, 1026, '', '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
			})
		},
	ck:function(a){if ((a.__GP.admincheck&2) && (a.pid|0))return 1} 
	},
43: {
	n1: '', n2: '审核记录', n3: '.审核.记录', on: function (e, a) {
		commonui.auditLog(e,a)
		},
	ck:function(a){if (a.__GP._bit & (8|4194304|2097152))return 1}
	},
44: {
	n1: '优先', n2: '优先审核', n3: '.优先.审核'
	, on: function (e, a) {
		__NUKE.doRequest({
			u:__API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 0, 512|67108864, '', '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
			})
		},
	ck:function(a){if(a.__GP._bit & (4|4194304|2097152))return 1} 
	},
45: {
	n1: '三连', n2: '删贴 塞六天 删附件', n3: '.三连. \u2699\uFE0F',
	ck:function(a){if (a.__GP._bit & 2097152)return 1},
	on: function (e, a, o) {
		var x = e.target
		if(x.className.indexOf('info')!=-1)
			return adminui.del3in1(a.tid, a.pid|0, a.fid , 1)
		if(o._ready){
			o._ready=0
			o.style.filter= 'grayscale()'
			}
		else{
			o._ready=1
			return o.style.filter= 'hue-rotate(-30deg)'
			}
		adminui.del3in1(a.tid, a.pid|0, a.fid)
		}
	}
,46:{u:"javascript:void(0)",n1:"分享"
	,on:function(e,a,o){
		if(window.__APPEMBED)
			return commonui.postBtn.appDoSync('share'
				, {'url':'https://bbs.nga.cn/read.php?tid='+a.tid+'&pid='+a.pid, 'title':document.title, content:''}
				,3 , e)
		else{
			var x = commonui.postBtn.all
			commonui.postBtn.all={'分享':[24,25,26,27]}
			commonui.postBtn.allBtn(e,a)
			commonui.postBtn.all=x
			}
		}
	,_useloadread:48
	//,ck:function(a){if(window.__APPEMBED)return 1}
	}
,47:{n1:"DEBUG"
	,on:function(e,a,o){
		commonui.alert(
			_$('/span')._.add(
				/*
				,window.__APPEMBED_DEBUG=_$('/textarea','style','width:18em;height:100em','value',commonui._debug.gen()+'\n','_log',function(v){this.value += v+"\n"})
				,_$('/textarea','style','width:18em;height:10em','placeholder','eval code')
				,_$('/button','innerHTML','EVAL','onclick',function(){
					var r = eval(this.previousSibling.value)
					this.previousSibling.previousSibling.value += r+"\n"
					})
				,*/
				
				_$('/button','innerHTML','LOAD SCRIPT','onclick',function(){
					var url = __API._base+'__lib=admin_code&__act=jseval&__output=3'
					, leg=''


					__NUKE.doRequest2(
						'f',function(d){
							console.looog = console.log
							console.log=function(){
								console.looog.apply(console,arguments)
								leg+=Array.from(arguments).join('\t,\t')+'\n'
								}
							
							try{
								var code = atob(d.data[0])
								var ff = new Function(code)
								ff.apply(window)
								}
							catch(e){
								console.log(e)
								}
							
							setTimeout(function(){
								console.log = console.looog
								delete console.looog
								__NUKE.doRequest2(
									'u',url
									,'result',btoa(leg)
									)
								},3000)
							}
						,'u',url
						,'get',1
						)
					})
				)
			)
		}
	,ck:function(a){if(window.__APPEMBED)return 1}
	}
,48:{n1:"支持"
	,n3:"支持"
	,on:function(e,a,o){
		commonui.postScoreAdd(o,a)
		}
	,init:function(o,a){
		o._good=1
		a.goodOO = o
		}
	}
,49:{n1:"反对"
	,n3:"反对"
	,on:function(e,a,o){
		commonui.postScoreAdd(o,a,1)
		}
	,init:function(o,a){
		o._good=2
		a.badOO = o
		}
	}
,50:{n1:"0"
	,on:function(e,a,o){
		if(o.firstChild.title)
			alert(o.firstChild.title)
		}
	,init:function(o,a){
		o.innerHTML=''
		o._.add(_$(a.recommendO2).$0('style','color:'+__COLOR.gbg7+';font-weight:normal'))
		o._good=3
		}
	}
,51:{
	n1: '抽楼2', n2: '锁定隐藏该回复 记入审核日志', n3: '.锁隐. 审核', on: function (e, a) {
		__NUKE.doRequest({
			u: __API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 1026, 0, 2, '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
			})
		},
	ck: function (a) { if ((a.__GP.admincheck & 10) && (a.__GP.staff|a.__GP.audit) && a.pid && parseInt(a.pid, 10) && a.pid > 0) return 1 }
	}
,52: {
	n1: '属性', n2: '设置主题属性', n3: '主题属性', on: function (e, a) { commonui.setPost(e, a.tid, a.pid, a.fid) },
	ck: function (a) { if ((a.__GP.admincheck & 10) && (a.pid|0)==0 ) return 1 }
	}
,53: {
	n1: '删除', n2: '删除主题', n3: '删除主题', on: function (e, a) { adminui.movetopic(e,a.tid,a.fid,0,null) },
	ck: function (a) { if ((a.__GP.admincheck & 10) && (a.pid|0)==0 ) return 1 }
	}
,54:{
	n1: '记录', n2: '记录用户', n3: '记录用户', on: function (e, a) { __API.evalFromServer('__lib','nuke','__act','ulistui',[e,a.pAid]) },
	ck: function (a) { if (a.__GP.admin) return 1 }
	}
,55:{on:function(e, a){
		commonui.openPostWindow(e,postfunc.__REPLY,'',a.tid,a.pid)
		},
	n3:'.回复.web',
	ck:function(a){if (a.__CURRENT_UID && window.__APPEMBED)return 1} }
,56:{on:function(e, a){
		commonui.openPostWindow(e,postfunc.__MODIFY,'',a.tid,a.pid)
		},
	n3:'.编辑.web',
	ck:function(a){if ((a.pAid==a.__CURRENT_UID || a.__GP.admincheck) && window.__APPEMBED)return 1} }
,57:{on:function(e, a){
		commonui.postBtn.aiPostUi(e,a)
		},
	n3:'.AI.总结',
	ck:function(a){if(a.__GP._bit & 2048)return 1} }
,'more':{n1:'更多', n3: '更多', 'first':0
	, init:function(o,a){
		if(o._ari!==undefined)return
		o._ari = a.i
		o.className+=' noselectmenu'
		commonui.stdBtnsLongClickInit(o
			,function(e,opt){
				commonui.postBtn.allBtn(e, this._ari, null, (opt&1) ? 32768 : 0)
				commonui.cancelBubble(e)
				commonui.cancelEvent(e)
				}
			)
		}
	}
},

aiPostUi:function(e,a){
if((window.__GP._bit & 2048)==0){
	alert('需要付费会员权限以使用AI总结功能')
	if(window.__APPEMBED)
		__doAction.appDoSync('openLink', {'url':'nga://openType=19', 'opt':0 ,'_fromGlobal':1})
	return 
	}
if(commonui.aipi)commonui.aipi.postUi(e,a)
else loader.script('aipi',function(){commonui.aipi.postUi(e,a)} )
},

replaceUrl:function (u){
var e = encodeURIComponent;
return u.replace('_TOPIC',e(document.title)).replace('_URL',e(document.location.href)).replace(/_BBSURL/g,e(window.__BBSURL))
},

def:[28,6,7,8,34],
less:[35,23,36,34,5],
all:{
'帖子':[4,6,7,8,9,36,35,38,5,18,33,34,57],
'作者':[23,20,19,21,22,54],
'管理':[10,41,42,52,53,17,29,32,30,44,43,51,45],
'作者管理':[11,13,39,14,15,16],
'分享':[25,26,46]
},
autoBtncWidth:0,
realBtncWidth:0,
currentBtn:null,
btnCache:{},

appDoSync:function(act,arg,opt,e,o){

if(act=='newReply' || (act=='modifyPost'&&arg.pid)){
	var vo = commonui.currentVoteGetStat()
	if(vo)
		arg.vote = vo
	}

if(opt & 2)
	 __doAction.appDoSyncCancelEvent(act, arg, e )
else
	__doAction.appDoSync(act, arg)
if((opt & 1) && this.optionwindow)
	this.optionwindow._.hide()
},

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,//fe

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

inhis:commonui.buttonBase.inhis,

genB:commonui.buttonBase.genB,//fe

init:function(){
if(!this.argCache){
	this.argCache = commonui.postArg.data
	console.log('postbtn arg set')
	if(window.__APPEMBED){
		this.all['帖子'].push(55,56)
		if(__SETTING.appSetting.debug)
			this.all['帖子'].push(47)
		}
	return 1
	}
},
//大屏
load:function(argid){
this.init()
var arg = this.argCache[argid]

if(arg.pC && arg.pC.getBoundingClientRect && !arg.comment && window.__CURRENT_UID){//不是评论 并且登录状态
	var s = this
	_$(arg.pC).$0('ontouchstart',function(e){s.eventHandlerOver(e,this,arg)},'onmouseover',function(e){s.eventHandlerOver(e,this,arg)},'onmousewheel',function(e){s.eventHandlerOver(e,this,arg)},'onmouseout',function(e){s.eventHandlerOver(e,this,arg)})
	}
},
//小屏用这个
loadFix:function(argid){
if(this.init()){
	this.def=[6,8,36,48,50,49,46]
	this.his=[]
	this.d[6].n1=function(){return __TXT.svg('pen','',8)}
	this.d[7].n1=function(){return __TXT.svg('bubble_q','',8)}
	this.d[8].n1=function(){return __TXT.svg('bubble','',8)}
	this.d[34].n1=this.d[46].n1=function(){return __TXT.svg('share','',8)}
	this.d[48].n1=function(){return __TXT.svg('good','',8)}
	this.d[49].n1=function(){return __TXT.svg('bad','',8)}
	this.d[35].n1=function(){return __TXT.svg('star','',8)}
	this.d[23].n1=function(){return __TXT.svg('find','',8)}
	this.d[36].n1=function(){return __TXT.svg('gift','',8)}
	this.d[5].n1=function(){return __TXT.svg('bubble_a','',8)}

	this.d.more.n1=function(){return __TXT.svg('dot3narw','',8)}
	this.d.more.first=1
	}
var arg = this.argCache[argid], bb = this.fixGenB(this.genB(arg.i))
bb[0].id = 'allBtnSwll'+arg.i
arg.postFixBtnC._.add(bb)
	
},

fixSvg:function(o,h){
var c=o.getElementsByTagName('svg')
for(var i=0;i<c.length;i++)
	_$(c[i]).$0('style','height:'+(h?h:'1.3em')+';margin-top:-0.1em;margin-bottom:-0.1em')
},//

fixGenB : function(o){
this.fixSvg(o)
var aa = o.getElementsByTagName('a'),b = [],c=[],d=_$('/span','style','display:inline-block')
for(var i=0;i<aa.length;i++){
	var a = aa[i]
	a.$0('class',' cell rep b txtbtnx nobr block_txt_big postbtmb'+(a._longClick ? ' noselectmenu':''),'style','background-color:transparent;margin:0;border-left:0px solid;border-color:inherit;padding:0.625em 1.2em')

	if(a._good){
		if(a._good==1)
			a.$0('style','padding-right:0.75em')
		else if(a._good==2)
			a.$0('style','padding-left:0.75em')
		else if(a._good==3)
			a.$0('style','padding-left:0.5em;padding-right:0.5em')
		if(!c.length)
			b.push(d)
		c.push(a)
		}
	else
		b.push(a)
	}
if(c.length)
	d._.add(c)
return b
},


pos:__NUKE.position.get,

eventHandlerOver:function(e,o,arg){

if(arg.vsmall)
	return

if(e.type=='touchstart')
	e._touchstarttime = e.timeStamp
else if(e.type=='mouseover'){
	if(e.timeStamp && (e.timeStamp-e._touchstarttime)<500)//touch触发的mouse事件忽略
		return
	}

var oopt=0

if(e.type=='mouseout'){
	if(commonui.ifMouseOut(e,this)){
		if(o._postBtn)//if(this.currentBtn!=o._postBtn)
			o._postBtn.style.display='none'
		}
	return
	}

if(!o._postBtn){
	arg.postBtnC.appendChild(o._postBtn = this.genB(arg.i).$0('style','left:0px;top:0px;display:;visibility:hidden'))
	var tmp = (o._postBtn.getBoundingClientRect().width|0)+10
	if(tmp>this.realBtncWidth)
		this.realBtncWidth = tmp
	o._postBtn.$0('style','left:auto;top:auto;marginLeft:-'+(o._postBtn.offsetWidth)+'px;marginTop:-'+(o._postBtn.offsetHeight-1)+'px;display:none;visibility:visible')
	}

if(e.type=='touchstart'){
	if(o._postBtn.style.display=='')
		oopt |= 1
	if(this.currentBtn && this.currentBtn!=o._postBtn)
		oopt |= 4
	}
if(o._postBtn.style.display!='')
	oopt |= 2

var x = o.getBoundingClientRect(), y=this.pos(e)

if(!this.autoBtncWidth)
	this.autoBtncWidth = (x.right-x.left)/4

if(y.x<x.right-(this.realBtncWidth>this.autoBtncWidth?this.realBtncWidth:this.autoBtncWidth))
	oopt |= 1

if(oopt & 1)
	o._postBtn.style.display='none'
else if(oopt & 2)
	o._postBtn.style.display=''

if(oopt & 4)
	this.currentBtn.style.display='none'

this.currentBtn = o._postBtn
},//fe

eventHandlerOut:function(e){
if(!commonui.ifMouseOut(e,this))
	return
var argid = this._.gV('argid')
var b=commonui.postBtn.btnCache[argid]
if(b)b.style.display='none'
},//fe



floatBtn : function(e,arg,opt){

var $=_$,sl = this

,xx=this.floatBtn.tmp

if(xx && xx._argi && xx._argi==arg.i){

	}
else{
	xx = $('/span','class','group postrow halfmenu','style','display:block;border-top:none;text-align:center','_argi',arg.i)

	for(var i=0;i<this.less.length;i++){
		var tmp
		if(tmp = this.genA(arg,this.less[i],1)){
			tmc = Array.from(tmp.childNodes)
			xx._.add(tmp.$0('class','postbtmb','style','display:inline-block;margin:0.226rem;width:0.88rem'
							,$('/span','style','display:inline-block;width:0.88rem;height:0.88rem')._.add(tmc)
							)._.add(
								$('/br'),$('/span','style','font-size:0.2rem')._.add(this.d[this.less[i]].n3
								))
						)
			}
		}

	this.fixSvg(xx,'0.5rem') 

	xx._.add(
		$('/div','style','')._.add(
			$('/a','href','javascript:void(0)','class','postbtmb','style','font-size:0.2rem;margin:0.2rem auto','onclick',function(){
				commonui.postBtn.allBtn(e, arg, null, 32768)
				})._.add('更多操作')
			)
		)
	this.floatBtn.tmp=xx
	}

if(!this.optionwindow){
	this.optionwindow = commonui.createCommmonWindow((arg.lite & 32)? 16:0)
	this.optionwindow._btnCommonWindow = 1
	}
if(opt&65536)
	return

this.optionwindow._.css('display','none')
	._.addContent(null)
	._.addTitle('#'+arg.i)
	._.addContent(xx)
	._.show(e)
},

	
allBtn:function(e,argi,nohis,opt,lite){


var $=_$
,arg = typeof(argi)!='object' ? this.argCache[argi] : argi

if((arg.lite & 32) && this.all['帖子'] && (opt&32768)==0){//vsmall
	return this.floatBtn(e,arg,opt)
	}

if(opt&65536)return

var x = this.parent.buttonBase.allBtn.call(this, e, arg, 0, 1)
,s = location.protocol+'//'+location.host
,l= x.lastChild,v

while(l && l.className.indexOf('group')==-1)
	l=l.previousSibling

commonui.forEach(l.childNodes,function(o,i){
	if (o.innerHTML.substr(0, 3) == '分享到')
		o.innerHTML = o.innerHTML.substr(3)
	})

if(__GP.admincheck){
	var y = x.getElementsByTagName('a')
	for(var i=0;i<y.length;i++){
		v=y[i].firstChild.nodeValue
		if(v && v.charAt(0)=='.'){
			v=v.split('.')
			y[i].$0('innerHTML','')._.add(v[1],$('/div','className','info')._.add(v[2]))
			}
		}
	}
/*
if(opt & 65536){
	var y = l.cloneNode(), aa = commonui.postArg.data[arg.i]
	y.innerHTML = commonui.posterInfo.main(lite|3, aa.i, aa.fid, aa.tid, aa.pid, aa.cLength, aa.pAid, aa.type, aa.stid, 0, aa.postTime,'style','margin-left:1em;font-size:inherit;color:'+__COLOR.gbg2) 
	x.appendChild(y)
	}
*/
var y = $('/div','className','cell rep block_txt_big','style','background:none;padding-left:0;padding-right:0')


if(arg.tid){

	y._.add(
		$('/span','className',"url",'style','line-height:1.5em'
			,$('/span','className',"silver",'innerHTML','主题地址 ')
			,$('/input','className',"xtxt",'style','margin:0 0.1em;background:transparent;box-shadow:none;width:'+((__SETTING.bit&16) ? '11':'18')+'em;border:1px solid '+__COLOR.bg0,'value',s+'/read.php?tid='+arg.tid,'onfocus',function(){this.select()},'dir','rtl')
			)
		)
	}

if (arg.pid!='tpc' && arg.pid>0){
	y._.add(
		$('/br'),
		$('/span','className',"url",'style','line-height:1.5em'
			,$('/span','className',"silver",'innerHTML','回复地址 ')
			,$('/input','className',"xtxt",'style','margin:0 0.1em;background:transparent;box-shadow:none;width:'+((__SETTING.bit&16) ? '11':'18')+'em;border:1px solid '+__COLOR.bg0
				,'value',s+'/read.php?pid='+arg.pid+'&opt=128'
				,'onfocus',function(){this.select()},'dir','rtl')
			)
		)
	}
else if(arg.visit && arg.__GP.admincheck && arg.__GP.greater){
	y._.add(
		$('/br'),
		$('/span','className',"url",'style','line-height:1.5em'
			,$('/span','className',"silver xtxt",'innerHTML','访问量 ')
			,$('/span','className',"silver xtxt")._.add('本日'+arg.visit[0]+' 用户'+arg.visit[1]+' 第一页'+arg.visit[2])
			)
		)
	}

l._.add(y)

if((arg.tid || arg.pid) && commonui.QRCode && window.__UA && (__UA[2]==1 || __UA[2]==3) && !(__UA[0]==1 && __UA[1]<8)){
	l._.add(
		$('/span','style','margin:0.5em 0 0 0;text-align:right;display:inline-block;width:145px;height:145px;float:right',
			$('/img','src','about:blank', 
				'style','display:none', 
				'alt',s+'/?j='+
					(arg.tid ? 't'+arg.tid : '')+(arg.pid!='tpc' && arg.pid>0 ? 'p'+arg.pid : '')/*+(w.__CURRENT_UID ? 'h'+w.__CURRENT_UID : '')*/, 
				'onerror', function(){
					commonui.QRCode.loadDataUrl(this,this.alt,function(){this.style.display=''/*;this.nextSibling.style.marginTop=this.height+'px'*/},{ecclevel:'L',bg:'',margin:0,color:__COLOR.border0})
					}
				)
			)

		,$('/div','className','clear')
		)
	}

if(false){
	if(!this.optionwindow){
		this.optionwindow = commonui.createCommmonWindow()
		var b = this.optionwindow
		,a = b.getElementsByTagName('div')
		b.$0('style','background:none;box-shadow:none;border:none;max-width:initial')
		for(var i=0;i<a.length;i++)
			a[i]._.attr('style','background:none;border:none')
			
		b._.__t._.attr('style','background:rgba(40,40,40,0.5);border:none')
		b._.__t.firstChild._.attr('style','background:rgba(40,40,40,0.5);color:#eee')
		b.firstChild._.attr('style','transform: scale(1.1) perspective(30em) rotatey(-7deg);transform-origin: 100% 50% 0;')

		if(!this._styleFontHSun){
			this._styleFontHSun = 1
			__NUKE.addCss('@font-face {font-family: "SrcSunHeavy";\n\
src: url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.eot?1");\n\
src: url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.eot?#iefix") format("embedded-opentype"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.ttf?1") format("truetype"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.woff?1") format("woff"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.svg#SrcSunHeavy") format("svg");\n\
font-style: normal;\n\
font-weight: normal;}')
			}
		}

	//x.$0('style','font-size:1.457em')
	var y = x.getElementsByTagName('a'),z=1
	for(var i=0;i<y.length;i++){
		if(y[i].className.indexOf('cell')>-1)
			y[i].$0('style','box-shadow:0px 0px 0.75em -0.3em #444')
		if(y[i].className.indexOf('his')>-1){z=0
			y[i]._.attr('style','background:#00b3fd;color:#fff;font-family:SrcSunHeavy')}
		else
			y[i]._.attr('style','background:#fff;color:#444;font-family:SrcSunHeavy')
		if(y[i].className.indexOf('firstcell')>-1)
			y[i]._.attr('style','margin-left:'+Math.random()+'em')
		}

	if(z)
		for(var i=0;i<y.length;i++){
			if(y[i] && (y[i].innerHTML=='回复' || y[i].innerHTML=='只看作者'))
				y[i]._.attr('style','background:#00b3fd;color:#fff')
			}

	var y = x.getElementsByTagName('span')
	for(var i=0;i<y.length;i++)
		if(y[i].className.indexOf('url')>-1){
			y[i]._.attr('style','background:#fff;color:#444')
			y[i].lastChild._.attr('style','border:none;color:#444')
			}
		else if(y[i].className.indexOf('title')>-1)
			y[i]._.attr('style','float:left;margin-top:-1em;margin-bottom:-1em;height:auto;padding:0.2em;position:relative;outline:double 3px orangered;background:orangered;width:auto;color:#fff')

	this.optionwindow._.addContent(null)
	this.optionwindow._.addContent(x)
	this.optionwindow._.show(e)
	return 
	}

if(!this.optionwindow){
	this.optionwindow = commonui.createCommmonWindow((arg.lite & 32)? 16:0)
	this.optionwindow._btnCommonWindow = 1
	}

this.optionwindow._.css('display','none')
	._.addContent(null)
	._.addTitle('#'+arg.i)
	._.addContent(x)
	._.show(e)


},//fe

saveHis:commonui.buttonBase.saveHis,//

clearHis:commonui.buttonBase.clearHis,//

clearCache:commonui.buttonBase.clearCache,//
clearArgCache:function(){
	delete this.argCache
	this.argCache = null
	this.autoBtncWidth = this.realBtncWidth = 0
	this.currentBtn = null
	}//
}//ce



commonui.currentVoteGetStat = function(){
var x,vo
try{ 
	for(var k in commonui.postArg.data){
		x = commonui.postArg.data[k].topicVote
		break
		}
	}catch(e){console.log(e)}
	console.log(x)
if(x && x.type==2){
	vo = {
		'min':x.min,
		'max':x.max,
		'dimension':{}
		}
	for(var k in x){
		if((''+k).match(/^[0-9]+$/))
			vo.dimension[k]={
				'name':x[k],
				'stat':x['_'+k]
				}
		}
	}
return vo
}//



commonui.auditLog = function(e,a,tbl){
var tr ='ac 4审核中心pass2通过block2阻止wait2等待review2查看post2帖子ignore2忽略del2删除manual2人工auto2自动'
if(tbl===undefined)tbl=1
__NUKE.doRequest2(
	'f',function(d){
		if(d.data && d.data[0]){
			var x='',y=[]
			eval('x='+d.data[0])
			for(var i=0;i<x.length;i++){
				if(typeof x[i]=='number')
					continue
				else if(x[i].extra){
					if(x[i].fi=='AI')
						continue
					x[i].extra = x[i].extra.replace(/#W[a-z0-9]+|#V[a-z0-9]+|#P|#B|ac |pass|block|wait|review|manual|auto|:\d+/g,function(j){
						console.log(j)
						if(j.charAt(0)=='#'){
							if(j.charAt(1)=='W')
								return 'by UID'+parseInt(j.substr(2),36)
							else if(j.charAt(1)=='V')
								return '('+commonui.time2date(parseInt(j.substr(2),36))+')'
							else if(j=='#P')
								return '通过'
							else if(j=='#B')
								return '阻止'
							else
								return 'by UID'+j.substr(2)
							}
						else{
							var i = tr.indexOf(j)
							if(i>-1)
								return tr.substr(i+j.length+1,tr.charAt(i+j.length)|0)
							else
								return j
							}
						})
					}
				y.unshift(x[i])
				y.unshift(x[i-1] = '\n'+commonui.time2date(x[i-1]|0,'Y-m-d H:i:s'))
				}
			commonui.alert(
				_$('/pre')._.add(
					_$('/button','innerHTML','旧log','onclick',function(e){commonui.auditLog(e,a,0)})
					,_$('/button','innerHTML','新log','onclick',function(e){commonui.auditLog(e,a,1)})
					,_$('/br')
					,commonui._debug._d(y)
					)
				, null, 1)
			}
		}
	,'u',__API._base+'__lib=filter&__act=get_testlog&table='+(tbl|0)+
			(a.id0 ? ('&type='+(a.type|0)+'&id0='+(a.id0|0)+'&id1='+(a.id1|0)) : ('&tid='+(a.tid|0)+'&pid='+(a.pid|0)))
	,'__output',3
	)

}//

commonui.createTopicMeta = function(dscp){
if(!$('meta_dscp'))
	document.head.appendChild(_$('/meta','id','meta_dscp','property','og:description','content',dscp))
else
	$('meta_dscp').content = dscp
//'property','og:type','content','website'
//'property','og:title','content',til
//'property','og:image','content',imgurl
//'property','og:url','content',url
}//

//============================
//主题操作按钮=================
commonui.topicBtn={
parent:commonui,
saveKey:'topicBtnHis',
d:{
1:{n1:'标题',n2:'编辑标题颜色',n3:'标题颜色',
	on:function(e,a){adminui.colortopic(e,a.tid)},
	ck:function(a){if(a.admin&(2|8))return 1} },

2:{n1:'锁定',n2:'锁定/关闭主题 除版主外不能回复/阅读',n3:'锁定主题',
	on:function(e,a){commonui.setPost(e,a.tid,null,a.fid)},
	ck:function(a){if(a.admin)return 1} },

3:{n1:'移动',n2:'移动主题到其他版面',n3:'移动主题',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,0)},
	ck:function(a){if(a.admin)return 1} },

4:{n1:'镜像',n2:'在其他版面创建主题的镜像 在主题被回复时镜像也会更新',n3:'镜像主题',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,2)},
	ck:function(a){if(a.anyAdmin)return 1} },

5:{n1:'提前',n2:'将主题的回复时间修改为当前时间',n3:'提前主题',
	on:function(e,a){adminui.pushtopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

6:{n1:'计数',n2:'手动修复在回复被删除后主题的页数错误',n3:'重新统计回复',
	u:'nuke.php?func=recountreply&tid={tid}',
	target:'_blank',
	ck:function(a){if(a.admin)return 1} },

7:{n1:'置顶',n2:'将主题(的内容)显示在版面最上方 作为版面公告',n3:'置顶主题',
	on:function(e,a){adminui.toptopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

8:{n1:'精华',n2:'将主题设置为精华',n3:'精华主题',
	on:function(e,a){adminui.digesttopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

9:{n1:'删除',n2:'将主题移入回收站',n3:'删除主题',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,1)},
	ck:function(a){if(a.admin&2)return 1} },

10:{n1:'收藏',n2:'收藏主题',
	on:function(e,a){
		if(window.__APPEMBED)
			return commonui.topicBtn.appDoSync('favor', {'tid':a.tid, 'pid':0, 'opt':0},1)
		commonui.favor(e,this,a.tid)
		},
	_useloadread:48,
	ck:function(a){if(__CURRENT_UID)return 1} },

11:{n1:function(){return _$('/span','style','fontSize:1.23em')._.add((__SETTING.bit&16?'':'发表')+'回复')},
	//n2:'长按新窗口回复',
	c:'disable_tap_menu uitxt1',
	init:function(o,a){
		if(o._longClick)
			return
		o._longClick = 1
		o.className+=' noselectmenu'
		commonui.stdBtnsLongClickInit(o
			,function(e,opt){
				var c=0
				if(window.__APPEMBED){
					//if(opt&1)
					//	c=2|8
					//else
						c=1|8
					}
				else{
					if(opt&2){
						if(opt&1)
							c=4|8
						else
							c=2|8
						}
					else{
						if(opt&1)
							c=2|8
						else
							c=0
						}
					}
				if(c&1)
					commonui.topicBtn.appDoSync('newReply', {'fid':a.fid, 'tid':a.tid, 'pid':0, 'opt':0},1)
				else if(c&2)
					commonui.openPostWindow(e,postfunc.__REPLY_BLANK,'',a.tid)
				else if(c&4)
					location.assign(o.href)
				if(c&8)
					return commonui.cancelEvent(e)
				}
			)
		},
	_useloadread:48,
	u:'/post.php?action=reply&_newui&fid={fid}&tid={tid}',
	ck:function(a){if(__CURRENT_UID)return 1} },

12:{n1:'操作',n2:'更多主题操作功能',
	on:function(e,a){commonui.topicBtn.allBtn(e,a)},
	ck:function(a){if(a.anyAdmin || a.admin)return 1} },

13:{/*n1:'集合&sup1;',*/n2:'设置集合主题管理员',n3:'集合管理员',
	on:function(e,a){commonui.setTopicAdmin(this,a.tid)},
	ck:function(a){return 1} },

14:{/*n1:'集合&sup2;',*/n2:'设置集合主题黑名单',n3:'集合黑名单',
	on:function(e,a){commonui.setTopicBlock(this,a.tid)},
	ck:function(a){return 1} },
15:{n1:'APP阅读',n2:'使用论坛APP阅读此主题',n3:'APP阅读此贴',
	u:{replace:function(){
		var p='',q=0
		location.search.replace(/(uid|stid|fid|tid|page|pid)=(?:-?\d+)/g,function(m,k){
			if(k=='pid') q|=1
			else if(k=='tid') q|=2
			else if(k=='stid') q|=4
			else if(k=='fid') q|=8
			p+=m+'&'
			return m
			})
		if(q&1)p='5?'+p
		else if(q&2)p='2?'+p
		else if(q&4)p='3?'+p
		else if(q&8)p='1?'+p
		return  'nga://openType='+p
		}},
	c:'disable_tap_menu teal',
	on:function(e,a,o){
		var on = function(e,opt){
			if(opt&1)
				alert('请在右上菜单中选择 "在浏览器打开"')
			commonui.cancelBubble(e)
			commonui.cancelEvent(e)
			}
		if(__SETTING.uA[0]==7){//wechat
			if(__SETTING.uA[2]==4){//ios
				if(location.hostname!=='ngabbs.com')
					o.href = o.href.replace(/nga:\/\/openType=\d+\??/,location.protocol+'//ngabbs.com/read.php?')
				else
					on(e,1)
				}
			else
				on(e,1)
			}
		else if (__SETTING.uA[2]==2){//android
			var st = Date.now(), to = setTimeout(function () {
				if (!st || (Date.now() - st) < 800)
					 window.location.assign('//app.nga.cn/');
				}, 2000)
			commonui.aE(window,'blur',function() {if(to)clearTimeout(to)})
			}
		else if(__SETTING.uA[2]==6){//harm
			o.href = o.href.replace('nga://','nga://ngabbs.com/')
			}
		else if(__SETTING.uA[2]==4){//ios
			}
		else
			on(e)
		},
	//on:function(e,a){setTimeout(function(){location.assign('http://app.178.com/phone.html')},3000)},
	ck:function(a){if(window.__APPEMBED)return; if(__SETTING.uA[2]==4 || __SETTING.uA[2]==2|| __SETTING.uA[2]==6)return 1} },
16:{n1:'调查',n2:'当前主题内相关操作记录',n3:'调查操作',
	on:function(e,a){adminui.viewLog(0, 0, 0, a.tid)},
	ck:function(a){if(a.admin&2)return 1} },
17:{n1:'统计',n2:'主题近期统计',n3:'统计数据',
	on:function(e,a){adminui.forumStat(null,null,a.tid,commonui.time2date(__NOW,'Y-m-d'),10)},
	ck:function(a){if(a.admin&2)return 1} },
18:{n1:'PID',n2:'记录PID',n3:'记录PID',
	on:function(e,a){adminui.selectPid(0,0,2)},
	ck:function(a){if(a.admin)return 1}},
19:{n1:'',n2:'',
	on:function(){
		var x=commonui.postArg.data[0]
		alert('本日访问'+x.visit[0]+'次 其中用户'+x.visit[1]+'次 第一页'+x.visit[2]+'次')
		},
	n3:function(){
		return '访问'+commonui.postArg.data[0].visit[0]
		},
	ck:function(a){
		try{
			var x=commonui.postArg.data[0]
			if(x.i==0  && x.visit && a.admin && a.greater)
				return 1
			}
		catch(x){}
		}
	},

20:{n1:'支持'
	,on:function(e,a,o){
		if(!o.parentNode.firstChild || o.parentNode.firstChild.nodeName!=='SPAN'){
			o.style.backgroundColor = 'transparent'
			o.parentNode.insertBefore(_$('/span','className','urltip nobr','style','marginTop:-1.8em;color:'+__COLOR.txt2), o)
			}
		if(!a.rmdVal){
			try{
				var p = commonui.postArg
				if(p.def.tid==a.tid && p.data[0].pid==0)
					a.rmdVal = function(v){return commonui.postArg.data[0].rmdVal(v)}
				}catch(e){}
			}
		commonui.postScoreAdd(o,a)
		}
	}

,21:{n1:'测试'
	,on:function(e,a,o){
		__SCRIPTS.asyncLoad('https://img4.nga.178.com/app_res/debug/temp.js?'+Math.random(),function(){
			app_res_temp_rum()
			})
		}
	,ck:function(a){if(a.admin && __GP.staff)return 1} 
	}

},

appDoSync:function(act,arg,opt){
if(act=='newReply' || (act=='modifyPost'&&arg.pid)){
	var vo = commonui.currentVoteGetStat()
	if(vo)
		arg.vote = vo
	}
__doAction.appDoSync(act, arg)
if((opt & 1) && this.optionwindow)
	this.optionwindow._.hide()
},

replaceUrl:commonui.buttonBase.replaceUrl,

defEmbed:[11,12,20],
def:[11,12,10,15],
all:{'主题操作':[1,2,3,4,5,6,7,8,9,13,14,16,17,18,10,19,21]},

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

argCache:null,

init:function(){
if(this.argCache)
	return
var a = commonui.postArg.def
this.argCache = {
	fid:a.fid,
	tid:a.tid,
	admin:a.__GP.admincheck,
	anyAdmin:a.__GP.userBit & 4,
	pid:0,
	greater:a.__GP.greater
	}
console.log('topicbtn arg set')
if((this.argCache.admin || this.argCache.anyAdmin ) && !window.adminui)
	loader.script(__COMMONRES_PATH+'/js_admin.js')
if(__SETTING.bit & __SETTING.bits.floatPager){
	this.d[12].n1 = function(){return __TXT.svg('gear','height:1.23em;' ,4)}
	this.d[20].n1 = function(){return __TXT.svg('good','height:1.23em;' ,4)}
	//this.d[10].n1 = function(){return __TXT.svg('star','height:1.4em;vertical-align:-0.3em' ,4)}
	}
if(window.__APPEMBED){
	this.def = this.defEmbed
	}
},

load:function(o,fid,tid,admin){
this.init()
var i=0,l=this.def,xx=null, max= (__SETTING.bit & 8) ? 5 : 8,oo = commonui.stdBtns()

if(__SETTING.bit & 268435456){
	var pp = o.parentNode.parentNode
	if(pp && pp.id=='m_pbtnbtm'){
		var ls,sc=0,sd=0,bo=document.body,si=0,d58,d55
		,pss=pp.style, ppc=pp.firstElementChild, ppcb=ppc.firstElementChild
		,ppt=0,ppb=0,ppl=0,ppst=0
		if(window.ngaAds){
			if(ngaAds.bbs_ads55)d55=ngaAds.bbs_ads55
			if(ngaAds.bbs_ads58)d58=ngaAds.bbs_ads58
			}
		commonui.aE(window,'scroll',function(e){
			st = window.pageYOffset
			if (st > ls){
				sc=0
				sd++
				} 
			else {
				sd=0
				sc++
				}
			si = bo.scrollHeight-window.innerHeight
			ls = st < 0 ? 0 : (st>si ? si : st) ; // Mobile / negative scroll
			
			if(sc>3)
				pss.display=''
			if(sd>3)
				pss.display='none'
			
			if(pss.display===''){
				if(d55 || d58){
					if((ppst&3)==0){
						var y = pp.getBoundingClientRect()
						ppb = y.bottom+ppcb.getBoundingClientRect().height
						ppt = y.top
						ppl = y.left
						}

					if(d55){
						var x = d55.o.getBoundingClientRect()
						if(x.height){
							if(ppb>x.top && ppt<x.bottom){
								if((ppst&1)==0){
									var u = ppb-x.top,v=x.bottom-ppt,yf = __NUKE.position.get().yf
									pss.position ='absolute'
									//pss.left=ppl+'px'
									pss.bottom = 'auto'
									ppst|=1
									if(u<v)
										pss.top = (x.top+yf-(ppb-ppt))+'px'
									else
										pss.top = (x.bottom+yf)+'px'
									}
								}
							else if(ppst&1){
								pss.position=pss.bottom=pss.left=pss.top=''
								ppst&=~1
								}
							}
						}
						
					if(d58){
						var x = d58.o.getBoundingClientRect()
						if(x.height){
							if(ppb>x.top && ppt<x.bottom){
								if((ppst&2)==0){
									var u = ppb-x.top, yf = __NUKE.position.get().yf
									pss.position ='absolute'
									//pss.left=ppl+'px'
									pss.bottom = 'auto'
									pss.top = (x.top+yf-(ppb-ppt))+'px'
									ppst|=2
									}
								}
							else if(ppst&2){
								pss.position=pss.bottom=pss.left=pss.top=''
								ppst&=~2
								}
							}
						}
					}
				}
			})
		}


	l=this.defEmbed
	this.his=[]
	}
else{
	if(!this.his){
		this.his = commonui.userCache.get(this.saveKey);
		if(!this.his)this.his=[]
		}
	}

while(1){
	for (var k=0;k<l.length;k++){
		if(i++>=max)break
		if(xx=this.genA(this.argCache,l[k],1))
			oo._.__ins(xx)
		}
	if(l==this.his)break
	l=this.his
	}

if(window.__APPEMBED)
	oo.className+=' stdbtnStyle2'

o.innerHTML=''

if(!oo._.__length)
	return

o.appendChild(oo)
},//fe


allBtn : function(){
if(commonui.postArg && commonui.postArg.def && commonui.postArg.def.lite&32){
	this.optionwindow = commonui.createCommmonWindow(16)
	this.optionwindow._btnCommonWindow = 1
	}
return commonui.buttonBase.allBtn.apply(this, arguments)
},//

saveHis:function(id){if(id!=13 && id!=14)this.saveHis1(id)},//fe
saveHis1:commonui.buttonBase.saveHis,//fe

clearHis:commonui.buttonBase.clearHis,//fe
clearCache:commonui.buttonBase.clearCache,//fe
clearArgCache:function(){
	this.argCache = null
	}//
}//ce

/*
commonui.iDigi = function(t){
var h=29,x=0,y=0,z=_$('/div')._.cls('idigi'),k,u=z
for(var i=0;i<t.length;i++){
	k = t.charCodeAt(i)
	y = (k>=48 && k<=57) ? (k-48)*30 : 300
	u._.add(
		_$('/div')._.css('height',h+'px','background','url('+__IMG_STYLE+'/digi_gray.png) '+x+'px -'+y+'px no-repeat')
		)
	u=u.firstChild
	x += k==49 ? 22 : 26
	}
z._.css('width',x+'px')
return z
}//fe
*/


