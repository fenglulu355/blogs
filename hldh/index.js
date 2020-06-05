var arr1 = [
	"",
	"您的性别是？",
	"您的年龄是？",
	"TA在你心中的重要性占多少？",
	"你是否愿意为挽回这段感情做出改变？",
	"你们之间出了什么问题？",
	"离开他后是否会茫然失措，完全不知道该怎么去应对？",
	"在对方提出分开的时候，你是反复电话、微信、短信轰炸，还是冷处理？",
	"如果挽回他需要两个月甚至更久，你需要经历复联破冰、重建印象、欢喜升温等步骤，且过程充满坎坷煎熬，你会因为这些困难放弃挽回吗？",
	"你是否有跟身边亲朋好友诉苦，哭诉你遭受的委屈？",
	"你是否有完全控制不住自己，做出极端行为，自杀等倾向？",
	"微信、电话等联系方式是否有被拉黑？",
	"恭喜你，你的情况符合情感修复标准。你的意志坚定，且没有严重的原则性错误，只要有正确的引导和挽回方法，复合机会很大，你想立即挽回他吗？",
	"想挽救感情可以添加我的微信号联系我，按以下方式添加后描述你的情感问题，我会给你挽回的建议。"
];


var arr2 = ["分手挽回", "男", "18岁-30岁", "40%以下", "愿意", "吵架，不够信任", "是", "冷处理", "可能会", "是", "是", "是", "是", "是"];

var arr3 = ["挽救婚姻", "女", "30岁以上", "60%以上", "不愿意", "其他", "否", "电话/微信/短信轰炸", "这点困难算什么", "否", "否", "否", "否", "否"];

var arr4 = ['', "婚姻感情生活不幸福或者发现伴侣有外遇？", "最近伴侣提出离婚或者分开吗？", "发现有第三者出现，你选择的挽救感情方式是无休止地纠缠，还是忍气吞声？", "感情、金钱物质、伴侣性生活是否存在不和谐因素呢？", "努力经营过自己的感情吗？", "如果你经营感情的方式确实有问题，你是否愿意为了幸福做调整吗？", "感情生活不顺利，心里有过不去的坎吗？", "你是否有完全控制不住自己，做出极端行为，自杀等倾向？", "恭喜你，你的情况符合情感修复标准。你的意志坚决，且没有原则性错误，只要有正确的引导和挽回方法，感情生活幸福的机会很大！想拥有幸福的感情生活吗？", "想挽救感情可以添加我的微信号联系我，按以下方式添加后描述你的情感问题，我会给你挽回的建议。"];

var arr5 = ["分手挽回", "是", "已经提出", "无休止纠缠", "存在不和谐", "努力过", "愿意", "有", "有极端行为", "想拥有幸福"];

var arr6 = ["挽救婚姻", "否", "没有提出", "忍气吞声", "没有不和谐", "没有努力", "不愿意", "没有", "没有", "放弃拥有幸福"];


var sleep_start = false;
$(".start").click(function () {
	window.history.pushState('forward', null, '#here');
	$('.btn-window').css('height', '4.5rem')
	if (!sleep_start) {
		sleep_start = true;
		$(".content").append(" <div class=\"guke animated fadeInUp\">\n" +
			"<div class=\"bg2\">开始</div>\n" +
			" <div class=\"imgSize2-box0\"><img src=\"./img/qw.png\" class=\"imgSize2\" alt=\"\"></div></div>");
		$(".first").show();
		$(".secend").hide();
		$(".first .start").html("请稍后...");
		setTimeout(function () {
			$(".content").append("<div class=\"yisheng  animated fadeInUp\">\n" +
				" <div class=\"imgSize2-box\"><img src=\"img/2wq.png\" class=\"imgSize2\" alt=\"\"></div>" +
				" <div class=\"bg1\">您的情感问题是？</div>\n" +
				" </div>");
			var offset = window.pageYOffset;
			if (offset < 200) {
				offset = 1000;
			}
			window.scrollTo(0, offset + 160)
			$(".first").hide();
			$(".secend").show();
			$(".left").html("分手挽回");
			$(".right").html("挽救婚姻");
		}, 800);
	}

});

var testIndexDone = 13;

