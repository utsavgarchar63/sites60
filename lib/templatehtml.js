function templateslist() {
  return [
    {
      category: "artist",
      thumbnail:"/templateScreenshots/profile/profiletemp-1.png",
      templateName: "Artist Template",
      html: `<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profile Templet</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
<!-- Theme Styles = START= -->
<style>
	/*Page Fonts*/
	.poppins-thin{font-family:"Poppins",sans-serif;font-weight:100;font-style:normal}.poppins-extralight{font-family:"Poppins",sans-serif;font-weight:200;font-style:normal}.poppins-light{font-family:"Poppins",sans-serif;font-weight:300;font-style:normal}.poppins-regular{font-family:"Poppins",sans-serif;font-weight:400;font-style:normal}.poppins-medium{font-family:"Poppins",sans-serif;font-weight:500;font-style:normal}.poppins-semibold{font-family:"Poppins",sans-serif;font-weight:600;font-style:normal}.poppins-bold{font-family:"Poppins",sans-serif;font-weight:700;font-style:normal}.poppins-extrabold{font-family:"Poppins",sans-serif;font-weight:800;font-style:normal}.poppins-black{font-family:"Poppins",sans-serif;font-weight:900;font-style:normal}.poppins-thin-italic{font-family:"Poppins",sans-serif;font-weight:100;font-style:italic}.poppins-extralight-italic{font-family:"Poppins",sans-serif;font-weight:200;font-style:italic}.poppins-light-italic{font-family:"Poppins",sans-serif;font-weight:300;font-style:italic}.poppins-regular-italic{font-family:"Poppins",sans-serif;font-weight:400;font-style:italic}.poppins-medium-italic{font-family:"Poppins",sans-serif;font-weight:500;font-style:italic}.poppins-semibold-italic{font-family:"Poppins",sans-serif;font-weight:600;font-style:italic}.poppins-bold-italic{font-family:"Poppins",sans-serif;font-weight:700;font-style:italic}.poppins-extrabold-italic{font-family:"Poppins",sans-serif;font-weight:800;font-style:italic}.poppins-black-italic{font-family:"Poppins",sans-serif;font-weight:900;font-style:italic}
	
	/*Reset CSS*/
	html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;font-family: "Poppins", sans-serif;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}
	
	/*Layout Styles*/
	div[class*="col-"] {display: flex;justify-content: center;}
	.primary-color{color: #00ACFF;}.primary-bg{background: #00ACFF;}.default-color {color: #012A44;}
	.container {width: 90vw;margin: auto;}.row {display: flex;width: 100%;}.col-2 {width: 19.99%}.col-4 {width: 39.99%}.col-8 {width: 59.99%;}.col-12 {width: 99.99%;}
	.flex-directionCol {flex-direction: column;}.flex-directionRow {flex-direction: row;}
	.pill-button {display: flex;border-radius: 30px;background: #0FACFF;border: none;align-items: center;color: #ffffff;padding: 3px;min-width: 100px;}
	.pill-button img {margin-right: 5px;}.mega-title {font-size: 4.5em;font-weight: 600;margin: 10px 0;}.title {font-size: 2em;font-weight: 700;margin: 10px 0;}.text{font-size: 0.875em;margin: 10px 0;line-height: 1.5em;font-weight: 300;}.align-center {align-items: center;}.text-center {text-align: center;}.content-left {justify-content: flex-start !important;}label {color: #00ACFF;font-size: 1em;margin-bottom: 10px;}.field {width: 100%;}input {height: 45px;border: none;border-bottom: 1px solid #00ACFF;width: 100%;}textarea {min-height: 100px;border: none;border-bottom: 1px solid #00ACFF;width: 100%;}.border-top {border-top: 1px solid #00ACFF;}.outline-button {font-size: 1.2em;display: block;border: 1px solid #0FACFF;background: #ffffff;padding: 15px 30px;color: #0FACFF;}.relative {position: relative;overflow: hidden;}.relative * {position: relative;z-index: 3;}.image-bg{top:0;bottom:0;z-index:0!important;position:absolute!important;width:100%}
	@media only screen and (max-width: 600px) {
		.row {display: block;}
		div[class*="col-"] {width: 100%;margin: 20px 0;padding: 0 !important;}
	}

	/*Header Styles*/
	header {background-image: url(/images/templet-1/header-bg.png);background-size: 100%;background-position: top;color: #ffffff;}
	.logo {white-space: nowrap;font-size: 1em;font-weight: 800;}
	.tophead .container {display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding: 1em 0em;min-height: 30px;}
	.tophead.scrolled {position: fixed;width: 100%;box-sizing: border-box;background: #ffffff;color: #012A44;box-shadow: 0 2px 3px hsl(0deg 0% 0% / 20%);z-index: 9;}.tophead.scrolled ul.pageNav li a {color: #012A44;}
	.banner {display: flex;height: 100vh;flex-direction: column;justify-content: center;}
	.banner .sub-title {font-size: 2em;font-weight: 600;margin-top:20px;}
	ul.pageNav {display: flex;justify-content: flex-end;align-items: center;width: 100%;flex-wrap: nowrap;flex-direction: row;}
	ul.pageNav li {margin: 0 10px;}
	ul.pageNav li a {color: #ffffff;font-size: 18px;padding: 8px 20px;text-decoration: none;}ul.pageNav li a:hover {background-color: rgb(255 255 255 / 18%);border-radius: 30px;}ul.pageNav li a.active {color: #0FACFF;}

	
	/*Header Styles*/
	/* header {color: #ffffff;}
	.logo {white-space: nowrap;font-size: 1em;font-weight: 800;}
	.tophead .container {display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding: 1em 0em;min-height: 30px;}
	.tophead.scrolled {position: fixed;width: 100%;box-sizing: border-box;background: #ffffff;color: #012A44;box-shadow: 0 2px 3px hsl(0deg 0% 0% / 20%);z-index: 9;}.tophead.scrolled ul.pageNav li a {color: #012A44;}
	.banner {display: flex;height: 100vh;flex-direction: column;justify-content: center;}
	.banner .sub-title {font-size: 2em;font-weight: 600;margin-top:20px;}
	ul.pageNav {display: flex;justify-content: flex-end;align-items: center;width: 100%;flex-wrap: nowrap;flex-direction: row;}
	ul.pageNav li {margin: 0 10px;}
	ul.pageNav li a {color: #ffffff;font-size: 18px;padding: 8px 20px;text-decoration: none;}ul.pageNav li a:hover {background-color: rgb(255 255 255 / 18%);border-radius: 30px;}ul.pageNav li a.active {color: #0FACFF;} */

	/*Section Styles*/
	section {padding: 10em 0em;}
	
	/*About Section Styles*/
	.about .sub-title {margin-top: 20px;font-weight: 300;font-size: 1.6em;margin-top: 30px}
	.button-group {display: flex;margin-top: 30px}.button-group button {margin-right: 10px;}
	
	/*showreel Section Styles*/
	/* .showreel {color: #fff;}
	.showreel .video-container {display: flex;align-items: center;justify-content: center;height: 400px;}
	.showreel .video-container span img {width: 54px;}
	.showreel .col-8 {padding: 0 5em;} */

		/*showreel Section Styles*/
		.showreel {color: #fff;background-image: url("/images/templet-1/showreel.png");}
	.showreel .video-container {display: flex;align-items: center;justify-content: center;height: 400px;}
	.showreel .video-container span img {width: 54px;}
	.showreel .col-8 {padding: 0 5em;}
	
	/*Portfolio Section Styles*/
	.img-container {margin-top: 30px}
	.img-container img {width: 100%;}
	.space-bottom {margin-bottom: 60px;}.space-top {margin-top: 60px;}.space-left {margin-left: 60px;}.space-right {margin-right: 60px;}
	
	/*Recognitions Section Styles*/
	.recognitions,.appFoot {color: #ffffff;background: #012A44;}
	.recognitions .quote {width: 60px;}
	.quote-area {border-top: 1px solid #00ACFF;margin-top: 79px;padding-top:60px;align-items: flex-start;}
	.quote-area .text.large {font-size: 1.8em;font-weight: 200;}
	
	/*insta Section Styles*/
	.insta {color: #ffffff;}
	.insta-feed {background-color: #012A44;width: 80%;border-radius: 10px;margin: 10px;}.insta-feed > img {width: 100%;}
	.insta-feed h3 {padding: 1.5em 2em;display: flex;align-items: center;justify-content: space-between;font-size: 1.2em;}.insta-feed p {padding: 1.5em 2em;}
	
	/*Contact Section Styles*/
	.data .text {color: #012A44;font-size: 1.5em;}
	.details {padding-right: 5em;border-right: 1px solid #0FACFF;}form {padding-left: 5em;display: flex;flex-direction: column;flex-wrap: nowrap;justify-content: space-around;align-items: flex-start;height: 100%;}
	.details .data {padding: 3em 0; border-bottom: 1px solid #0FACFF;}.details .data:first-child {padding-top: 0;}.details .data:last-child {padding-bottom: 0;border-bottom: 0;}
	.subcribe form {padding: 0;}
	
	/*appFoot section styles*/
	.appFoot {padding: 2em 0em;}
	
</style>
<!-- Theme Styles = END= -->
	
</head>

<body>
	<!-- Page Header -->
    <!-- <header class="relative">
		<img class="image-bg" src="/images/templet-1/header-bg.png" alt="Select image"/>
		<div class="tophead">
			<div class="container">
				<span class="logo"><p>Site Name</p></span>
				<ul class="pageNav">
					<li class="navItem"><a class="nav-link active" href="#home">Home</a></li>
					<li class="navItem"><a class="nav-link" href="#about">About</a></li>
					<li class="navItem"><a class="nav-link" href="#portfolio">Portfolio</a></li>
					<li class="navItem"><a class="nav-link" href="#contact">Contact</a></li>
				</ul>
			</div>
		</div>
		<div class="banner" id="home">
			<div class="container">
				<h1 class="mega-title">Thomas McNott</h1>
				<p class="sub-title">Theater &amp; Film Actor</p>
			</div>
		</div>
	</header> -->

	<header>
		<div class="tophead">
			<div class="container">
				<span class="logo"><p>Site Name</p></span>
				<ul class="pageNav">
					<li class="navItem"><a class="nav-link active" href="#home">Home</a></li>
					<li class="navItem"><a class="nav-link" href="#about">About</a></li>
					<li class="navItem"><a class="nav-link" href="#portfolio">Portfolio</a></li>
					<li class="navItem"><a class="nav-link" href="#contact">Contact</a></li>
				</ul>
			</div>
		</div>
		<div class="banner" id="home">
			<div class="container">
				<h1 class="mega-title">Thomas McNott</h1>
				<p class="sub-title">Theater &amp; Film Actor</p>
			</div>
		</div>
	</header>
	
	<section id="about" class="about default-color">
		<div class="container">
			<div class="row">
				<div class="col-4 flex-directionCol">
					<h1 class="mega-title primary-color">12 Yrs Experience</h1>
					<p class="sub-title primary-color">In Film &amp; Theater</p>
				</div>
				<div class="col-8 flex-directionCol">
					<h2 class="title">About Me</h2>
					<p class="text">I am a passionate artist dedicated to capturing the beauty and emotion of the world through my work. My journey began with a fascination for the interplay of light and shadow, leading me to explore various mediums, including painting, digital art, and sculpture. Each piece I create reflects a unique blend of personal experiences and creative exploration, aiming to evoke a deep connection with viewers.</p>
					<div class="button-group">
						<button class="pill-button"><img src="/images/templet-1/fb.svg" alt="Select image"/> Facebook</button> <button class="pill-button"><img src="/images/templet-1/ins.svg" alt="Select image"/> Instagram</button> <button class="pill-button"><img src="/images/templet-1/you.svg" alt="Select image"/> Youtube</button>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<!-- <section id="showreel" class="showreel relative">
		<img class="image-bg" src="/images/templet-1/showreel.png" alt="Select image"/>
		<div class="container">
			<div class="row">
				<div class="col-4 flex-directionCol">
					<h1 class="mega-title">Showreel</h1>
					<p class="text">Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit.</p>
				</div>
				<div class="col-8 flex-directionCol">
					<div class="video-container relative">
						<img class="image-bg" src="/images/templet-1/video-thumb.png" alt="Select image"/>
						<span><img src="/images/templet-1/play-btn.svg" alt="Select image"/></span>
					</div>
				</div>
			</div>
		</div>
	</section> -->

	<section id="showreel" class="showreel">
		<div class="container">
			<div class="row">
				<div class="col-4 flex-directionCol">
					<h1 class="mega-title">Showreel</h1>
					<p class="text">Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit.</p>
				</div>
				<div class="col-8 flex-directionCol">
					<div class="video-container relative">
						<img class="image-bg" src="/images/templet-1/video-thumb.png" alt="Select image"/>
						<span><img src="/images/templet-1/play-btn.svg" alt="Select image"/></span>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section id="portfolio" class="portfolio primary-color">
		<div class="container">
			<div class="row">
				<div class="col-12 flex-directionCol">
					<h1 class="mega-title">Portfolio</h1>
				</div>
			</div>
		</div>
		<div class="row img-container">
			<div class="img space-bottom"><img src="/images/templet-1/img1.png" alt="Select image"/></div>
			<div class="img space-top"><img src="/images/templet-1/img2.png" alt="Select image"/></div>
			<div class="img space-bottom"><img src="/images/templet-1/img3.png" alt="Select image"/></div>
			<div class="img space-top"><img src="/images/templet-1/img4.png" alt="Select image"/></div>
			<div class="img space-bottom"><img src="/images/templet-1/img5.png" alt="Select image"/></div>
		</div>
	</section>
	
	<section id="recognitions" class="recognitions">
		<div class="container">
			<div class="row">
				<div class="col-12 flex-directionCol">
					<h1 class="mega-title">Recognitions / Awards</h1>
				</div>
			</div>
			<div class="row space-top">
				<div class="col-4 flex-directionCol">
					<img src="/images/templet-1/header-bg.png" alt="Select image"/>
				</div>
				<div class="col-8">
					<div class="row primary-color">
						<div class="col-4 align-center">
							<h1 class="title">129 <br/>Film Roles</h1>
						</div>
						<div class="col-4 align-center">
							<h1 class="title">23 <br/>Awards</h1>
						</div>
						<div class="col-4 align-center">
							<h1 class="title">35 <br/>Feature Films</h1>
						</div>
					</div>
				</div>
			</div>
			<div class="row quote-area">
				<div class="col-2">
					<img class="quote" src="/images/templet-1/quote-1.svg" alt="Select image"/>
				</div>
				<div class="col-8 flex-directionCol text-center">
					<p class="text large">Morbi in sem quis dui placerat ornare. Pellentesque odio nisi euismod in pharetra a ultricies in diam. Sed arcu. Cras consequat. Praesent dapibus neque id cursus faucibus tortor neque egestas auguae eu vulputate magna eros eu erat. Aliquam erat volutpat.</p>
					<p class="text primary-color">Herold Robinson</p>
					<p class="text primary-color">Times New Magazine</p>
				</div>
				<div class="col-2">
					<img class="quote" src="/images/templet-1/quote-2.svg" alt="Select image"/>
				</div>
			</div>
		</div>
	</section>
	
	<section id="insta" class="insta primary-bg">
		<div class="container">
			<div class="row">
				<div class="col-12 flex-directionCol">
					<h1 class="mega-title">Instagram Feed</h1>
				</div>
			</div>
			<div class="row space-top">
				<div class="col-4 content-left">
					<div class="insta-feed">
						<h3>Ragnor Lothbrok <img src="/images/templet-1/ins.svg" alt="Select image"/></h3>
						<img class="quote" src="/images/templet-1/insta1.png" alt="Select image"/>
						<p class="text">Gubergren, no sea takimata sanctu consetetur sadipscing elit.</p>
					</div>
				</div>
				<div class="col-4 content-left">
					<div class="insta-feed">
						<h3>Rick Ricker <img src="/images/templet-1/ins.svg" alt="Select image"/></h3>
						<img class="quote" src="/images/templet-1/insta2.png" alt="Select image"/>
						<p class="text">Gubergren, no sea takimata sanctu consetetur sadipscing elit.</p>
					</div>
				</div>
				<div class="col-4 content-left">
					<div class="insta-feed">
						<h3>Peter Parker <img src="/images/templet-1/ins.svg" alt="Select image"/></h3>
						<img class="quote" src="/images/templet-1/insta3.png" alt="Select image"/>
						<p class="text">Gubergren, no sea takimata sanctu consetetur sadipscing elit.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section id="contact" class="contact">
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol">
					<h1 class="mega-title primary-color">Contact Me</h1>
				</div>
			</div>
			<div class="row space-top space-bottom">
				<div class="col-4 flex-directionCol">
					<div class="details">
						<div class="data">
							<label class="label">Phone</label>
							<p class="text">+91 9876346543</p>
						</div>
						<div class="data">
							<label class="label">Address</label>
							<p class="text">8th Street, Santa Barbara, CA</p>
						</div>
						<div class="data">
							<label class="label">Email</label>
							<p class="text">mcknott@gmai.com</p>
						</div>
					</div>
				</div>
				<div class="col-8 flex-directionCol">
					<form>
						<div class="field">
							<label>Name</label>
							<div class="input">
								<input type="text" class="textbox" placeholder=""/>
							</div>
						</div>
						<div class="field">
							<label>Email</label>
							<div class="input">
								<input type="text" class="textbox" placeholder=""/>
							</div>
						</div>
						<div class="field">
							<label>Phone</label>
							<div class="input">
								<input type="text" class="textbox" placeholder=""/>
							</div>
						</div>
						<div class="field">
							<label>Message</label>
							<div class="input">
								<textarea type="text" class="textbox" placeholder=""></textarea>
							</div>
						</div>
						<button class="outline-button">Send</button>
					</form>
				</div>
			</div>
		</div>
		<div class="row space-top border-top">
			<div class="container">
				<div class="col-12 flex-directionCol space-bottom space-top">
					<h1 class="mega-title primary-color">Contact Me</h1>
				</div>
				<div class="col-12 flex-directionCol space-bottom space-top subcribe">
					<form class="flex-directionRow">
						<div class="field space-right">
							<label>Email</label>
							<div class="input">
								<input type="email" class="textbox" placeholder=""/>
							</div>
						</div>
						<button class="outline-button space-left">Send</button>
					</form>
				</div>
			</div>
		</div>
		<div class="row">
		</div>
	</section>
	
	<footer id="appFoot" class="appFoot">
		<div class="container">
			<div class="row">
				<div class="col-12 flex-directionCol">
					<h1 class="text">© Your Site Name</h1>
				</div>
			</div>
		</div>
	</footer>
	
<!-- JavaScript -->
<script>
	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});

	// Header animation on scroll
	window.addEventListener('scroll', () => {
		const header = document.querySelector('.tophead');
		if (window.scrollY > 100) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
</script>
</body>
</html>
`,
    },
    {
      category: "yoga",
	  thumbnail:"/templateScreenshots/yoga/yogatemp-1.png",
      templateName: "Yoga Template",

      html: `<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yoga Templet</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
<!-- Theme Styles = START= -->
<style>
	/*Page Fonts*/
	.poppins-thin{font-family:"Poppins",sans-serif;font-weight:100;font-style:normal}.poppins-extralight{font-family:"Poppins",sans-serif;font-weight:200;font-style:normal}.poppins-light{font-family:"Poppins",sans-serif;font-weight:300;font-style:normal}.poppins-regular{font-family:"Poppins",sans-serif;font-weight:400;font-style:normal}.poppins-medium{font-family:"Poppins",sans-serif;font-weight:500;font-style:normal}.poppins-semibold{font-family:"Poppins",sans-serif;font-weight:600;font-style:normal}.poppins-bold{font-family:"Poppins",sans-serif;font-weight:700;font-style:normal}.poppins-extrabold{font-family:"Poppins",sans-serif;font-weight:800;font-style:normal}.poppins-black{font-family:"Poppins",sans-serif;font-weight:900;font-style:normal}.poppins-thin-italic{font-family:"Poppins",sans-serif;font-weight:100;font-style:italic}.poppins-extralight-italic{font-family:"Poppins",sans-serif;font-weight:200;font-style:italic}.poppins-light-italic{font-family:"Poppins",sans-serif;font-weight:300;font-style:italic}.poppins-regular-italic{font-family:"Poppins",sans-serif;font-weight:400;font-style:italic}.poppins-medium-italic{font-family:"Poppins",sans-serif;font-weight:500;font-style:italic}.poppins-semibold-italic{font-family:"Poppins",sans-serif;font-weight:600;font-style:italic}.poppins-bold-italic{font-family:"Poppins",sans-serif;font-weight:700;font-style:italic}.poppins-extrabold-italic{font-family:"Poppins",sans-serif;font-weight:800;font-style:italic}.poppins-black-italic{font-family:"Poppins",sans-serif;font-weight:900;font-style:italic}
	
	/*Reset CSS*/
	html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;font-family: "Poppins", sans-serif;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}
	
	/*Layout Styles*/
	div[class*="col-"] {display: flex;justify-content: center;}
	.primary-color{color: #6E1C21;}.primary-bg{background: #6E1C21;}.default-color {color: #AD4A50;}.theme-bg{background-color: #FFF7EF;}
	.container {width: 90vw;margin: 0 auto;}.row {display: flex;width: 100%;}.col-2 {width: 19.99%}.col-3 {width: 24.99%}.col-4 {width: 39.99%}.col-6 {width: 49.99%}.col-8 {width: 59.99%;}.col-12 {width: 99.99%;}
	.flex-directionCol {flex-direction: column;}.flex-directionRow {flex-direction: row;}
	.pill-button {display: flex;border-radius: 30px;background: #0FACFF;border: none;align-items: center;color: #ffffff;padding: 3px;min-width: 100px;}
	.pill-button img {margin-right: 5px;}.mega-title {font-size: 3em;font-weight: 600;margin: 10px 0;}.title {font-size: 1.5em;font-weight: 700;margin: 10px 0;}.text{font-size: 1em;margin: 10px 0;line-height: 1.5em;font-weight: 300;}.align-center {align-items: center;}.text-center {text-align: center;}.content-left {justify-content: flex-start !important;}label {color: #00ACFF;font-size: 1em;margin-bottom: 10px;}.field {width: 100%;}input {height: 52px;border: none;background: #ffffff;width: 100%;border-radius: 8px;padding: 10px;box-sizing: border-box;font-size: 16px;color: #AD4A50;}textarea {min-height: 100px;border: none;border-bottom: 1px solid #00ACFF;width: 100%;}.border-top {border-top: 1px solid #00ACFF;}.solid-button {font-size: 1.2em;display: block;border: none;background: #AD4A50;padding: 15px 30px;color: #ffffff;border-radius: 8px;}.outline-button {font-size: 1.2em;display: block;border: 1px solid #0FACFF;background: #ffffff;padding: 15px 30px;color: #0FACFF;}.space-bottom {margin-bottom: 60px;}.space-top {margin-top: 60px;}.space-left {margin-left: 60px;}.space-right {margin-right: 60px;}.border-top {border-top: 1px solid #6E1C21;}.border-bottom {border-bottom: 1px solid #6E1C21;}.border-left {border-left: 1px solid #6E1C21;}.border-right {border-right: 1px solid #6E1C21;}.relative {position: relative;overflow: hidden;}.relative * {position: relative;z-index: 3;}.image-bg{top:0;bottom:0;z-index:0!important;position:absolute!important;width:100% !important;}.full-height {height: 100%;}
	@media only screen and (max-width: 600px) {
		.about .container {width: 80vw !important;}
		.row {display: block;}
		div[class*="col-"] {width: 100%;margin: 20px 0;padding: 0 !important;}
	}
	
	/*Header Styles*/
	header .banner {color: #ffffff;}
	.logo {white-space: nowrap;font-size: 1em;font-weight: 800;}
	.tophead .container {display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding: 1em 0em;min-height: 60px;}
	.tophead.scrolled {position: fixed;width: 100%;box-sizing: border-box;box-shadow: 0 2px 3px hsl(0deg 0% 0% / 20%);z-index: 9;}
	.banner {display: flex;height: 90vh;flex-direction: column;align-items: center;text-align: center;padding-top: 5em;}
	.banner .sub-title {font-size: 2em;font-weight: 600;margin-top:20px;}
	ul.pageNav {display: flex;justify-content: flex-end;align-items: center;width: 100%;flex-wrap: nowrap;flex-direction: row;}
	ul.pageNav li {margin: 0 10px;}
	ul.pageNav li a {color: #AD4A50;font-size: 18px;padding: 8px 20px;text-decoration: none;}ul.pageNav li a:hover {background-color: rgb(255 255 255 / 18%);border-radius: 30px;}ul.pageNav li a.active {color: #6E1C21;font-weight: 600;}

	/*Section Styles*/
	section {padding: 10em 0em;}
	
	/*About Section Styles*/
	.about {}
	.about .container {width: 55vw;}
	.about .sub-title {margin-top: 20px;font-weight: 300;font-size: 1.6em;margin-top: 30px}
	.button-group {display: flex;margin-top: 30px}.button-group button {margin-right: 10px;}
	
	/*services Section Styles*/
	.services {}
	.services .col-3 {padding: 4em 0}
	.services .col-3 img {width: 18%;margin-bottom: 20px;}
	
	
	/*videos Section Styles*/
	.videos {}
	div[class*="video-"] {background-size: cover;border-radius: 10px;height: 360px;background-position: center;align-items: center;}
	div[class*="video-"] img {width: 48px;}
	
	/*prices Section Styles*/
	.prices,.comments {color: #ffffff;}
	.price-card {padding: 3em 0;border: 2px solid #AD4A50;border-radius: 10px;}
	.price-card img {margin-bottom: 20px;}
	
	/*splServices Section Styles*/
	.splServices {padding-bottom: 0;}
	.data-box {text-align: center;padding: 3.5em 5em;}
	.data-box img {width: 18%;margin: 0 auto 30px auto;}
	
	/*splServices Section Styles*/
	.insta {}
	.insta-feed {background-color: #ffffff;border-radius: 10px;overflow: hidden}
	.insta-feed .title img{width: 24px;margin: 0 10px 0 0;}
	.insta-feed .title,.insta-feed .text {padding: 1em 3em;display: flex;width: 100%;box-sizing: border-box;flex-direction: row;align-items: center;justify-content: flex-start;margin: 10px 0;}
	.insta-feed .title {padding: 2em 2em 0em 2em;}
	
	/*comments Section Styles*/
	.comments .head {display: flex;}
	.comments .container {width: 50vw;}
	.comments .row,.comments .row .head {position: relative;}
	.comments .row {border: 3px solid #fff;padding: 2em 2em;border-radius: 10px;}
	.comments .row .user-pic {position: absolute;width: 150px;bottom: 0;}
	.comments .title-group {margin-left: 170px;}
	.comments .button-group {position: absolute;right: 50px;bottom: -20px;}
	.btn-arrow {background: #6E1C21;border-radius: 7px;padding: 10px;box-sizing: border-box;margin: 0 6px;}
	.btn-arrow img {width: 16px;}

	/*Contact Section Styles*/
	.contact {background: #F4E1D1;padding: 5em 0em 0em 0em;}

	form {width: 50vw; padding-left: 5em;display: flex;flex-direction: column;flex-wrap: nowrap;justify-content: space-around;align-items: flex-start;height: 100%;margin: auto;}
	.subcribe form {padding: 0;}
	.contact img.icon {margin-bottom: -130px;}

	
	/*appFoot section styles*/
	.appFoot {padding: 10em 0em 2em 0em;}
	
</style>
<!-- Theme Styles = END= -->
	
</head>

<body class="theme-bg">
	<!-- Page Header -->
    <header class="relative">
		<img class="image-bg" src="/images/templet-2/header-bg.png" alt=""/>
		<div class="tophead theme-bg">
			<div class="container">
				<span class="logo"><p>Site Name</p></span>
				<ul class="pageNav">
					<li class="navItem"><a class="nav-link active" href="#home">Home</a></li>
					<li class="navItem"><a class="nav-link" href="#about">About</a></li>
					<li class="navItem"><a class="nav-link" href="#services">Services</a></li>
					<li class="navItem"><a class="nav-link" href="#contact">Contact</a></li>
				</ul>
			</div>
		</div>

		<section class="banner" id="home">
			<div class="container">
				<h1 class="mega-title">Mum dolor sit cante vivam <br/> For odio discus</h1>
			</div>
		</section>
		
	</header>

	
	<section id="about" class="about default-color relative">
		<img class="image-bg full-height" src="/images/templet-2/about-bg.png" alt=""/>
		<div class="container">
			<div class="row">
				<div class="col-12 flex-directionCol text-center">
					<p class="title primary-color">About Us</p>
					<h1 class="mega-title default-color">Lorem ipsum dolor sitcant</h1>
					<img src="/images/templet-2/about.png" alt="" class="space-bottom space-top"/>
					<p class="text">Praesent dapibus neque id cursus faucibus tortor neque egestas auguae eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi tincidunt quis accumsan porttitor facilisis luctus metus lorem ipsum dolor.</p>
				</div>
			</div>
		</div>
	</section>
	
	<section id="services" class="services relative">
		<img class="image-bg full-height" src="/images/templet-2/services.png" alt=""/>
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center space-bottom">
					<p class="title primary-color">Services</p>
					<h1 class="mega-title default-color space-bottom">Eirmod tempor incide</h1>
				</div>
			</div>
			<div class="row space-top primary-color">
				<div class="col-3 flex-directionCol">
					<img src="/images/templet-2/serv-1.svg" alt=""/>
					<h1 class="title">Gubergren</h1>
					<p class="text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
				</div>
				<div class="col-6 flex-directionCol">
					
				</div>
				<div class="col-3 flex-directionCol">
					<img src="/images/templet-2/serv-1.svg" alt=""/>
					<h1 class="title">Gravida Yoti</h1>
					<p class="text">Crem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
				</div>
			</div>
		</div>
	</section>
	
	<section id="videos" class="videos primary-color relative">
		<img class="image-bg full-height" src="/images/templet-2/videos-bg.png" alt=""/>
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center">
					<p class="title primary-color">Video Tutorials</p>
					<h1 class="mega-title default-color">Porum ipsum dolor sitcantevim</h1>
				</div>
			</div>
			<div class="row space-top">
				<div class="col-4 flex-directionCol video-1 relative">
					<img class="image-bg" src="/images/templet-2/video1.png" alt=""/>
					<img src="/images/templet-2/play.svg" alt=""/>
				</div>
				<div class="col-4 flex-directionCol video-2 space-left space-right">
					<img class="image-bg" src="/images/templet-2/video2.png" alt=""/>
					<img src="/images/templet-2/play.svg" alt=""/>
					
				</div>
				<div class="col-4 flex-directionCol video-3">
					<img class="image-bg" src="/images/templet-2/video3.png" alt=""/>
					<img src="/images/templet-2/play.svg" alt=""/>
				</div>
			</div>
		</div>
	</section>
	
	<section id="prices" class="prices relative">
		<img class="image-bg full-height" src="/images/templet-2/price-bg.png" alt=""/>
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center">
					<p class="title">Price</p>
					<h1 class="mega-title">Porum ipsum dolor sitcantevim</h1>
				</div>
			</div>
			<div class="row space-top">
				<div class="row">
					<div class="col-4 align-center flex-directionCol price-card">
						<img src="/images/templet-2/price1.svg" alt=""/>
						<p class="title">Basic</p>
						<h1 class="mega-title">$35.00</h1>
						<p class="title">/ month</p>
					</div>
					<div class="col-4 align-center flex-directionCol price-card space-left space-right">
						<img src="/images/templet-2/price2.svg" alt=""/>
						<p class="title">Premium</p>
						<h1 class="mega-title">$65.00</h1>
						<p class="title">/ month</p>
					</div>
					<div class="col-4 align-center flex-directionCol price-card">
						<img src="/images/templet-2/price3.svg" alt=""/>
						<p class="title">Standard</p>
						<h1 class="mega-title">$95.00</h1>
						<p class="title">/ month</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section id="splServices" class="splServices primary-color">
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center">
					<p class="title primary-color">Special Services</p>
					<h1 class="mega-title default-color">Sadis elit noumy erimond</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-4 flex-directionCol data-box border-bottom">
					<img src="/images/templet-2/serv-1.png" alt=""/>
					<h1 class="title">Quia veniam</h1>
					<p class="text">Fugit mollitia est. Aut sit mollitia. Est delectus nisi qui</p>
				</div>
				<div class="col-4 flex-directionCol data-box border-bottom border-left border-right">
					<img src="/images/templet-2/serv-2.png" alt=""/>
					<h1 class="title">Soluta aspernatur</h1>
					<p class="text">Beatae aut placeat eius. Nemo possimus accusan</p>
					
				</div>
				<div class="col-4 flex-directionCol data-box border-bottom">
					<img src="/images/templet-2/serv-3.png" alt=""/>
					<h1 class="title">Veritatis rem</h1>
					<p class="text">Lure sint cupiditate voluptas id ipsam tempore quae.</p>
				</div>
			</div>
			<div class="row">
				<div class="col-4 flex-directionCol data-box">
					<img src="/images/templet-2/serv-4.png" alt=""/>
					<h1 class="title">Nuia veniam</h1>
					<p class="text">Nugit mollitia est. Aut sit mollitia. Est delectus nisi qui</p>
				</div>
				<div class="col-4 flex-directionCol data-box border-left border-right">
					<img src="/images/templet-2/serv5.png" alt=""/>
					<h1 class="title">Koluta aspernatur</h1>
					<p class="text">Eatae aut placeat eius. Nemo possimus accusan</p>
					
				</div>
				<div class="col-4 flex-directionCol data-box">
					<img src="/images/templet-2/serv-6.png" alt=""/>
					<h1 class="title">Eritatis rem</h1>
					<p class="text">MoIure sint cupiditate voluptas id ipsam tempore quae.</p>
				</div>
			</div>
		</div>
	</section>
	
	<section id="insta" class="insta primary-color relative">
		<img class="image-bg full-height" src="/images/templet-2/insta-bg.png" alt=""/>
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center">
					<p class="title primary-color">Insta Feed</p>
					<h1 class="mega-title default-color">Adis elit noum rimond</h1>
				</div>
			</div>
			<div class="row space-top">
				<div class="col-4 flex-directionCol insta-feed">
					<img src="/images/templet-2/insta1.png" alt=""/>
					<p class="title default-color"><img src="/images/templet-2/insta.svg" alt=""/> Feed</p>
					<h1 class="text primary-color">Gubergren, no sea takimata sanctu consetetur sadipscing elit.</h1>
				</div>
				<div class="col-4 flex-directionCol insta-feed space-left space-right">
					<img src="/images/templet-2/insta2.png" alt=""/>
					<p class="title default-color"><img src="/images/templet-2/insta.svg" alt=""/> Feed</p>
					<h1 class="text primary-color">Ubergren, no sea takimata sanctu consetetur sadipscing elit.</h1>
					
				</div>
				<div class="col-4 flex-directionCol insta-feed">
					<img src="/images/templet-2/insta3.png" alt=""/>
					<p class="title default-color"><img src="/images/templet-2/insta.svg" alt=""/> Feed</p>
					<h1 class="text primary-color">Kergren, no sea takimata sanctu unti consetetur sadipscing elit.</h1>
				</div>
			</div>
		</div>
	</section>
	
	<section id="comments" class="comments relative">
		<img class="image-bg full-height" src="/images/templet-2/price-bg.png" alt=""/>
		<div class="container">
			<div class="row space-top flex-directionCol">
				<div class="head flex-directionRow">
					<img src="/images/templet-2/cmnt.png" alt="" class="user-pic"/>
					<div class="title-group">
						<p class="title">Patricia Alvarez</p>
						<p class="text">Home Maker</p>
					</div>
				</div>
				<p class="text">Praesent dapibus neque id cursus faucibus tortor neque egestas auguae eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi tincidunt quis accumsan porttitor facilisis luctus metus lorem ipsum dolor.</p>
				<div class="button-group">
					<span class="btn-arrow right"><img src="/images/templet-2/arrow.svg" alt=""/></span>
					<span class="btn-arrow left"><img src="/images/templet-2/arrow.svg" alt=""/></span>
				</div>
			</div>
		</div>
	</section>
	
	<section id="contact" class="contact text-center">
		<div class="row">
			<div class="container">
				<div class="row space-bottom">
					<div class="col-12 flex-directionCol text-center">
						<p class="title primary-color">Contact us</p>
						<h1 class="mega-title default-color">Egesta augue eros dolor vatamus</h1>
					</div>
				</div>
				<div class="col-12 flex-directionCol space-bottom space-top subcribe">
					<form class="flex-directionRow">
						<div class="field space-right">
							<div class="input">
								<input type="email" class="textbox" placeholder="Enter email"/>
							</div>
						</div>
						<button class="solid-button">Submit</button>
					</form>
				</div>
			</div>
		</div>
		<img src="/images/templet-2/contact-link.svg" alt="" class="icon"/>
	</section>
	
	<section id="appFoot" class="appFoot">
		<div class="container">
			<div class="row">
				<div class="col-12 flex-directionCol text-center">
					<h1 class="text primary-color">© Your Site Name</h1>
				</div>
			</div>
		</div>
	</section>
	
<!-- JavaScript -->
<script>
	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});

	// Header animation on scroll
	window.addEventListener('scroll', () => {
		const header = document.querySelector('.tophead');
		if (window.scrollY > 100) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
</script>
</body>
</html>
`,
    },
    {
      category: "yoga",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgROptnUVAtUuDwS5WP_0v5Gkyj67PsbZj9w&s",
      templateName: "Yoga Template",

      html: `
	  <!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yoga Templet</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
<!-- Theme Styles = START= -->
<style>
	/*Page Fonts*/
	.poppins-thin{font-family:"Poppins",sans-serif;font-weight:100;font-style:normal}.poppins-extralight{font-family:"Poppins",sans-serif;font-weight:200;font-style:normal}.poppins-light{font-family:"Poppins",sans-serif;font-weight:300;font-style:normal}.poppins-regular{font-family:"Poppins",sans-serif;font-weight:400;font-style:normal}.poppins-medium{font-family:"Poppins",sans-serif;font-weight:500;font-style:normal}.poppins-semibold{font-family:"Poppins",sans-serif;font-weight:600;font-style:normal}.poppins-bold{font-family:"Poppins",sans-serif;font-weight:700;font-style:normal}.poppins-extrabold{font-family:"Poppins",sans-serif;font-weight:800;font-style:normal}.poppins-black{font-family:"Poppins",sans-serif;font-weight:900;font-style:normal}.poppins-thin-italic{font-family:"Poppins",sans-serif;font-weight:100;font-style:italic}.poppins-extralight-italic{font-family:"Poppins",sans-serif;font-weight:200;font-style:italic}.poppins-light-italic{font-family:"Poppins",sans-serif;font-weight:300;font-style:italic}.poppins-regular-italic{font-family:"Poppins",sans-serif;font-weight:400;font-style:italic}.poppins-medium-italic{font-family:"Poppins",sans-serif;font-weight:500;font-style:italic}.poppins-semibold-italic{font-family:"Poppins",sans-serif;font-weight:600;font-style:italic}.poppins-bold-italic{font-family:"Poppins",sans-serif;font-weight:700;font-style:italic}.poppins-extrabold-italic{font-family:"Poppins",sans-serif;font-weight:800;font-style:italic}.poppins-black-italic{font-family:"Poppins",sans-serif;font-weight:900;font-style:italic}
	
	/*Reset CSS*/
	html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;font-family: "Poppins", sans-serif;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}
	
	/*Layout Styles*/
	div[class*="col-"] {display: flex;justify-content: center;}
	.primary-color{color: #6E1C21;}.primary-bg{background: #6E1C21;}.default-color {color: #AD4A50;}.theme-bg{background-color: #FFF7EF;}
	.container {width: 90vw;margin: 0 auto;}.row {display: flex;width: 100%;}.col-2 {width: 19.99%}.col-3 {width: 24.99%}.col-4 {width: 39.99%}.col-6 {width: 49.99%}.col-8 {width: 59.99%;}.col-12 {width: 99.99%;}
	.flex-directionCol {flex-direction: column;}.flex-directionRow {flex-direction: row;}
	.pill-button {display: flex;border-radius: 30px;background: #0FACFF;border: none;align-items: center;color: #ffffff;padding: 3px;min-width: 100px;}
	.pill-button img {margin-right: 5px;}.mega-title {font-size: 3em;font-weight: 600;margin: 10px 0;}.title {font-size: 1.5em;font-weight: 700;margin: 10px 0;}.text{font-size: 1em;margin: 10px 0;line-height: 1.5em;font-weight: 300;}.align-center {align-items: center;}.text-center {text-align: center;}.content-left {justify-content: flex-start !important;}label {color: #00ACFF;font-size: 1em;margin-bottom: 10px;}.field {width: 100%;}input {height: 52px;border: none;background: #ffffff;width: 100%;border-radius: 8px;padding: 10px;box-sizing: border-box;font-size: 16px;color: #AD4A50;}textarea {min-height: 100px;border: none;border-bottom: 1px solid #00ACFF;width: 100%;}.border-top {border-top: 1px solid #00ACFF;}.solid-button {font-size: 1.2em;display: block;border: none;background: #AD4A50;padding: 15px 30px;color: #ffffff;border-radius: 8px;}.outline-button {font-size: 1.2em;display: block;border: 1px solid #0FACFF;background: #ffffff;padding: 15px 30px;color: #0FACFF;}.space-bottom {margin-bottom: 60px;}.space-top {margin-top: 60px;}.space-left {margin-left: 60px;}.space-right {margin-right: 60px;}.border-top {border-top: 1px solid #6E1C21;}.border-bottom {border-bottom: 1px solid #6E1C21;}.border-left {border-left: 1px solid #6E1C21;}.border-right {border-right: 1px solid #6E1C21;}.relative {position: relative;overflow: hidden;}.relative * {position: relative;z-index: 3;}.image-bg{top:0;bottom:0;z-index:0!important;position:absolute!important;width:100% !important;}.full-height {height: 100%;}
	@media only screen and (max-width: 600px) {
		.about .container {width: 80vw !important;}
		.row {display: block;}
		div[class*="col-"] {width: 100%;margin: 20px 0;padding: 0 !important;}
	}
	
	/*Header Styles*/
	header .banner {color: #ffffff;}
	.logo {white-space: nowrap;font-size: 1em;font-weight: 800;}
	.tophead .container {display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding: 1em 0em;min-height: 60px;}
	.tophead.scrolled {position: fixed;width: 100%;box-sizing: border-box;box-shadow: 0 2px 3px hsl(0deg 0% 0% / 20%);z-index: 9;}
	.banner {display: flex;height: 90vh;flex-direction: column;align-items: center;text-align: center;padding-top: 5em;}
	.banner .sub-title {font-size: 2em;font-weight: 600;margin-top:20px;}
	ul.pageNav {display: flex;justify-content: flex-end;align-items: center;width: 100%;flex-wrap: nowrap;flex-direction: row;}
	ul.pageNav li {margin: 0 10px;}
	ul.pageNav li a {color: #AD4A50;font-size: 18px;padding: 8px 20px;text-decoration: none;}ul.pageNav li a:hover {background-color: rgb(255 255 255 / 18%);border-radius: 30px;}ul.pageNav li a.active {color: #6E1C21;font-weight: 600;}

	/*Section Styles*/
	section {padding: 10em 0em;}
	
	/*About Section Styles*/
	.about {}
	.about .container {width: 55vw;}
	.about .sub-title {margin-top: 20px;font-weight: 300;font-size: 1.6em;margin-top: 30px}
	.button-group {display: flex;margin-top: 30px}.button-group button {margin-right: 10px;}
	
	/*services Section Styles*/
	.services {}
	.services .col-3 {padding: 4em 0}
	.services .col-3 img {width: 18%;margin-bottom: 20px;}
	
	
	/*videos Section Styles*/
	.videos {}
	div[class*="video-"] {background-size: cover;border-radius: 10px;height: 360px;background-position: center;align-items: center;}
	div[class*="video-"] img {width: 48px;}
	
	/*prices Section Styles*/
	.prices,.comments {color: #ffffff;}
	.price-card {padding: 3em 0;border: 2px solid #AD4A50;border-radius: 10px;}
	.price-card img {margin-bottom: 20px;}
	
	/*splServices Section Styles*/
	.splServices {padding-bottom: 0;}
	.data-box {text-align: center;padding: 3.5em 5em;}
	.data-box img {width: 18%;margin: 0 auto 30px auto;}
	
	/*splServices Section Styles*/
	.insta {}
	.insta-feed {background-color: #ffffff;border-radius: 10px;overflow: hidden}
	.insta-feed .title img{width: 24px;margin: 0 10px 0 0;}
	.insta-feed .title,.insta-feed .text {padding: 1em 3em;display: flex;width: 100%;box-sizing: border-box;flex-direction: row;align-items: center;justify-content: flex-start;margin: 10px 0;}
	.insta-feed .title {padding: 2em 2em 0em 2em;}
	
	/*comments Section Styles*/
	.comments .head {display: flex;}
	.comments .container {width: 50vw;}
	.comments .row,.comments .row .head {position: relative;}
	.comments .row {border: 3px solid #fff;padding: 2em 2em;border-radius: 10px;}
	.comments .row .user-pic {position: absolute;width: 150px;bottom: 0;}
	.comments .title-group {margin-left: 170px;}
	.comments .button-group {position: absolute;right: 50px;bottom: -20px;}
	.btn-arrow {background: #6E1C21;border-radius: 7px;padding: 10px;box-sizing: border-box;margin: 0 6px;}
	.btn-arrow img {width: 16px;}

	/*Contact Section Styles*/
	.contact {background: #F4E1D1;padding: 5em 0em 0em 0em;}

	form {width: 50vw; padding-left: 5em;display: flex;flex-direction: column;flex-wrap: nowrap;justify-content: space-around;align-items: flex-start;height: 100%;margin: auto;}
	.subcribe form {padding: 0;}
	.contact img.icon {margin-bottom: -130px;}

	
	/*appFoot section styles*/
	.appFoot {padding: 10em 0em 2em 0em;}
	
</style>
<!-- Theme Styles = END= -->
	
</head>

<body class="theme-bg">
	<!-- Page Header -->
    <header class="relative">
		<img class="image-bg" src="images/templet-2/header-bg.png" alt=""/>
		<div class="tophead theme-bg">
			<div class="container">
				<span class="logo"><p>Site Name</p></span>
				<ul class="pageNav">
					<li class="navItem"><a class="nav-link active" href="#home">Home</a></li>
					<li class="navItem"><a class="nav-link" href="#about">About</a></li>
					<li class="navItem"><a class="nav-link" href="#services">Services</a></li>
					<li class="navItem"><a class="nav-link" href="#contact">Contact</a></li>
				</ul>
			</div>
		</div>

		<section class="banner" id="home">
			<div class="container">
				<h1 class="mega-title">Mum dolor sit cante vivam <br/> For odio discus</h1>
			</div>
		</section>
		
	</header>

	
	<section id="about" class="about default-color relative">
		<img class="image-bg full-height" src="images/templet-2/about-bg.png" alt=""/>
		<div class="container">
			<div class="row">
				<div class="col-12 flex-directionCol text-center">
					<p class="title primary-color">About Us</p>
					<h1 class="mega-title default-color">Lorem ipsum dolor sitcant</h1>
					<img src="images/templet-2/about.png" alt="" class="space-bottom space-top"/>
					<p class="text">Praesent dapibus neque id cursus faucibus tortor neque egestas auguae eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi tincidunt quis accumsan porttitor facilisis luctus metus lorem ipsum dolor.</p>
				</div>
			</div>
		</div>
	</section>
	
	<section id="services" class="services relative">
		<img class="image-bg full-height" src="images/templet-2/services.png" alt=""/>
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center space-bottom">
					<p class="title primary-color">Services</p>
					<h1 class="mega-title default-color space-bottom">Eirmod tempor incide</h1>
				</div>
			</div>
			<div class="row space-top primary-color">
				<div class="col-3 flex-directionCol">
					<img src="images/templet-2/serv-1.svg" alt=""/>
					<h1 class="title">Gubergren</h1>
					<p class="text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
				</div>
				<div class="col-6 flex-directionCol">
					
				</div>
				<div class="col-3 flex-directionCol">
					<img src="images/templet-2/serv-1.svg" alt=""/>
					<h1 class="title">Gravida Yoti</h1>
					<p class="text">Crem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
				</div>
			</div>
		</div>
	</section>
	
	<section id="videos" class="videos primary-color relative">
		<img class="image-bg full-height" src="images/templet-2/videos-bg.png" alt=""/>
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center">
					<p class="title primary-color">Video Tutorials</p>
					<h1 class="mega-title default-color">Porum ipsum dolor sitcantevim</h1>
				</div>
			</div>
			<div class="row space-top">
				<div class="col-4 flex-directionCol video-1 relative">
					<img class="image-bg" src="images/templet-2/video1.png" alt=""/>
					<img src="images/templet-2/play.svg" alt=""/>
				</div>
				<div class="col-4 flex-directionCol video-2 space-left space-right">
					<img class="image-bg" src="images/templet-2/video2.png" alt=""/>
					<img src="images/templet-2/play.svg" alt=""/>
					
				</div>
				<div class="col-4 flex-directionCol video-3">
					<img class="image-bg" src="images/templet-2/video3.png" alt=""/>
					<img src="images/templet-2/play.svg" alt=""/>
				</div>
			</div>
		</div>
	</section>
	
	<section id="prices" class="prices relative">
		<img class="image-bg full-height" src="images/templet-2/price-bg.png" alt=""/>
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center">
					<p class="title">Price</p>
					<h1 class="mega-title">Porum ipsum dolor sitcantevim</h1>
				</div>
			</div>
			<div class="row space-top">
				<div class="row">
					<div class="col-4 align-center flex-directionCol price-card">
						<img src="images/templet-2/price1.svg" alt=""/>
						<p class="title">Basic</p>
						<h1 class="mega-title">$35.00</h1>
						<p class="title">/ month</p>
					</div>
					<div class="col-4 align-center flex-directionCol price-card space-left space-right">
						<img src="images/templet-2/price2.svg" alt=""/>
						<p class="title">Premium</p>
						<h1 class="mega-title">$65.00</h1>
						<p class="title">/ month</p>
					</div>
					<div class="col-4 align-center flex-directionCol price-card">
						<img src="images/templet-2/price3.svg" alt=""/>
						<p class="title">Standard</p>
						<h1 class="mega-title">$95.00</h1>
						<p class="title">/ month</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section id="splServices" class="splServices primary-color">
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center">
					<p class="title primary-color">Special Services</p>
					<h1 class="mega-title default-color">Sadis elit noumy erimond</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-4 flex-directionCol data-box border-bottom">
					<img src="images/templet-2/serv-1.png" alt=""/>
					<h1 class="title">Quia veniam</h1>
					<p class="text">Fugit mollitia est. Aut sit mollitia. Est delectus nisi qui</p>
				</div>
				<div class="col-4 flex-directionCol data-box border-bottom border-left border-right">
					<img src="images/templet-2/serv-2.png" alt=""/>
					<h1 class="title">Soluta aspernatur</h1>
					<p class="text">Beatae aut placeat eius. Nemo possimus accusan</p>
					
				</div>
				<div class="col-4 flex-directionCol data-box border-bottom">
					<img src="images/templet-2/serv-3.png" alt=""/>
					<h1 class="title">Veritatis rem</h1>
					<p class="text">Lure sint cupiditate voluptas id ipsam tempore quae.</p>
				</div>
			</div>
			<div class="row">
				<div class="col-4 flex-directionCol data-box">
					<img src="images/templet-2/serv-4.png" alt=""/>
					<h1 class="title">Nuia veniam</h1>
					<p class="text">Nugit mollitia est. Aut sit mollitia. Est delectus nisi qui</p>
				</div>
				<div class="col-4 flex-directionCol data-box border-left border-right">
					<img src="images/templet-2/serv5.png" alt=""/>
					<h1 class="title">Koluta aspernatur</h1>
					<p class="text">Eatae aut placeat eius. Nemo possimus accusan</p>
					
				</div>
				<div class="col-4 flex-directionCol data-box">
					<img src="images/templet-2/serv-6.png" alt=""/>
					<h1 class="title">Eritatis rem</h1>
					<p class="text">MoIure sint cupiditate voluptas id ipsam tempore quae.</p>
				</div>
			</div>
		</div>
	</section>
	
	<section id="insta" class="insta primary-color relative">
		<img class="image-bg full-height" src="images/templet-2/insta-bg.png" alt=""/>
		<div class="container">
			<div class="row space-bottom">
				<div class="col-12 flex-directionCol text-center">
					<p class="title primary-color">Insta Feed</p>
					<h1 class="mega-title default-color">Adis elit noum rimond</h1>
				</div>
			</div>
			<div class="row space-top">
				<div class="col-4 flex-directionCol insta-feed">
					<img src="images/templet-2/insta1.png" alt=""/>
					<p class="title default-color"><img src="images/templet-2/insta.svg" alt=""/> Feed</p>
					<h1 class="text primary-color">Gubergren, no sea takimata sanctu consetetur sadipscing elit.</h1>
				</div>
				<div class="col-4 flex-directionCol insta-feed space-left space-right">
					<img src="images/templet-2/insta2.png" alt=""/>
					<p class="title default-color"><img src="images/templet-2/insta.svg" alt=""/> Feed</p>
					<h1 class="text primary-color">Ubergren, no sea takimata sanctu consetetur sadipscing elit.</h1>
					
				</div>
				<div class="col-4 flex-directionCol insta-feed">
					<img src="images/templet-2/insta3.png" alt=""/>
					<p class="title default-color"><img src="images/templet-2/insta.svg" alt=""/> Feed</p>
					<h1 class="text primary-color">Kergren, no sea takimata sanctu unti consetetur sadipscing elit.</h1>
				</div>
			</div>
		</div>
	</section>
	
	<section id="comments" class="comments relative">
		<img class="image-bg full-height" src="images/templet-2/price-bg.png" alt=""/>
		<div class="container">
			<div class="row space-top flex-directionCol">
				<div class="head flex-directionRow">
					<img src="images/templet-2/cmnt.png" alt="" class="user-pic"/>
					<div class="title-group">
						<p class="title">Patricia Alvarez</p>
						<p class="text">Home Maker</p>
					</div>
				</div>
				<p class="text">Praesent dapibus neque id cursus faucibus tortor neque egestas auguae eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi tincidunt quis accumsan porttitor facilisis luctus metus lorem ipsum dolor.</p>
				<div class="button-group">
					<span class="btn-arrow right"><img src="images/templet-2/arrow.svg" alt=""/></span>
					<span class="btn-arrow left"><img src="images/templet-2/arrow.svg" alt=""/></span>
				</div>
			</div>
		</div>
	</section>
	
	<section id="contact" class="contact text-center">
		<div class="row">
			<div class="container">
				<div class="row space-bottom">
					<div class="col-12 flex-directionCol text-center">
						<p class="title primary-color">Contact us</p>
						<h1 class="mega-title default-color">Egesta augue eros dolor vatamus</h1>
					</div>
				</div>
				<div class="col-12 flex-directionCol space-bottom space-top subcribe">
					<form class="flex-directionRow">
						<div class="field space-right">
							<div class="input">
								<input type="email" class="textbox" placeholder="Enter email"/>
							</div>
						</div>
						<button class="solid-button">Submit</button>
					</form>
				</div>
			</div>
		</div>
		<img src="images/templet-2/contact-link.svg" alt="" class="icon"/>
	</section>
	
	<section id="appFoot" class="appFoot">
		<div class="container">
			<div class="row">
				<div class="col-12 flex-directionCol text-center">
					<h1 class="text primary-color">© Your Site Name</h1>
				</div>
			</div>
		</div>
	</section>
	
<!-- JavaScript -->
<script>
	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});

	// Header animation on scroll
	window.addEventListener('scroll', () => {
		const header = document.querySelector('.tophead');
		if (window.scrollY > 100) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
</script>
</body>
</html>
`,
    },
  ];
}

module.exports = {
  templateslist,
};
