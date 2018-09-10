/* cssMagicVar v 0.1 copyright 2017 Aaron Flin (aaron at flin dot org) 
   MIT Licensed                                                            */
var cssMagicVar={
	observed:[]
}

cssMagicVar.unload = function(){
	var ob=cssMagicVar.observed;
	for (var i=0;i<ob.length;i++) {
		ob[i].observer.disconnect();
		delete ob[i].observer;
	}
}

cssMagicVar.reload=function(){
	cssMagicVar.unload();
	cssMagicVar.load();
}

cssMagicVar.load = function () {

	var roots=[],i=0;
	var ssl=document.styleSheets;
	var h=document.getElementsByTagName('html')[0];

	/* find root rules in any stylesheet */
	for (i=0;i<ssl.length;i++) {
		var ss=ssl[i], rules;
		try { 
		  rules=ss.cssRules 
		  for (var j=0;j<rules.length;j++) {
			var r=rules[j];
			if (r.selectorText ==':root')
				roots.push(r);
		  }
		} catch (err) { console.warn (ss.href+":\n"+err.message) }
	}
	//function to initally set and update on change our magicvars
	function watchstyle(el,prop,cssvar) {
		var v=el.style[prop];

		if (!v)
			v=getComputedStyle(el)[prop];

		//set the style to begin:
		h.style.setProperty(cssvar,v);
		if(!el.observer) {
			cssMagicVar.observed.push(el);
			el.observer = new MutationObserver(function(mutations) {
				for (var i=0;i<this.args.length;i++) {
					var p=this.args[i].prop, c=this.args[i].cssvar;
					v=el.style[p];
					if (!v)
						v=getComputedStyle(el)[p];
					h.style.setProperty(c,v);
				}
			});	
			el.observer.args=[{'prop':prop,'cssvar':cssvar}];
			el.observer.observe(el,{attributes: true,attributeFilter : ['style','class']});
		} else {
			el.observer.args.push({'prop':prop,'cssvar':cssvar});
		}
	}

	for (i=0;i<roots.length;i++){
		var	root=roots[i],
			magics=root.cssText.match(/--[^: ]+:\s*magic:[^;]+;/g);

		if (magics && magics.length) {
			for (var j=0;j<magics.length;j++) {
				var m=magics[j], sel=m.match(/(\-\-[^:\s]+)\s*:\s*magic\s*:\s*([^\(\s]+)\s*\(\s*([^\)\s+]+)\s*\)/);
				if (sel.length>3) {
					var 	el, 
						//matchtext=sel[0],
						cssvar=sel[1],
						id=sel[2],
						prop=sel[3],
						fc=id.substr(0,1);

						switch(fc) {
							case '#':
								el=document.getElementById(id.substr(1));break;
							case '.':
								el=document.getElementsByClassName(id.substr(1))[0];break;
							default:
								el=document.getElementsByTagName(id)[0];
						}
					
					
					
					if(el)
						watchstyle(el,prop,cssvar);
					else
						console.warn("cssMagicVar: couldn't find any elements using " + id + ' selector');
				}
			}
		}
	}
}

window.onload=cssMagicVar.load;
