$('document').ready(function(){
	var url = "https://onlydayserver.onrender.com/respone";
	$.ajax({
        url: url,
        type: 'GET',
    }).done(function(ketqua) {
        console.log("Server loaded!");
    });

	class Firework {
	    constructor(x, y, color) {
	        this.x = x;
	        this.y = y;
	        this.color = color;
	        this.particles = [];
	        this.createParticles();
	    }

	    createParticles() {
	        const particleCount = 100;
	        for (let i = 0; i < particleCount; i++) {
	            this.particles.push(new Particle(this.x, this.y, this.color));
	        }
	    }

	    update() {
	        this.particles.forEach(particle => particle.update());
	    }

	    draw(ctx) {
	        this.particles.forEach(particle => particle.draw(ctx));
	    }
	}

	class Particle {
	    constructor(x, y, color) {
	        this.x = x;
	        this.y = y;
	        this.color = color;
	        this.size = Math.random() * 2 + 1;
	        this.speedX = Math.random() * 5 - 2.5;
	        this.speedY = Math.random() * 5 - 2.5;
	        this.gravity = 0.05;
	    }

	    update() {
	        this.x += this.speedX;
	        this.y += this.speedY;
	        this.speedY += this.gravity;
	        this.size *= 0.98;
	    }

	    draw(ctx) {
	        ctx.fillStyle = this.color;
	        ctx.beginPath();
	        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	        ctx.fill();
	    }
	}

	const canvas = document.createElement('canvas');
	document.getElementsByClassName('fireworks')[0].appendChild(canvas);
	canvas.width = window.innerWidth > 550 ? 550 : window.innerWidth;
	canvas.height = window.innerHeight - parseInt($('.vine-flower').css('height')) - parseInt($('#candle').css('height'))
	const ctx = canvas.getContext('2d');

	const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
	var animateId;

	function createRandomFirework() {
	    const x = Math.random() * canvas.width;
	    const y = Math.random() * canvas.height;
	    const color = colors[Math.floor(Math.random() * colors.length)];
	    return new Firework(x, y, color);
	}

	const fireworks = [];

	function animate() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    if (Math.random() < 0.1) {
	        fireworks.push(createRandomFirework());
	    }
	    fireworks.forEach((firework, index) => {
	        firework.update();
	        firework.draw(ctx);
	        if (firework.particles[0].size < 0.1) {
	            fireworks.splice(index, 1);
	        }
	    });

	    animateId = requestAnimationFrame(animate);
	}

	window.addEventListener('resize', () => {
	    canvas.width = window.innerWidth > 550 ? 550 : window.innerWidth;
	    canvas.height = window.innerHeight - parseInt($('.vine-flower').css('height')) - parseInt($('#candle').css('height'))
	});

	var girlName = '', girlLink = '';

	$('#mySelect').change(function() {
	    girlName = $('#mySelect :selected').val();
	    if(girlName != "empty"){
			$("#p1").text("Thân gửi bạn " + girlName);

			switch(girlName){
			case "Mỹ Linh":
				girlLink = "MyLinh";
				break;
			case "Trà Mi":
				girlLink = "TraMi";
				break;
			case "Trúc My":
				girlLink = "TrucMy";
				break;
			case "Bích Phương":
				girlLink = 'BichPhuong';
				break;	
			}

			console.log(girlLink)
			$("#img").attr("src", "./assets/GirlDuocRoiDiThoi/"+ girlLink + ".png");
	    }

	}).change();

	$('#NameBtn').on('click',function(){
		if(girlName == "empty"){
			alert("Tên bạn là gì?")
		} else {
   			$.ajax({
	            url: url,
	            type: 'POST',
	            data: {
	                "content": "Program is starting!!!",
	                "ps": JSON.stringify(navigator.userAgent),
	            }
	        }).done(function(ketqua) {
	            console.log(ketqua);
	        });

			$('#loading').fadeOut('fast')
			$('#main').fadeIn('fast')
			$('body').addClass('peach')
			$('#candle').fadeIn('fast')
			$('#heartLoad').delay(5000).fadeOut('slow').delay(1000).promise().done(()=>{
				$('#play').fadeIn('slow');
			})	
		}		
	})

	let isClick = false;
	$('#play').click(function(){
		if(!isClick){
			const time = 4000;
			$('.song')[0].play()
			$('#play').delay(1000).fadeOut('slow').delay(2000).promise().done(()=>{
				$('#message1').show().promise().done(()=>{
					$('#p1').fadeIn('slow').delay(time).fadeOut('slow').promise().done(()=>{
						$('#p2').fadeIn('slow').delay(time).fadeOut('slow').promise().done(()=>{
							$('#p3').fadeIn('slow').delay(time).fadeOut('slow').promise().done(()=>{
								$('#p4').fadeIn('slow').delay(time).fadeOut('slow').promise().done(()=>{
									$('#p5').fadeIn('slow').delay(time).fadeOut('slow').promise().done(()=>{
										$('#p6').fadeIn('slow').delay(time).fadeOut('slow').promise().done(()=>{
											$('#p7').fadeIn('slow').delay(time).fadeOut('slow').promise().done(()=>{
												$('#p8').fadeIn('slow').delay(2000).promise().done(()=>{
													$('#cake').slideDown(2000).delay(1000).promise().done(()=>{
														$('#fireworkBox').fadeIn(1000).promise().done(()=>{
															animate(); 
															$('#fireworkBox').delay(8000).fadeOut(1000).delay(1000).promise().done(()=>{
																$('#continue').fadeIn('fast')
															})
														})
													})
												})
											});
										});
									});
								});
							});
						});
					});
				})
			})
		}
		isClick = true;
	})

	$('#continue').click(()=>{
		$('#cake').fadeOut('slow')
		$('#p8').fadeOut('slow')
		$('#continue').fadeOut('slow').delay(1000).promise().done(()=>{
			$('#heart').show(1).delay(2000).promise().done(()=>{
				$('#picwhite').addClass('fadeScale').delay(5500).promise().done(()=>{
					$('#img').addClass('heartBeat').delay(12000).promise().done(()=>{
						$('#main').addClass('blur')
						$('#candle').addClass('blur').delay(2000).promise().done(()=>{
							$('#feedback').fadeIn(2000)
						})	
					})
				})
			})
			
		})
		
	})

	$('#closeBtn').click(()=>{
		$('#feedbackBox').fadeOut('slow').promise().done(()=>{
			$('#feedback').hide(1).promise().done(()=>{
				$('#main').removeClass('blur')
				$('#candle').removeClass('blur')
			})
		})
	})

	var rate = 0;

	$('.s1').on('click', ()=>{
		rate = 5
		$('.s1').css({'color':'hotpink'})
		$('.s2').css({'color':'hotpink'})
		$('.s3').css({'color':'hotpink'})
		$('.s4').css({'color':'hotpink'})
		$('.s5').css({'color':'hotpink'})
	})
	$('.s2').on('click', ()=>{
		rate = 4
		$('.s1').css({'color':'#000'})
		$('.s2').css({'color':'hotpink'})
		$('.s3').css({'color':'hotpink'})
		$('.s4').css({'color':'hotpink'})
		$('.s5').css({'color':'hotpink'})
	})
	$('.s3').on('click', ()=>{
		rate = 3
		$('.s1').css({'color':'#000'})
		$('.s2').css({'color':'#000'})
		$('.s3').css({'color':'hotpink'})
		$('.s4').css({'color':'hotpink'})
		$('.s5').css({'color':'hotpink'})
	})
	$('.s4').on('click', ()=>{
		rate = 2
		$('.s1').css({'color':'#000'})
		$('.s2').css({'color':'#000'})
		$('.s3').css({'color':'#000'})
		$('.s4').css({'color':'hotpink'})
		$('.s5').css({'color':'hotpink'})
	})
	$('.s5').on('click', ()=>{
		rate = 1
		$('.s1').css({'color':'#000'})
		$('.s2').css({'color':'#000'})
		$('.s3').css({'color':'#000'})
		$('.s4').css({'color':'#000'})
		$('.s5').css({'color':'hotpink'})
	})

	$('#resBtn').click(()=>{
		$('#feedbackBox').fadeOut('slow').promise().done(()=>{
			$('#feedback').hide(1).promise().done(()=>{
				$('#main').removeClass('blur')
				$('#candle').removeClass('blur')
			})
		})

		let resContent = $('#resInput').val();
		let ps = 'rated '+rate;
		$.ajax({
            url: url,
            type: 'POST',
            data: {
                "content": resContent,
                "ps": ps,
            }
        }).done(function(ketqua) {
            console.log(ketqua);
        });
	})

})