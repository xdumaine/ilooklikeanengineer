MEME.MemeModel=Backbone.Model.extend({defaults:{backgroundPosition:{x:null,y:null},creditText:"Source:",creditSize:12,downloadName:"share",fontColor:"white",fontFamily:"Helvetica Neue",fontFamilyOpts:["Helvetica","Helvetica Neue","Comic Sans MS"],fontSize:24,fontSizeOpts:[14,24,36],headlineText:"Write your own headline",height:378,imageScale:1,imageSrc:"",overlayAlpha:.5,overlayColor:"#FF5B7A",overlayColorOpts:["#FF5B7A","#000"],paddingRatio:.05,textAlign:"left",textAlignOpts:["left","center","right"],textShadow:!0,textShadowEdit:!0,watermarkAlpha:.75,watermarkMaxWidthRatio:.25,watermarkSrc:"",watermarkOpts:[],width:755},initialize:function(){this.background=new Image,this.watermark=new Image,this.background.onload=this.watermark.onload=_.bind(function(){this.trigger("change")},this),this.get("imageSrc")&&(this.background.src=this.get("imageSrc")),this.get("watermarkSrc")&&this.setWatermarkSrc(this.get("watermarkSrc")),this.listenTo(this,"change:imageSrc",function(){this.background.src=this.get("imageSrc")}),this.listenTo(this,"change:watermarkSrc",function(){this.setWatermarkSrc(this.get("watermarkSrc"))})},hasBackground:function(){return this.background.width&&this.background.height},loadFileForImage:function(t,e){var a=new FileReader;a.onload=function(){e.src=a.result},a.readAsDataURL(t)},loadBackground:function(t){this.loadFileForImage(t,this.background)},loadWatermark:function(t){this.loadFileForImage(t,this.watermark)},setWatermarkSrc:function(t){var e=_.findWhere(this.get("watermarkOpts"),{value:t}),a=e&&e.data||t;0===a.indexOf("data:")?this.watermark.removeAttribute("crossorigin"):this.watermark.setAttribute("crossorigin","anonymous"),this.watermark.src=a,this.set("watermarkSrc",t)}});