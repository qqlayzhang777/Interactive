window.onload = function () {
	docEvent.domFun()   //关闭按钮
	docEvent.dragFrame() //拖拽事件
	docEvent.changeState()  //在线状态
	docEvent.userVerify()  //邮箱验证
	docEvent.loginCli()  //点击登录
}
var docEvent = {
	// 关闭按钮
	domFun: function (){
		var father = document.getElementsByClassName('father')[0]
		var closes = father.getElementsByClassName('closeBtn')[0]
		closes.onclick = function () {
			father.style.display = 'none'
		};
	},
	// 拖拽事件
	dragFrame: function(){
		var father = document.getElementsByClassName('father')[0],
		moveArea = father.getElementsByClassName('moveArea')[0]
		moveArea.onmousedown = function (e) {
			var e = e || window.event
			var disX = e.clientX - father.offsetLeft,
			disY = e.clientY - father.offsetTop
			document.onmousemove = function (e) {
				// var e = e || window.event,
				var l = e.clientX - disX,
				t = e.clientY - disY
				var winW = document.documentElement.clientWidth || document.body.clientWidth,
				winH = document.documentElement.clientHeight || document.body.clientHeight,
				maxW = winW - father.offsetWidth - 10,
				maxH = winH - father.offsetHeight
				if(l < 0){
					l = 0
				}else if(l >= maxW){
					l = maxW
				}
				if(t < 0){
					t = 10
				}else if(t >= maxH){
					t = maxH
				}
				father.style.left = l + 190 + 'px'
				father.style.top = t + 130 + 'px'
			}
			document.onmouseup = function (){
				document.onmousemove = null
				document.onmouseup = null
			}
		}
	},
	// 在线状态
	changeState () {
		var father = document.getElementsByClassName('father')[0],
		stateLine = father.getElementsByClassName('stateLine')[0],
		chooseState = father.getElementsByClassName('chooseState')[0]
		stateLine.onclick = function (e) {
			var e = e || window.event
			// 冒泡事件
			if (e.stopPropagation) {
				e.stopPropagation()
			}else{
				e.cancelBubble = true
			}
			// 显示状态列表
			chooseState.style.display = 'block'
			if(chooseState.style.display == 'block'){
				document.onclick = function () {
					chooseState.style.display = 'none'
				}
			}
		}
		var stateLi = chooseState.getElementsByTagName('li')
		for(var i=0;i<stateLi.length;i++){
			// 单击切换状态
			stateLi[i].onclick = function (e) {
				var e = e || window.event
				if(e.stopPropagation){
					e.stopPropagation()
				}else{
					e.cancelBubble = true
				}
				chooseState.style.display = 'none'
				var nowIcon = stateLine.getElementsByClassName('nowIcon')[0],
				nowState = stateLine.getElementsByClassName('nowState')[0],
				span = this.getElementsByTagName('span')[0],
				spanText = this.getElementsByTagName('span')[1]
				var spanClassName = span.className.slice(span.className.indexOf(' ') + 1)
				nowIcon.className = 'nowIcon ' + spanClassName
				nowState.innerHTML = spanText.innerHTML
			}
		}		
	},
	// 账号密码验证
	userVerify () {
		var _this = this
		var userInput = document.getElementsByClassName("userInput")[0],
		temp = userInput.getElementsByClassName("userName")[0],
		tempPwd = userInput.getElementsByClassName("userPwd")[0],
		verify = userInput.getElementsByClassName("verify")[0],
		verify1 = userInput.getElementsByClassName("verify1")[0]
		     //获取填写的邮箱
		     //对邮箱的验证的正则 
		var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
		// 对QQ号验证的正则
		var qqNum = /^[1-9]\d{4,8}$/
		// 对手机号验证的正则
		var phoneNum = /^[1][3,4,5,7,8][0-9]{9}$/
		// 对密码的正则验证
		var passWord = /^[a-zA-Z0-9]{6,22}$/
		// 正则验证返回值
		var regular = function () {
			if(myreg.test(temp.value) == true || qqNum.test(temp.value) == true || phoneNum.test(temp.value) == true){
				return true
			}else{return false}
		}
		// 失去焦点进行验证
		temp.onblur = function(){
			// console.log(myreg.test(temp.value)+'/'+qqNum.test(temp.value)+'/'+phoneNum.test(temp.value))
		    if(temp.value.length > 0){        
		   		 //不为空就验证，如果为空就跳过验证
			     if(!regular()) {
			     		temp.focus()
			     		verify.style.display = 'block'  
			     		return false
			     }else{
			     		verify.style.display = 'none'
			     		return false
			     }
				}else{
					temp.value = 'QQ号码或Email帐号'
					verify.style.display = 'none'
				}
		}
		// enterInput的键盘事件
		document.onkeyup = function (e) {
			var e = e || window.event
			var code = e.charCode || e.keyCode
			if(code == 13){
				// 验证密码
				if(tempPwd.value.length > 0){
					if(passWord.test(tempPwd.value)){
						_this.loginClick()
						verify1.style.display = 'none'
					}else{
						verify1.style.display = 'block'
						tempPwd.focus()
					}
				}else{
					verify1.style.display = 'block'
				}
				// 验证账号
		    if(temp.value.length > 0){        
		   		 //不为空就验证，如果为空就跳过验证
			     if(!regular()) {
			     		temp.focus()
			     		verify.style.display = 'block'  
			     		return false
			     }else{
			     		verify.style.display = 'none'
			     		return false
			     }
				}else{
					temp.value = 'QQ号码或Email帐号'
					verify.style.display = 'none'
				}
			}
		}
	},
	// enter登录
	loginClick () {
		var login = document.getElementsByClassName('login')[0],
		spanL = login.getElementsByTagName('span')[0]
		login.onclick = function (e) {
			var e = e || window.event
			if(e.stopPropagation){
				e.stopPropagation()
			}else{
				e.cancelBubble = true
			}
			spanL.style.backgroundImage = "linear-gradient(to bottom left,#26539F,#26539F)"
		}
		return login.onclick()
	},
	// 点击登录
	loginCli () {
		var login = document.getElementsByClassName('login')[0],
		spanL = login.getElementsByTagName('span')[0]
		login.onclick = function (e) {
			var e = e || window.event
			var userInput = document.getElementsByClassName("userInput")[0],
			temp = userInput.getElementsByClassName("userName")[0],
			tempPwd = userInput.getElementsByClassName("userPwd")[0],
			verify = userInput.getElementsByClassName("verify")[0],
			verify1 = userInput.getElementsByClassName("verify1")[0]
			var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
			// 对QQ号验证的正则
			var qqNum = /^[1-9]\d{4,8}$/
			// 对手机号验证的正则
			var phoneNum = /^[1][3,4,5,7,8][0-9]{9}$/
			// 对密码的正则验证
			var passWord = /^[a-zA-Z0-9]{6,22}$/
			// 正则验证返回值
			var regular = function () {
				if(myreg.test(temp.value) == true || qqNum.test(temp.value) == true || phoneNum.test(temp.value) == true){
					return true
				}else{return false}
			}
			if(e.stopPropagation){
				e.stopPropagation()
			}else{
				e.cancelBubble = true
			}
			// 验证密码
			if(tempPwd.value.length > 0){
				if(passWord.test(tempPwd.value)){
					verify1.style.display = 'none'
				}else{
					verify1.style.display = 'block'
					tempPwd.focus()
					spanL.style.backgroundImage = "linear-gradient(to top,#6BA5FA,#316BCE)"
					return false
				}
			}else{
				verify1.style.display = 'block'
				spanL.style.backgroundImage = "linear-gradient(to top,#6BA5FA,#316BCE)"
				return false
			}
			// 验证账号
	    if(temp.value.length > 0){        
	   		 //不为空就验证，如果为空就跳过验证
		     if(!regular()) {
		     		temp.focus()
		     		verify.style.display = 'block'  
		     		return false
		     }else{
		     		verify.style.display = 'none'
		     }
			}else{
				temp.value = 'QQ号码或Email帐号'
				verify.style.display = 'none'
			}
			spanL.style.backgroundImage = "linear-gradient(to bottom left,#26539F,#26539F)"
		}
		// return login.onclick()
	}
}