function answerShow(answer) {
	var index0 = $(".yisheng").length;
	$(".content").append(" <div class=\"guke animated fadeInUp\">\n" +
		"<div class=\"bg2\">" + answer + "</div>\n" +
		"<div class=\"imgSize2-box0\"><img src=\"./img/qw.png\" class=\"imgSize2\" alt=\"\"></div></div>");
	$(".first").show();
	$(".secend").hide();
	$(".first .start").html("请稍后...");
	setTimeout(function () {
		if (arr1[index0]) $(".content").append("<div class=\"yisheng  animated fadeInUp\">\n" +
			" <div class=\"imgSize2-box\"><img src=\"./img/2wq.png\" class=\"imgSize2\" alt=\"\"></div>" +
			" <div class=\"bg1\">" + arr1[index0] + "</div>\n" + " </div>");
		var offset = window.pageYOffset;
		if (offset < 200) {
			offset = 1000;
		}
		window.scrollTo(0, offset + 160)
		if (index0 === testIndexDone) {
			setTimeout(function () {
				$(".bottom-box").show();
			}, 1000);
			$(".secend").hide();
			$(".three").show();
			$("#here").removeClass("here");
			$(".first").hide();
		} else {
			$(".first").hide();
			$(".secend").show();
			console.log(index0);
			$(".left").html(arr2[index0]);
			$(".right").html(arr3[index0]);
		}
		sleep = false;
	}, 800);

}

var first = false;
var sleep = false;
$(".left").click(function () {
	if (!sleep) {
		sleep = true;
		var answer = $(this).html();
		answerShow(answer)
	}
	first = true;
});
$(".right").click(function () {
	if (!sleep) {
		sleep = true;
		var answer = $(this).html();
		answerShow(answer)
	}
	if (!first) {
		first = true;
		arr1 = arr4;
		arr2 = arr5;
		arr3 = arr6;
		testIndexDone = 10;
		$('.img101').attr('src', 'img/101_r.png');
	}
});

$(".copy1").on("click", function () {
	// window.zhad.push({
	// 	eventtype: 'js_wx_copy'
	// })
	// console.log(js_wx_copy);
	
	var clipboard2 = new ClipboardJS('.copy1', {});
	clipboard2.on('success', function (e) {
		$('.stoast .p11').html('复制微信号成功')
		$('.stoast .p22').html('点开微信右上角有个"+"的符号，选择"添加朋友"，然后粘贴即可')
		$('.stoast').fadeIn();
	});
	clipboard2.on('error', function (e) {
		$('.stoast .p11').html('复制微信号成功')
		$('.stoast .p22').html('点开微信右上角有个"+"的符号，选择"添加朋友"，然后粘贴即可')
		$('.stoast').fadeIn();
	});
})

$('#backBtn').click(function () {
	$('.stoast').fadeOut();
})

$('.click').click(function () {
	if ($(document).width() > 640) {
		$('.dia_wx').show();
	} else {
		$('.num-fixed').show();
		$('.wat-fixed').hide();
	}
});
$('.close').click(function () {
	if ($(document).width() > 640) {
		$('.dia_wx').hide();
	} else {
		$('.num-fixed').hide();
		$('.wat-fixed').show();
	}
});
$('.wat-fixed').click(function (event) {
	$('.num-fixed').show();
	$('.wat-fixed').hide();
});


var isC = false;
$(".copyBtn").on("click", function () {
	// window.zhad.push({
	// 	eventtype: 'js_wx_copy'
	// })
	var clipboard3 = new ClipboardJS('.copyBtn', {});
	clipboard3.on('success', function (e) {
		// logger.debug(e);
		if (!isC) {
			alert("复制成功！您打开微信->选择微信右上角的+号->选择添加朋友->长按粘贴即可添加")
			isC = true;
		}
	});
	clipboard3.on('error', function (e) {
		// logger.debug(e);
		if (!isC) {
			alert("复制成功！您打开微信->选择微信右上角的+号->选择添加朋友->长按粘贴即可添加")
			isC = true;
		}
	});
	isC = false;
})


$("#longTapBox2").on("click", function () {
	$(this).attr('data-clipboard-text', $('.wx_str').eq(0).html())
	var clipboard2 = new ClipboardJS('#longTapBox2', {});
	clipboard2.on('success', function (e) {});
	clipboard2.on('error', function (e) {});
})

$('#backBtn').click(function () {
	$('.stoast').hide();
})
$(function () {
	$("#mydel").click(function () {
		$(".backBg").hide()
	})
	if (window.history && window.history.pushState) {
		$(window).on('popstate', function () {
			var hashLocation = location.hash;
			var hashSplit = hashLocation.split("#!/");
			var hashName = hashSplit[1];
			if (hashName !== '') {
				var hash = window.location.hash;
				if (hash === '') {
					$(".backBg").show()
				}
			}
		});
		window.history.pushState('forward', null, '#gzwtsr');
	}
})